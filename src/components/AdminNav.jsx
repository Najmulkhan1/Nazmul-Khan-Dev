'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Mail, ExternalLink, LogOut } from 'lucide-react';

export default function AdminNav({ unreadCount = 0 }) {
  const pathname = usePathname();

  const isProjectsActive = pathname === '/admin' || pathname.startsWith('/admin/projects');
  const isMessagesActive = pathname.startsWith('/admin/messages');

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link
        href="/"
        target="_blank"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-all"
      >
        <span>View Site</span>
        <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
      </Link>

      {/* Projects Tab */}
      <Link
        href="/admin"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans transition-all ${
          isProjectsActive
            ? 'font-bold text-black bg-primary shadow-[0_0_18px_rgba(204,255,0,0.25)]'
            : 'font-medium text-zinc-300 bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white'
        }`}
      >
        <LayoutDashboard className="w-3.5 h-3.5" />
        <span>Projects</span>
      </Link>

      {/* Messages Tab with Unread Badge */}
      <Link
        href="/admin/messages"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans transition-all relative ${
          isMessagesActive
            ? 'font-bold text-black bg-primary shadow-[0_0_18px_rgba(204,255,0,0.25)]'
            : 'font-medium text-zinc-300 bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white'
        }`}
      >
        <Mail className="w-3.5 h-3.5" />
        <span>Messages</span>
        {unreadCount > 0 && (
          <span
            className={`inline-flex items-center justify-center px-1.5 py-0.5 min-w-[18px] text-[10px] font-mono font-bold rounded-full transition-all ${
              isMessagesActive
                ? 'bg-black text-primary border border-black/40'
                : 'bg-primary text-black border border-primary/50 shadow-[0_0_10px_rgba(204,255,0,0.4)] animate-pulse'
            }`}
          >
            {unreadCount}
          </span>
        )}
      </Link>

      {/* Sign Out */}
      <a
        href="/api/auth/signout"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Sign Out</span>
      </a>
    </div>
  );
}
