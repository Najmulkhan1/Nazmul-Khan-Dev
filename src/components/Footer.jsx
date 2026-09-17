'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp, Heart, Terminal } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-background-dark/80 backdrop-blur-xl mt-24">
      {/* Ambient gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight text-text-primary group-hover:text-primary transition-colors">
              Nazmul<span className="text-primary">.dev</span>
            </span>
          </Link>
          <p className="text-text-muted text-xs text-center md:text-left">
            Full-Stack Software Engineer specializing in MERN, Next.js & Cloud Systems.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Najmulkhan1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 hover:-translate-y-0.5 transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/nazmul-khan-mukit/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 hover:-translate-y-0.5 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:najmulislam624@gmail.com"
            aria-label="Send Email"
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 hover:-translate-y-0.5 transition-all"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <p className="text-text-muted text-xs text-center md:text-right">
            &copy; {new Date().getFullYear()} Nazmul Khan. Crafted with Next.js & Tailwind.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
