import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NarrativeClockProps {
    activeHour: number;
    onHourClick: (hour: number) => void;
    isWarping: boolean;
    isMobile?: boolean;
}

const CLOCK_SIZE = 400;
const CENTER = 200;

const MILESTONES = [0, 3, 6, 9];

// Helper to convert minute number to Roman string
const toRoman = (num: number): string => {
    if (num === 0) return "00";
    const lookup: Record<string, number> = {
        L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
    };
    let roman = "";
    for (const i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
};

const NarrativeClock: React.FC<NarrativeClockProps> = ({
    activeHour,
    onHourClick,
    isWarping,
    isMobile = false,
}) => {
    // Real time state
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Hand rotations
    const baseRotation = activeHour * 30;
    const warpRotation = baseRotation + 1080;

    // Real time rotations (continuous parsing for jump rings)
    const hr = currentTime.getHours() % 12;
    const min = currentTime.getMinutes();

    const hourRot = hr * 30 + min * 0.5;

    const scale = isMobile ? 0.65 : 1;
    const displaySize = CLOCK_SIZE * scale;

    const HOUR_ROMANS = [
        "XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"
    ];

    return (
        <div
            className={`relative flex items-center justify-center ${isMobile ? "opacity-30 pointer-events-none" : ""
                }`}
            style={{ width: displaySize, height: displaySize }}
        >
            <svg
                viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
                width={displaySize}
                height={displaySize}
                className={isMobile ? "" : "drop-shadow-2xl"}
            >
                <defs>
                    {/* Background Dial Brush */}
                    <radialGradient id="dialDark" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#4A413D" />
                        <stop offset="100%" stopColor="#221D1C" />
                    </radialGradient>

                    {/* Rose/Copper Gold Gradient for Bezel and Accents */}
                    <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E9B9A6" />
                        <stop offset="25%" stopColor="#C48877" />
                        <stop offset="50%" stopColor="#FFD1B3" />
                        <stop offset="75%" stopColor="#A86657" />
                        <stop offset="100%" stopColor="#E9B9A6" />
                    </linearGradient>

                    {/* Metallic Silver for Lugs/Case */}
                    <linearGradient id="silver" x1="10%" y1="0%" x2="90%" y2="100%">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="50%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>

                    {/* Active Milestone Glow */}
                    <filter id="glowRose">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.5" />
                    </filter>

                    <filter id="innerDepth">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
                    </filter>
                </defs>

                {/* === OUTER WATCH CASE === */}
                {/* Case Base (Silverish) */}
                <circle cx={CENTER} cy={CENTER} r={180} fill="url(#silver)" filter="url(#shadow)" />
                {/* Thick Rose Gold Bezel */}
                <circle cx={CENTER} cy={CENTER} r={168} fill="none" stroke="url(#roseGold)" strokeWidth="16" />
                {/* Inner Bezel shadow rim */}
                <circle cx={CENTER} cy={CENTER} r={160} fill="none" stroke="#111" strokeWidth="2" opacity="0.6" />

                {/* === DIAL FACE === */}
                <circle cx={CENTER} cy={CENTER} r={159} fill="url(#dialDark)" />

                {/* Subtle radial brushing rings */}
                <circle cx={CENTER} cy={CENTER} r={140} fill="none" stroke="#fff" strokeWidth="1" opacity="0.03" />
                <circle cx={CENTER} cy={CENTER} r={120} fill="none" stroke="#fff" strokeWidth="1" opacity="0.03" />
                <circle cx={CENTER} cy={CENTER} r={100} fill="none" stroke="#fff" strokeWidth="1" opacity="0.03" />

                {/* === ACTUAL TIME: JUMP HOUR DISCS === */}
                <g transform={`translate(${CENTER}, ${CENTER})`}>

                    {/* Dark recess well for the rotating discs */}
                    <circle cx="0" cy="0" r="86" fill="#141110" filter="url(#innerDepth)" />

                    {/* Clip path not needed because we use a path cover for the bottom half! */}

                    {/* ROTATING DISCS GROUP */}
                    <g stroke="none">
                        {/* HOUR RING (Outer) */}
                        <g transform={`rotate(${-hourRot})`}>
                            {/* Texture/Tracks */}
                            <circle cx="0" cy="0" r="85" fill="#3D3532" stroke="#5A4E4A" strokeWidth="1" />
                            <circle cx="0" cy="0" r="55" fill="#2E2826" stroke="#5A4E4A" strokeWidth="1" />
                            {HOUR_ROMANS.map((roman, i) => {
                                const angle = i * 30;
                                return (
                                    <g key={`hr-${i}`} transform={`rotate(${angle})`}>
                                        <text
                                            x="0" y="-70"
                                            textAnchor="middle" dominantBaseline="middle"
                                            fill="#C48877" fontSize="16"
                                            fontFamily="'Times New Roman', Times, serif"
                                            className="select-none"
                                        >
                                            {roman}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>

                        {/* MINUTE DISPLAY (Static Boxed Roman) */}
                        <g>
                            {/* Inner blank base for minute box */}
                            <circle cx="0" cy="0" r="54" fill="#1C1817" />
                            <rect
                                x="-24" y="-56"
                                width="48" height="24"
                                rx="4"
                                fill="#2E2826" stroke="#5A4E4A" strokeWidth="1"
                            />
                            {/* Convert the exact minute (0-59) to Roman */}
                            <text
                                x="0" y="-44"
                                textAnchor="middle" dominantBaseline="middle"
                                fill="#E9B9A6" fontSize="14"
                                fontWeight="bold"
                                fontFamily="'Times New Roman', Times, serif"
                                className="select-none"
                            >
                                {toRoman(min)}
                            </text>
                            {/* Small aesthetic inner center cap */}
                            <circle cx="0" cy="0" r="28" fill="#111" />
                        </g>
                    </g>

                    {/* === HALF-MOON COVER (The Titan Watch Window Effect) === */}
                    {/* This hides the bottom half of the rotating discs */}
                    <path d={`M -86 0 A 86 86 0 0 0 86 0 Z`} fill="url(#dialDark)" />

                    {/* Frame edge for the semicircular window */}
                    {/* Explicitly drawing a perfect arc */}
                    <path d={`M -86 0 A 86 86 0 0 1 86 0`} fill="none" stroke="url(#roseGold)" strokeWidth="2" />
                    <line x1="-86" y1="0" x2="86" y2="0" stroke="url(#roseGold)" strokeWidth="2" />

                    {/* Branding placed on the solid lower half panel */}
                    <text x="0" y="30" textAnchor="middle" fill="url(#roseGold)" opacity="0.8" fontSize="14" fontWeight="600" letterSpacing="3" fontFamily="'Inter', sans-serif">
                        NEXUS
                    </text>
                    <text x="0" y="45" textAnchor="middle" fill="#A86657" fontSize="8" letterSpacing="1" fontFamily="'Inter', sans-serif">
                        CHRONOGRAPH
                    </text>

                    {/* === TIME POINTER === */}
                    {/* Stationary pointer at the center pointing UP to 12 o'clock */}
                    <circle cx="0" cy="0" r="12" fill="url(#roseGold)" filter="url(#shadow)" />
                    <circle cx="0" cy="0" r="6" fill="#1C1817" />
                    {/* Stem */}
                    <line x1="0" y1="-12" x2="0" y2="-22" stroke="url(#roseGold)" strokeWidth="2" />
                    {/* Pointer tip overlapping the rings */}
                    <circle cx="0" cy="-24" r="3" fill="none" stroke="url(#roseGold)" strokeWidth="1.5" />
                    <polygon points="-4,-27 4,-27 0,-33" fill="url(#roseGold)" />
                </g>

                {/* === JOURNEY NUMBERS (0, 3, 6, 9) AND TICKS === */}
                {Array.from({ length: 12 }, (_, i) => {
                    const angle = i * 30;
                    const angleRad = (angle - 90) * (Math.PI / 180);
                    const isMilestone = MILESTONES.includes(i);
                    const isActive = activeHour === i;

                    if (isMilestone) {
                        const x = CENTER + 125 * Math.cos(angleRad);
                        const y = CENTER + 125 * Math.sin(angleRad);
                        return (
                            <g key={`journey-${i}`} onClick={() => onHourClick(i)} className="cursor-pointer">
                                {isActive && (
                                    <rect
                                        x={x - 22} y={y - 22}
                                        width="44" height="44"
                                        rx="8"
                                        fill="#3D3532"
                                        stroke="url(#roseGold)" strokeWidth="2.5"
                                        filter="url(#glowRose)"
                                        style={{ transition: "all 0.3s ease" }}
                                    />
                                )}
                                <text
                                    x={x} y={y}
                                    textAnchor="middle" dominantBaseline="central"
                                    fill={isActive ? "#FFD1B3" : "#A86657"}
                                    fontSize={isActive ? "22" : "18"}
                                    fontWeight="bold"
                                    fontFamily="'Inter', sans-serif"
                                    className="select-none"
                                    style={{ transition: "all 0.3s ease" }}
                                >
                                    {i}
                                </text>
                            </g>
                        );
                    } else {
                        // Just subtle ticks for the empty hours (1, 2, 4, 5, 7, 8, 10, 11)
                        const x1 = CENTER + 140 * Math.cos(angleRad);
                        const y1 = CENTER + 140 * Math.sin(angleRad);
                        const x2 = CENTER + 130 * Math.cos(angleRad);
                        const y2 = CENTER + 130 * Math.sin(angleRad);
                        return <line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5A4E4A" strokeWidth="2.5" strokeLinecap="round" />;
                    }
                })}

                {/* === JOURNEY OUTER RING POINTER === */}
                {/* A rotating ring inside the bezel that points to the active journey milestone */}
                <motion.g
                    animate={{ rotate: isWarping ? warpRotation : baseRotation }}
                    transition={isWarping ? { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } : { type: "spring", stiffness: 60, damping: 12 }}
                    style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                >
                    {/* Ring track */}
                    <circle cx={CENTER} cy={CENTER} r={155} fill="none" stroke="url(#roseGold)" strokeWidth="1" opacity="0.6" />
                    {/* Pointer / Triangle indicating from outside the clock */}
                    <polygon
                        points={`
                            ${CENTER - 7},${CENTER - 158}
                            ${CENTER + 7},${CENTER - 158}
                            ${CENTER},${CENTER - 146}
                        `}
                        fill="url(#roseGold)"
                        filter="url(#glowRose)"
                    />
                    {/* Small jewel at the back of the triangle */}
                    <circle cx={CENTER} cy={CENTER - 155} r="2" fill="#fff" opacity="0.8" />
                </motion.g>

            </svg>
        </div>
    );
};

export default NarrativeClock;
