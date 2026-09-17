'use server';

import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Message from '@/models/Message';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';

export async function deleteProject(id) {
  const session = await auth();
  if (!session) {
    throw new Error('Not authenticated');
  }

  await dbConnect();
  await Project.findByIdAndDelete(id);
  
  revalidatePath('/admin');
  revalidatePath('/projects');
}

async function uploadToImgBB(file) {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) throw new Error("IMGBB_API_KEY is not configured in environment variables.");

  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error(data.error?.message || "ImgBB upload failed");
  }
}

export async function saveProject(formData) {
  const session = await auth();
  if (!session) {
    throw new Error('Not authenticated');
  }

  await dbConnect();

  const id = formData.get('_id'); // Mongo _id
  
  // Extract standard fields
  let parsedId = formData.get('id');
  const title = formData.get('title');
  const description = formData.get('description');
  const liveLink = formData.get('liveLink');
  const githubLink = formData.get('githubLink');
  
  const techStr = formData.get('technologies') || '';
  const chalStr = formData.get('challenges') || '';
  const impStr = formData.get('improvements') || '';
  const vidStr = formData.get('videos') || '';

  const technologies = techStr.split(',').map(s => s.trim()).filter(Boolean);
  const challenges = chalStr.split('\n').map(s => s.trim()).filter(Boolean);
  const improvements = impStr.split('\n').map(s => s.trim()).filter(Boolean);
  const videos = vidStr.split(',').map(s => s.trim()).filter(Boolean);

  // Process Images from Form Data
  const imageFiles = formData.getAll('images');
  const uploadedUrls = [];

  for (const file of imageFiles) {
    // Check if real file attached
    if (file && file.size > 0 && file.name) {
      const url = await uploadToImgBB(file);
      uploadedUrls.push(url);
    }
  }

  const payload = {
    title,
    description,
    liveLink,
    githubLink,
    technologies,
    challenges,
    improvements,
    videos
  };

  const featuredVal = formData.get('featured');
  if (featuredVal !== null) {
    payload.featured = featuredVal === 'true' || featuredVal === 'on';
  }

  if (!parsedId) {
    parsedId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  payload.id = parsedId;

  if (id) {
    // If updating, append new images if any, otherwise keep existing
    if (uploadedUrls.length > 0) {
      await Project.findByIdAndUpdate(id, {
        ...payload,
        $push: { images: { $each: uploadedUrls } }
      });
    } else {
      await Project.findByIdAndUpdate(id, payload);
    }
  } else {
    // Create new
    payload.images = uploadedUrls;
    await Project.create(payload);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/projects');
}

export async function toggleFeaturedProject(id) {
  const session = await auth();
  if (!session) {
    throw new Error('Not authenticated');
  }

  await dbConnect();
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found');
  }

  project.featured = !project.featured;
  await project.save();

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/projects');
  return { success: true, featured: project.featured };
}

export async function submitContactMessage(formData) {
  try {
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const subject = formData.get('subject')?.toString().trim() || 'Project Inquiry';
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
      return { success: false, error: 'Please provide your name, email, and message.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    await dbConnect();

    const created = await Message.create({
      name,
      email,
      subject,
      message,
      read: false,
    });

    revalidatePath('/admin');
    revalidatePath('/admin/messages');

    return { 
      success: true, 
      id: created._id.toString(),
      message: 'Transmission successfully sent!' 
    };
  } catch (error) {
    console.error('Error in submitContactMessage:', error);
    return { success: false, error: error.message || 'Failed to submit message.' };
  }
}

export async function deleteMessage(id) {
  const session = await auth();
  if (!session) {
    throw new Error('Not authenticated');
  }

  await dbConnect();
  await Message.findByIdAndDelete(id);

  revalidatePath('/admin');
  revalidatePath('/admin/messages');
  return { success: true };
}

export async function markMessageAsRead(id, readStatus = true) {
  const session = await auth();
  if (!session) {
    throw new Error('Not authenticated');
  }

  await dbConnect();
  await Message.findByIdAndUpdate(id, { read: readStatus });

  revalidatePath('/admin');
  revalidatePath('/admin/messages');
  return { success: true };
}

export async function markAllMessagesAsRead() {
  const session = await auth();
  if (!session) {
    throw new Error('Not authenticated');
  }

  await dbConnect();
  await Message.updateMany({ read: false }, { $set: { read: true } });

  revalidatePath('/admin');
  revalidatePath('/admin/messages');
  return { success: true };
}

