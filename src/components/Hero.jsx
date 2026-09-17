'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Sparkles, 
  Layers, 
  Database, 
  Code2, 
  CheckCircle2, 
  MapPin, 
  Briefcase 
} from 'lucide-react';

const roles = [
  'Full Stack Software Engineer',
  'MERN Stack Specialist',
  'Next.js & React Architect',
  'Scalable Backend Developer'
];

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Completed Projects', value: '15+' },
  { label: 'Core Stack Mastery', value: '100%' },
  { label: 'Client Satisfaction', value: '99%' },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for rotating roles
  useEffect(() => {
    const targetRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < targetRole.length) {
          setCurrentText(targetRole.slice(0, currentText.length + 1));
        } else {
          // Pause when word is finished typing
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(targetRole.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 lg:py-20 overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Calls to Action */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-primary/30 text-xs font-medium text-primary shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary-light animate-pulse" />
              <span>Full-Stack Engineering & System Design</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
                Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-cyan-400">Nazmul Khan</span>
              </h1>
              
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-xl sm:text-3xl font-mono text-emerald-400 font-semibold">
                  {currentText}
                  <span className="inline-block w-2.5 h-6 sm:h-8 bg-primary ml-1 animate-pulse align-middle" />
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-text-muted max-w-xl leading-relaxed font-normal"
            >
              I build resilient, high-performance web applications and scalable backends. Focused on clean architecture, modern UX, and turning complex workflows into seamless digital products.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-background-dark bg-gradient-to-r from-primary via-emerald-400 to-cyan-accent hover:opacity-95 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://drive.google.com/file/d/16bs_iLUUnI0LZaicJYXL3WeE_UjF2EUH/view"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-text-primary glass-panel hover:border-primary/40 hover:text-primary transition-all duration-200"
              >
                <Download className="w-4 h-4 text-primary" />
                <span>Get Resume</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-text-muted hover:text-white transition-colors"
              >
                <span>Let&apos;s Connect</span>
              </Link>
            </motion.div>

            {/* Tech Badges List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-text-muted"
            >
              <span className="text-text-primary/60 font-medium">Stack:</span>
              {['Next.js 15', 'React 19', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'TypeScript'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-emerald-400/90"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Interactive Profile Card with Ambient Lighting */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group w-full max-w-[380px]"
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/30 to-cyan-accent/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

              {/* Main Card */}
              <div className="relative rounded-2xl glass-panel p-3 border border-white/15 overflow-hidden shadow-2xl">
                
                {/* Image Container with scanner & overlay */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src="https://i.ibb.co/8gbhygq0/IMG-0644.jpg"
                    alt="Nazmul Khan - Full Stack Software Engineer"
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Gradient vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-80" />

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <p className="text-xs font-bold text-white">Full-Stack Engineer</p>
                        <p className="text-[10px] text-text-muted flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-primary" /> Dhaka, Bangladesh
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                      v2.5
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: Next.js + React */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -top-4 -left-4 sm:-left-8 glass-panel px-3.5 py-2 rounded-xl shadow-xl border border-white/10 flex items-center gap-2 backdrop-blur-xl"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">Next.js & React</p>
                  <p className="text-[9px] text-text-muted">Modern Frontend</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Node + MongoDB */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-4 -right-2 sm:-right-6 glass-panel px-3.5 py-2 rounded-xl shadow-xl border border-white/10 flex items-center gap-2 backdrop-blur-xl"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">Node & MongoDB</p>
                  <p className="text-[9px] text-text-muted">Scalable APIs</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300 group"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-text-muted font-medium mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;