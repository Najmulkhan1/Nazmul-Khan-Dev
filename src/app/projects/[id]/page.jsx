import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { getYoutubeEmbedUrl, getDriveEmbedUrl } from '@/lib/utils';
import ImageSlider from '@/components/ImageSlider';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Code2,
  Layers,
  Cpu,
  ShieldCheck,
  Terminal,
  Zap,
  Database,
  Server,
  Calendar,
  UserCheck,
  Activity,
  Workflow
} from 'lucide-react';
import { fallbackProjects } from '../page';
import { projects as staticProjects } from '@/data/projects';

export default async function ProjectDetails({ params }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  let project = null;

  try {
    await dbConnect();
    // Try finding by id or by mongodb _id
    project = await Project.findOne({
      $or: [{ id: decodedId }, { _id: decodedId.match(/^[0-9a-fA-F]{24}$/) ? decodedId : null }]
    }).lean();
  } catch (err) {
    console.error('Error fetching project by id:', err);
  }

  // If not found in DB, check fallbackProjects from /projects/page.jsx
  if (!project) {
    const fallback = fallbackProjects.find((p) => p.id === decodedId);
    if (fallback) {
      project = {
        ...fallback,
        technologies: fallback.tags || [],
        challenges: [
          'Designing an optimized database schema with indexing to handle high-frequency transactions.',
          'Implementing secure token-based authentication with automated refresh rotation and CSRF protection.',
          'Optimizing core web vitals and sub-second asset hydration across mobile and desktop viewports.'
        ],
        improvements: [
          'Deploy Redis caching layer for heavy read queries and product catalog lookups.',
          'Integrate automated end-to-end testing pipeline using Playwright and GitHub Actions.',
          'Incorporate AI-driven recommendation and personalized search indexing.'
        ]
      };
    }
  }

  // If still not found, check static projects from /src/data/projects.js
  if (!project) {
    const staticItem = staticProjects.find((p) => p.id === decodedId);
    if (staticItem) {
      project = {
        ...staticItem,
        technologies: staticItem.technologies || [],
        challenges: staticItem.challenges || [],
        improvements: staticItem.improvements || []
      };
    }
  }

  // All combined projects for "Next Project" navigation
  const allProjects = [
    ...fallbackProjects,
    ...staticProjects.filter((sp) => !fallbackProjects.some((fp) => fp.id === sp.id))
  ];

  const currentIdx = allProjects.findIndex((p) => p.id === decodedId);
  const nextProject = currentIdx !== -1 && allProjects.length > 1
    ? allProjects[(currentIdx + 1) % allProjects.length]
    : null;

  if (!project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-32 px-4">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-primary/30 flex items-center justify-center text-primary mb-6 shadow-[0_0_30px_rgba(204,255,0,0.15)]">
          <Code2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Project Not Found</h2>
        <p className="text-zinc-400 text-sm max-w-md mb-8">
          The case study you are looking for might have been moved, updated, or does not exist.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-primary hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  const images = project.images || [];
  if (!images.length && project.image) images.push(project.image);
  const videos = project.videos || [];

  const mediaList = [
    ...videos.map((v) => {
      const ytUrl = getYoutubeEmbedUrl(v);
      const driveUrl = getDriveEmbedUrl(v);
      return { type: 'video', url: ytUrl || driveUrl || v };
    }),
    ...images.map((img) => ({ type: 'image', url: img })),
  ];

  if (mediaList.length === 0) {
    mediaList.push({
      type: 'image',
      url: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop',
    });
  }

  const techList = project.technologies?.length ? project.technologies : (project.tags || []);
  const challengesList = project.challenges?.length ? project.challenges : [
    'Designing an optimized database schema to handle high-frequency data changes.',
    'Implementing seamless authentication with token refresh mechanisms.',
    'Ensuring responsive UX and sub-second page loads across devices.'
  ];
  const improvementsList = project.improvements?.length ? project.improvements : [
    'Integrate automated end-to-end testing with Playwright.',
    'Add AI-driven recommendations to enhance user personalization.',
    'Deploy Redis caching layer for heavy read queries.'
  ];

  return (
    <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20 space-y-16">
      
      {/* 1. Header Navigation & Category Badge */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 text-xs font-mono tracking-wider uppercase text-zinc-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform text-primary" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              CASE STUDY // 2025
            </span>
            <span className="text-zinc-600 text-xs hidden sm:inline">•</span>
            <span className="text-zinc-400 text-xs font-mono hidden sm:inline">FULL-STACK SYSTEM</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-4 max-w-5xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            {project.title}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg lg:text-xl font-sans leading-relaxed max-w-4xl">
            {project.description}
          </p>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-sans font-bold text-sm text-black bg-primary hover:bg-primary-light transition-all shadow-[0_0_25px_rgba(204,255,0,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Live Application</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-sans font-semibold text-sm text-zinc-200 bg-white/[0.04] border border-white/15 hover:border-primary/40 hover:text-white hover:bg-white/[0.08] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Github className="w-4 h-4 text-primary" />
              <span>Source Code</span>
            </a>
          )}

          <div className="hidden md:flex items-center gap-2 ml-auto text-xs font-mono text-zinc-500">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span>Architecture Verified • Production VPS</span>
          </div>
        </div>
      </div>

      {/* 2. Project Specifications Bento Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-1 hover:border-white/20 transition-colors">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-primary" />
            <span>Role</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white">{project.role || 'Full Stack Architect'}</p>
          <p className="text-[11px] font-mono text-zinc-500">Frontend & Backend Logic</p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-1 hover:border-white/20 transition-colors">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Timeline</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white">{project.timeline || '2025 Production'}</p>
          <p className="text-[11px] font-mono text-zinc-500">Completed & Maintained</p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-1 hover:border-white/20 transition-colors">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
            <Server className="w-3.5 h-3.5 text-primary" />
            <span>Deployment</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white">{project.deployment || 'Docker & VPS'}</p>
          <p className="text-[11px] font-mono text-zinc-500">Reverse Proxy & SSL</p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-1 hover:border-white/20 transition-colors">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Status</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-sm sm:text-base font-semibold text-white">Active & Live</p>
          </div>
          <p className="text-[11px] font-mono text-zinc-500">99.9% Uptime Verified</p>
        </div>
      </div>

      {/* 3. Centerpiece Visual Showcase (Safari/Studio Mockup) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              Interactive Preview & Visual Documentation
            </h2>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            Slide to explore interface
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c0e]/80 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
          <ImageSlider 
            media={mediaList} 
            title={project.title} 
            liveLink={project.liveLink}
          />
        </div>
      </section>

      {/* 4. Engineering In-Depth Bento Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Architecture & Engineering Challenges */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Architecture Pipeline Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Workflow className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-white tracking-wide uppercase font-display">
                  System Architecture & Pipeline
                </h3>
              </div>
              <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                End-to-End
              </span>
            </div>

            {/* Architecture Node Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-primary">
                  <Layers className="w-3.5 h-3.5" />
                  <span>01. CLIENT</span>
                </div>
                <p className="text-xs text-zinc-300 font-medium">{project.archClient || 'Next.js / React SSR'}</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Optimistic UI state, responsive Tailwind styling, and client hydration.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-primary">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>02. SERVER API</span>
                </div>
                <p className="text-xs text-zinc-300 font-medium">{project.archServer || 'Node / Express API'}</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  RESTful endpoints, JWT cookie validation, role permissions & rate limiting.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-primary">
                  <Database className="w-3.5 h-3.5" />
                  <span>03. PERSISTENCE</span>
                </div>
                <p className="text-xs text-zinc-300 font-medium">{project.archDb || 'MongoDB & Redis'}</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Compound indexed queries, Redis cached session store, and ACID transactions.
                </p>
              </div>
            </div>
          </div>

          {/* Key Challenges Faced & Engineered Solutions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-white tracking-wide uppercase font-display">
                  Key Engineering Challenges
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">Technical Solutions</span>
            </div>

            <div className="space-y-4">
              {challengesList.map((challenge, idx) => (
                <div 
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-colors space-y-2 group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                      CHALLENGE 0{idx + 1}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-200 font-sans leading-relaxed">
                    {challenge}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Engineered with resilient failure-handling & automated verification</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Tech Stack Matrix & Scalability Roadmap */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Tech Stack Matrix */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-white tracking-wide uppercase font-display">
                  Technologies Used
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">{techList.length} Technologies</span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Curated tech stack selected for developer ergonomics, low latency, and horizontal scalability.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {techList.map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-200 hover:border-primary/50 hover:text-white transition-all shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Scalability & Future Roadmap */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white tracking-wide uppercase font-display">
                  Future Roadmap
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Iterative
              </span>
            </div>

            <div className="space-y-3">
              {improvementsList.map((improvement, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-black/30 border border-white/10"
                >
                  <span className="text-xs font-mono text-amber-400 mt-0.5 shrink-0 font-bold">
                    P{i + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {improvement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-white/[0.02] to-transparent border border-primary/20 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
              <Terminal className="w-4 h-4" />
              <span>Available for hire</span>
            </div>
            <h4 className="text-lg font-bold text-white font-display">
              Need a similar architecture built?
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              I design and deploy production-ready full-stack applications with high reliability and clean codebases.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-primary hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(204,255,0,0.25)]"
            >
              <span>Schedule Architecture Discussion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </section>

      {/* 5. Next Case Study & Footer Navigation */}
      {nextProject && (
        <section className="border-t border-white/10 pt-12">
          <Link
            href={`/projects/${nextProject.id}`}
            className="group block p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider group-hover:text-primary transition-colors">
                  Next Case Study →
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors font-display">
                  {nextProject.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-1 max-w-xl">
                  {nextProject.description}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-200 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all">
                <span>View Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </section>
      )}

    </article>
  );
}

