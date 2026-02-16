import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl w-full p-16 rounded-3xl bg-gradient-to-b from-orange-500/5 to-transparent border border-gray-200 shadow-xl relative overflow-hidden bg-white"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_20px_#f59e0b]" />

        <h2 className="text-[10px] font-mono text-orange-600 tracking-[0.3em] mb-6 uppercase">READY FOR INTEGRATION?</h2>
        <h3 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-8">LET'S BUILD THE FUTURE.</h3>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto font-light">
          Available for strategic partnerships, leadership roles, and high-impact engineering projects. Let's discuss your next breakthrough.
        </p>

        <a
          href="mailto:nexus@dev.com"
          className="inline-block px-12 py-5 bg-gray-900 text-white font-black tracking-widest text-sm hover:bg-orange-500 transition-all rounded-sm shadow-[0_0_30px_rgba(245,158,11,0.2)] active:scale-95"
        >
          INITIATE PROTOCOL
        </a>
      </motion.div>
    </section>
  );
};

export default Contact;
