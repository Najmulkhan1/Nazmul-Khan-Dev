'use client';

import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    quote: "Nazmul is a rare full-stack engineer who genuinely understands both pixel-perfect frontend ergonomics and rigorous backend architecture. He delivered our Next.js application with exceptional performance and zero friction.",
    author: "Shariar Hossain",
    role: "Lead Tech Architect",
    company: "CloudScale Systems",
    rating: 5,
  },
  {
    quote: "His command over TypeScript, MongoDB modeling, and production VPS deployment saved our team weeks of debugging. Clean code, punctual delivery, and proactive architectural suggestions throughout the project.",
    author: "Tanvir Ahmed",
    role: "Product Director",
    company: "DevSprint Labs",
    rating: 5,
  },
  {
    quote: "Nazmul restructured our complex database schema and added Redis caching, which reduced our API response times by over 60%. Highly recommended for any serious web engineering challenges.",
    author: "M. Rahman",
    role: "Senior Engineering Manager",
    company: "Enterprise BD",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-24 sm:py-32 border-t border-white/5 bg-background-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="text-xs font-sans uppercase tracking-widest text-primary">
                Endorsements
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              Client & Peer <br /> Feedback.
            </h2>
          </div>
          <div className="max-w-md border-l border-white/10 pl-6">
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              Real-world feedback from engineering leaders, product directors, and clients on delivery speed, architectural integrity, and code quality.
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-white/10 bg-background-card/20 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-6 text-primary">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-white/10 mb-4" />

                <p className="text-sm font-sans text-zinc-300 leading-relaxed italic mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase font-mono">
                  {item.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    {item.author}
                  </h4>
                  <p className="text-[11px] font-sans text-text-muted">
                    {item.role} • {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
