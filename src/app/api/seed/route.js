import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export const dynamic = 'force-dynamic';

export const ALL_PORTFOLIO_PROJECTS = [
  {
    id: 'omni-store-ecommerce',
    title: 'OmniStore - Full-Stack E-Commerce',
    description: 'A production-grade e-commerce application with product catalog, cart persistence, Stripe checkout integration, order tracking, and an administrative dashboard.',
    images: ['https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveLink: 'https://strong-creponne-968836.netlify.app/',
    githubLink: 'https://github.com/Najmulkhan1/Warmpaws-pet-care-in-winter',
    challenges: [
      'Integrating Stripe for secure payments and webhook state management.',
      'Managing complex state for shopping cart and user authentication across components.',
      'Optimizing image loading for a media-rich product catalog.'
    ],
    improvements: [
      'Implement AI-based product recommendations.',
      'Add a user review and rating system.',
      'Develop a mobile application using React Native.'
    ],
    featured: true,
  },
  {
    id: 'task-flow-management',
    title: 'TaskFlow - Agile Kanban Hub',
    description: 'Collaborative Kanban project management suite featuring realtime socket updates, role-based access control, task assignments, and activity audit logs.',
    images: ['https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    technologies: ['Next.js 15', 'Socket.io', 'MongoDB', 'TailwindCSS'],
    liveLink: 'https://roaring-ganache-3c8c0f.netlify.app/',
    githubLink: 'https://github.com/Najmulkhan1/B12-A10-the-book-haven-client',
    challenges: [
      'Ensuring real-time message delivery with sub-50ms latency using Socket.IO.',
      'Handling user disconnections and reconnections gracefully.',
      'Designing a responsive kanban drag-and-drop interface that works seamlessly on mobile.'
    ],
    improvements: [
      'Add private 1-on-1 team direct messaging.',
      'Implement message persistence and search indexing.',
      'Add automated sprint analytics and burndown velocity charts.'
    ],
    featured: true,
  },
  {
    id: 'dev-lens-analytics',
    title: 'DevLens - Developer Analytics Platform',
    description: 'Data analytics platform providing actionable insights into API latencies, server resource metrics, and GitHub repository activity with interactive charts.',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    technologies: ['Next.js', 'TailwindCSS', 'Recharts', 'Node.js'],
    liveLink: 'https://github.com/Najmulkhan1',
    githubLink: 'https://github.com/Najmulkhan1',
    challenges: [
      'Aggregating high-frequency time-series metrics without database bottlenecks.',
      'Designing clean responsive Recharts visualizations with zero layout shift.',
      'Building automated health alert system triggered on error spikes.'
    ],
    improvements: [
      'Add Prometheus metrics exporter.',
      'Multi-tenant workspace organization with SSO.'
    ],
    featured: true,
  },
  {
    id: 'ticket-bari',
    title: 'Ticket Bari',
    description: 'Ticket Bari is a modern, full-stack digital ticketing platform designed to revolutionize how people travel across Bangladesh. Built with the powerful MERN stack (MongoDB, Express.js, React, and Node.js), our platform offers a seamless, secure, and lightning-fast booking experience.',
    images: ['https://i.ibb.co.com/dsQZTwrj/Screenshot-2026-01-06-194238.png'],
    videos: [],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT Auth', 'React Beautiful DND'],
    liveLink: 'https://ticket-bari-frontend.vercel.app/',
    githubLink: 'https://github.com/Najmulkhan1/ticket-bari-frontend',
    challenges: [
      'Implementing secure drag-and-drop seat and ticket reservation that persists state.',
      'Building a robust authentication system using JWT tokens.',
      'Designing an intuitive dashboard for ticket booking overviews.'
    ],
    improvements: [
      'Add SMS ticket notifications for passengers in Bangladesh.',
      'Integrate third-party travel calendar syncing.',
      'Add dark/light mode toggle.'
    ],
    featured: false,
  },
  {
    id: 'warmpaws',
    title: 'WarmPaws',
    description: 'A comprehensive e-commerce platform dedicated to pet products. WarmPaws provides a seamless shopping experience with features like product filtering, secure checkout, and user order history.',
    images: ['https://i.ibb.co/LDv14ZPS/Screenshot-2025-12-06-140834.png'],
    videos: [],
    technologies: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
    liveLink: 'https://strong-creponne-968836.netlify.app/',
    githubLink: 'https://github.com/Najmulkhan1/Warmpaws-pet-care-in-winter',
    challenges: [
      'Integrating Stripe for secure payments and handling varying payment states.',
      'Managing complex state for the shopping cart and user authentication across components.',
      'Optimizing image loading for a media-rich product catalog.'
    ],
    improvements: [
      'Implement AI-based product recommendations.',
      'Add a user review and rating system.',
      'Develop a mobile application using React Native.'
    ],
    featured: false,
  },
  {
    id: 'book-haven',
    title: 'The Book Haven',
    description: 'A real-time chat application designed for book lovers to discuss their favorite reads. Users can join varied interest rooms, share messages instantly.',
    images: ['https://i.ibb.co/Xr3qTbj8/Screenshot-2025-12-06-141647.png'],
    videos: [],
    technologies: ['React', 'Express', 'Socket.IO', 'Node.js', 'Tailwind CSS'],
    liveLink: 'https://roaring-ganache-3c8c0f.netlify.app/',
    githubLink: 'https://github.com/Najmulkhan1/B12-A10-the-book-haven-client',
    challenges: [
      'Ensuring real-time message delivery with low latency using Socket.IO.',
      'Handling user disconnections and reconnections gracefully.',
      'Designing a responsive chat interface that works well on mobile devices.'
    ],
    improvements: [
      'Add private 1-on-1 messaging functionality.',
      'Implement message persistence using a database.',
      'Add typing indicators and read receipts.'
    ],
    featured: false,
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    // Upsert all showcase projects so we don't duplicate existing ones
    for (const project of ALL_PORTFOLIO_PROJECTS) {
      await Project.findOneAndUpdate(
        { id: project.id },
        { $setOnInsert: project },
        { upsert: true, new: true }
      );
    }

    const total = await Project.countDocuments();
    return NextResponse.json({
      message: 'Successfully verified & synchronized showcase projects into MongoDB',
      totalProjects: total
    }, { status: 200 });
  } catch (error) {
    console.error('Error seeding projects:', error);
    return NextResponse.json({ error: 'Failed to seed database', details: error.message }, { status: 500 });
  }
}
