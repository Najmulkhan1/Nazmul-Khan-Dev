'use client';

import Link from 'next/link';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { getYoutubeEmbedUrl, getDriveEmbedUrl } from '@/lib/utils';
import ImageSlider from '@/components/ImageSlider';

const ProjectCard = ({ id, title, description, images = [], videos = [], tags = [], liveLink, githubLink, index }) => {
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

  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center group`}>
      {/* Media Container */}
      <div className="w-full lg:w-3/5 aspect-video bg-background-card border border-white/10 p-2 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="relative w-full h-full overflow-hidden">
          <ImageSlider media={mediaList} title={title} />
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full lg:w-2/5 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono text-primary border border-primary/30 bg-primary/10 px-2 py-0.5">
            0{index + 1}
          </span>
          <span className="w-12 h-[1px] bg-white/20"></span>
        </div>

        <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tight">
          {title}
        </h3>

        <p className="text-sm font-sans text-text-muted leading-relaxed mb-8">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-sans uppercase tracking-widest text-text-muted border border-white/10 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6 mt-auto pt-6 border-t border-white/10">
          <Link
            href={`/projects/${id}`}
            className="group/btn flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors"
          >
            Case Study
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Source"
                className="text-text-muted hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Live Site"
                className="text-text-muted hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
