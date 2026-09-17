'use client';

import { useState, useTransition } from 'react';
import { toggleFeaturedProject } from '@/app/actions';
import { Star, Sparkles, Check, Loader2 } from 'lucide-react';

export default function ToggleFeaturedButton({ projectId, initialFeatured = false }) {
  const [featured, setFeatured] = useState(initialFeatured);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    // Optimistic toggle
    const nextState = !featured;
    setFeatured(nextState);

    startTransition(async () => {
      try {
        await toggleFeaturedProject(projectId);
      } catch (err) {
        console.error('Failed to toggle featured status:', err);
        // Rollback on error
        setFeatured(!nextState);
        alert('Failed to update: ' + (err.message || 'Please verify authentication.'));
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      title={featured ? 'Click to remove from Selected Portfolio' : 'Click to feature in Selected Portfolio'}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
        featured
          ? 'bg-primary/15 border border-primary/40 text-primary shadow-[0_0_12px_rgba(204,255,0,0.2)] hover:bg-primary/25 hover:border-primary/60 scale-[1.02]'
          : 'bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06]'
      }`}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
      ) : featured ? (
        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
      ) : (
        <Star className="w-3.5 h-3.5 text-zinc-500" />
      )}
      <span className={featured ? 'font-bold' : 'font-normal'}>
        {featured ? 'Selected (Homepage)' : 'Not Selected'}
      </span>
    </button>
  );
}
