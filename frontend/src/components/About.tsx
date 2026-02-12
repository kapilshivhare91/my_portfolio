
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-20 bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 blur-2xl rounded-3xl" />
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 group">
            <img src="https://picsum.photos/seed/engineer/800/800" alt="Engineer" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] mb-4 uppercase">CORE BIOGRAPHY</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-8">MORE THAN CODE.<br/>A STRATEGIC ASSET.</h3>
          
          <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
            <p>
              I don't just write software; I architect high-value digital solutions. 
              My approach blends technical rigor with a relentless focus on user experience.
            </p>
            <p>
              With over 6 years of experience in the industry, I've led engineering efforts for
              startups and established enterprises alike, consistently delivering products that
              outperform expectations.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-black text-white">65+</p>
                <p className="text-xs font-mono text-gray-500">PROJECTS COMPLETED</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">12k+</p>
                <p className="text-xs font-mono text-gray-500">HOURS OF REFINEMENT</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
