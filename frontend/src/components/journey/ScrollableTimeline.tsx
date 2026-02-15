import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { JourneyMilestone } from "../../data/journeyData";

interface ScrollableTimelineProps {
    milestones: JourneyMilestone[];
    activeHour: number;
    onActiveChange: (hour: number) => void;
    onShowMore: (milestone: JourneyMilestone) => void;
    scrollTrigger: number;
}

const cardVariants = {
    hidden: { opacity: 0, x: 60, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    }),
};

const ScrollableTimeline: React.FC<ScrollableTimelineProps> = ({
    milestones,
    activeHour,
    onActiveChange,
    onShowMore,
    scrollTrigger,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (scrollTrigger <= 0) return;
        const idx = milestones.findIndex((m) => m.hour === activeHour);
        if (idx >= 0 && cardRefs.current[idx]) {
            cardRefs.current[idx]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [scrollTrigger, activeHour, milestones]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let maxRatio = 0;
                let bestHour = activeHour;
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        const hourAttr = entry.target.getAttribute("data-hour");
                        if (hourAttr !== null) {
                            bestHour = parseInt(hourAttr, 10);
                        }
                    }
                });
                // A lower threshold here ensures cards at the end of the scroll container
                // can still become active even if they can't reach the top of the viewport.
                if (maxRatio > 0.2 && bestHour !== activeHour) {
                    onActiveChange(bestHour);
                }
            },
            {
                root: containerRef.current,
                // Shift the "active" detection zone slightly towards the top-middle
                rootMargin: "-10% 0px -40% 0px",
                threshold: [0.1, 0.2, 0.3, 0.5, 0.7],
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [milestones, onActiveChange, activeHour]);

    return (
        <div
            ref={containerRef}
            className="relative h-full overflow-y-auto pr-2 journey-scrollbar snap-y snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
        >
            {/* Vertical track line.
                Alignment math:
                Container has pl-16 (64px).
                Dots are at left: -52px (which is 64 - 52 = 12px from outer container).
                Dots bounds are ~20px wide max, center is at left: 22px
                Left 22 perfectly centers the 1px line in the dots.
            */}
            <div
                className="absolute left-[22px] top-0 bottom-0 w-[2px]"
                style={{
                    background: "linear-gradient(to bottom, transparent, #e2e8f0 10%, #cbd5e1 90%, transparent)",
                }}
            />

            <div className="relative pl-16 py-8 space-y-10">
                {milestones.map((milestone, idx) => {
                    const isActive = activeHour === milestone.hour;

                    return (
                        <motion.div
                            key={milestone.hour}
                            ref={(el) => { cardRefs.current[idx] = el; }}
                            data-hour={milestone.hour}
                            custom={idx}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                            layoutId={`journey-card-${milestone.hour}`}
                            className="relative snap-center scroll-my-8"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[52px] top-6 z-10 flex items-center justify-center">
                                {isActive && (
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{
                                            width: 32,
                                            height: 32,
                                            border: "1px solid #f59e0b",
                                            opacity: 0.3,
                                        }}
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.3, 0.1, 0.3],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                )}
                                {/* Outer ring of the dot */}
                                <div
                                    className="rounded-full flex items-center justify-center transition-all duration-500 bg-white"
                                    style={{
                                        width: isActive ? 20 : 14,
                                        height: isActive ? 20 : 14,
                                        border: isActive ? "2px solid #f59e0b" : "2px solid #cbd5e1",
                                        boxShadow: isActive ? "0 4px 10px rgba(245,158,11,0.2)" : "none",
                                    }}
                                >
                                    {/* Inner dot */}
                                    <div
                                        className="rounded-full transition-all duration-500"
                                        style={{
                                            width: isActive ? 8 : 4,
                                            height: isActive ? 8 : 4,
                                            background: isActive ? "#f59e0b" : "#cbd5e1"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Card */}
                            <div
                                className={`relative rounded-xl overflow-hidden transition-all duration-500 bg-white ${isActive
                                    ? "border border-orange-200 shadow-xl"
                                    : "border border-gray-100 shadow-sm hover:shadow-md"
                                    }`}
                            >
                                {/* Image section — removed grayscale, added soft warm overlay if active */}
                                <div className="relative h-48 overflow-hidden bg-gray-50">
                                    <div className={`absolute inset-0 transition-opacity duration-1000 z-10 ${isActive ? 'opacity-0' : 'opacity-10'}`} style={{ backgroundColor: '#111827' }} />

                                    <img
                                        src={milestone.image}
                                        alt={milestone.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105 filter-none' : 'filter blur-[1px] grayscale-[30%]'}`}
                                        loading="lazy"
                                    />

                                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />

                                    {/* Hour badge */}
                                    <div
                                        className="absolute top-3 right-3 px-3 py-1 rounded-full font-mono text-xs font-bold z-20 shadow-sm"
                                        style={{
                                            background: isActive ? "#f59e0b" : "rgba(255,255,255,0.9)",
                                            color: isActive ? "#ffffff" : "#64748b",
                                            border: `1px solid ${isActive ? "#f59e0b" : "#e2e8f0"}`,
                                        }}
                                    >
                                        {milestone.hour === 0 ? "12" : milestone.hour}:00
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Icon + Title */}
                                    <div className="flex items-start gap-4 mb-3">
                                        <span className="text-3xl p-2 bg-orange-50 rounded-lg border border-orange-100/50 shadow-sm">{milestone.icon}</span>
                                        <div className="pt-1">
                                            <h3
                                                className="text-2xl font-bold tracking-tight text-gray-900"
                                            >
                                                {milestone.title}
                                            </h3>
                                            <span
                                                className="text-xs font-mono tracking-wider text-orange-500 font-semibold"
                                            >
                                                {milestone.subtitle}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 leading-relaxed mt-4 mb-5">
                                        {milestone.description}
                                    </p>

                                    {/* Show More button */}
                                    <motion.button
                                        onClick={() => onShowMore(milestone)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative px-5 py-2.5 rounded-lg font-mono text-xs tracking-wider font-semibold overflow-hidden transition-all duration-300"
                                        style={{
                                            background: isActive ? "#fff7ed" : "#f8fafc",
                                            border: `1px solid ${isActive ? "#fdba74" : "#e2e8f0"}`,
                                            color: isActive ? "#ea580c" : "#64748b",
                                        }}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            SHOW MORE
                                            <svg
                                                width="14" height="14" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                className="group-hover:translate-x-1 transition-transform"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </motion.button>
                                </div>

                                {/* Bottom accent line */}
                                <div
                                    className="h-1 w-full"
                                    style={{
                                        background: isActive ? "#f59e0b" : "transparent",
                                    }}
                                />
                            </div>
                        </motion.div>
                    );
                })}

                {/* End marker */}
                <div className="flex items-center gap-3 pl-0 pb-4">
                    <div
                        className="absolute -left-[46px] rounded-full"
                        style={{ width: 8, height: 8, background: "#cbd5e1" }}
                    />
                    <span className="text-xs font-mono text-gray-400 tracking-wider">
            // TO BE CONTINUED...
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ScrollableTimeline;
