import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InteractivePortrait from './InteractivePortrait';
import OrangeBlossomBackground from './Blossom_Background';

const SKILL_THEMES = [
  { text: "Django Developer", gradient: "from-emerald-400 to-teal-500", glow: "rgba(16, 185, 129, 0.25)", stroke: "rgba(16, 185, 129, 0.15)" },
  { text: "React Developer", gradient: "from-cyan-400 to-blue-500", glow: "rgba(6, 182, 212, 0.25)", stroke: "rgba(6, 182, 212, 0.15)" },
  { text: "Generative AI (GenAI)", gradient: "from-indigo-400 to-purple-600", glow: "rgba(99, 102, 241, 0.25)", stroke: "rgba(99, 102, 241, 0.15)" },
  { text: "AI & ML Developer", gradient: "from-violet-400 to-fuchsia-600", glow: "rgba(139, 92, 246, 0.25)", stroke: "rgba(139, 92, 246, 0.15)" },
  { text: "Full Stack Developer", gradient: "from-rose-400 to-amber-500", glow: "rgba(244, 63, 94, 0.25)", stroke: "rgba(244, 63, 94, 0.15)" },
  { text: "AWS Services Expert", gradient: "from-sky-400 to-indigo-600", glow: "rgba(14, 165, 233, 0.25)", stroke: "rgba(14, 165, 233, 0.15)" }
];

const Hero: React.FC = () => {
  const [skillIndex, setSkillIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSkillIndex((prev) => (prev + 1) % SKILL_THEMES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentSkill = SKILL_THEMES[skillIndex];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">

      {/* Background Grid Pattern (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Falling leaves overlay */}
      <OrangeBlossomBackground bgClass="bg-transparent" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">

        {/* LEFT COLUMN: The Pitch */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-md text-[10px] font-mono tracking-widest text-orange-600 mb-6"
          >
            CREATIVE DEVELOPER & TECHNOLOGIST
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-6 text-gray-900"
          >
            HI, I'M <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400 drop-shadow-[0_4px_20px_rgba(245,158,11,0.2)]">
              KAPIL SHIVHARE.
            </span>
          </motion.h1>

          {/* Dynamic Skill Rotator */}
          <div className="h-16 mb-8 flex items-center overflow-hidden">
            <span className="text-xl md:text-2xl font-mono text-gray-500 mr-3">&gt;</span>
            <div className="relative inline-block text-2xl md:text-4xl font-black font-mono select-none">
              <span 
                className="text-transparent select-none transition-colors duration-500" 
                style={{ WebkitTextStroke: `1px ${currentSkill.stroke}` }}         
              >
                {currentSkill.text}
              </span>
              <motion.span
                key={skillIndex} 
                className={`absolute top-0 left-0 overflow-hidden bg-clip-text text-transparent bg-gradient-to-br ${currentSkill.gradient} whitespace-nowrap`}
                style={{ 
                  filter: `drop-shadow(0 2px 6px ${currentSkill.glow})`
                }}
                initial={{ width: "0%" }} 
                animate={{ width: "100%" }} 
                transition={{ 
                  duration: 1.5,
                  ease: "easeInOut" 
                }}
              >
                {currentSkill.text}
              </motion.span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center gap-6 mt-4"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-gray-900 text-white font-bold rounded-full border-2 border-transparent transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-orange-500 hover:border-orange-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] shadow-lg"
            >
              <span className="relative z-10">EXPLORE WORK</span>
            </a>

            <a
              href="#contact"
              className="group px-8 py-4 border-2 border-orange-500 bg-transparent text-orange-600 font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-2 shadow-sm"
            >
              <span className="tracking-wide text-sm font-semibold">INITIALIZE CONTACT</span>
              <span className="group-hover:translate-x-1 transition-transform font-mono">→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: 3D Interactive Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative w-full aspect-square md:aspect-auto flex items-center justify-center p-4 lg:p-0 mt-10 lg:mt-0"
        >
          <InteractivePortrait />

          {/* Decorative accents around the 3D frame */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-orange-500/30 opacity-50 translate-x-4 -translate-y-4 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-orange-500/30 opacity-50 -translate-x-4 translate-y-4 rounded-bl-xl pointer-events-none" />
        </motion.div>

      </div>

    </section>
  );
};

export default Hero;
