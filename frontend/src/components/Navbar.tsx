import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.2, ease: "circOut" }}
      className="fixed top-0 w-full z-50 px-6 py-4 flex justify-center"
    >
      <div
        className="bg-white/70 backdrop-blur-md border border-orange-500/10 rounded-full px-8 py-3 flex items-center gap-10 shadow-xl"
      >
        <a href="#home" className="text-xs font-mono font-bold tracking-widest text-orange-500 hover:text-orange-600 transition-colors">NEXUS</a>
        <div className="flex gap-8 items-center">
          <a href="#projects" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">PROJECTS</a>
          <a href="#skills" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">TECH-STACK</a>
          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">BIOGRAPHY</a>
          <a href="#contact" className="px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-xs font-bold text-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-sm">CONNECT</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
