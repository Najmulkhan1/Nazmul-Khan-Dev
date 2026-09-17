import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { getYoutubeEmbedUrl, getDriveEmbedUrl } from '@/lib/utils';
import ImageSlider from '@/components/ImageSlider';
import { ArrowLeft, ExternalLink, Github, Sparkles, CheckCircle, Lightbulb, Code2 } from 'lucide-react';
import { fallbackProjects } from '../page';

export default async function ProjectDetails({ params }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  
  let project = null;

  try {
    await dbConnect();
    // Try finding by id or by mongodb _id
    project = await Project.findOne({ 
      $or: [{ id: decodedId }, { _id: decodedId.match(/^[0-9a-fA-F]{24}$/) ? decodedId : null }] 
    }).lean();
  } catch (err) {
    console.error('Error fetching project by id:', err);
  }

  // If not found in DB, check fallback projects
  if (!project) {
    const fallback = fallbackProjects.find((p) => p.id === decodedId);
    if (fallback) {
      project = {
        ...fallback,
        technologies: fallback.tags,
        challenges: [
          'Designing an optimized database schema to handle high-frequency data changes.',
          'Implementing seamless authentication with token refresh mechanisms.',
          'Ensuring responsive UX and sub-second page loads across mobile and desktop devices.'
        ],
        improvements: [
          'Integrate automated end-to-end testing with Playwright.',
          'Add AI-driven recommendations to enhance user personalization.',
          'Deploy Redis caching layer for heavy read queries.'
        ]
      };
    }
  }

  if (!project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-32">
        <div className="w-16 h-16 rounded-2xl glass-panel border border-primary/30 flex items-center justify-center text-primary mb-6">
          <Code2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Project Not Found</h2>
        <p className="text-text-muted text-sm max-w-md mb-8">
          The project you are looking for might have been removed or does not exist.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-background-dark bg-primary hover:bg-primary-light transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  const images = project.images || [];
  if (!images.length && project.image) images.push(project.image);
  const videos = project.videos || [];

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
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    });
  }

  return (
    <section className="py-12 sm:py-20 w-full">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Visual Media & Action Links */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl">
            <ImageSlider media={mediaList} title={project.title} />
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-background-dark bg-primary hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white glass-panel hover:border-primary/40 hover:text-primary transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: In-Depth Project Details */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[11px] font-mono text-emerald-400 mb-3 border border-primary/20">
              <Sparkles className="w-3 h-3" />
              <span>Full Stack Application</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-text-muted text-base leading-relaxed mt-4">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          {(project.technologies?.length > 0 || project.tags?.length > 0) && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <span>Technologies Used</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {(project.technologies || project.tags).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-emerald-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Challenges Faced */}
          {project.challenges?.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-accent" />
                <span>Key Engineering Challenges</span>
              </h3>
              <ul className="space-y-2.5 pt-1">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="text-xs sm:text-sm text-text-muted flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent mt-2 shrink-0" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Future Improvements */}
          {project.improvements?.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Future Roadmaps</span>
              </h3>
              <ul className="space-y-2.5 pt-1">
                {project.improvements.map((improvement, i) => (
                  <li key={i} className="text-xs sm:text-sm text-text-muted flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
