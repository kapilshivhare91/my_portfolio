
import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] mb-4 uppercase">TECHNICAL PERFORMANCE</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight">CRAFTED WITH PRECISION.</h3>
        </div>
        <p className="max-w-md text-gray-400 font-light text-sm">
          Optimized technical proficiency across the stack. My toolkit is updated monthly to ensure cutting-edge performance in every deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SKILL_CATEGORIES.map((category, idx) => (
          <motion.div 
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all group"
          >
            <h4 className="text-xs font-mono font-bold text-gray-500 mb-6 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">{category.title}</h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <motion.div 
                  key={skill.name}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 242, 255, 0.3)" }}
                  className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs font-medium text-gray-300 transition-all hover:border-cyan-400/50 hover:text-cyan-400"
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
