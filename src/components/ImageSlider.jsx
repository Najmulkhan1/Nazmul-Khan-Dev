'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageSlider({ media, title, liveLink }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media || media.length === 0) return null;

  const currentItem = media[currentIndex];
  
  // Clean domain display for the browser mockup address bar
  let displayDomain = 'project-preview.nazmul.dev';
  if (liveLink) {
    try {
      const url = new URL(liveLink);
      displayDomain = url.hostname + (url.pathname !== '/' ? url.pathname : '');
    } catch {
      displayDomain = liveLink.replace(/^https?:\/\//, '');
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  return (
    <div className="w-full relative group">
      {/* Ambient Glow */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-primary/15 via-emerald-500/10 to-transparent blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none rounded-2xl" />

      {/* Safari / Studio Browser Mockup Container */}
      <div className="relative w-full rounded-xl border border-white/15 bg-[#0a0a0c]/95 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/80">
        
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          {/* Traffic Light Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>

          {/* Browser Address Bar */}
          <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-black/50 border border-white/10 text-zinc-400 text-xs font-mono max-w-md w-full mx-4 justify-center">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate text-zinc-300">{displayDomain}</span>
          </div>

          {/* Controls / Slide Counter */}
          <div className="flex items-center gap-2">
            {media.length > 1 && (
              <span className="text-[11px] font-mono text-zinc-500 mr-1">
                {currentIndex + 1} / {media.length}
              </span>
            )}
            {liveLink && (
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Open live website"
                className="text-zinc-400 hover:text-white transition-colors p-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Media Frame Viewport */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black/80 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              {currentItem.type === 'video' ? (
                <iframe
                  src={currentItem.url}
                  className="w-full h-full pointer-events-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${title} - video preview`}
                />
              ) : (
                <img
                  src={currentItem.url}
                  alt={`${title} - visual ${currentIndex + 1}`}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows for Multi-Slide */}
          {media.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black transition-all shadow-lg backdrop-blur-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black transition-all shadow-lg backdrop-blur-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Multi-Slide Thumbnail Strip (if multiple) */}
        {media.length > 1 && (
          <div className="flex items-center justify-center gap-2 p-3 bg-white/[0.02] border-t border-white/10">
            {media.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-primary shadow-[0_0_8px_rgba(204,255,0,0.6)]' : 'w-2 bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

