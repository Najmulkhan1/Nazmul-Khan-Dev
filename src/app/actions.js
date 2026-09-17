'use server';

import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
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

