import ProjectForm from '@/components/ProjectForm';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { ArrowLeft, Edit3 } from 'lucide-react';

export default async function EditProjectPage({ params }) {
  let project = null;

  try {
    await dbConnect();
    const { id } = await params;
    project = await Project.findById(id).lean();
  } catch (err) {
    console.error('Error loading project for edit:', err);
  }

  if (!project) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-red-400 font-mono text-sm">Project not found or database unreachable</p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-primary"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  // Serialize Document
  const serializedProject = {
    ...project,
    _id: project._id.toString()
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-primary hover:border-primary/40 transition-all"
            title="Back to Catalog"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl font-display font-bold text-white">Edit Case Study</h2>
            <p className="text-xs text-zinc-400 font-mono">{serializedProject.title}</p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
          <Edit3 className="w-3.5 h-3.5" />
          Editing Mode
        </span>
      </div>

      <ProjectForm projectData={serializedProject} />
    </div>
  );
}

