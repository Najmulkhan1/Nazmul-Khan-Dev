import Link from 'next/link';
import { 
  User, 
  MapPin, 
  Clock, 
  GraduationCap, 
  Code2, 
  Heart, 
  Sparkles, 
  Download, 
  Compass, 
  Rocket, 
  ShieldCheck, 
  Cpu 
} from 'lucide-react';

const values = [
  {
    icon: Code2,
    title: 'Clean & Maintainable Code',
    description: 'Writing scalable, modular code with solid architecture, linting, and design patterns that any team can maintain.',
  },
  {
    icon: Cpu,
    title: 'Performance & Optimization',
    description: 'Relentless focus on core web vitals, minimal bundles, database indexing, and low-latency API response times.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Reliability',
    description: 'Implementing robust authentication, input sanitation, CORS, environment variables security, and automated error handling.',
  },
  {
    icon: Rocket,
    title: 'Rapid Continuous Growth',
    description: 'Constantly learning cutting-edge tools and adopting modern best practices to deliver production value quickly.',
  },
];

const About = () => {
  return (
    <section className="py-16 sm:py-24 w-full">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-primary/30 text-xs font-semibold text-primary">
          <User className="w-3.5 h-3.5" />
          <span>About Me</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Behind The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Code</span>
        </h2>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
          I am a software engineer driven by solving meaningful real-world challenges through full-stack web applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bento Profile Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 text-center space-y-6 shadow-2xl relative overflow-hidden group">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

            {/* Avatar */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-cyan-accent blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 p-1">
                <img
                  src="https://i.ibb.co/8gbhygq0/IMG-0644.jpg"
                  alt="Nazmul Khan"
                  className="w-full h-full object-cover rounded-full filter brightness-95"
                />
              </div>
            </div>

            {/* Name & Role */}
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Nazmul Khan</h3>
              <p className="text-sm text-emerald-400 font-mono font-medium mt-1">Full-Stack Engineer</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-left">
                <p className="text-[11px] text-text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" /> Experience
                </p>
                <p className="text-sm font-bold text-white mt-1">3+ Years</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-left">
                <p className="text-[11px] text-text-muted flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-primary" /> Location
                </p>
                <p className="text-sm font-bold text-white mt-1">Dhaka, BD</p>
              </div>
            </div>

            {/* Interests & Passions */}
            <div className="text-left space-y-2 pt-2 border-t border-white/10">
              <p className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-primary" /> Interests & Focus
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['MERN Stack', 'Next.js', 'System Design', 'APIs', 'UI/UX', 'Cloud'].map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-text-muted border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume Button */}
            <div className="pt-2">
              <a
                href="https://drive.google.com/file/d/16bs_iLUUnI0LZaicJYXL3WeE_UjF2EUH/view"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-background-dark bg-primary hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

          </div>
        </div>

        {/* Right Column: Narrative & Values (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Story Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>The Journey & Background</span>
            </h3>
            <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed">
              <p>
                My passion for programming started with an insatiable curiosity about how modern digital platforms operate behind the scenes. What began with exploring basic HTML and JavaScript quickly evolved into architecting scalable, full-stack ecosystems.
              </p>
              <p>
                Over the past 3+ years, I have engineered full-stack applications leveraging the MERN stack (MongoDB, Express, React, Node.js) and Next.js. I specialize in designing responsive, intuitive frontend user interfaces paired with secure, performant RESTful backends.
              </p>
              <p>
                Whether it is building multi-vendor e-commerce portals, real-time collaboration suites, or data-driven management dashboards, my goal is always to deliver scalable, production-ready solutions with exceptional user experience.
              </p>
            </div>
          </div>

          {/* Core Engineering Values */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-accent" />
              <span>How I Build & What I Value</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => {
                const IconComponent = v.icon;
                return (
                  <div
                    key={i}
                    className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300 space-y-2.5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-white">{v.title}</h4>
                    <p className="text-xs text-text-muted leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;