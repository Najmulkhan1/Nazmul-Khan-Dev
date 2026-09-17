import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { fallbackProjects } from './projects/page';
import { ArrowRight, ArrowUpRight, Layers } from 'lucide-react';

// Components
import Hero from '@/components/Hero';
import ImpactMetrics from '@/components/ImpactMetrics';
import EngineeringPhilosophy from '@/components/EngineeringPhilosophy';
import ProjectCard from '@/components/ProjectCard';
import Services from '@/components/Services';
import SkillsSection from '@/components/SkillsSection';
import EngineeringWorkflow from '@/components/EngineeringWorkflow';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

export const dynamic = 'force-dynamic';

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
      {/* 1. Hero Section (Interactive Dev Workbench & Terminal) */}
      <Hero />

      {/* 2. Impact Proof & Core Tech Bar */}
      <ImpactMetrics />

      {/* 3. Engineering Philosophy (How I Think) */}
      <EngineeringPhilosophy />

      {/* 4. Selected Portfolio (3 Featured Systems Controlled by Admin) */}
      <section id="projects" className="w-full py-24 sm:py-32 border-t border-white/5">
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

      {/* 5. Core Services (What I Build) */}
      <Services />

      {/* 6. Technical Arsenal & Capabilities (Tools I Build With) */}
      <SkillsSection isStandalone={false} />

      {/* 7. Engineering Workflow (Production Lifecycle) */}
      <EngineeringWorkflow />

      {/* 8. Career & Experience Trajectory */}
      <ExperienceTimeline />

      {/* 9. About The Engineer (The Engine Behind The Code) */}
      <AboutSection isStandalone={false} />

      {/* 10. Client & Peer Feedback (Endorsements) */}
      <Testimonials />

      {/* 11. Direct Connection & Message Form (Connected to DB & Admin) */}
      <ContactSection isStandalone={false} />
    </div>
  );
}
