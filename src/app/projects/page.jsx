import ProjectCard from '../../components/ProjectCard';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export const fallbackProjects = [
  {
    id: 'omni-store-ecommerce',
    title: 'OmniStore - Full-Stack E-Commerce',
    description: 'A production-grade e-commerce application with product catalog, cart persistence, Stripe checkout integration, order tracking, and an administrative dashboard.',
    images: ['https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveLink: 'https://github.com/Najmulkhan1',
    githubLink: 'https://github.com/Najmulkhan1',
  },
  {
    id: 'task-flow-management',
    title: 'TaskFlow - Agile Hub',
    description: 'Collaborative Kanban project management suite featuring realtime socket updates, role-based access control, task assignments, and activity audit logs.',
    images: ['https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    tags: ['Next.js 15', 'Socket.io', 'MongoDB'],
    liveLink: 'https://github.com/Najmulkhan1',
    githubLink: 'https://github.com/Najmulkhan1',
  },
  {
    id: 'dev-lens-analytics',
    title: 'DevLens - Analytics',
    description: 'Data analytics platform providing actionable insights into API latencies, server resource metrics, and GitHub repository activity with interactive charts.',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'],
    videos: [],
    tags: ['Next.js', 'TailwindCSS', 'Recharts'],
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
    <div id="projects" className="w-full pt-32 sm:pt-40 pb-24 sm:pb-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary"></span>
              <span className="text-xs font-sans uppercase tracking-widest text-primary">Selected Works</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              Featured <br /> Engineering.
            </h2>
          </div>
          <div className="max-w-md border-l border-white/10 pl-6">
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              A showcase of full-stack web applications, scalable backend APIs, and responsive frontends engineered with modern industry practices.
            </p>
          </div>
        </div>

        {/* Projects Stack */}
        <div className="flex flex-col gap-24">
          {displayProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              tags={project.tags?.slice(0, 4) || []}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
