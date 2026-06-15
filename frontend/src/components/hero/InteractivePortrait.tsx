import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const InteractivePortrait: React.FC = () => {
    // Motion values for tracking mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Calculate mouse position relative to center [-1, 1]
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Normalized values between -1 and 1
            const normalizedX = (e.clientX - centerX) / centerX;
            const normalizedY = (e.clientY - centerY) / centerY;

            mouseX.set(normalizedX);
            mouseY.set(normalizedY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Springs for smooth animation
    const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    // Face rotation (max 15 degrees)
    const rotateX = useTransform(smoothMouseY, [-1, 1], [15, -15]);
    const rotateY = useTransform(smoothMouseX, [-1, 1], [-15, 15]);

    // Pupil translation (clamp within eye sockets, e.g., max 5px movement in any direction)
    const pupilX = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
    const pupilY = useTransform(smoothMouseY, [-1, 1], [-5, 5]);

    return (
        <div className="flex items-center justify-center p-8 relative group">
            {/* Container simulating a futuristic frame (Midnight Voyager Theme: Black/Blue/Bronze) */}
            <div className="relative w-80 h-[420px] bg-[#0a0f18] rounded-2xl border-2 border-slate-800/80 shadow-[0_0_40px_rgba(14,165,233,0.1)] overflow-hidden">

                {/* Background Ambient Glows */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e1726] to-black z-0"></div>
                {/* Bronze glow */}
                <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#CD7F32]/15 blur-[60px] rounded-full pointer-events-none"></div>
                {/* Cyan/Blue glow */}
                <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-cyan-600/15 blur-[60px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-end" style={{ perspective: "1000px" }}>

                    {/* Base Body - Static or slight movement */}
                    <div className="absolute bottom-[-10px] w-[140%] h-[55%] left-[-20%] flex justify-center items-end opacity-95">
                        <img
                            src="/base-body.png"
                            alt="Shoulders and Body"
                            className="object-cover object-top w-full h-full drop-shadow-2xl brightness-90 transition-all duration-500 group-hover:brightness-100"
                            onError={(e) => {
                                // Fallback if image not found
                                (e.target as HTMLImageElement).style.visibility = 'hidden';
                                e.currentTarget.parentElement!.insertAdjacentHTML(
                                    'beforeend',
                                    '<div class="absolute inset-x-12 bottom-0 h-4/5 bg-slate-800 rounded-t-[100px] border-t-2 border-[#CD7F32]/30 shadow-inner"></div>'
                                );
                            }}
                        />
                    </div>

                    {/* 3D Rotating Head Container */}
                    <motion.div
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d",
                        }}
                        className="absolute bottom-[28%] w-[160px] h-[210px]"
                    >
                        {/* The Head Image */}
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
                            <img
                                src="/face.jpg"
                                alt="Head"
                                className="w-[140px] h-[190px] object-cover object-center rounded-[70px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] border border-[#CD7F32]/20"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.visibility = 'hidden';
                                    e.currentTarget.parentElement!.insertAdjacentHTML(
                                        'beforeend',
                                        '<div class="w-[140px] h-[190px] bg-slate-700 rounded-[70px] border-2 border-slate-600 shadow-inner"></div>'
                                    );
                                }}
                            />
                        </div>

                        {/* Eyes Overlay - positioned relative to the head */}
                        {/* Overlaid on top of the original eyes location, roughly top 22% */}
                        <div
                            style={{ transform: "translateZ(30px)" }}
                            className="absolute top-[22%] left-0 w-full flex justify-center gap-3 z-20 pointer-events-none"
                        >
                            {/* Left Eye Socket */}
                            <div className="w-[20px] h-[20px] bg-[#050b14] rounded-full flex items-center justify-center overflow-hidden border border-[#CD7F32]/60 shadow-[inset_0_0_8px_rgba(0,0,0,0.8),0_0_12px_rgba(205,127,50,0.4)] relative">
                                {/* Pupil */}
                                <motion.div
                                    style={{ x: pupilX, y: pupilY }}
                                    className="w-[6px] h-[6px] bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] flex items-center justify-center"
                                >
                                    <div className="w-0.5 h-0.5 bg-white rounded-full opacity-80" />
                                </motion.div>
                            </div>

                            {/* Right Eye Socket */}
                            <div className="w-[20px] h-[20px] bg-[#050b14] rounded-full flex items-center justify-center overflow-hidden border border-[#CD7F32]/60 shadow-[inset_0_0_8px_rgba(0,0,0,0.8),0_0_12px_rgba(205,127,50,0.4)] relative">
                                {/* Pupil */}
                                <motion.div
                                    style={{ x: pupilX, y: pupilY }}
                                    className="w-[6px] h-[6px] bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] flex items-center justify-center"
                                >
                                    <div className="w-0.5 h-0.5 bg-white rounded-full opacity-80" />
                                </motion.div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default InteractivePortrait;
