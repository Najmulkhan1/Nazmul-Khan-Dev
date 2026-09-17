'use client';

import { motion } from 'framer-motion';

const philosophies = [
  {
    title: 'Design For The User.',
    description: 'Technology is just a tool. The end goal is always to create a seamless, intuitive, and empowering experience for the human on the other side of the screen.',
    number: '01',
  },
  {
    title: 'Build For Scale.',
    description: 'Write code that not only solves today\'s problems but anticipates tomorrow\'s growth. Clean architecture and modularity are non-negotiable.',
    number: '02',
  },
  {
    title: 'Optimize Ruthlessly.',
    description: 'Performance is a feature. Milliseconds matter in the modern web, and optimizing database queries, asset delivery, and render cycles is a continuous pursuit.',
    number: '03',
  },
];

const EngineeringPhilosophy = () => {
  return (
    <section className="w-full py-24 sm:py-32 border-t border-white/5 bg-background-dark relative overflow-hidden">
      
      {/* Background Typography */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden pointer-events-none opacity-[0.02]">
        <h2 className="text-[15vw] font-display font-bold whitespace-nowrap text-white leading-none">
          MINDSET MINDSET
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-primary"></span>
              <span className="text-xs font-sans uppercase tracking-widest text-primary">Philosophy</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase">
              How I <br /> Think.
            </h2>
          </div>
          <div className="max-w-md border-l border-white/10 pl-6">
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              Engineering is more than just writing code. It is about understanding the problem domain, making deliberate architectural choices, and caring about the final product.
            </p>
          </div>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 border border-white/10 bg-background-card/20 hover:bg-white hover:border-white transition-all duration-500 flex flex-col h-full"
            >
              <div className="text-5xl font-display font-bold text-white/10 group-hover:text-black/10 transition-colors mb-8">
                {item.number}
              </div>
              <h3 className="text-xl font-display font-bold text-white group-hover:text-black uppercase tracking-wider mb-4 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm font-sans text-text-muted group-hover:text-black/70 leading-relaxed transition-colors mt-auto">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EngineeringPhilosophy;
