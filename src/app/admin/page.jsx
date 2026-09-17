import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { deleteProject } from '@/app/actions';
import ToggleFeaturedButton from '@/components/ToggleFeaturedButton';
import {
  Plus,
  Edit3,
  Trash2,
  FolderGit2,
  ExternalLink,
  Database,
  Layers,
  Sparkles,
  Star,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  let serializedProjects = [];
  let dbError = null;

  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    serializedProjects = projects.map((p) => ({
      ...p,
      _id: p._id.toString(),
      featured: p.featured ?? false,
    }));
  } catch (err) {
    console.error('Database connection error in AdminPage:', err);
    dbError = err.message || 'Database connection error';
  }

  const featuredProjects = serializedProjects.filter((p) => p.featured);
  const featuredCount = featuredProjects.length;

  return (
    <div className="space-y-8">
      {/* Database Warning if any */}
      {dbError && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs leading-relaxed">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-200">Database Connection Notice</p>
            <p className="text-amber-300/80 mt-0.5">{dbError}</p>
          </div>
        </div>
      )}

      {/* Top Metrics Cards (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Records */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Total Catalog
            </span>
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-display text-white">
            {serializedProjects.length}
          </p>
          <p className="text-[11px] font-mono text-zinc-500">
            {serializedProjects.length === 1 ? '1 project in database' : `${serializedProjects.length} projects stored`}
          </p>
        </div>

        {/* Selected Portfolio Control Status */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Selected Portfolio
            </span>
            <Star className="w-4 h-4 fill-primary text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl sm:text-3xl font-bold font-display text-white">
              {featuredCount} <span className="text-base text-zinc-500 font-normal">/ 3</span>
            </p>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
              featuredCount === 3
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-primary/10 text-primary border border-primary/20'
            }`}>
              {featuredCount === 3 ? 'Target Reached' : `${featuredCount} Active`}
            </span>
          </div>
          <p className="text-[11px] font-mono text-zinc-400">
            Displayed on Homepage
          </p>
        </div>

        {/* Database Engine */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Database Engine
            </span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dbError ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
            <p className="text-base sm:text-lg font-bold text-white">
              {dbError ? 'Connection Issue' : 'MongoDB Atlas'}
            </p>
          </div>
          <p className="text-[11px] font-mono text-zinc-500 truncate">
            {dbError ? 'Verify credentials' : 'Live Sharded Cluster Connected'}
          </p>
        </div>

        {/* Quick Action: New Project */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Quick Action
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold font-sans uppercase tracking-wider text-black bg-primary hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(204,255,0,0.25)] hover:scale-[1.01] active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </Link>
        </div>
      </div>

      {/* Catalog Header & Info Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-display text-white tracking-wide flex items-center gap-2">
            <span>Project Catalog & Homepage Controls</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Toggle the <strong className="text-primary">&ldquo;Selected (Homepage)&rdquo;</strong> button on any project to control which 3 systems appear in the Selected Portfolio on your landing page.
          </p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] font-mono uppercase bg-white/[0.03] text-zinc-400 border-b border-white/10 tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Visual & Title</th>
                <th className="px-6 py-4 font-semibold">Slug Identifier</th>
                <th className="px-6 py-4 font-semibold">Stack Technologies</th>
                <th className="px-6 py-4 font-semibold text-center">Selected Portfolio (Homepage)</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {serializedProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-zinc-400 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500 mx-auto">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-white">No projects found in database</p>
                      <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                        Get started by adding your first showcase application or case study.
                      </p>
                    </div>
                    <Link
                      href="/admin/projects/new"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-primary hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add First Project</span>
                    </Link>
                  </td>
                </tr>
              ) : (
                serializedProjects.map((project) => {
                  const thumbnail =
                    project.images?.[0] ||
                    project.image ||
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop';
                  const slug = project.id || project._id;
                  const techs = project.technologies || project.tags || [];

                  return (
                    <tr
                      key={project._id}
                      className={`hover:bg-white/[0.02] transition-colors group ${
                        project.featured ? 'bg-primary/[0.02]' : ''
                      }`}
                    >
                      {/* Visual & Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={thumbnail}
                            alt={project.title}
                            className="w-12 h-12 rounded-xl object-cover border border-white/10 bg-zinc-900 shrink-0"
                          />
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              {project.featured && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                                  ★ Homepage
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1 max-w-xs sm:max-w-md">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-6 py-4 font-mono text-xs text-zinc-400">
                        <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/5">
                          {slug}
                        </span>
                      </td>

                      {/* Tech Stack */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {techs.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                          {techs.length > 3 && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-500">
                              +{techs.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Selected Portfolio Control Column */}
                      <td className="px-6 py-4 text-center">
                        <ToggleFeaturedButton
                          projectId={project._id}
                          initialFeatured={project.featured}
                        />
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/projects/${slug}`}
                            target="_blank"
                            title="Preview Live Case Study"
                            className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={`/admin/projects/${project._id}/edit`}
                            title="Edit Project"
                            className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-primary hover:border-primary/40 transition-all"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Link>

                          <form
                            action={async () => {
                              'use server';
                              await deleteProject(project._id);
                            }}
                            className="inline"
                          >
                            <button
                              type="submit"
                              title="Delete Record"
                              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
