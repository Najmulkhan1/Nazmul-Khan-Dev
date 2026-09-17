'use client';

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
  Boxes,
  Workflow,
  ShieldCheck,
  Zap,
  Layout,
  Braces
} from 'lucide-react';

export const skillCategories = [
  {
    title: 'Frontend Engineering',
    description: 'Crafting responsive, pixel-perfect, and accessible user interfaces with cutting-edge tooling.',
    skills: [
      { name: 'React 19 / 18', category: 'UI Library', level: 'Advanced', icon: Code2 },
      { name: 'Next.js 15', category: 'Fullstack Framework', level: 'Advanced', icon: Globe },
      { name: 'TypeScript', category: 'Type Safety', level: 'Proficient', icon: Braces },
      { name: 'JavaScript', category: 'Core Language', level: 'Advanced', icon: Zap },
      { name: 'Tailwind CSS', category: 'Styling & Tokens', level: 'Advanced', icon: Layout },
      { name: 'Redux Toolkit', category: 'State Management', level: 'Proficient', icon: Layers },
    ],
  },
  {
    title: 'Backend & Server Architecture',
    description: 'Building robust, secure, and horizontally scalable backends with high-throughput APIs.',
    skills: [
      { name: 'Node.js', category: 'Runtime Environment', level: 'Advanced', icon: Server },
      { name: 'NestJS', category: 'Enterprise Architecture', level: 'Advanced', icon: Server },
      { name: 'Express.js', category: 'API Framework', level: 'Advanced', icon: Cpu },
      { name: 'RESTful APIs', category: 'API Architecture', level: 'Advanced', icon: Workflow },
      { name: 'Server Actions', category: 'Direct Mutations', level: 'Advanced', icon: Zap },
      { name: 'NextAuth / JWT', category: 'Security & Auth', level: 'Proficient', icon: ShieldCheck },
    ],
  },
  {
    title: 'Databases & Storage',
    description: 'Efficient data modeling, query indexing, and caching solutions.',
    skills: [
      { name: 'PostgreSQL', category: 'Relational DB', level: 'Intermediate', icon: Database },
      { name: 'MongoDB Atlas', category: 'NoSQL Document DB', level: 'Advanced', icon: Database },
      { name: 'Redis', category: 'In-Memory Cache & Pub/Sub', level: 'Advanced', icon: Zap },
      { name: 'Mongoose', category: 'Schema & Validation', level: 'Advanced', icon: Layers },
      { name: 'Cloudinary', category: 'Asset Management', level: 'Advanced', icon: Cloud },
    ],
  },
  {
    title: 'DevOps, Cloud & Production VPS',
    description: 'CI/CD pipelines, containerization, server provisioning, and edge deployments.',
    skills: [
      { name: 'Docker & Compose', category: 'Containerization', level: 'Advanced', icon: Boxes },
      { name: 'Production VPS', category: 'Linux / Ubuntu / Nginx', level: 'Advanced', icon: Server },
      { name: 'Git & GitHub', category: 'Version Control', level: 'Advanced', icon: GitBranch },
      { name: 'Vercel / Edge', category: 'Edge CI/CD', level: 'Advanced', icon: Cloud },
      { name: 'Linux / Bash', category: 'SysAdmin & Shell', level: 'Proficient', icon: Terminal },
      { name: 'Postman', category: 'API Testing & CI', level: 'Advanced', icon: Terminal },
    ],
  },
];

export default function SkillsSection({ isStandalone = false }) {
  return (
    <section
      id="skills"
      className={`w-full border-t border-white/5 bg-background-dark relative ${
        isStandalone ? 'pt-32 sm:pt-40 pb-24 sm:pb-32' : 'py-24 sm:py-32'
      }`}
    >
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <Cpu className="w-96 h-96" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="text-xs font-sans uppercase tracking-widest text-primary">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              Tools I <br /> Build With.
            </h2>
          </div>
          <div className="max-w-md border-l border-white/10 pl-6">
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              Over 2+ years of engineering production-grade web systems, I have mastered modern frameworks, resilient backend APIs, and sub-second databases.
            </p>
          </div>
        </div>

        {/* Category Groups */}
        <div className="space-y-20">
          {skillCategories.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/3">
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-3">
                  {group.title}
                </h3>
                <p className="text-xs font-sans text-text-muted leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.skills.map((skill, skillIdx) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={skillIdx}
                      className="group flex items-center justify-between p-4 border border-white/10 bg-background-card/40 hover:bg-white hover:border-white transition-colors duration-300 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-text-muted group-hover:text-black transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-black transition-colors uppercase tracking-wider">
                            {skill.name}
                          </h4>
                          <p className="text-[10px] font-sans text-text-muted group-hover:text-black/60 transition-colors uppercase tracking-widest mt-0.5">
                            {skill.category}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-white group-hover:bg-black group-hover:text-white transition-colors whitespace-nowrap rounded">
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
    </section>
  );
}
