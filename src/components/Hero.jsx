'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  FileText, 
  Terminal, 
  Code2, 
  Cpu, 
  Check, 
  Copy,
  Sparkles,
  Zap,
  Layers,
  Activity,
  GitBranch,
  Database,
  Globe
} from 'lucide-react';

const techBadges = [
  { name: 'Next.js 15', color: '#ffffff', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)' },
  { name: 'React 19', color: '#61dafb', bg: 'rgba(97,218,251,0.06)', border: 'rgba(97,218,251,0.2)' },
  { name: 'NestJS', color: '#ea2845', bg: 'rgba(234,40,69,0.06)', border: 'rgba(234,40,69,0.25)' },
  { name: 'Node.js', color: '#68a063', bg: 'rgba(104,160,99,0.06)', border: 'rgba(104,160,99,0.2)' },
  { name: 'TypeScript', color: '#3178c6', bg: 'rgba(49,120,198,0.06)', border: 'rgba(49,120,198,0.2)' },
  { name: 'Docker', color: '#2496ed', bg: 'rgba(36,150,237,0.06)', border: 'rgba(36,150,237,0.25)' },
  { name: 'Redis', color: '#dc382d', bg: 'rgba(220,56,45,0.06)', border: 'rgba(220,56,45,0.25)' },
  { name: 'PostgreSQL', color: '#336791', bg: 'rgba(51,103,145,0.06)', border: 'rgba(51,103,145,0.2)' },
  { name: 'MongoDB', color: '#00ed64', bg: 'rgba(0,237,100,0.06)', border: 'rgba(0,237,100,0.2)' },
  { name: 'Production VPS', color: '#ccff00', bg: 'rgba(204,255,0,0.06)', border: 'rgba(204,255,0,0.25)' },
];

const tabs = ['config', 'terminal', 'telemetry'];

