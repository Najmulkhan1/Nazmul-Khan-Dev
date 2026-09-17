'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Full-Stack Developer',
    company: 'Freelance & Independent Projects',
    period: '2021 — Present',
    description: 'Architecting and delivering full-stack web applications for various clients. Focusing on Next.js, React, Node.js, and PostgreSQL. Specialized in building e-commerce platforms, custom dashboards, and realtime collaboration tools.',
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    role: 'Frontend Engineering Intern',
    company: 'Tech Solutions BD',
    period: '2020 — 2021',
    description: 'Collaborated with senior engineers to build responsive UI components. Improved core web vitals by 20% through code splitting and asset optimization. Participated in daily standups and agile development cycles.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Git']
  },
  {
    role: 'Computer Science Student',
    company: 'Self-Taught & Certifications',
    period: '2019 — 2020',
    description: 'Mastered the fundamentals of computer science, algorithms, and data structures. Completed intensive bootcamps on full-stack web development and modern JavaScript ecosystems.',
    tech: ['Algorithms', 'Data Structures', 'ES6+', 'Web Architecture']
  }
];

const ExperienceTimeline = () => {
  return (
    <section className="w-full py-24 sm:py-32 border-t border-white/5 bg-background-dark relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary"></span>
              <span className="text-xs font-sans uppercase tracking-widest text-primary">Timeline</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              Experience & <br /> Trajectory.
            </h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-white/10 pl-8 md:pl-12 ml-4 md:ml-6 space-y-20">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-background-dark border-2 border-primary rounded-full"></div>

              <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">
                    {exp.role}
                  </h3>
                  <div className="text-primary text-sm font-sans font-bold uppercase tracking-widest mt-1">
                    {exp.company}
                  </div>
                </div>
                <div className="text-xs font-mono text-text-muted bg-white/5 px-3 py-1 border border-white/10 inline-flex self-start">
                  {exp.period}
                </div>
              </div>

              <p className="text-sm font-sans text-text-muted leading-relaxed max-w-3xl mb-6">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-sans uppercase tracking-widest text-text-muted border border-white/10 px-3 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceTimeline;
