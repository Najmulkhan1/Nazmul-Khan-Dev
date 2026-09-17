'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  X, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Layers, 
  LayoutGrid, 
  List, 
  Terminal, 
  ArrowRight,
  Filter,
  ShoppingBag,
  Radio,
  BarChart3,
  Code2,
  SlidersHorizontal,
  RotateCcw,
  Lock,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'All', label: 'All Projects', icon: Layers },
  { id: 'Full-Stack', label: 'Full-Stack Systems', icon: Code2 },
  { id: 'E-Commerce', label: 'E-Commerce & Stores', icon: ShoppingBag },
  { id: 'Real-Time', label: 'Real-Time & Chat', icon: Radio },
  { id: 'Analytics', label: 'Analytics & Dashboards', icon: BarChart3 }
];

const POPULAR_TECHS = [
  'Next.js',
  'React',
  'Node.js',
  'MongoDB',
  'Stripe',
  'Socket.IO',
  'Docker',
  'Tailwind CSS',
  'Express'
];

function projectMatchesCategory(project, catId) {
  if (catId === 'All') return true;
  const projectCat = (project.category || '').toLowerCase();
  const tagsStr = (project.tags || project.technologies || []).join(' ').toLowerCase();
  const titleAndDesc = `${project.title || ''} ${project.description || ''}`.toLowerCase();

  if (catId === 'E-Commerce') {
    return (
      tagsStr.includes('stripe') ||
      tagsStr.includes('e-commerce') ||
      titleAndDesc.includes('commerce') ||
      titleAndDesc.includes('store') ||
      titleAndDesc.includes('shop') ||
      projectCat.includes('commerce')
    );
  }
  if (catId === 'Real-Time') {
    return (
      tagsStr.includes('socket') ||
      titleAndDesc.includes('realtime') ||
      titleAndDesc.includes('real-time') ||
      titleAndDesc.includes('chat') ||
      projectCat.includes('real-time')
    );
  }
  if (catId === 'Analytics') {
    return (
      tagsStr.includes('analytics') ||
      tagsStr.includes('recharts') ||
      titleAndDesc.includes('analytics') ||
      titleAndDesc.includes('metrics') ||
      projectCat.includes('analytics')
    );
  }
  if (catId === 'Full-Stack') {
    return (
      projectCat.includes('full-stack') ||
      tagsStr.includes('node') ||
      tagsStr.includes('mongodb') ||
      tagsStr.includes('react') ||
      tagsStr.includes('express')
    );
  }
  return true;
}

