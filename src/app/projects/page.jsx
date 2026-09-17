import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { projects as staticProjects } from '@/data/projects';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import { Sparkles, Terminal, Code2, Layers } from 'lucide-react';

export const fallbackProjects = [
  {
    id: 'omni-store-ecommerce',
    title: 'OmniStore - Full-Stack E-Commerce',
    category: 'E-Commerce',
    description: 'A production-grade e-commerce application with product catalog, cart persistence, Stripe checkout integration, order tracking, and an administrative dashboard.',
    images: ['https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveLink: 'https://github.com/Najmulkhan1',
    githubLink: 'https://github.com/Najmulkhan1',
  },
  {
    id: 'task-flow-management',
    title: 'TaskFlow - Agile Kanban Hub',
    category: 'Real-Time',
    description: 'Collaborative Kanban project management suite featuring realtime socket updates, role-based access control, task assignments, and activity audit logs.',
    images: ['https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    tags: ['Next.js 15', 'Socket.io', 'MongoDB', 'TailwindCSS'],
    liveLink: 'https://github.com/Najmulkhan1',
    githubLink: 'https://github.com/Najmulkhan1',
  },
  {
    id: 'dev-lens-analytics',
    title: 'DevLens - Developer Analytics Platform',
    category: 'Analytics',
    description: 'Data analytics platform providing actionable insights into API latencies, server resource metrics, and GitHub repository activity with interactive charts.',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    tags: ['Next.js', 'TailwindCSS', 'Recharts', 'Node.js'],
    liveLink: 'https://github.com/Najmulkhan1',
    githubLink: 'https://github.com/Najmulkhan1',
  }
];

export default async function ProjectsPage() {
  let dbProjects = [];
  try {
    await dbConnect();
    dbProjects = await Project.find().sort({ createdAt: -1 }).lean();
  } catch (err) {
    console.error('Error fetching database projects in ProjectsPage:', err);
  }

  // Format DB projects
  const formattedDbProjects = dbProjects.map((p) => ({
    id: p.id || p._id.toString(),
    title: p.title,
    category: p.category || 'Full-Stack',
    description: p.description,
    images: p.images?.length > 0 ? p.images : (p.image ? [p.image] : []),
    videos: p.videos || [],
    tags: p.technologies || p.tags || [],
    liveLink: p.liveLink,
    githubLink: p.githubLink,
  }));

  // Format Static Projects from /src/data/projects.js
  const formattedStaticProjects = staticProjects.map((sp) => {
    let cat = 'Full-Stack';
    const t = sp.title.toLowerCase();
    if (t.includes('warmpaws')) cat = 'E-Commerce';
    else if (t.includes('book')) cat = 'Real-Time';
    else if (t.includes('ticket')) cat = 'Full-Stack';

    return {
      id: sp.id,
      title: sp.title,
      category: cat,
      description: sp.description,
      images: sp.image ? [sp.image] : (sp.images || []),
      videos: [],
      tags: sp.technologies || [],
      liveLink: sp.liveLink,
      githubLink: sp.githubLink,
    };
  });

  // Merge all sources without duplicate IDs
  const combinedMap = new Map();

  // 1. Static projects
  formattedStaticProjects.forEach((p) => combinedMap.set(p.id, p));

  // 2. Fallback projects
  fallbackProjects.forEach((p) => combinedMap.set(p.id, p));

  // 3. DB projects take precedence if updated
  formattedDbProjects.forEach((p) => combinedMap.set(p.id, p));

  const allProjects = Array.from(combinedMap.values());

  return (
    <div id="projects" className="w-full pt-32 sm:pt-40 pb-24 sm:pb-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-16">
        
        {/* Section Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="text-xs font-mono uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Selected Works & Systems
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight uppercase leading-[0.95]">
              Featured <br /> Engineering.
            </h1>
          </div>

          <div className="max-w-lg border-l border-white/10 pl-6 space-y-3">
            <p className="text-sm font-sans text-zinc-400 leading-relaxed">
              A comprehensive showcase of production-ready full-stack applications, scalable backend APIs, real-time engines, and responsive frontends engineered with modern industry practices.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span className="text-primary font-bold">{allProjects.length} Projects Total</span>
              <span>•</span>
              <span>Architecture & Case Studies</span>
            </div>
          </div>
        </header>

        {/* Interactive Explorer with Live Search, Filter Tabs & Bento Grid */}
        <ProjectsExplorer initialProjects={allProjects} />

      </div>
    </div>
  );
}

