import ProjectForm from '@/components/ProjectForm';
import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-primary/20 pb-4">
        <Link href="/admin" className="text-text-muted hover:text-primary font-mono text-sm leading-none">
          &larr; Back
        </Link>
        <h2 className="text-xl font-bold font-mono text-text-primary">Create New Project</h2>
      </div>
      <ProjectForm />
    </div>
  );
}
