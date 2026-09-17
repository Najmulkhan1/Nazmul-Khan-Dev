import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-background-dark py-8 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-sans text-xs text-text-muted uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Nazmul Khan
          </span>
          <span className="font-sans text-[10px] text-white/30 uppercase tracking-widest">
            Designed & built by Nazmul Khan
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Najmulkhan1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans uppercase tracking-widest text-text-muted hover:text-white transition-colors relative group"
          >
            GitHub
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="https://www.linkedin.com/in/nazmul-khan-mukit/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans uppercase tracking-widest text-text-muted hover:text-white transition-colors relative group"
          >
            LinkedIn
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="mailto:najmulislam624@gmail.com"
            className="text-xs font-sans uppercase tracking-widest text-text-muted hover:text-white transition-colors relative group"
          >
            Email
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </footer>
  );
}
