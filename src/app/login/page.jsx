'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid admin credentials. Please check .env.local');
        setLoading(false);
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Card Container */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/15 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mx-auto shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-text-muted">
              Enter your administrator credentials to manage portfolio projects.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-medium text-text-muted mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-panel text-white placeholder:text-text-muted/40 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-medium text-text-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-panel text-white placeholder:text-text-muted/40 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-background-dark bg-gradient-to-r from-primary via-emerald-400 to-cyan-accent hover:opacity-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick helper note */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-text-muted text-center">
            Credentials configured in <code className="text-emerald-400 font-mono">.env.local</code>
          </div>
        </div>

        {/* Return to website */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <span>&larr; Back to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