export default function ProjectsExplorer({ initialProjects = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // 4 projects per page for crisp presentation

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTech, itemsPerPage]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: initialProjects.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'All') {
        counts[cat.id] = initialProjects.filter((p) =>
          projectMatchesCategory(p, cat.id)
        ).length;
      }
    });
    return counts;
  }, [initialProjects]);

  // Compute tech counts
  const techCounts = useMemo(() => {
    const counts = {};
    POPULAR_TECHS.forEach((tech) => {
      const q = tech.toLowerCase();
      counts[tech] = initialProjects.filter((p) =>
        (p.tags || p.technologies || []).some((t) =>
          t.toLowerCase().includes(q)
        )
      ).length;
    });
    return counts;
  }, [initialProjects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // 1. Search filter
      const q = searchTerm.toLowerCase().trim();
      const titleMatch = project.title?.toLowerCase().includes(q);
      const descMatch = project.description?.toLowerCase().includes(q);
      const techMatch = (project.tags || project.technologies || []).some((t) =>
        t.toLowerCase().includes(q)
      );
      const matchesSearch = !q || titleMatch || descMatch || techMatch;

      // 2. Category filter
      const matchesCategory = projectMatchesCategory(project, selectedCategory);

      // 3. Tech Chip Filter
      let matchesTech = true;
      if (selectedTech) {
        const tSearch = selectedTech.toLowerCase();
        matchesTech = (project.tags || project.technologies || []).some((t) =>
          t.toLowerCase().includes(tSearch)
        );
      }

      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [initialProjects, searchTerm, selectedCategory, selectedTech]);

  // Pagination Calculations
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProjects.length);

  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, startIndex, itemsPerPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const target = document.getElementById('project-catalog-feed');
      if (target) {
        const topOffset = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
  };

  // Generate page numbers with ellipsis
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

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTech(null);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm !== '' || selectedCategory !== 'All' || selectedTech !== null;

  return (
    <div className="w-full space-y-10">
      {/* Mobile Top Controls (visible on < lg screens) */}
      <div className="lg:hidden space-y-3">
        {/* Mobile Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects, keywords, technologies..."
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#101012] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-sm text-white placeholder:text-zinc-500 transition-all outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter & View Toggle Bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#101012] border border-white/10 text-xs font-mono text-zinc-200"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
              <span>Filters & Categories</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
            {isMobileFilterOpen ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {/* Grid / List Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#101012] border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs ${
                viewMode === 'grid'
                  ? 'bg-primary text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs ${
                viewMode === 'list'
                  ? 'bg-primary text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left Sidebar + Right Catalog */}
      <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-10 w-full">
        
        {/* ======================================================== */}
        {/* LEFT SIDEBAR: Search & Filters                           */}
        {/* ======================================================== */}
        <aside
          className={`w-full lg:w-80 xl:w-[340px] shrink-0 lg:sticky lg:top-28 z-20 ${
            isMobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="p-6 sm:p-7 rounded-3xl bg-[#101012]/95 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Sidebar Title & Reset Action */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Filters & Search
                  </h2>
                  <p className="text-[10px] font-mono text-zinc-500">
                    {initialProjects.length} Production Systems
                  </p>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-mono text-primary hover:text-primary-light flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20"
                  title="Reset all active filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Desktop Search Input (hidden on mobile since top search exists) */}
            <div className="hidden lg:block space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Search className="w-3 h-3 text-primary" />
                  Search Projects
                </span>
                {searchTerm && (
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {filteredProjects.length} found
                  </span>
                )}
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Keywords, stack, title..."
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 text-xs text-white placeholder:text-zinc-600 transition-all outline-none font-sans"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Navigation */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Filter className="w-3 h-3 text-primary" />
                  Domain Category
                </span>
                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-[10px] font-mono text-primary hover:underline"
                  >
                    All
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const count = categoryCounts[cat.id] || 0;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        if (window.innerWidth < 1024) setIsMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 group ${
                        isSelected
                          ? 'bg-primary text-black font-bold shadow-[0_0_15px_rgba(204,255,0,0.25)] scale-[1.01]'
                          : 'text-zinc-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isSelected
                              ? 'text-black'
                              : 'text-zinc-400 group-hover:text-primary transition-colors'
                          }`}
                        />
                        <span className="truncate">{cat.label}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                          isSelected
                            ? 'bg-black/20 text-black font-extrabold'
                            : 'bg-white/5 text-zinc-400 border border-white/5'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Tech Stack Chips */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Tech Stack
                </span>
                {selectedTech && (
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="text-[10px] font-mono text-primary hover:underline"
                  >
                    Clear Tech
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {POPULAR_TECHS.map((tech) => {
                  const isSelected = selectedTech === tech;
                  const count = techCounts[tech] || 0;
                  return (
                    <button
                      key={tech}
                      onClick={() => {
                        setSelectedTech(isSelected ? null : tech);
                        if (window.innerWidth < 1024) setIsMobileFilterOpen(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)] scale-[1.03]'
                          : 'bg-white/[0.02] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-black' : 'bg-primary/80'
                        }`}
                      />
                      <span>{tech}</span>
                      {count > 0 && (
                        <span
                          className={`text-[9px] opacity-70 ${
                            isSelected ? 'text-black' : 'text-zinc-500'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability & Hiring Widget */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 pt-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono font-semibold text-zinc-200">
                  Open for Engineering
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Full-stack web applications, scalable REST APIs & real-time architectures.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:underline pt-1 group"
              >
                <span>Let&apos;s Build Together</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>
        </aside>

        {/* ======================================================== */}
        {/* RIGHT MAIN AREA: Projects Feed & Controls                */}
        {/* ======================================================== */}
        <main id="project-catalog-feed" className="flex-1 min-w-0 w-full space-y-6">
          
          {/* Top Results & Active Filter Ribbon */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#101012]/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Left Status & Applied Filter Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 mr-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-zinc-300 font-medium">
                  Showing <span className="text-white font-bold">{filteredProjects.length > 0 ? startIndex + 1 : 0}–{endIndex}</span> of {filteredProjects.length} Projects
                </span>
              </div>

              {/* Active Filter Pills */}
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-all"
                  title="Remove category filter"
                >
                  <span>Category: {selectedCategory}</span>
                  <X className="w-3 h-3 text-primary" />
                </button>
              )}

              {selectedTech && (
                <button
                  onClick={() => setSelectedTech(null)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-mono text-primary hover:bg-primary/20 transition-all"
                  title="Remove tech filter"
                >
                  <span>Tech: {selectedTech}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400 hover:text-white transition-all"
                  title="Clear search keyword"
                >
                  <span>&ldquo;{searchTerm}&rdquo;</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Right Desktop Controls: Per-Page & Grid/List Switcher */}
            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              {/* Items Per Page Selector */}
              <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-black/40 px-2.5 py-1 rounded-xl border border-white/5">
                <span>Per Page:</span>
                {[4, 6, 8].map((num) => (
                  <button
                    key={num}
                    onClick={() => setItemsPerPage(num)}
                    className={`px-1.5 py-0.5 rounded transition-colors ${
                      itemsPerPage === num
                        ? 'text-primary font-bold bg-primary/10'
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* View Switcher */}
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10 shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                    viewMode === 'list'
                      ? 'bg-primary text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List</span>
                </button>
              </div>
            </div>

          </div>

          {/* Projects Rendering Area */}
          {filteredProjects.length === 0 ? (
            /* Empty State */
            <div className="p-16 text-center rounded-3xl bg-[#101012]/80 border border-white/10 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-500 mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-display font-bold text-white">
                  No Matching Systems Found
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                  We couldn&apos;t find any engineering projects matching your filter criteria. Try changing your search query or reset the filters.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-wider text-black bg-primary hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* 2-Column Responsive Bento Grid (Paginated) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <AnimatePresence mode="wait">
                {paginatedProjects.map((project, idx) => {
                  const globalIdx = startIndex + idx;
                  const thumbnail =
                    project.images?.[0] ||
                    project.image ||
                    'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop';
                  const techs = project.tags || project.technologies || [];
                  const slug = project.id;

                  return (
                    <motion.article
                      key={`${project.id}-page-${safeCurrentPage}`}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      className="rounded-3xl bg-[#101012]/90 border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col group hover:-translate-y-1.5 shadow-xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                    >
                      {/* Browser Mockup Visual Top Frame */}
                      <div className="relative aspect-[16/10] bg-black/80 overflow-hidden border-b border-white/10">
                        {/* Window Controls Top Bar */}
                        <div className="absolute top-0 inset-x-0 h-8 px-4 bg-[#0a0a0c]/85 backdrop-blur-md flex items-center justify-between border-b border-white/5 z-20">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 truncate max-w-[170px] bg-black/40 px-2 py-0.5 rounded border border-white/5">
                            <Lock className="w-2.5 h-2.5 text-zinc-500" />
                            <span className="truncate">{slug}.nazmul.dev</span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500">
                            0{globalIdx + 1}
                          </span>
                        </div>

                        {/* Screenshot Image with Hover Zoom */}
                        <Link
                          href={`/projects/${slug}`}
                          className="block w-full h-full pt-8 relative group/img"
                        >
                          <img
                            src={thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        </Link>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 pointer-events-none z-10">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-bold text-xs font-sans uppercase tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                            <span>Read Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          {/* Category Badge & Live Pulse */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                              {project.category || 'Production System'}
                            </span>
                            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>2025 Architecture</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                            <Link href={`/projects/${slug}`}>
                              {project.title}
                            </Link>
                          </h3>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed font-sans">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack Pills & Actions */}
                        <div className="space-y-4 pt-2 border-t border-white/5">
                          <div className="flex flex-wrap gap-1.5">
                            {techs.slice(0, 4).map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/10"
                              >
                                {tech}
                              </span>
                            ))}
                            {techs.length > 4 && (
                              <span className="text-[11px] font-mono px-2 py-1 text-zinc-500">
                                +{techs.length - 4} more
                              </span>
                            )}
                          </div>

                          {/* Footer Action Links */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <Link
                              href={`/projects/${slug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:text-primary transition-colors"
                            >
                              <span>Case Study</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="flex items-center gap-2">
                              {project.liveLink && (
                                <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-primary hover:border-primary/40 transition-all"
                                  title="Live Application Demo"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {project.githubLink && (
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-all"
                                  title="GitHub Repository"
                                >
                                  <Github className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            /* Detailed List View (Paginated) */
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {paginatedProjects.map((project, idx) => {
                  const globalIdx = startIndex + idx;
                  const thumbnail =
                    project.images?.[0] ||
                    project.image ||
                    'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=400&auto=format&fit=crop';
                  const techs = project.tags || project.technologies || [];
                  const slug = project.id;

                  return (
                    <motion.article
                      key={`${project.id}-page-${safeCurrentPage}`}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.03 }}
                      className="p-5 sm:p-6 rounded-2xl bg-[#101012]/90 border border-white/10 hover:border-primary/40 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={thumbnail}
                          alt={project.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/10 bg-zinc-900 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-primary font-bold">
                              0{globalIdx + 1} //
                            </span>
                            <span className="text-[11px] font-mono text-zinc-400">
                              {project.category || 'Production'}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                            <Link href={`/projects/${slug}`}>
                              {project.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-zinc-400 line-clamp-1 max-w-xl font-sans">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap md:flex-col lg:flex-row items-start md:items-end lg:items-center gap-4 shrink-0">
                        <div className="flex flex-wrap gap-1.5 max-w-md">
                          {techs.slice(0, 4).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/projects/${slug}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-black font-bold text-xs font-sans uppercase tracking-wider hover:bg-primary-light transition-all shadow-[0_0_10px_rgba(204,255,0,0.2)]"
                          >
                            <span>Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white transition-colors"
                              title="Live Application Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white transition-colors"
                              title="GitHub Repository"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* ======================================================== */}
          {/* PAGINATION CONTROLS BAR                                  */}
          {/* ======================================================== */}
          {totalPages > 1 && (
            <div className="pt-4">
              <nav
                aria-label="Projects pagination"
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#101012]/90 border border-white/10 backdrop-blur-xl shadow-xl"
              >
                {/* Left Indicator Info */}
                <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                  <span>
                    Page <strong className="text-primary">{safeCurrentPage}</strong> of{' '}
                    <strong className="text-white">{totalPages}</strong>
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span>
                    Showing {startIndex + 1}–{endIndex} of {filteredProjects.length}
                  </span>
                </div>

                {/* Right Pagination Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(safeCurrentPage - 1)}
                    disabled={safeCurrentPage === 1}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  {/* Numbered Page Buttons */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {pageNumbers.map((p, idx) => {
                      if (p === '...') {
                        return (
                          <span
                            key={`dots-${idx}`}
                            className="w-8 h-8 flex items-center justify-center text-xs font-mono text-zinc-600"
                          >
                            ...
                          </span>
                        );
                      }
                      const isActive = p === safeCurrentPage;
                      return (
                        <button
                          key={p}
                          onClick={() => goToPage(p)}
                          className={`w-9 h-9 rounded-xl text-xs font-mono font-medium transition-all flex items-center justify-center cursor-pointer ${
                            isActive
                              ? 'bg-primary text-black font-bold shadow-[0_0_15px_rgba(204,255,0,0.35)] scale-105 border border-primary'
                              : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(safeCurrentPage + 1)}
                    disabled={safeCurrentPage === totalPages}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                    title="Next Page"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            </div>
          )}

          {/* Bottom Full-Width CTA Banner */}
          <div className="pt-10 border-t border-white/10">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-white/[0.02] to-transparent border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Full-Stack Engineering & Cloud Architecture</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                  Have a custom platform in mind?
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                  From scalable MongoDB schemas to high-frequency WebSocket engines and clean UI systems, I build production-ready digital experiences.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] shrink-0"
              >
                <span>Let&apos;s Build Together</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
