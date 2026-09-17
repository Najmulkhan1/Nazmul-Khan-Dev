'use client';

import { Terminal, Shield, Zap, Server, Code2, Database } from 'lucide-react';

const metrics = [
  {
    number: '15+',
    label: 'Production Systems',
    desc: 'Shipped full-stack web applications',
    icon: Server,
  },
  {
    number: '2+',
    label: 'Years Experience',
    desc: 'TypeScript, Next.js & MERN architecture',
    icon: Code2,
  },
  {
    number: '99.9%',
    label: 'System Reliability',
    desc: 'Robust error handling & production uptime',
    icon: Shield,
  },
  {
    number: '<100ms',
    label: 'API Response Time',
    desc: 'Sub-millisecond Redis caching & query tuning',
    icon: Zap,
  },
];

const techPills = [
  'Next.js 15 (App Router)',
  'React 19',
  'TypeScript',
  'NestJS',
  'Node.js',
  'MongoDB Atlas',
  'PostgreSQL',
  'Redis Cache',
  'Docker & Compose',
  'Production Linux VPS',
  'Tailwind CSS',
  'NextAuth.js',
];

export default function ImpactMetrics() {
  return (
    <section className="w-full border-y border-white/5 bg-[#09090b]/80 relative overflow-hidden backdrop-blur-md">
      {/* Background Gradient Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        {/* 4-Stat Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-primary/30 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight group-hover:text-primary transition-colors">
                    {item.number}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:border-primary/40 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  {item.label}
                </h4>
                <p className="text-[11px] font-sans text-text-muted mt-1 leading-snug">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Marquee Pills */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold mr-2 hidden sm:inline">
            CORE ARSENAL:
          </span>
          {techPills.map((pill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-zinc-300 bg-white/[0.02] border border-white/10 hover:border-primary/40 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
