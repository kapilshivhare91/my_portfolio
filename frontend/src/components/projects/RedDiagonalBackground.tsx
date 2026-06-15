import React from "react";
import { motion } from "framer-motion";

export default function RedDiagonalBackground() {
  // This CSS perfectly recreates the 45-degree angled lines.
  // We use bright red (#ff0000) fading into a dark red (#7a0000) to give the 
  // lines that 3D/bevelled look before they hit the transparent gaps.
  const redStripes = `
    linear-gradient(-45deg,
      transparent 0%, transparent 10%,
      
      /* Top Right Cluster */
      #ff0000 10%, #7a0000 11.5%, transparent 11.5%,
      transparent 13%,
      #ff0000 13%, #660000 20%, transparent 20%, /* Thick Line */
      transparent 23%,
      #ff0000 23%, #880000 26%, transparent 26%,
      transparent 28%,
      #ff0000 28%, #990000 29%, transparent 29%,
      
      /* Huge Black Void in the middle */
      transparent 29%, transparent 71%,
      
      /* Bottom Left Cluster */
      #ff0000 71%, #990000 72%, transparent 72%,
      transparent 74%,
      #ff0000 74%, #880000 77%, transparent 77%,
      transparent 80%,
      #ff0000 80%, #660000 87%, transparent 87%, /* Thick Line */
      transparent 88.5%,
      #ff0000 88.5%, #7a0000 90%, transparent 90%,
      
      transparent 90%, transparent 100%
    )
  `;

  // This acts as an eraser. It keeps the edges 100% visible, 
  // but perfectly erases the lines in a giant oval in the center of the screen.
  const centerFadeMask = `radial-gradient(ellipse 120% 120% at center, transparent 30%, black 80%)`;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#FFF0E0] overflow-hidden">

      {/* Background Grid Pattern (Subtle, matching Hero) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.099]"
        style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* LAYER 1: The Glow Effect */}
      {/* We blur the bottom layer to create that neon glowing light bleed */}
      <motion.div
        className="absolute inset-0 opacity-60 blur-xl"
        style={{
          background: redStripes,
          WebkitMaskImage: centerFadeMask,
          maskImage: centerFadeMask
        }}
        // Subtle pulsing animation so the background feels alive
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* LAYER 2: The Sharp Lines */}
      {/* This sits on top and provides the crisp, hard edges */}
      <motion.div
        className="absolute inset-0 opacity-100"
        style={{
          background: redStripes,
          WebkitMaskImage: centerFadeMask,
          maskImage: centerFadeMask
        }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

    </div>
  );
}
