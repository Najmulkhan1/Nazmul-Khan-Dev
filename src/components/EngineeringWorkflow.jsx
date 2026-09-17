'use client';

import { motion } from 'framer-motion';
import { Compass, Code, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';

const workflowSteps = [
  {
    step: '01',
    phase: 'Architecture & Blueprint',
    title: 'System & Schema Design',
    description: 'Before writing code, I model domain entities, define database schemas (PostgreSQL / MongoDB), specify REST / GraphQL contracts, and map out state flow.',
    icon: Compass,
    deliverables: ['Schema ERD Diagrams', 'API Specifications', 'Auth & Security Model'],
  },
  {
    step: '02',
    phase: 'Full-Stack Build',
    title: 'Clean Code Implementation',
    description: 'Developing responsive frontends with Next.js 15 & React 19, backed by modular NestJS / Node.js microservices with strict TypeScript end-to-end type safety.',
    icon: Code,
    deliverables: ['Server Components', 'Custom Hooks & State', 'Robust REST Endpoints'],
  },
  {
    step: '03',
    phase: 'Hardening & Speed',
    title: 'Optimization & Security',
    description: 'Applying sub-millisecond Redis caching layers, indexing slow database queries, sanitizing inputs, enforcing rate-limiting, and auditing Core Web Vitals.',
    icon: ShieldCheck,
    deliverables: ['Redis Cache Invalidation', 'Input Sanitization', 'Sub-100ms API Latency'],
  },
  {
    step: '04',
    phase: 'Production Launch',
    title: 'VPS Deployment & CI/CD',
    description: 'Containerizing services via Docker & Docker Compose, setting up Nginx reverse proxy with SSL certbot, and configuring automated CI/CD pipelines for zero downtime.',
    icon: Rocket,
    deliverables: ['Dockerized Containers', 'Nginx Reverse Proxy', 'Zero-Downtime Releases'],
  },
];

export default function EngineeringWorkflow() {
  return (
    <section className="w-full py-24 sm:py-32 border-t border-white/5 bg-[#08080a] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="text-xs font-sans uppercase tracking-widest text-primary">
                Methodology
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              Production <br /> Lifecycle.
            </h2>
          </div>
          <div className="max-w-md border-l border-white/10 pl-6">
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              How I take high-ambition software systems from architectural vision to bulletproof production deployment with predictable velocity and reliability.
            </p>
          </div>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl border border-white/10 bg-background-card/30 hover:border-primary/50 hover:bg-white/[0.03] transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Step Number Backdrop */}
                <span className="text-5xl font-display font-extrabold text-white/[0.04] group-hover:text-primary/10 transition-colors absolute top-4 right-4 pointer-events-none">
                  {item.step}
                </span>

                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest block mb-1">
                    {item.phase}
                  </span>

                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs font-sans text-text-muted leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                    Key Outputs:
                  </span>
                  {item.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[11px] font-sans text-zinc-300">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
