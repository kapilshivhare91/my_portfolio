
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-xs font-mono font-bold tracking-widest text-cyan-400">NEXUS © 2025</p>
          <p className="text-[10px] text-gray-500 font-mono">ENCRYPTED // ALL RIGHTS RESERVED</p>
        </div>
        
        <div className="flex gap-10">
          <a href="#" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">GITHUB</a>
          <a href="#" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">LINKEDIN</a>
          <a href="#" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">TWITTER</a>
          <a href="#" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">RESUME</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
