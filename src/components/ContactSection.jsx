'use client';

import { useState, useEffect } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { submitContactMessage } from '@/app/actions';

export default function ContactSection({ isStandalone = false }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [time, setTime] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Calculate local time in Dhaka (GMT+6)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('subject', formData.subject || 'Project Inquiry');
      data.append('message', formData.message);

      const res = await submitContactMessage(data);
      if (res?.success) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(res?.error || 'Failed to transmit message. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMsg(err.message || 'An unexpected error occurred while transmitting your message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`w-full border-t border-white/5 relative bg-background-dark ${
        isStandalone ? 'pt-32 sm:pt-40 pb-24 sm:pb-32' : 'py-24 sm:py-32'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="text-xs font-sans uppercase tracking-widest text-primary">Contact</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              Initiate <br /> Connection.
            </h2>
          </div>
          <div className="max-w-md border-l border-white/10 pl-6">
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              Whether you have an ambitious full-stack project in mind, an opportunity to discuss, or just want to connect, my inbox is always open.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-background-card/30 backdrop-blur-sm">
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Direct Transmission
              </h3>

              {formSubmitted ? (
                <div className="p-8 sm:p-10 border border-primary/30 bg-primary/5 text-center space-y-4 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto text-primary">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-2">
                      Transmission Received
                    </h4>
                    <p className="text-sm font-sans text-text-muted max-w-md mx-auto">
                      Your message has been directly dispatched to my admin console. I will review your requirements and respond promptly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-black transition-all rounded-lg"
                  >
                    <span>Send Another Transmission</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-sans uppercase tracking-widest text-text-muted mb-2 font-mono">
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white font-sans text-sm focus:border-primary focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-sans uppercase tracking-widest text-text-muted mb-2 font-mono">
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white font-sans text-sm focus:border-primary focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-sans uppercase tracking-widest text-text-muted mb-2 font-mono">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white font-sans text-sm focus:border-primary focus:outline-none transition-colors"
                      placeholder="Project Inquiry / Role Discussion"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-sans uppercase tracking-widest text-text-muted mb-2 font-mono">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white font-sans text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Describe your goals, project scope, or opportunity..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-primary text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-primary group-hover:text-black" />
                        <span>Transmitting to Console...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Transmission</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl border border-white/10 bg-background-card/30">
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-6">
                Coordinates
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center justify-between group">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1">Email</p>
                    <a href="mailto:najmulislam624@gmail.com" className="text-sm font-bold text-white hover:text-primary transition-colors">
                      najmulislam624@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={() => copyToClipboard('najmulislam624@gmail.com', 'email')}
                    className="text-text-muted hover:text-white transition-colors p-2"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between group">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1">Phone / WhatsApp</p>
                    <a href="https://wa.me/8801619863535" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-primary transition-colors">
                      +880 1619-863535
                    </a>
                  </div>
                  <button
                    onClick={() => copyToClipboard('+8801619863535', 'phone')}
                    className="text-text-muted hover:text-white transition-colors p-2"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Networks */}
            <div className="p-8 rounded-2xl border border-white/10 bg-background-card/30">
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-6">
                Networks
              </h3>
              <div className="space-y-3">
                <a
                  href="https://www.linkedin.com/in/nazmul-khan-mukit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/20 transition-all"
                >
                  <span className="text-xs font-bold text-text-muted group-hover:text-white uppercase tracking-wider">LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://github.com/Najmulkhan1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/20 transition-all"
                >
                  <span className="text-xs font-bold text-text-muted group-hover:text-white uppercase tracking-wider">GitHub</span>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Time */}
            <div className="p-6 rounded-2xl border border-white/10 flex items-center justify-between bg-black/40">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1">Local Time (Dhaka)</p>
                <p className="text-sm font-mono font-bold text-white">{time || '...'}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
