import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { Button } from '@/components/ui/button';
import { deleteProject } from '@/app/actions';

export default async function AdminPage() {
  await dbConnect();
  
  // Need lean() to serialize mongoose documents for Client components.
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  
  // Convert _id to string for serialization
  const serializedProjects = projects.map(p => ({
    ...p,
    _id: p._id.toString()
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-mono text-text-primary">Manage Projects</h2>
        <Link href="/admin/projects/new">
          <Button className="bg-primary hover:bg-primary/90 text-background-dark font-mono font-bold">
            [ + New Project ]
          </Button>
        </Link>
      </div>

      <div className="border border-primary/20 bg-background-dark overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-background-light font-mono text-text-muted border-b border-primary/20">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">ID Name</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="font-mono text-text-primary">
            {serializedProjects.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-text-muted">No projects found. Add one!</td>
              </tr>
            ) : (
              serializedProjects.map((project) => (
                <tr key={project._id} className="border-b border-primary/10 hover:bg-background-light/50 transition-colors">
                  <td className="px-6 py-4 font-bold">{project.title}</td>
                  <td className="px-6 py-4 text-text-muted">{project.id}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link href={`/admin/projects/${project._id}/edit`} className="text-blue-400 hover:text-blue-300 hover:underline">
                      Edit
                    </Link>
                    <form action={async () => {
                      'use server';
                      await deleteProject(project._id);
                    }} className="inline">
                      <button type="submit" className="text-red-400 hover:text-red-300 hover:underline">
                        Delete
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
  );
}
