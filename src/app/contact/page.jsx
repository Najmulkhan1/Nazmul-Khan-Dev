'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Linkedin, 
  Github, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  Sparkles 
} from 'lucide-react';

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate seamless async submission
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 6000);
    }, 1000);
  };

  return (
    <div className="w-full py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-primary/30 text-xs font-semibold text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Let&apos;s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Remarkable</span>
        </h2>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
          Whether you have an ambitious full-stack project in mind, an opportunity to discuss, or just want to connect, my inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Send className="w-4 h-4 text-primary" />
            <span>Send a Direct Message</span>
          </h3>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Thank You for Reaching Out!</h4>
              <p className="text-sm text-text-muted max-w-sm mx-auto">
                Your message has been received. I will review it and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-text-muted mb-2">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl glass-panel text-white placeholder:text-text-muted/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-text-muted mb-2">
                    Your Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl glass-panel text-white placeholder:text-text-muted/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-text-muted mb-2">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Full-Stack Opportunity / Project Inquiry"
                  className="w-full px-4 py-3 rounded-xl glass-panel text-white placeholder:text-text-muted/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-text-muted mb-2">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project goals, timeline, or requirements..."
                  className="w-full px-4 py-3 rounded-xl glass-panel text-white placeholder:text-text-muted/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-background-dark bg-gradient-to-r from-primary via-emerald-400 to-cyan-accent hover:opacity-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Details & Local Time (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Contact Info Cards */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">Contact Details</h3>

            {/* Email item */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-text-muted">Email</p>
                  <a
                    href="mailto:najmulislam624@gmail.com"
                    className="text-sm font-semibold text-white hover:text-primary transition-colors"
                  >
                    najmulislam624@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('najmulislam624@gmail.com', 'email')}
                className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* WhatsApp item */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-text-muted">WhatsApp / Phone</p>
                  <a
                    href="https://wa.me/8801874246830"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                  >
                    +880 1874-246830
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('+8801874246830', 'phone')}
                className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all"
                title="Copy Phone Number"
                aria-label="Copy Phone Number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Links Row */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <p className="text-xs font-semibold text-text-primary">Professional Profiles</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.linkedin.com/in/nazmul-khan-mukit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-accent/40 text-text-muted hover:text-white transition-all text-xs font-medium"
                >
                  <Linkedin className="w-4 h-4 text-cyan-accent" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Najmulkhan1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/40 text-text-muted hover:text-white transition-all text-xs font-medium"
                >
                  <Github className="w-4 h-4 text-primary" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Local Time in Dhaka Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-accent/5 border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-text-muted">Local Time (Dhaka, GMT+6)</p>
                  <p className="text-sm font-bold font-mono text-white mt-0.5">{time || 'Dhaka Time'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
