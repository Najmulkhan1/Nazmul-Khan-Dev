import ProjectForm from '@/components/ProjectForm';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export default async function EditProjectPage({ params }) {
  await dbConnect();
  
  const { id } = await params;
  const project = await Project.findById(id).lean();

  if (!project) {
    return <div className="text-red-500 font-mono">Project not found</div>;
  }

  // Serialize Document
  const serializedProject = {
    ...project,
    _id: project._id.toString()
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-primary/20 pb-4">
        <Link href="/admin" className="text-text-muted hover:text-primary font-mono text-sm leading-none">
          &larr; Back
        </Link>
        <h2 className="text-xl font-bold font-mono text-text-primary">Edit Project: {serializedProject.title}</h2>
      </div>
      <ProjectForm projectData={serializedProject} />
    </div>
  );
}