const Hero = () => {
  const [activeTab, setActiveTab] = useState('config'); // 'config' | 'terminal' | 'telemetry'
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle tabs every 5 seconds (pauses when hovered so user can inspect)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const nextIdx = (tabs.indexOf(prevTab) + 1) % tabs.length;
        return tabs[nextIdx];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // 3D Tilt interaction for the workstation card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Stagger animation container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const copyConfigCode = () => {
    const code = `export const engineer = {
  name: "Nazmul Khan",
  role: "Full-Stack Software Engineer",
  location: "Dhaka, Bangladesh",
  phone: "+8801619863535",
  stack: ["Next.js 15", "React 19", "NestJS", "Node.js", "Docker", "Redis", "PostgreSQL", "MongoDB"],
  infrastructure: "Production Linux VPS Deployment",
  status: "Available for new opportunities"
};`;
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden border-b border-white/5">
      
      {/* Dynamic Animated Ambient Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 40, -30, 0], 
          y: [0, -35, 25, 0], 
          scale: [1, 1.12, 0.92, 1] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent blur-[140px] pointer-events-none -z-10" 
      />
      <motion.div 
        animate={{ 
          x: [0, -35, 25, 0], 
          y: [0, 30, -25, 0], 
          scale: [1, 0.95, 1.1, 1] 
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-1/4 w-[400px] sm:w-[600px] h-[300px] bg-gradient-to-bl from-emerald-500/10 via-cyan-500/5 to-transparent blur-[130px] pointer-events-none -z-10" 
      />

      {/* Technical Grid Pattern with soft radial mask */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_65%,transparent_100%)]" />

      {/* Subtle Floating Code Particles in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-[10px] text-primary/40 select-none"
            style={{
              top: `${15 + i * 14}%`,
              left: `${8 + (i * 17) % 85}%`
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          >
            {['0101', '{ async }', '=> deploy()', '<Component />', '200 OK', 'git commit'][i]}
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center z-10">
        
        {/* Left: Typography & CTAs */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Status Pill with Pulsing Glow */}
          <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-sm hover:border-primary/40 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-mono text-zinc-300">Available for Opportunities</span>
            </div>
            <span className="hidden sm:inline-block text-zinc-600 font-mono">•</span>
            <span className="text-xs font-mono text-zinc-400">Dhaka, BD (UTC+6)</span>
          </motion.div>

          {/* Subheading Badge with Animated Accent Line */}
          <motion.div variants={item} className="mb-4 flex items-center gap-3">
            <motion.span 
              animate={{ width: ['28px', '44px', '28px'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-[1px] bg-primary"
            />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary font-medium">
              Digital Engineer / Product Builder
            </span>
          </motion.div>

          {/* Name Headline with Dynamic Metallic Shine */}
          <motion.h1 
            variants={item} 
            className="font-display text-5xl sm:text-7xl xl:text-[88px] font-bold tracking-tight text-white leading-[0.95] mb-6"
          >
            NAZMUL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
              KHAN
            </span>
            <span className="text-primary">.</span>
          </motion.h1>

          {/* Value Proposition Description */}
          <motion.p 
            variants={item} 
            className="font-sans text-base sm:text-lg text-text-muted max-w-xl leading-relaxed mb-8"
          >
            Full-stack software engineer crafting scalable web systems, production-grade backends, and pixel-precise interactive interfaces using <span className="text-white font-medium">Next.js</span>, <span className="text-white font-medium">Node.js</span>, and modern architectures.
          </motion.p>

          {/* CTAs with Hover Glow Micro-Interactions */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
            <Link
              href="/projects"
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(204,255,0,0.35)] overflow-hidden"
            >
              {/* Button Shimmer highlight */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              <span>Selected Works</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href="https://drive.google.com/file/d/16bs_iLUUnI0LZaicJYXL3WeE_UjF2EUH/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-white/15 bg-white/[0.02] text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />
              <span>Resume / CV</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-4 py-3.5 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Initiate Contact</span>
              <span className="text-primary group-hover:translate-x-1.5 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Interactive Tech Stack Visual Ribbon */}
          <motion.div variants={item} className="w-full max-w-xl mb-8">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>Core Tech Stack</span>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {techBadges.map((badge, idx) => (
                <motion.div
                  key={badge.name}
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="px-3 py-1.5 rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-default"
                  style={{
                    backgroundColor: badge.bg,
                    border: `1px solid ${badge.border}`,
                    color: badge.color
                  }}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: badge.color }}
                  />
                  <span>{badge.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Metrics & Highlights */}
          <motion.div 
            variants={item} 
            className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg"
          >
            <div>
              <div className="font-display text-2xl font-bold text-white tracking-tight">2+</div>
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mt-1">Years Exp.</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-white tracking-tight">MERN</div>
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mt-1">Specialization</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-primary tracking-tight">Next.js</div>
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mt-1">App Router</div>
            </div>
          </motion.div>

        </motion.div>

        {/* Right: Interactive 3D Developer Studio */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full mt-4 lg:mt-0 perspective-[1000px]">
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[540px] relative group"
          >
            {/* Ambient Backlight Glow with Breathing Pulse */}
            <motion.div 
              animate={{ opacity: [0.45, 0.75, 0.45], scale: [0.98, 1.03, 0.98] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-3 bg-gradient-to-tr from-primary/25 via-emerald-500/15 to-transparent blur-3xl pointer-events-none rounded-2xl -z-10" 
            />

            {/* Window Container */}
            <div className="relative w-full rounded-xl border border-white/15 bg-[#0a0a0c]/95 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/90 transition-all duration-300 group-hover:border-white/25">
              
              {/* 5s Auto-cycle Progress Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.04] overflow-hidden pointer-events-none z-20">
                <motion.div
                  key={activeTab + (isHovered ? '-paused' : '-running')}
                  initial={{ width: '0%' }}
                  animate={{ width: isHovered ? '0%' : '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-primary via-emerald-400 to-primary shadow-[0_0_8px_rgba(204,255,0,0.6)]"
                />
              </div>

              {/* Moving Glowing Border Highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none" />

              {/* Window Titlebar with Animated Tabs */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                {/* Traffic Light Dots */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:opacity-100 transition-opacity"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:opacity-100 transition-opacity"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Tabs with Smooth Animated Sliding Indicator */}
                <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-white/5 relative">
                  <button
                    onClick={() => setActiveTab('config')}
                    className={`relative flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono transition-colors z-10 ${
                      activeTab === 'config' ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {activeTab === 'config' && (
                      <motion.div 
                        layoutId="activeHeroTab"
                        className="absolute inset-0 bg-white/10 rounded-md border border-white/10 shadow-sm"
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                      />
                    )}
                    <Code2 className="w-3 h-3 text-sky-400 relative z-10" />
                    <span className="relative z-10">profile.ts</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`relative flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono transition-colors z-10 ${
                      activeTab === 'terminal' ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {activeTab === 'terminal' && (
                      <motion.div 
                        layoutId="activeHeroTab"
                        className="absolute inset-0 bg-white/10 rounded-md border border-white/10 shadow-sm"
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                      />
                    )}
                    <Terminal className="w-3 h-3 text-primary relative z-10" />
                    <span className="relative z-10">terminal.sh</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className={`relative flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono transition-colors z-10 ${
                      activeTab === 'telemetry' ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {activeTab === 'telemetry' && (
                      <motion.div 
                        layoutId="activeHeroTab"
                        className="absolute inset-0 bg-white/10 rounded-md border border-white/10 shadow-sm"
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                      />
                    )}
                    <Cpu className="w-3 h-3 text-purple-400 relative z-10" />
                    <span className="relative z-10">metrics.json</span>
                  </button>
                </div>

                {/* Copy / Version Badge */}
                <button
                  onClick={copyConfigCode}
                  title="Copy code"
                  className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded border border-white/5 hover:border-white/20 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-primary" />
                      <span className="text-primary">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Window Content */}
              <div className="p-6 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[350px] flex flex-col justify-between overflow-x-auto">
                <AnimatePresence mode="wait">
                  {activeTab === 'config' && (
                    <motion.div
                      key="config"
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-1 text-zinc-300"
                    >
                      <p className="text-zinc-500">// nazmul-khan.config.ts</p>
                      <p>
                        <span className="text-purple-400">import</span> &#123;{' '}
                        <span className="text-amber-300">SoftwareEngineer</span> &#125;{' '}
                        <span className="text-purple-400">from</span>{' '}
                        <span className="text-primary">&apos;@core/profile&apos;</span>;
                      </p>
                      <p className="pt-2">
                        <span className="text-purple-400">export const</span>{' '}
                        <span className="text-blue-400">engineer</span>:{' '}
                        <span className="text-amber-300">SoftwareEngineer</span> = &#123;
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">name</span>:{' '}
                        <span className="text-emerald-300">&quot;Nazmul Khan&quot;</span>,
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">title</span>:{' '}
                        <span className="text-emerald-300">&quot;Full-Stack Software Engineer&quot;</span>,
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">location</span>:{' '}
                        <span className="text-emerald-300">&quot;Dhaka, Bangladesh&quot;</span>,
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">focus</span>: [
                        <span className="text-emerald-300">&quot;Web Architecture&quot;</span>,{' '}
                        <span className="text-emerald-300">&quot;High-Performance APIs&quot;</span>],
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">stack</span>: &#123;
                      </p>
                      <p className="pl-8">
                        <span className="text-zinc-400">frontend</span>: [
                        <span className="text-primary">&quot;Next.js 15&quot;</span>,{' '}
                        <span className="text-emerald-300">&quot;React 19&quot;</span>,{' '}
                        <span className="text-emerald-300">&quot;Tailwind&quot;</span>],
                      </p>
                      <p className="pl-8">
                        <span className="text-zinc-400">backend</span>: [
                        <span className="text-primary">&quot;NestJS&quot;</span>,{' '}
                        <span className="text-primary">&quot;Node.js&quot;</span>,{' '}
                        <span className="text-emerald-300">&quot;REST APIs&quot;</span>],
                      </p>
                      <p className="pl-8">
                        <span className="text-zinc-400">databases</span>: [
                        <span className="text-emerald-300">&quot;PostgreSQL&quot;</span>,{' '}
                        <span className="text-emerald-300">&quot;MongoDB&quot;</span>,{' '}
                        <span className="text-primary">&quot;Redis&quot;</span>],
                      </p>
                      <p className="pl-8">
                        <span className="text-zinc-400">devops</span>: [
                        <span className="text-primary">&quot;Docker&quot;</span>,{' '}
                        <span className="text-emerald-300">&quot;Production VPS&quot;</span>,{' '}
                        <span className="text-emerald-300">&quot;Nginx&quot;</span>]
                      </p>
                      <p className="pl-4">&#125;,</p>
                      <p className="pl-4">
                        <span className="text-zinc-400">status</span>:{' '}
                        <span className="text-primary">&quot;Ready for Impact 🚀&quot;</span>
                      </p>
                      <p>&#125;;</p>
                    </motion.div>
                  )}

                  {activeTab === 'terminal' && (
                    <motion.div
                      key="terminal"
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-3.5"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary">$</span>
                          <span className="text-white font-medium">docker compose ps</span>
                        </div>
                        <p className="text-emerald-400 text-xs mt-1 pl-4">
                          ✓ nestjs-api:3000   [RUNNING] (healthy)<br />
                          ✓ redis-cache:6379  [RUNNING] (healthy)<br />
                          ✓ postgres-db:5432  [RUNNING] (healthy)
                        </p>
                      </div>

                      {/* Visual Animated Build Progress */}
                      <div className="pl-4 pr-2 py-2 bg-black/40 rounded border border-white/5">
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                          <span>VPS Deployment Pipeline</span>
                          <span className="text-primary font-semibold">100% Deployed</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full bg-gradient-to-r from-primary to-emerald-400"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary">$</span>
                          <span className="text-white font-medium">ssh root@production-vps &quot;pm2 status&quot;</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 pl-4">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                          <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                            PRODUCTION VPS: ONLINE (0 DOWNTIME • NGINX + SSL)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center pt-1">
                        <span className="text-primary mr-2">$</span>
                        <span className="text-white">curl -I https://api.nazmul.dev/health</span>
                        <span className="text-emerald-400 ml-2">200 OK</span>
                        <span className="w-2 h-4 bg-primary ml-2 animate-pulse"></span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'telemetry' && (
                    <motion.div
                      key="telemetry"
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-3 text-zinc-300"
                    >
                      <div className="space-y-1">
                        <p className="text-zinc-500">// live-telemetry.json</p>
                        <p>&#123;</p>
                        <p className="pl-4"><span className="text-purple-400">&quot;backend&quot;</span>: <span className="text-emerald-300">&quot;NestJS & Node.js REST APIs&quot;</span>,</p>
                        <p className="pl-4"><span className="text-purple-400">&quot;caching&quot;</span>: <span className="text-primary">&quot;Redis 7.x (Sub-millisecond)&quot;</span>,</p>
                        <p className="pl-4"><span className="text-purple-400">&quot;containers&quot;</span>: <span className="text-primary">&quot;Docker & Compose&quot;</span>,</p>
                        <p className="pl-4"><span className="text-purple-400">&quot;deployment&quot;</span>: <span className="text-emerald-300">&quot;Production Linux VPS (Nginx / SSL)&quot;</span>,</p>
                        <p className="pl-4"><span className="text-purple-400">&quot;uptime&quot;</span>: <span className="text-primary">&quot;99.98%&quot;</span>,</p>
                        <p className="pl-4"><span className="text-purple-400">&quot;phone&quot;</span>: <span className="text-amber-300">&quot;+8801619863535&quot;</span></p>
                        <p>&#125;</p>
                      </div>

                      {/* Visual Live SVG Telemetry Waveform */}
                      <div className="p-3 rounded-lg bg-black/50 border border-white/5 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[11px] font-mono text-zinc-300">Production VPS Edge Health</span>
                          </div>
                          <span className="text-[10px] font-mono text-primary font-bold">24ms Latency</span>
                        </div>
                        
                        <svg viewBox="0 0 300 45" className="w-full h-11 overflow-visible">
                          <defs>
                            <linearGradient id="waveGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ccff00" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#ccff00" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <motion.path
                            d="M0,28 Q30,12 60,25 T120,18 T180,32 T240,15 T300,24 L300,45 L0,45 Z"
                            fill="url(#waveGlow)"
                            animate={{
                              d: [
                                "M0,28 Q30,12 60,25 T120,18 T180,32 T240,15 T300,24 L300,45 L0,45 Z",
                                "M0,22 Q30,30 60,16 T120,28 T180,18 T240,28 T300,16 L300,45 L0,45 Z",
                                "M0,28 Q30,12 60,25 T120,18 T180,32 T240,15 T300,24 L300,45 L0,45 Z"
                              ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M0,28 Q30,12 60,25 T120,18 T180,32 T240,15 T300,24"
                            fill="none"
                            stroke="#ccff00"
                            strokeWidth="2"
                            strokeLinecap="round"
                            animate={{
                              d: [
                                "M0,28 Q30,12 60,25 T120,18 T180,32 T240,15 T300,24",
                                "M0,22 Q30,30 60,16 T120,28 T180,18 T240,28 T300,16",
                                "M0,28 Q30,12 60,25 T120,18 T180,32 T240,15 T300,24"
                              ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </svg>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>


                {/* Footer Micro-Telemetry Bar inside card */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    <span className="text-zinc-400">Node.js v22 • Next.js 15</span>
                  </div>
                  <span className="font-mono text-zinc-400">TypeScript 5.x</span>
                </div>
              </div>
            </div>

            {/* Floating Visual Micro-Badge: Engineering Mode with subtle floating bob */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-3 sm:-left-5 bg-[#121214]/90 border border-white/15 backdrop-blur-xl px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <div>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Engineering Mode</p>
                <p className="text-xs font-mono font-semibold text-white">Full-Stack Architecture</p>
              </div>
            </motion.div>

            {/* Floating Tech Pill top-right with floating bob */}
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="hidden sm:flex absolute -top-3 -right-3 bg-[#121214]/90 border border-white/15 backdrop-blur-xl px-3 py-1.5 rounded-full shadow-xl items-center gap-1.5 text-[10px] font-mono text-zinc-300"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              <span>Production Ready</span>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;