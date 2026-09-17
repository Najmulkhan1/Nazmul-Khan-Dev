import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { deleteProject } from '@/app/actions';
import { Plus, Edit3, Trash2, FolderGit2, ExternalLink } from 'lucide-react';

export default async function AdminPage() {
  await dbConnect();
  
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  
  const serializedProjects = projects.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Project Catalog</h2>
          <p className="text-xs text-text-muted">Total {serializedProjects.length} projects in database</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-background-dark bg-primary hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/[0.03] text-text-muted border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Slug / ID</th>
                <th className="px-6 py-4 font-semibold">Stack</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {serializedProjects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-text-muted">
                    <FolderGit2 className="w-10 h-10 mx-auto mb-2 text-text-muted/40" />
                    <p className="text-sm font-medium">No projects in database yet.</p>
                    <Link
                      href="/admin/projects/new"
                      className="text-xs text-primary hover:underline mt-1 inline-block"
                    >
                      Click here to create your first project
                    </Link>
                  </td>
                </tr>
              ) : (
                serializedProjects.map((project) => (
                  <tr key={project._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      {project.title}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-text-muted">
                      {project.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(project.technologies || []).slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-emerald-400 border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link
                        href={`/admin/projects/${project._id}/edit`}
                        className="inline-flex items-center gap-1 text-xs text-cyan-accent hover:text-cyan-300 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
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
                          className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
