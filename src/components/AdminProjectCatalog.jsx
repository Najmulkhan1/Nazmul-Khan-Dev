'use client';

import { useState, useMemo, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { deleteProject } from '@/app/actions';
import ToggleFeaturedButton from '@/components/ToggleFeaturedButton';
import {
  Search,
  X,
  ExternalLink,
  Edit3,
  Trash2,
  FolderGit2,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  Plus
} from 'lucide-react';

export default function AdminProjectCatalog({ initialProjects = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'featured' | 'not-featured'
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, itemsPerPage]);

  // Status counts
  const totalCount = initialProjects.length;
  const featuredCount = initialProjects.filter((p) => p.featured).length;
  const notFeaturedCount = totalCount - featuredCount;

  // Filter projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      // 1. Search match
      const q = searchTerm.toLowerCase().trim();
      const titleMatch = p.title?.toLowerCase().includes(q);
      const descMatch = p.description?.toLowerCase().includes(q);
      const slugMatch = (p.id || p._id)?.toLowerCase().includes(q);
      const techMatch = (p.technologies || p.tags || []).some((t) =>
        t.toLowerCase().includes(q)
      );
      const matchesSearch = !q || titleMatch || descMatch || slugMatch || techMatch;

      // 2. Status match
      let matchesStatus = true;
      if (statusFilter === 'featured') {
        matchesStatus = !!p.featured;
      } else if (statusFilter === 'not-featured') {
        matchesStatus = !p.featured;
      }

      return matchesSearch && matchesStatus;
    });
  }, [initialProjects, searchTerm, statusFilter]);

  // Pagination calculations
  const perPage = itemsPerPage === 0 ? Math.max(filteredProjects.length, 1) : itemsPerPage;
  const totalPages = Math.ceil(filteredProjects.length / perPage) || 1;
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safeCurrentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredProjects.length);

  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, startIndex + perPage);
  }, [filteredProjects, startIndex, perPage]);

  // Handle Delete
  const handleDelete = (id, title) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      setDeletingId(id);
      startTransition(async () => {
        try {
          await deleteProject(id);
        } catch (err) {
          alert('Failed to delete project: ' + (err.message || 'Error occurred.'));
        } finally {
          setDeletingId(null);
        }
      });
    }
  };

  // Generate page numbers
  const pageNumbers = useMemo(() => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safeCurrentPage > 3) pages.push('...');
      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(totalPages - 1, safeCurrentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (safeCurrentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  }, [totalPages, safeCurrentPage]);

  return (
    <div className="space-y-4">
      {/* Search Bar & Filter Controls Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, slug, stack, keyword..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-xs text-white placeholder:text-zinc-500 transition-all outline-none font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Tabs & Per-Page Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                statusFilter === 'all'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>All</span>
              <span className="text-[10px] opacity-70">({totalCount})</span>
            </button>

            <button
              onClick={() => setStatusFilter('featured')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                statusFilter === 'featured'
                  ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>Selected</span>
              <span className="text-[10px] opacity-70">({featuredCount})</span>
            </button>

            <button
              onClick={() => setStatusFilter('not-featured')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                statusFilter === 'not-featured'
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Other</span>
              <span className="text-[10px] opacity-70">({notFeaturedCount})</span>
            </button>
          </div>

          {/* Items Per Page Selector */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-white/[0.03] px-2.5 py-1.5 rounded-xl border border-white/10">
            <span className="text-zinc-500">Per Page:</span>
            {[5, 10, 0].map((num) => (
              <button
                key={num}
                onClick={() => setItemsPerPage(num)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  itemsPerPage === num
                    ? 'text-primary font-bold bg-primary/10'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {num === 0 ? 'All' : num}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Projects Table Container */}
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
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-zinc-400 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500 mx-auto">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-white">No matching projects found</p>
                      <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                        {searchTerm
                          ? `No records found matching "${searchTerm}". Try adjusting your keywords or clearing filters.`
                          : 'No projects match your current category selection.'}
                      </p>
                    </div>
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('all');
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-primary hover:bg-primary-light transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Clear Filters</span>
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((project, idx) => {
                  const thumbnail =
                    project.images?.[0] ||
                    project.image ||
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop';
                  const slug = project.id || project._id;
                  const techs = project.technologies || project.tags || [];
                  const isDeleting = deletingId === project._id;

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
                          {techs.slice(0, 3).map((tech, tIdx) => (
                            <span
                              key={tIdx}
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

                          <button
                            type="button"
                            onClick={() => handleDelete(project._id, project.title)}
                            disabled={isDeleting}
                            title="Delete Project"
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all cursor-pointer disabled:opacity-40"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-zinc-400">
              Showing <span className="text-white font-bold">{startIndex + 1}–{endIndex}</span> of{' '}
              <span className="text-white font-bold">{filteredProjects.length}</span> projects{' '}
              <span className="text-zinc-600">•</span> Page{' '}
              <span className="text-primary font-bold">{safeCurrentPage}</span> of{' '}
              <span className="text-white">{totalPages}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={safeCurrentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {/* Number buttons */}
              {pageNumbers.map((page, pIdx) => {
                if (page === '...') {
                  return (
                    <span key={`dots-${pIdx}`} className="w-7 h-7 flex items-center justify-center text-xs font-mono text-zinc-600">
                      ...
                    </span>
                  );
                }
                const isActive = page === safeCurrentPage;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center cursor-pointer ${
                      isActive
                        ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                        : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={safeCurrentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
