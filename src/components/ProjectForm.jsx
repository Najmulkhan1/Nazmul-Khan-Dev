'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { saveProject } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProjectForm({ projectData }) {
  const router = useRouter();
  const isEditing = !!projectData;
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;
      const formData = new FormData(form);
      
      // We append standard IDs
      if (isEditing) {
        formData.append('_id', projectData._id);
      }

      // Append state files manually instead of native input
      formData.delete('images'); // Ensure native 'name=' doesn't conflict
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });
      
      await saveProject(formData);
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('Failed to save project. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-background-dark p-6 border border-primary/20 font-mono">
      <div className="space-y-4">
        <div>
          <Label className="text-text-primary">URL ID (optional, auto-generated if empty)</Label>
          <Input name="id" defaultValue={projectData?.id} className="bg-background-light border-primary/30 mt-1" />
        </div>
        <div>
          <Label className="text-text-primary">Title *</Label>
          <Input name="title" required defaultValue={projectData?.title} className="bg-background-light border-primary/30 mt-1" />
        </div>

        <div className="border border-primary/30 p-4 rounded-sm bg-background">
          <Label className="text-text-primary mb-2 block">Project Images</Label>
          
          {/* Legacy images currently in DB */}
          {isEditing && projectData?.images?.length > 0 && (
            <div className="mb-4 text-xs text-text-muted">
              <p>Previously Uploaded ({projectData.images.length}):</p>
              <div className="flex flex-wrap gap-2 mt-2">
                 {projectData.images.map((img, idx) => (
                    <img key={idx} src={img} className="h-16 w-16 object-cover border border-primary/50" />
                 ))}
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <input 
                 ref={fileInputRef}
                 type="file" 
                 multiple 
                 accept="image/*" 
                 onChange={handleFileChange}
                 className="hidden" 
               />
               <Button 
                 type="button" 
                 onClick={() => fileInputRef.current?.click()}
                 className="bg-background-light border border-primary hover:bg-primary/20 text-primary border-dashed font-mono"
               >
                 + Browse Database Images...
               </Button>
            </div>

            {/* Live New Selected Previews */}
            {selectedFiles.length > 0 && (
              <div className="mt-4 border-t border-primary/20 pt-4">
                 <p className="text-xs text-text-muted mb-2">New Images to Upload ({selectedFiles.length}):</p>
                 <div className="flex flex-wrap gap-4">
                    {selectedFiles.map((file, idx) => (
                      <div key={idx} className="relative group">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="preview" 
                          className="h-24 w-24 object-cover border-2 border-primary/50"
                        />
                        <button 
                           type="button"
                           onClick={() => removeFile(idx)}
                           className="absolute -top-2 -right-2 bg-red-900 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <Label className="text-text-primary">Description *</Label>
          <textarea 
            name="description" 
            required 
            defaultValue={projectData?.description} 
            className="w-full bg-background-light border-primary/30 mt-1 p-3 min-h-[100px] text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-md" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-text-primary">Live Link</Label>
            <Input name="liveLink" defaultValue={projectData?.liveLink} className="bg-background-light border-primary/30 mt-1" />
          </div>
          <div>
            <Label className="text-text-primary">GitHub Link</Label>
            <Input name="githubLink" defaultValue={projectData?.githubLink} className="bg-background-light border-primary/30 mt-1" />
          </div>
        </div>

        <div>
          <Label className="text-text-primary">Video Embed URLs (comma separated YouTube/Drive links)</Label>
          <Input name="videos" defaultValue={projectData?.videos?.join(', ')} className="bg-background-light border-primary/30 mt-1" placeholder="https://youtube.com/watch?v=..., https://drive.google.com/..." />
        </div>

        <div>
          <Label className="text-text-primary">Technologies (comma separated)</Label>
          <Input name="technologies" defaultValue={projectData?.technologies?.join(', ')} className="bg-background-light border-primary/30 mt-1" />
        </div>
        <div>
          <Label className="text-text-primary">Challenges (one per line)</Label>
          <textarea 
            name="challenges" 
            defaultValue={projectData?.challenges?.join('\n')} 
            className="w-full bg-background-light border-primary/30 mt-1 p-3 min-h-[100px] text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-md" 
          />
        </div>
        <div>
          <Label className="text-text-primary">Improvements (one per line)</Label>
          <textarea 
            name="improvements" 
            defaultValue={projectData?.improvements?.join('\n')} 
            className="w-full bg-background-light border-primary/30 mt-1 p-3 min-h-[100px] text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-md" 
          />
        </div>
      </div>
      
      <Button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold font-mono">
        {loading ? '[ UPLOADING & SAVING... ]' : (isEditing ? '[ UPDATE DATA ]' : '[ SAVE RECORD ]')}
      </Button>
    </form>
  );
}
