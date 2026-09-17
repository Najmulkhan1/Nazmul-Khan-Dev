'use client';

import { ArrowUpRight, CheckCircle2, Award, Terminal, Code2, Shield, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function AboutSection({ isStandalone = false }) {
  const principles = [
    {
      title: "Clean Architecture",
      desc: "Writing modular, type-safe, and self-documenting code that any engineering team can maintain and scale effortlessly.",
      icon: Code2,
    },
    {
      title: "Performance First",
      desc: "Relentless focus on sub-millisecond database queries, optimized React rendering, and top-tier Core Web Vitals.",
      icon: Cpu,
    },
    {
      title: "Security Obsessed",
      desc: "Implementing multi-factor auth, input sanitization, rate-limiting, and hardened Linux VPS server environments.",
      icon: Shield,
    },
    {
      title: "Production Mindset",
      desc: "Zero tolerance for fragile hacks. Every solution is containerized, tested, and built for real-world traffic.",
      icon: Terminal,
    },
  ];

  return (
    <section
      id="about"
      className={`w-full border-t border-white/5 relative bg-background-dark overflow-hidden ${
        isStandalone ? 'pt-32 sm:pt-40 pb-24 sm:pb-32' : 'py-24 sm:py-32'
      }`}
    >
      {/* Background Section Title */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
        <h2 className="text-[12vw] font-display font-bold whitespace-nowrap text-white">
          ENGINEERING DNA • SYSTEMS • ARCHITECTURE
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="text-xs font-sans uppercase tracking-widest text-primary">About</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              The Engine <br /> Behind The Code.
            </h2>
          </div>
          <div className="max-w-md border-l border-white/10 pl-6">
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              I am a full-stack engineer driven by solving complex real-world challenges through resilient software architectures and delightful user experiences.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (Image & Quick Bio Info) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="aspect-[3/4] w-full bg-background-card rounded-2xl border border-white/10 p-2 overflow-hidden group">
              <img
                src="https://i.ibb.co/8gbhygq0/IMG-0644.jpg"
                alt="Nazmul Khan"
                className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-5">
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1 font-mono">Status</p>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Available for Hire
                </p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1 font-mono">Experience</p>
                <p className="text-xs font-bold text-white">2+ Years Production</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="https://drive.google.com/file/d/16bs_iLUUnI0LZaicJYXL3WeE_UjF2EUH/view"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-6 py-3.5 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors rounded-xl"
              >
                <span>Download Resume / CV</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {!isStandalone && (
                <Link
                  href="/about"
                  className="flex items-center justify-between px-6 py-3.5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 text-xs font-mono uppercase tracking-wider transition-colors rounded-xl"
                >
                  <span>Read Full Engineering Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Right Column (Narrative & Principles) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
            <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-background-card/40 backdrop-blur-sm">
              <h3 className="text-xl font-display font-bold text-white uppercase mb-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                The Journey & Vision
              </h3>
              <div className="space-y-4 text-sm md:text-base font-sans text-text-muted leading-relaxed">
                <p>
                  My engineering journey began with a deep curiosity about how digital systems handle millions of requests without breaking. What started with frontend experimentation quickly transformed into architecting enterprise-grade full-stack ecosystems.
                </p>
                <p>
                  Over the past 2+ years, I have architected and deployed production web applications leveraging <strong className="text-white">Next.js 15, React 19, NestJS, and Node.js</strong>, coupled with <strong className="text-white">PostgreSQL, MongoDB Atlas, and Redis caching</strong>. I specialize in backend microservices, Docker containerization, and zero-downtime Linux VPS hosting.
                </p>
                <p>
                  Whether engineering real-time collaboration platforms, high-throughput SaaS APIs, or e-commerce engines, my goal is always uncompromising: deliver scalable, production-ready solutions with high security and exceptional user experience.
                </p>
              </div>
            </div>

            {/* 4 Architectural Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {principles.map((val, i) => {
                const Icon = val.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-white/10 bg-background-card/20 hover:border-primary/40 hover:bg-white/[0.02] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-primary mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider mb-2">
                      {val.title}
                    </h4>
                    <p className="text-xs font-sans text-text-muted leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
