'use client';

import Link from 'next/link';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { getYoutubeEmbedUrl, getDriveEmbedUrl } from '@/lib/utils';
import ImageSlider from '@/components/ImageSlider';

const ProjectCard = ({ id, title, description, images = [], videos = [], tags = [], liveLink, githubLink }) => {
  const mediaList = [
    ...videos.map((v) => {
      const ytUrl = getYoutubeEmbedUrl(v);
      const driveUrl = getDriveEmbedUrl(v);
      return { type: 'video', url: ytUrl || driveUrl || v };
    }),
    ...images.map((img) => ({ type: 'image', url: img })),
  ];

  if (mediaList.length === 0) {
    mediaList.push({
      type: 'image',
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    });
  }

  return (
    <div className="flex flex-col h-full rounded-2xl glass-panel border border-white/10 overflow-hidden hover:border-primary/50 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.25)] hover:-translate-y-1.5 transition-all duration-300 group">
      {/* Media Slider Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-950 border-b border-white/10">
        <ImageSlider media={mediaList} title={title} />
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Description */}
          <p className="text-text-muted text-sm leading-relaxed mt-2.5 line-clamp-3">
            {description}
          </p>

          {/* Tech Stack Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="text-[11px] font-mono font-medium bg-white/[0.04] text-emerald-400/90 px-2.5 py-0.5 rounded-md border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
          <Link
            href={`/projects/${id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary hover:text-primary transition-colors group/link"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Code"
                className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-text-muted hover:text-white hover:border-white/30 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-background-dark bg-primary hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <span>Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
