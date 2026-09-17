'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { saveProject } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, X, Sparkles, Check, ArrowLeft, Image as ImageIcon, Video, Code, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

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
      
      // Append standard ID if editing
      if (isEditing) {
        formData.append('_id', projectData._id);
      }

      // Append state files manually
      formData.delete('images');
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });
      
      await saveProject(formData);
      router.push('/admin');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to save project: ' + (error.message || 'Please check console.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
        
        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Project Title *
            </Label>
            <Input
              name="title"
              required
              placeholder="e.g. OmniStore - Full-Stack E-Commerce"
              defaultValue={projectData?.title}
              className="bg-black/50 border-white/10 focus:border-primary text-white rounded-xl h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Slug / URL ID (optional)
            </Label>
            <Input
              name="id"
              placeholder="e.g. omni-store-ecommerce (auto-generated if empty)"
              defaultValue={projectData?.id}
              className="bg-black/50 border-white/10 focus:border-primary text-white font-mono text-xs rounded-xl h-11"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
            Overview / Description *
          </Label>
          <textarea
            name="description"
            required
            rows={3}
            placeholder="A production-grade application featuring secure checkout, real-time sync, and scalable architecture..."
            defaultValue={projectData?.description}
            className="w-full bg-black/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-all leading-relaxed"
          />
        </div>

        {/* Image Upload Zone */}
        <div className="space-y-3">
          <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center justify-between">
            <span>Project Screenshots / Media</span>
            <span className="text-[11px] font-mono text-zinc-500">Auto-hosted via ImgBB</span>
          </Label>

          {/* Legacy images currently in DB */}
          {isEditing && projectData?.images?.length > 0 && (
            <div className="space-y-2 p-3.5 rounded-xl bg-black/30 border border-white/5">
              <p className="text-[11px] font-mono text-zinc-400">
                Existing Images in Database ({projectData.images.length}):
              </p>
              <div className="flex flex-wrap gap-2.5">
                {projectData.images.map((img, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden border border-white/10">
                    <img src={img} alt="Current" className="h-16 w-24 object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dropzone trigger */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/15 hover:border-primary/50 bg-white/[0.01] hover:bg-white/[0.03] rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-zinc-400 group-hover:text-primary transition-colors">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium text-zinc-300">
              Click to select screenshots or drag and drop
            </p>
            <p className="text-[11px] font-mono text-zinc-500">
              Supports PNG, JPG, WebP (multiple files allowed)
            </p>
          </div>

          {/* New Selected Previews */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-mono text-primary">
                New Files Queued for Upload ({selectedFiles.length}):
              </p>
              <div className="flex flex-wrap gap-3">
                {selectedFiles.map((file, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-primary/30">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="h-20 w-28 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-red-600 text-white rounded-md transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Links: Live & GitHub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Live Application URL
            </Label>
            <Input
              name="liveLink"
              placeholder="https://your-app.com"
              defaultValue={projectData?.liveLink}
              className="bg-black/50 border-white/10 focus:border-primary text-white rounded-xl h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              GitHub Repository URL
            </Label>
            <Input
              name="githubLink"
              placeholder="https://github.com/Najmulkhan1/repo"
              defaultValue={projectData?.githubLink}
              className="bg-black/50 border-white/10 focus:border-primary text-white rounded-xl h-11"
            />
          </div>
        </div>

        {/* Video Embed URLs */}
        <div className="space-y-2">
          <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
            Video Embed URLs (YouTube or Google Drive, comma-separated)
          </Label>
          <Input
            name="videos"
            placeholder="https://youtube.com/watch?v=..., https://drive.google.com/..."
            defaultValue={projectData?.videos?.join(', ')}
            className="bg-black/50 border-white/10 focus:border-primary text-white rounded-xl h-11"
          />
        </div>

        {/* Technologies */}
        <div className="space-y-2">
          <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
            Technologies Used (comma-separated)
          </Label>
          <Input
            name="technologies"
            placeholder="Next.js, Node.js, Express, MongoDB, Redis, Docker, Tailwind CSS"
            defaultValue={projectData?.technologies?.join(', ')}
            className="bg-black/50 border-white/10 focus:border-primary text-white rounded-xl h-11 font-mono text-xs"
          />
        </div>

        {/* Challenges & Roadmap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Engineering Challenges (one per line)
            </Label>
            <textarea
              name="challenges"
              rows={4}
              placeholder="Designing optimized database schema for high-frequency reads&#10;Handling JWT refresh token rotation with CSRF protection"
              defaultValue={projectData?.challenges?.join('\n')}
              className="w-full bg-black/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 outline-none transition-all leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Future Roadmap (one per line)
            </Label>
            <textarea
              name="improvements"
              rows={4}
              placeholder="Deploy Redis caching layer for queries&#10;Integrate Playwright end-to-end automated testing"
              defaultValue={projectData?.improvements?.join('\n')}
              className="w-full bg-black/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 outline-none transition-all leading-relaxed"
            />
          </div>
        </div>

        {/* Selected Portfolio / Featured Toggle */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label htmlFor="featured" className="text-sm font-semibold text-white cursor-pointer flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Feature in Selected Portfolio (Homepage)</span>
            </Label>
            <p className="text-xs text-zinc-400">
              Display this application in the top 3 featured systems on the main landing page.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              value="true"
              defaultChecked={projectData?.featured ?? false}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:after:bg-black peer-checked:after:border-black"></div>
          </label>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <Button
            disabled={loading}
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold font-sans text-sm text-black bg-primary hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] cursor-pointer"
          >
            {loading ? 'UPLOADING & SAVING RECORD...' : (isEditing ? 'UPDATE CASE STUDY' : 'SAVE & PUBLISH PROJECT')}
          </Button>

          <Link
            href="/admin"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-xs text-zinc-400 hover:text-white bg-white/[0.02] border border-white/10 hover:border-white/20 text-center transition-all"
          >
            Cancel
          </Link>
        </div>

      </div>
    </form>
  );
}

