import ProjectForm from '@/components/ProjectForm';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NewProjectPage() {
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
            <h2 className="text-xl font-display font-bold text-white">Create New Case Study</h2>
            <p className="text-xs text-zinc-400">Publish a new engineering project to your portfolio</p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          Production Record
        </span>
      </div>

      <ProjectForm />
    </div>
  );
}

