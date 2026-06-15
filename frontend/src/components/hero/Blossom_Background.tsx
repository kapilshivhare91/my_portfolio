import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function OrangeBlossomBackground({ bgClass = "bg-[#0a0604]" }) {
  // We use useMemo so the leaves are only calculated once and don't re-render randomly
  const leaves = useMemo(() => {
    // Generates 40 random leaves
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      // Random size between 8px and 22px
      size: Math.random() * 14 + 8,
      // Random horizontal start position
      left: Math.random() * 100, 
      // Random fall duration (slower looks more graceful)
      duration: Math.random() * 15 + 15, 
      // Negative delay means they are already falling when the page loads!
      delay: Math.random() * -30, 
      // How far left/right it sways in the wind
      sway: Math.random() * 60 - 30, 
      // Starting rotation
      rotate: Math.random() * 360,
      // Slight opacity variations
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    // pointer-events-none ensures you can still click the project cards over the background!
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${bgClass}`}>
      
      {/* 1. MUDDY ORANGE ESSENCE (Gradients) */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 15% 0%, rgba(217, 119, 6, 0.15) 0%, transparent 40%), 
            radial-gradient(circle at 85% 100%, rgba(234, 88, 12, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(124, 45, 18, 0.05) 0%, transparent 60%)
          `
        }}
      />

      {/* 2. THE FALLING LEAVES (Cherry Blossom Effect) */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute top-0 shadow-sm"
          style={{
            width: leaf.size,
            height: leaf.size,
            left: `${leaf.left}%`,
            opacity: leaf.opacity,
            // THIS CSS creates the perfect leaf / cherry blossom petal shape!
            borderRadius: "0 80% 0 80%",
            // Vibrant orange gradient for the leaf
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            // Add a subtle glow
            boxShadow: "0 0 10px rgba(234, 88, 12, 0.4)",
          }}
          // The Animation Path
          animate={{
            y: ["-10vh", "110vh"], // Fall from above screen to below screen
            x: [0, leaf.sway, -leaf.sway, 0], // Sway left and right
            rotate: [leaf.rotate, leaf.rotate + 360], // Spin smoothly
          }}
          transition={{
            y: { duration: leaf.duration, repeat: Infinity, ease: "linear", delay: leaf.delay },
            // Swaying back and forth takes half the time of falling
            x: { duration: leaf.duration / 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: leaf.delay },
            // Spinning
            rotate: { duration: leaf.duration * 0.8, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}
    </div>
  );
}
