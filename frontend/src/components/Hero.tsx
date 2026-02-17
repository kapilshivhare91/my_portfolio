import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-md text-[10px] font-mono tracking-widest text-orange-600 mb-6"
        >
          VERSION 2025.0 // AVAILABLE FOR HIRE
        </motion.span>

        <motion.h1
          className="text-6xl md:text-8xl font-black tracking-tighter leading-tight mb-8"
        >
          <span className="block text-gray-900 opacity-90">ENGINEERING THE</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]">NEXT PROTOCOL.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          A software engineer specializing in high-performance architecture,
          immersive visual systems, and scalable cloud ecosystems.
          Designing digital products that dominate markets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-gray-900 text-white font-bold rounded-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <span className="relative z-10">EXPLORE WORK</span>
            <div className="absolute inset-0 bg-orange-500 transform translate-y-full transition-transform group-hover:translate-y-0" />
          </a>

          <a
            href="#contact"
            className="group px-8 py-4 border border-orange-500/30 bg-orange-50/50 rounded-sm hover:border-orange-500/50 hover:bg-orange-500/10 transition-all flex items-center gap-2"
          >
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">INITIALIZE CONTACT</span>
            <span className="text-orange-600 group-hover:translate-x-1 transition-transform font-mono">→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Hero Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-0 w-full px-10 flex flex-wrap justify-center md:justify-between gap-10 border-t border-gray-200 pt-8"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-gray-500">ENGINEER CORE</span>
          <span className="text-sm font-bold text-gray-800">SYSTEMS ARCHITECT</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-gray-500">LOCATION</span>
          <span className="text-sm font-bold text-gray-800">SAN FRANCISCO, CA</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-gray-500">CURRENT FOCUS</span>
          <span className="text-sm font-bold text-gray-800">DISTRIBUTED WEB 3.0</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-gray-500">UPTIME</span>
          <span className="text-sm font-bold text-gray-800">99.9% RELIABILITY</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
