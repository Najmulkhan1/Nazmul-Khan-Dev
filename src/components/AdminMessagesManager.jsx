'use client';

import { useState, useMemo, useTransition } from 'react';
import { 
  deleteMessage, 
  markMessageAsRead, 
  markAllMessagesAsRead 
} from '@/app/actions';
import {
  Mail,
  MailOpen,
  CheckCircle2,
  Trash2,
  Reply,
  Search,
  X,
  Clock,
  User,
  Inbox,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles
} from 'lucide-react';

export default function AdminMessagesManager({ initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'unread' | 'read'
  const [expandedId, setExpandedId] = useState(null);
  const [copiedEmailId, setCopiedEmailId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Keep state synced with props if revalidated from server
  useMemo(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => !m.read).length;
  const readCount = totalCount - unreadCount;

  // Filtered messages
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.subject?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q);

      let matchFilter = true;
      if (filterTab === 'unread') matchFilter = !m.read;
      if (filterTab === 'read') matchFilter = !!m.read;

      return matchSearch && matchFilter;
    });
  }, [messages, searchTerm, filterTab]);

  const handleToggleRead = async (id, currentReadStatus) => {
    const nextRead = !currentReadStatus;
    // Optimistic update
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, read: nextRead } : m))
    );

    startTransition(async () => {
      try {
        await markMessageAsRead(id, nextRead);
      } catch (err) {
        console.error('Failed to toggle read state:', err);
        // Revert on error
        setMessages(initialMessages);
      }
    });
  };

  const handleMarkAllRead = async () => {
    setMessages((prev) => prev.map((m) => ({ ...m, read: true })));

    startTransition(async () => {
      try {
        await markAllMessagesAsRead();
      } catch (err) {
        console.error('Failed to mark all as read:', err);
        setMessages(initialMessages);
      }
    });
  };

  const handleDelete = async (id, e) => {
    e?.stopPropagation();
    if (!confirm('Are you sure you want to permanently delete this message?')) {
      return;
    }

    setDeletingId(id);
    // Optimistic delete
    setMessages((prev) => prev.filter((m) => m._id !== id));

    startTransition(async () => {
      try {
        await deleteMessage(id);
      } catch (err) {
        console.error('Failed to delete message:', err);
        alert('Failed to delete message: ' + (err.message || 'Unknown error'));
        setMessages(initialMessages);
      } finally {
        setDeletingId(null);
      }
    });
  };

  const handleExpand = (m) => {
    const nextState = expandedId === m._id ? null : m._id;
    setExpandedId(nextState);

    // Automatically mark as read if it was unread and opened
    if (nextState === m._id && !m.read) {
      handleToggleRead(m._id, false);
    }
  };

  const handleCopyEmail = (email, id, e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmailId(id);
    setTimeout(() => setCopiedEmailId(null), 2000);
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recent';
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Total Transmissions</p>
            <p className="text-2xl font-bold font-display text-white mt-0.5">{totalCount}</p>
          </div>
          <Inbox className="w-5 h-5 text-zinc-400" />
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Unread Inquiries</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-2xl font-bold font-display text-white">{unreadCount}</p>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25 animate-pulse">
                  Requires Attention
                </span>
              )}
            </div>
          </div>
          <Mail className="w-5 h-5 text-primary" />
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Processed / Read</p>
            <p className="text-2xl font-bold font-display text-white mt-0.5">{readCount}</p>
          </div>
          <MailOpen className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sender, email, subject, text..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-xs font-sans focus:outline-none focus:border-primary/60 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tab Filters & Batch Action */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl bg-black/40 border border-white/10 p-1">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                filterTab === 'all'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setFilterTab('unread')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                filterTab === 'unread'
                  ? 'bg-primary text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilterTab('read')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                filterTab === 'read'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Read ({readCount})
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>Mark All Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Message List */}
      {filteredMessages.length === 0 ? (
        <div className="py-16 px-6 text-center rounded-2xl border border-dashed border-white/10 bg-black/20 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider">
            {searchTerm || filterTab !== 'all' ? 'No Matching Transmissions' : 'Inbox is Clean'}
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto font-sans">
            {searchTerm || filterTab !== 'all'
              ? 'Try adjusting your search criteria or resetting filters to display other records.'
              : 'Direct inquiries dispatched from your portfolio /contact page will appear right here with full sender metadata.'}
          </p>
          {(searchTerm || filterTab !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterTab('all');
              }}
              className="mt-2 text-xs font-mono text-primary hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((m) => {
            const isExpanded = expandedId === m._id;
            const isDeleting = deletingId === m._id;

            return (
              <div
                key={m._id}
                onClick={() => handleExpand(m)}
                className={`group rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                  !m.read
                    ? 'border-primary/40 bg-gradient-to-r from-primary/[0.04] via-black/40 to-black/60 shadow-[0_0_15px_rgba(204,255,0,0.06)]'
                    : 'border-white/10 bg-[#111114]/70 hover:border-white/20 hover:bg-[#151518]'
                } ${isDeleting ? 'opacity-40 pointer-events-none' : ''}`}
              >
                {/* Summary Row */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    {/* Read / Unread Indicator */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleRead(m._id, m.read);
                      }}
                      title={m.read ? 'Mark as unread' : 'Mark as read'}
                      className="mt-1 sm:mt-0 p-1 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      {!m.read ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_8px_rgba(204,255,0,0.6)] animate-pulse" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-zinc-600 bg-zinc-800" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-bold text-sm text-white truncate group-hover:text-primary transition-colors">
                          {m.name}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono hidden md:inline">
                          &lt;{m.email}&gt;
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400">
                          {m.subject || 'Project Inquiry'}
                        </span>
                      </div>
                      
                      {/* Snippet preview */}
                      <p className="text-xs text-zinc-400 font-sans truncate mt-1 max-w-xl">
                        {m.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Timestamp */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{formatDate(m.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {/* Reply Button */}
                      <a
                        href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || 'Project Inquiry'))}`}
                        title="Reply via Email"
                        className="p-2 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all"
                      >
                        <Reply className="w-3.5 h-3.5" />
                      </a>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => handleDelete(m._id, e)}
                        disabled={isDeleting}
                        title="Delete Transmission"
                        className="p-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <div className="pl-1 text-zinc-500">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details View */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/5 bg-black/40 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1 text-zinc-400">
                          <User className="w-3.5 h-3.5 text-zinc-500" />
                          <span className="text-white font-medium">{m.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-400 font-mono">
                          <span>{m.email}</span>
                          <button
                            onClick={(e) => handleCopyEmail(m.email, m._id, e)}
                            className="p-1 hover:text-primary transition-colors"
                            title="Copy email address"
                          >
                            {copiedEmailId === m._id ? (
                              <Check className="w-3 h-3 text-primary" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleRead(m._id, m.read)}
                          className="text-[11px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                        >
                          {m.read ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                        <a
                          href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || 'Project Inquiry'))}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-all"
                        >
                          <Reply className="w-3 h-3" />
                          <span>Reply Now</span>
                        </a>
                      </div>
                    </div>

                    {/* Full Message Body */}
                    <div className="p-4 rounded-xl border border-white/5 bg-[#09090b]">
                      <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Message Body</p>
                      <p className="text-sm font-sans text-zinc-200 leading-relaxed whitespace-pre-wrap selection:bg-primary selection:text-black">
                        {m.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
