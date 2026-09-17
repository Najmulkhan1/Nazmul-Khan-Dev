'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background-dark/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-accent/20 border border-primary/30 flex items-center justify-center text-primary group-hover:border-primary transition-all duration-300 group-hover:scale-105 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-text-primary group-hover:text-primary transition-colors flex items-center gap-1.5">
              Nazmul<span className="text-primary font-mono">.dev</span>
            </span>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400/90 font-mono tracking-wider">AVAILABLE FOR HIRE</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-primary/20 font-semibold border border-primary/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://drive.google.com/file/d/16bs_iLUUnI0LZaicJYXL3WeE_UjF2EUH/view"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-background-dark bg-gradient-to-r from-primary to-emerald-400 hover:from-emerald-400 hover:to-cyan-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-text-primary hover:text-primary focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-background-dark/95 backdrop-blur-2xl px-6 py-6 transition-all animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/30 font-semibold'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <a
                href="https://drive.google.com/file/d/16bs_iLUUnI0LZaicJYXL3WeE_UjF2EUH/view"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-background-dark bg-primary hover:bg-primary-light transition-all"
              >
                <span>Download Resume</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-center gap-4 pt-2">
                <a
                  href="https://github.com/Najmulkhan1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg glass-panel text-text-muted hover:text-primary"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nazmul-khan-mukit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg glass-panel text-text-muted hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:najmulislam624@gmail.com"
                  className="p-2.5 rounded-lg glass-panel text-text-muted hover:text-primary"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
