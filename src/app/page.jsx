import Link from 'next/link';
import Hero from '../components/Hero';
import EngineeringPhilosophy from '../components/EngineeringPhilosophy';
import Services from '../components/Services';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ProjectCard from '../components/ProjectCard';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { fallbackProjects } from './projects/page';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Terminal } from 'lucide-react';

export default async function Home() {
  let dbProjects = [];
  try {
    await dbConnect();
    dbProjects = await Project.find().sort({ createdAt: -1 }).lean();
  } catch (err) {
    console.error('Error fetching projects for home:', err);
  }

  const formattedDbProjects = dbProjects.map((p) => ({
    id: p.id || p._id.toString(),
    title: p.title,
    description: p.description,
    images: p.images || (p.image ? [p.image] : []),
    videos: p.videos || [],
    tags: p.technologies || [],
    liveLink: p.liveLink,
    githubLink: p.githubLink,
    featured: p.featured ?? false,
  }));

  const allProjects = formattedDbProjects.length > 0
    ? [...formattedDbProjects, ...fallbackProjects.filter(fp => !formattedDbProjects.some(dp => dp.id === fp.id))]
    : fallbackProjects;

  // Selected Portfolio: Display 3 projects prioritizing admin-selected featured projects
  const explicitlyFeatured = allProjects.filter((p) => p.featured);
  const otherProjects = allProjects.filter((p) => !p.featured);
  const featuredProjects = [...explicitlyFeatured, ...otherProjects].slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Engineering Philosophy */}
      <EngineeringPhilosophy />

      {/* 3. Featured Engineering Works (Teaser Section) */}
      <section className="w-full py-24 sm:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-primary" />
                <span className="text-xs font-sans uppercase tracking-widest text-primary">
                  Selected Portfolio
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
                Featured <br /> Engineering.
              </h2>
            </div>

            <div className="max-w-md border-l border-white/10 pl-6 space-y-4">
              <p className="text-sm font-sans text-text-muted leading-relaxed">
                Handcrafted full-stack web applications, resilient backend architectures, and production-grade deployments.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary hover:text-white uppercase tracking-wider transition-colors group"
              >
                <span>View All Case Studies ({allProjects.length})</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Featured Cards */}
          <div className="flex flex-col gap-24">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                tags={project.tags?.slice(0, 4) || []}
                index={index}
              />
            ))}
          </div>

          {/* Bottom Explore All CTA */}
          <div className="mt-20 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-primary" />
              <p className="text-sm text-zinc-300 font-sans">
                Looking for more case studies and client projects?
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-primary transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(204,255,0,0.3)]"
            >
              <span>Explore All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Core Engineering Services */}
      <Services />

      {/* 5. Career & Experience Timeline */}
      <ExperienceTimeline />

      {/* 6. High-Impact Connect & Collaborate Banner */}
      <section className="w-full py-24 sm:py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-black/40 to-transparent p-8 sm:p-14 md:p-16 backdrop-blur-xl">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                <Terminal className="w-3.5 h-3.5" />
                <span>Available for New Opportunities & Contract Roles</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
                Let&apos;s Build Systems That Scale.
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans max-w-2xl">
                Whether you need an architect for a new SaaS product, a high-throughput backend API, or a responsive full-stack platform, I am ready to deliver clean, production-grade code.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-primary-light transition-all shadow-[0_0_25px_rgba(204,255,0,0.35)]"
                >
                  <span>Initiate Discussion</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 px-6 py-4 border border-white/15 bg-white/[0.02] text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  <span>Read Full Bio & Journey</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

