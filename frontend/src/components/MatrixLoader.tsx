import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatrixLoaderProps {
    onComplete: () => void;
}

const MatrixLoader: React.FC<MatrixLoaderProps> = ({ onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<'loading' | 'welcome' | 'exit'>('loading');

    useEffect(() => {
        // Sequence Timers
        const welcomeTimer = setTimeout(() => {
            setPhase('welcome');
        }, 5500); // Extended loading time

        const exitTimer = setTimeout(() => {
            setPhase('exit');
        }, 8500); // Let the welcome screen sit longer

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 9500); // 1s for the exit slide animation

        return () => {
            clearTimeout(welcomeTimer);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    // Matrix Digital Rain Setup
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Realistic Matrix characters (Katakana + Latin)
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize) + 1;

        // Track the Y coordinate (number of drops) for each column
        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            // Randomize initial positions so they don't all start at the top
            drops[x] = Math.random() * -100;
        }

        let animationFrameId: number;
        let lastDrawTime = 0;
        const fps = 30; // Matrix runs best at ~30 frames/sec
        const interval = 1000 / fps;

        const draw = (currentTime: number) => {
            animationFrameId = requestAnimationFrame(draw);

            if (currentTime - lastDrawTime < interval) return;
            lastDrawTime = currentTime;

            // Create the trailing effect by painting over the canvas with a high-opacity black/charcoal rectangle
            // The darker the fill style, the shorter the trails
            ctx.fillStyle = 'rgba(17, 24, 39, 0.15)'; // Deep charcoal, 15% opacity for nice long trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Warm Saffron/Gold color for the characters
            ctx.fillStyle = '#f59e0b';
            ctx.font = `${fontSize}px monospace`;
            ctx.textAlign = 'center';

            for (let i = 0; i < drops.length; i++) {
                // Add occasional brightness variations for "leader" characters
                const isBright = Math.random() > 0.95;
                ctx.fillStyle = isBright ? '#fde68a' : '#f59e0b'; // Light yellow for some drops

                const text = charset.charAt(Math.floor(Math.random() * charset.length));
                const x = i * fontSize + (fontSize / 2);
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Reset drop to top randomly when it hits the bottom
                // Added randomness to make the rain feel more organic instead of uniform walls
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <style>
                {`
          /* Saffron Magnifier Sweep Effect */
          .custom-loader {
            width: fit-content;
            font-weight: 900;
            font-family: monospace;
            font-size: 36px;
            letter-spacing: 6px;
            color: transparent;
            /* 
               Base is charcoal, center is glowing saffron/gold.
               We make the gradient huge (300%) so we can animate it sweeping across.
            */
            background: linear-gradient(
                90deg, 
                rgba(17,24,39,0.2) 0%, 
                rgba(17,24,39,0.2) 40%, 
                #f59e0b 48%, 
                #fde68a 50%,
                #f59e0b 52%, 
                rgba(17,24,39,0.2) 60%, 
                rgba(17,24,39,0.2) 100%
            );
            background-size: 300% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            animation: magnifierSweep 2s infinite linear;
          }
          
          .custom-loader::before {
            content: "SYSTEM_BOOT...";
          }

          @keyframes magnifierSweep {
            0% { background-position: 100% 0; }
            100% { background-position: -20% 0; }
          }
        `}
            </style>

            <motion.div
                className="fixed inset-0 z-[9999] bg-[#111827] flex items-center justify-center overflow-hidden origin-center"
                initial={{ opacity: 1, scaleX: 1, scaleY: 1 }}
                animate={
                    phase === 'exit'
                        ? {
                            // Sequence: [initial, squash to thin line, vanish to dot/fade]
                            scaleY: [1, 0.01, 0],
                            scaleX: [1, 1, 0],
                            opacity: [1, 1, 0],
                        }
                        : { opacity: 1, scaleX: 1, scaleY: 1 }
                }
                transition={
                    phase === 'exit'
                        ? {
                            duration: 0.6,
                            times: [0, 0.4, 1], // Time percentage for each keyframe
                            ease: ["easeIn", "easeOut"]
                        }
                        : { duration: 0 }
                }
            >
                {/* Canvas Background */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full opacity-60"
                />

                {/* Foreground Content Wrapper */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                    <AnimatePresence mode="wait">
                        {phase === 'loading' && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative mb-12">
                                    {/* Outer rotating light ring */}
                                    <motion.div
                                        className="absolute -inset-4 rounded-full border border-orange-500/10"
                                        style={{ borderTopColor: "#f59e0b", borderRightColor: "transparent" }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                    {/* Inner counter-rotating ring for complexity */}
                                    <motion.div
                                        className="absolute -inset-2 rounded-full border border-orange-500/20"
                                        style={{ borderBottomColor: "#fde68a", borderLeftColor: "#ea580c" }}
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Avatar Container */}
                                    <div className="w-24 h-24 rounded-full overflow-hidden border border-orange-500/30 bg-[#1f2937] flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                        {/* Avatar image - The user can replace this source with their own picture! */}
                                        <img
                                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=111827"
                                            alt="User Profile"
                                            className="w-full h-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
                                        />
                                        {/* Inner darkening overlay for depth */}
                                        <div className="absolute inset-0 shadow-inner rounded-full pointer-events-none border border-black/50" />
                                    </div>
                                </div>

                                <div className="custom-loader" />
                                <motion.div
                                    className="mt-8 px-4 py-1 border border-orange-500/30 rounded bg-orange-500/10 text-orange-500 font-mono text-xs uppercase tracking-[0.3em]"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                >
                                    Establishing Connection
                                </motion.div>
                            </motion.div>
                        )}

                        {phase === 'welcome' && (
                            <motion.div
                                key="welcome"
                                initial={{ opacity: 0, scale: 0.8, y: 30, filter: "blur(20px)" }}
                                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.25, 1, 0.5, 1],
                                    filter: { duration: 1.5 }
                                }}
                                className="text-center flex flex-col items-center justify-center"
                            >
                                <div className="overflow-hidden mb-2">
                                    <motion.h1
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                                        className="text-6xl md:text-8xl font-black tracking-[0.3em] font-sans"
                                        style={{
                                            color: "#ffffff",
                                            textShadow: "0 0 40px rgba(245, 158, 11, 0.6), 0 0 80px rgba(245, 158, 11, 0.2)"
                                        }}
                                    >
                                        WELCOME
                                    </motion.h1>
                                </div>

                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "100%", opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 1.2, ease: 'easeInOut' }}
                                    className="h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-4 w-3/4 max-w-sm"
                                />

                                <motion.span
                                    initial={{ opacity: 0, letterSpacing: "0em" }}
                                    animate={{ opacity: 0.6, letterSpacing: "0.2em" }}
                                    transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                                    className="text-xs font-mono text-orange-200 mt-6 block uppercase"
                                >
                                    Authentication Approved
                                </motion.span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Deep ambient vignette glow around the edges to frame the matrix */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at center, transparent 30%, #111827 100%)' }} />
            </motion.div>
        </>
    );
};

export default MatrixLoader;
