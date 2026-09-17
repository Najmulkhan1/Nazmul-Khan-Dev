'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

const Hero = () => {
  // Stagger animation container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden border-b border-white/5">
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center z-10">
        
        {/* Left: Typography & CTAs */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 flex flex-col items-start"
        >
          <motion.div variants={item} className="mb-8 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-text-muted">Digital Engineer / Product Builder</span>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-6xl sm:text-8xl xl:text-[110px] font-bold text-white leading-[0.9] tracking-tighter mb-10 uppercase">
            Nazmul <br/>
            Khan<span className="text-primary">.</span>
          </motion.h1>

          <motion.p variants={item} className="font-sans text-base sm:text-lg text-text-muted max-w-lg leading-relaxed mb-12">
            A full-stack software engineer architecting modern digital products, scalable web applications, and premium interactive experiences.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto mb-20">
            <Link
              href="/#projects"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300"
            >
              Selected Works
              <ArrowDownRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
            </Link>

            <Link
              href="/#contact"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:border-white transition-colors duration-300"
            >
              Initiate Contact
            </Link>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 gap-x-16 gap-y-6 pt-8 border-t border-white/10 w-full sm:w-auto">
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-2">Location</p>
              <p className="text-sm font-sans font-medium text-white">Dhaka, Bangladesh</p>
            </div>
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-2">Core Stack</p>
              <p className="text-sm font-sans font-medium text-white">Next.js • Node.js • PostgreSQL</p>
            </div>
          </motion.div>

        </motion.div>

        {/* Right: Terminal Visual */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full mt-10 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[500px] relative group"
          >
            {/* Terminal Glow */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            {/* Terminal Window */}
            <div className="relative w-full rounded-none border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors duration-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-yellow-500 transition-colors duration-500 delay-75"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-green-500 transition-colors duration-500 delay-150"></div>
                </div>
                <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest">nazmul@dev-machine:~</div>
              </div>

              {/* Terminal Body */}
              <div className="p-8 font-mono text-xs sm:text-sm leading-relaxed text-text-muted space-y-5">
                <div>
                  <span className="text-primary">$</span> <span className="text-white">whoami</span>
                  <br />
                  <span className="text-text-muted/80">Nazmul Khan</span>
                </div>
                
                <div>
                  <span className="text-primary">$</span> <span className="text-white">role</span>
                  <br />
                  <span className="text-text-muted/80">Full-Stack Software Engineer</span>
                </div>

                <div>
                  <span className="text-primary">$</span> <span className="text-white">core_stack</span>
                  <br />
                  <span className="text-text-muted/80">[&quot;Next.js&quot;, &quot;Node.js&quot;, &quot;PostgreSQL&quot;]</span>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-primary">$</span>
                    <span className="text-white">systemctl status</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-primary text-[10px] uppercase tracking-widest">Engineering Mode: Active</span>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center">
                  <span className="text-primary mr-2">_</span>
                  <span className="w-2 h-4 bg-white animate-pulse"></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;