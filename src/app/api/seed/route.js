import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { projects } from '@/data/projects';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    
    // Check if empty
    const count = await Project.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: 'Database already seeded', count }, { status: 200 });
    }

    // Add image array backwards compatibility
    const mappedProjects = projects.map(p => ({
      ...p,
      images: p.image ? [p.image] : [],
    }));

    await Project.insertMany(mappedProjects);

    return NextResponse.json({ message: 'Successfully seeded database' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
