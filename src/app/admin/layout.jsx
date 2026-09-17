import Link from 'next/link';
import { ShieldCheck, LayoutDashboard, LogOut, ArrowLeft, ExternalLink, Database } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Nazmul Khan',
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }) {
  return (
    <div className="py-8 sm:py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-[#0c0c0e]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(204,255,0,0.2)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  Admin Console
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Manage your portfolio case studies, projects & dynamic content
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-black bg-primary hover:bg-primary-light font-bold transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)]"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Projects</span>
            </Link>

            <a
              href="/api/auth/signout"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </a>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-2">
          {children}
        </main>
      </div>
    </div>
  );
}

