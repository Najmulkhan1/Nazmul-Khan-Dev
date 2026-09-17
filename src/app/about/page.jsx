import { ArrowUpRight } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="pt-32 sm:pt-40 pb-24 sm:pb-32 w-full relative">
      {/* Background Section Title */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-5">
        <h2 className="text-[12vw] font-display font-bold whitespace-nowrap text-white">
          I BUILD THINGS. I BUILD THINGS.
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary"></span>
              <span className="text-xs font-sans uppercase tracking-widest text-primary">About</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              The Engine <br /> Behind The Code.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              I am a software engineer driven by solving meaningful real-world challenges through scalable full-stack applications.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (Image & Info) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="aspect-[3/4] w-full bg-background-card border border-white/10 p-2 grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src="https://i.ibb.co/8gbhygq0/IMG-0644.jpg"
                alt="Nazmul Khan"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6">
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Status</p>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  Available
                </p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Experience</p>
                <p className="text-xs font-bold text-white">2+ Years</p>
              </div>
            </div>

            <a
              href="https://drive.google.com/file/d/16bs_iLUUnI0LZaicJYXL3WeE_UjF2EUH/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Download Resume
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right Column (Narrative) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            
            <div className="space-y-8">
              <div className="p-8 md:p-10 border border-white/5 bg-background-card/50">
                <h3 className="text-xl font-display font-bold text-white uppercase mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary"></span>
                  The Journey
                </h3>
                <div className="space-y-6 text-sm md:text-base font-sans text-text-muted leading-relaxed">
                  <p>
                    My passion for programming started with an insatiable curiosity about how modern digital platforms operate behind the scenes. What began with exploring basic HTML and JavaScript quickly evolved into architecting scalable, full-stack ecosystems.
                  </p>
                  <p>
                    Over the past 2+ years, I have engineered full-stack applications leveraging Next.js, NestJS, React, and Node.js, paired with PostgreSQL, MongoDB, and Redis caching. I specialize in architecting secure, high-performance backends, containerizing with Docker, and deploying zero-downtime systems directly to production Linux VPS.
                  </p>
                  <p>
                    Whether it is building multi-vendor e-commerce portals, real-time collaboration suites, or mission-critical management dashboards, my goal is always to deliver scalable, production-ready solutions with exceptional reliability and user experience.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Clean Architecture", desc: "Writing scalable, modular code with solid architecture that any team can maintain." },
                  { title: "Performance First", desc: "Relentless focus on core web vitals, minimal bundles, and low-latency APIs." },
                  { title: "Security Obsessed", desc: "Implementing robust authentication, sanitation, and secure environment practices." },
                  { title: "Continuous Growth", desc: "Constantly learning cutting-edge tools to deliver production value quickly." }
                ].map((val, i) => (
                  <div key={i} className="p-6 border border-white/5 bg-background-card/20 hover:border-primary/30 transition-colors">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-3">{val.title}</h4>
                    <p className="text-xs font-sans text-text-muted leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;