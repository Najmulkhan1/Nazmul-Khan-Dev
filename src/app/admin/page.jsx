import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Message from '@/models/Message';
import AdminProjectCatalog from '@/components/AdminProjectCatalog';
import {
  Plus,
  Database,
  Layers,
  Sparkles,
  Star,
  AlertTriangle,
  Mail,
  ArrowRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  let serializedProjects = [];
  let totalMessages = 0;
  let unreadMessages = 0;
  let dbError = null;

  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    serializedProjects = projects.map((p) => ({
      ...p,
      _id: p._id.toString(),
      featured: p.featured ?? false,
    }));

    totalMessages = await Message.countDocuments();
    unreadMessages = await Message.countDocuments({ read: false });
  } catch (err) {
    console.error('Database connection error in AdminPage:', err);
    dbError = err.message || 'Database connection error';
  }

  const featuredProjects = serializedProjects.filter((p) => p.featured);
  const featuredCount = featuredProjects.length;

  return (
    <div className="space-y-8">
      {/* Database Warning if any */}
      {dbError && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs leading-relaxed">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-200">Database Connection Notice</p>
            <p className="text-amber-300/80 mt-0.5">{dbError}</p>
          </div>
        </div>
      )}

      {/* Top Metrics Cards (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Records */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Total Catalog
            </span>
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-display text-white">
            {serializedProjects.length}
          </p>
          <p className="text-[11px] font-mono text-zinc-500">
            {serializedProjects.length === 1 ? '1 project in database' : `${serializedProjects.length} projects stored`}
          </p>
        </div>

        {/* Selected Portfolio Control Status */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Selected Portfolio
            </span>
            <Star className="w-4 h-4 fill-primary text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl sm:text-3xl font-bold font-display text-white">
              {featuredCount} <span className="text-base text-zinc-500 font-normal">/ 3</span>
            </p>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
              featuredCount === 3
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-primary/10 text-primary border border-primary/20'
            }`}>
              {featuredCount === 3 ? 'Target Reached' : `${featuredCount} Active`}
            </span>
          </div>
          <p className="text-[11px] font-mono text-zinc-400">
            Displayed on Homepage
          </p>
        </div>

        {/* Direct Messages Inquiries */}
        <Link
          href="/admin/messages"
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 space-y-1 backdrop-blur-md transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider group-hover:text-white transition-colors">
              Client Inquiries
            </span>
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl sm:text-3xl font-bold font-display text-white">
              {unreadMessages}
            </p>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                unreadMessages > 0
                  ? 'bg-primary/10 text-primary border border-primary/30 animate-pulse'
                  : 'bg-white/5 text-zinc-400 border border-white/10'
              }`}
            >
              {unreadMessages > 0 ? `${unreadMessages} Unread` : 'All Read'}
            </span>
          </div>
          <p className="text-[11px] font-mono text-zinc-400 group-hover:text-primary transition-colors flex items-center gap-1">
            <span>{totalMessages} total in inbox</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </p>
        </Link>

        {/* Quick Action: New Project */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Quick Action
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold font-sans uppercase tracking-wider text-black bg-primary hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(204,255,0,0.25)] hover:scale-[1.01] active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </Link>
        </div>
      </div>

      {/* Unread Inquiries Attention Banner */}
      {unreadMessages > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-black/40 to-transparent border border-primary/30">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping shrink-0" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                You have {unreadMessages} unread direct message{unreadMessages > 1 ? 's' : ''} from portfolio visitors!
              </p>
              <p className="text-[11px] text-zinc-400 font-sans">
                Review inquiries dispatched from your /contact form to respond to potential clients.
              </p>
            </div>
          </div>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)] shrink-0"
          >
            <span>Open Inbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Catalog Header & Info Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-display text-white tracking-wide flex items-center gap-2">
            <span>Project Catalog & Homepage Controls</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Search, filter, paginate, and toggle the <strong className="text-primary">&ldquo;Selected (Homepage)&rdquo;</strong> button on any project to control which 3 systems appear in the Selected Portfolio on your landing page.
          </p>
        </div>
      </div>

      {/* Interactive Catalog with Live Search & Pagination */}
      <AdminProjectCatalog initialProjects={serializedProjects} />
    </div>
  );
}
