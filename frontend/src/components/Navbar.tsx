
import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-center">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex items-center gap-10 shadow-2xl"
      >
        <a href="#home" className="text-xs font-mono font-bold tracking-widest text-cyan-400 hover:text-white transition-colors">NEXUS</a>
        <div className="flex gap-8 items-center">
          <a href="#projects" className="text-sm font-medium hover:text-cyan-400 transition-colors">PROJECTS</a>
          <a href="#skills" className="text-sm font-medium hover:text-cyan-400 transition-colors">TECH-STACK</a>
          <a href="#about" className="text-sm font-medium hover:text-cyan-400 transition-colors">BIOGRAPHY</a>
          <a href="#contact" className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/50 rounded-full text-xs font-bold text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all">CONNECT</a>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
