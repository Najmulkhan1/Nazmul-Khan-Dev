'use client';

import { motion } from 'framer-motion';
import { MonitorSmartphone, Server, Database } from 'lucide-react';

const services = [
  {
    icon: MonitorSmartphone,
    title: 'Frontend Engineering',
    description: 'Building responsive, accessible, and performant web interfaces using React and Next.js. I focus on creating intuitive user experiences that engage and convert.',
    features: ['React & Next.js', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
  },
  {
    icon: Server,
    title: 'Backend Architecture',
    description: 'Designing scalable, secure, and robust RESTful APIs and server-side applications using Node.js and Express to power modern digital products.',
    features: ['Node.js & Express', 'RESTful APIs', 'Authentication', 'Microservices'],
  },
  {
    icon: Database,
    title: 'Database Management',
    description: 'Modeling complex data structures, optimizing queries, and managing data persistence using PostgreSQL for high-performance applications.',
    features: ['PostgreSQL', 'Data Modeling', 'Optimization'],
  },
];

const Services = () => {
  return (
    <section className="w-full py-24 sm:py-32 border-t border-white/5 bg-background-dark relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary"></span>
              <span className="text-xs font-sans uppercase tracking-widest text-primary">Services</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              What I <br /> Build.
            </h2>
          </div>
          <div className="max-w-md border-l border-white/10 pl-6">
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              From concept to deployment, I deliver end-to-end engineering solutions. Whether it is crafting pixel-perfect interfaces or architecting scalable backends.
            </p>
          </div>
        </div>

        {/* Services List */}
        <div className="flex flex-col border-t border-white/10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col md:flex-row gap-8 md:gap-16 py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors"
              >
                <div className="md:w-1/3 flex items-start gap-6">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">
                    {service.title}
                  </h3>
                </div>
                
                <div className="md:w-1/3">
                  <p className="text-sm font-sans text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="md:w-1/3">
                  <ul className="grid grid-cols-2 gap-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-sans text-text-muted uppercase tracking-widest">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
