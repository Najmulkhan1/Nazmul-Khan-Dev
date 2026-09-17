import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import AdminNav from '@/components/AdminNav';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Nazmul Khan',
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  let unreadCount = 0;
  try {
    await dbConnect();
    unreadCount = await Message.countDocuments({ read: false });
  } catch (err) {
    console.error('Error fetching unread messages count in AdminLayout:', err);
  }

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
                Manage your portfolio case studies, projects & direct client transmissions
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <AdminNav unreadCount={unreadCount} />
        </header>

        {/* Main Content Area */}
        <main className="pt-2">
          {children}
        </main>
      </div>
    </div>
  );
}

