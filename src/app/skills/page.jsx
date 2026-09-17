import { 
  Database, 
  Server, 
  Code2, 
  Layers, 
  Cpu, 
  Globe, 
  Terminal, 
  Cloud, 
  GitBranch, 
  Sparkles,
  Boxes,
  Workflow,
  ShieldCheck,
  Zap,
  Layout,
  Braces
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Engineering',
    description: 'Crafting responsive, pixel-perfect, and accessible user interfaces.',
    skills: [
      { name: 'React 19 / 18', category: 'UI Library', level: 'Advanced', icon: Code2, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30' },
      { name: 'Next.js 15 (App Router)', category: 'Fullstack Framework', level: 'Advanced', icon: Globe, color: 'text-white bg-white/10 border-white/20' },
      { name: 'TypeScript', category: 'Type Safety', level: 'Proficient', icon: Braces, color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
      { name: 'JavaScript (ES6+)', category: 'Core Language', level: 'Advanced', icon: Zap, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
      { name: 'Tailwind CSS', category: 'Styling & Design System', level: 'Advanced', icon: Layout, color: 'text-teal-400 bg-teal-400/10 border-teal-400/30' },
      { name: 'Redux Toolkit', category: 'State Management', level: 'Proficient', icon: Layers, color: 'text-purple-400 bg-purple-400/10 border-purple-400/30' },
    ],
  },
  {
    title: 'Backend & Server Architecture',
    description: 'Building robust, secure, and horizontally scalable backends.',
    skills: [
      { name: 'Node.js', category: 'Runtime Environment', level: 'Advanced', icon: Server, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
      { name: 'Express.js', category: 'API Framework', level: 'Advanced', icon: Cpu, color: 'text-zinc-300 bg-zinc-300/10 border-zinc-300/20' },
      { name: 'RESTful APIs', category: 'API Architecture', level: 'Advanced', icon: Workflow, color: 'text-sky-400 bg-sky-400/10 border-sky-400/30' },
      { name: 'Next.js Server Actions', category: 'Server Mutations', level: 'Advanced', icon: Zap, color: 'text-emerald-300 bg-emerald-300/10 border-emerald-300/30' },
      { name: 'Auth (NextAuth / JWT)', category: 'Security & Auth', level: 'Proficient', icon: ShieldCheck, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
      { name: 'GraphQL', category: 'Query Language', level: 'Familiar', icon: Boxes, color: 'text-pink-400 bg-pink-400/10 border-pink-400/30' },
    ],
  },
  {
    title: 'Databases & Storage',
    description: 'Efficient data modeling, query optimization, and storage solutions.',
    skills: [
      { name: 'MongoDB', category: 'NoSQL Document DB', level: 'Advanced', icon: Database, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
      { name: 'Mongoose ODM', category: 'Schema & Validation', level: 'Advanced', icon: Layers, color: 'text-red-400 bg-red-400/10 border-red-400/30' },
      { name: 'PostgreSQL', category: 'Relational DB', level: 'Intermediate', icon: Database, color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
      { name: 'Cloudinary / ImgBB', category: 'Asset Management', level: 'Advanced', icon: Cloud, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30' },
    ],
  },
  {
    title: 'DevOps, Tools & Workflow',
    description: 'CI/CD, version control, and development efficiency toolset.',
    skills: [
      { name: 'Git & GitHub', category: 'Version Control', level: 'Advanced', icon: GitBranch, color: 'text-orange-400 bg-orange-400/10 border-orange-400/30' },
      { name: 'Vercel / Cloud Deploy', category: 'Hosting & Edge CI/CD', level: 'Advanced', icon: Cloud, color: 'text-white bg-white/10 border-white/20' },
      { name: 'Postman', category: 'API Testing', level: 'Advanced', icon: Terminal, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
      { name: 'Linux / Bash Scripting', category: 'Environment', level: 'Proficient', icon: Terminal, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
    ],
  },
];

const Skills = () => {
  return (
    <div className="w-full py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-primary/30 text-xs font-semibold text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Technical Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          My Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Toolkit</span>
        </h2>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
          Over 3+ years of building production-grade web applications, I have mastered modern frameworks, scalable APIs, and database engineering.
        </p>
      </div>

      {/* Category Groups */}
      <div className="space-y-12">
        {skillCategories.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-6">
            <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {group.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-muted font-normal">
                {group.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.skills.map((skill, skillIdx) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skillIdx}
                    className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${skill.color} group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-text-primary group-hover:text-white transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-text-muted mt-0.5">
                          {skill.category}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-emerald-400/90 whitespace-nowrap">
                      {skill.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
