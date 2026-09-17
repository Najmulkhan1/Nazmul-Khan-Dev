import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import AdminMessagesManager from '@/components/AdminMessagesManager';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Inquiries & Transmissions | Admin Console',
};

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  let serializedMessages = [];
  let dbError = null;

  try {
    await dbConnect();
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    serializedMessages = messages.map((m) => ({
      _id: m._id.toString(),
      name: m.name || 'Anonymous Sender',
      email: m.email || 'N/A',
      subject: m.subject || 'Project Inquiry',
      message: m.message || '',
      read: m.read ?? false,
      createdAt: m.createdAt ? m.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: m.updatedAt ? m.updatedAt.toISOString() : new Date().toISOString(),
    }));
  } catch (err) {
    console.error('Error fetching messages in AdminMessagesPage:', err);
    dbError = err.message || 'Database error occurred';
  }

  return (
    <div className="space-y-8">
      {/* Header and Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </Link>
          </div>
          <h2 className="text-xl font-bold font-display text-white tracking-wide flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-primary" />
            <span>Direct Client Transmissions & Inquiries</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time messages dispatched from your public portfolio contact form.
          </p>
        </div>
      </div>

      {dbError && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <strong>Database Notice:</strong> {dbError}
        </div>
      )}

      {/* Messages Manager Client View */}
      <AdminMessagesManager initialMessages={serializedMessages} />
    </div>
  );
}
