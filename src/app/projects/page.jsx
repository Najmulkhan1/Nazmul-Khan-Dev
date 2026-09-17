import ProjectCard from '../../components/ProjectCard';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { Sparkles, FolderGit2 } from 'lucide-react';

export const fallbackProjects = [
  {
    id: 'omni-store-ecommerce',
    title: 'OmniStore - Full-Stack MERN E-Commerce',
    description: 'A production-grade e-commerce application with product catalog, cart persistence, Stripe checkout integration, order tracking, and an administrative dashboard.',
    images: ['https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Stripe'],
    liveLink: 'https://github.com/Najmulkhan1',
    githubLink: 'https://github.com/Najmulkhan1',
  },
  {
    id: 'task-flow-management',
    title: 'TaskFlow - Realtime Agile Project Hub',
    description: 'Collaborative Kanban project management suite featuring realtime socket updates, role-based access control, task assignments, and activity audit logs.',
    images: ['https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    tags: ['Next.js 15', 'TypeScript', 'Node.js', 'Socket.io', 'MongoDB'],
    liveLink: 'https://github.com/Najmulkhan1',
    githubLink: 'https://github.com/Najmulkhan1',
  },
  {
    id: 'dev-lens-analytics',
    title: 'DevLens - Developer Performance Dashboard',
    description: 'Data analytics platform providing actionable insights into API latencies, server resource metrics, and GitHub repository activity with interactive charts.',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    tags: ['Next.js', 'TailwindCSS', 'Recharts', 'MongoDB', 'REST API'],
    liveLink: 'https://github.com/Najmulkhan1',
    githubLink: 'https://github.com/Najmulkhan1',
  }
];

export default async function Projects() {
  let dbProjects = [];
  try {
    await dbConnect();
    dbProjects = await Project.find().sort({ createdAt: -1 }).lean();
  } catch (err) {
    console.error('Error fetching database projects:', err);
  }

  // Format DB projects
  const formattedDbProjects = dbProjects.map((p) => ({
    id: p.id || p._id.toString(),
    title: p.title,
    description: p.description,
    images: p.images || (p.image ? [p.image] : []),
    videos: p.videos || [],
    tags: p.technologies || [],
    liveLink: p.liveLink,
    githubLink: p.githubLink,
  }));

  // Combine DB projects and curated fallbacks if DB has few items
  const displayProjects = formattedDbProjects.length > 0
    ? [...formattedDbProjects, ...fallbackProjects.filter(fp => !formattedDbProjects.some(dp => dp.id === fp.id))]
    : fallbackProjects;

  return (
    <div className="w-full py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-primary/30 text-xs font-semibold text-primary">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Featured Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Projects</span>
        </h2>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
          A showcase of full-stack web applications, scalable backend APIs, and responsive frontends engineered with modern industry practices.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProjects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            tags={project.tags?.slice(0, 4) || []}
          />
        ))}
      </div>
    </div>
  );
}
