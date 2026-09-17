import Link from 'next/link';
import { ShieldCheck, LayoutDashboard, LogOut, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Nazmul Khan',
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }) {
  return (
    <div className="py-10 w-full">
      <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-text-muted">Manage portfolio projects & content</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-text-muted hover:text-white glass-panel transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Site</span>
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-white bg-white/5 border border-white/10 hover:border-primary/40 transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
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
        </div>

        {/* Content Area */}
        <div className="pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
