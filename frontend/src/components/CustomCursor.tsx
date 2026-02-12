
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('a');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Small Dot */}
      <div 
        className="fixed w-2 h-2 bg-cyan-400 rounded-full mix-blend-difference"
        style={{ 
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Outer Ring */}
      <motion.div 
        className={`fixed border border-cyan-400/50 rounded-full transition-all duration-300 ${
          isHovering ? 'w-16 h-16 -ml-8 -mt-8 bg-cyan-400/10' : 'w-8 h-8 -ml-4 -mt-4'
        }`}
        style={{ 
          x: cursorX, 
          y: cursorY,
        }}
      />
    </div>
  );
};

export default CustomCursor;
