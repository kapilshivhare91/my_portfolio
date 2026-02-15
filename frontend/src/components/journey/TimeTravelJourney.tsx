import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NarrativeClock from "./NarrativeClock";
import ScrollableTimeline from "./ScrollableTimeline";
import JourneyDetailView from "./JourneyDetailView";
import { journeyMilestones, JourneyMilestone } from "../../data/journeyData";

const TimeTravelJourney: React.FC = () => {
    const [activeHour, setActiveHour] = useState(0);
    const [selectedMilestone, setSelectedMilestone] =
        useState<JourneyMilestone | null>(null);
    const [isWarping, setIsWarping] = useState(false);
    const [scrollTrigger, setScrollTrigger] = useState(0);

    const handleClockClick = useCallback((hour: number) => {
        setActiveHour(hour);
        setScrollTrigger((prev) => prev + 1);
    }, []);

    const handleScrollActiveChange = useCallback((hour: number) => {
        setActiveHour(hour);
    }, []);

    const handleShowMore = useCallback((milestone: JourneyMilestone) => {
        setIsWarping(true);
        setTimeout(() => {
            setSelectedMilestone(milestone);
            setIsWarping(false);
        }, 650);
    }, []);

    const handleCloseDetail = useCallback(() => {
        setSelectedMilestone(null);
    }, []);

    const [isMobile, setIsMobile] = useState(false);
    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <section
            id="journey"
            className="relative w-full overflow-hidden bg-[#FFF9F2] border-y border-orange-100"
            style={{ minHeight: "100vh" }}
        >
            {/* Section header */}
            <div className="relative z-10 text-center pt-24 pb-12 px-4">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-md text-[10px] font-mono tracking-widest text-orange-600 font-bold mb-4 shadow-sm"
                >
                    CHAPTER_LOG // TIME_MACHINE
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900"
                >
                    <span className="text-gray-400">MY </span>
                    <span className="text-gray-900">
                        JOURNEY
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gray-500 font-mono tracking-wider"
                >
                    Navigate through time • Click the clock or scroll to explore
                </motion.p>
            </div>

            {/* Main content area */}
            <div
                className="relative mx-auto max-w-7xl px-4 md:px-8"
                style={{ height: isMobile ? "auto" : "calc(100vh - 220px)", minHeight: 600 }}
            >
                <AnimatePresence mode="wait">
                    {selectedMilestone ? (
                        <JourneyDetailView
                            key="detail"
                            milestone={selectedMilestone}
                            onClose={handleCloseDetail}
                        />
                    ) : (
                        <motion.div
                            key="split"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`h-full ${isMobile ? "flex flex-col" : "flex flex-row"}`}
                        >
                            {/* Left: Clock */}
                            <div
                                className={`flex items-center justify-center ${isMobile ? "relative py-6" : "w-[40%] sticky top-0 self-start pt-8"
                                    }`}
                            >
                                {isMobile ? (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                                        <NarrativeClock
                                            activeHour={activeHour}
                                            onHourClick={handleClockClick}
                                            isWarping={isWarping}
                                            isMobile
                                        />
                                    </div>
                                ) : (
                                    <div className="relative">
                                        {/* Subtle warm glow behind clock */}
                                        <div
                                            className="absolute inset-0 -m-16 rounded-full blur-3xl opacity-20 pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)",
                                            }}
                                        />
                                        <NarrativeClock
                                            activeHour={activeHour}
                                            onHourClick={handleClockClick}
                                            isWarping={isWarping}
                                        />

                                        {/* Active milestone label below clock */}
                                        <motion.div
                                            key={activeHour}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center mt-12 bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-md"
                                        >
                                            <span className="text-[10px] font-mono font-bold text-gray-400 tracking-widest block mb-2 uppercase">
                                                Active Phase
                                            </span>
                                            <span className="text-xl font-black text-gray-900 block">
                                                {journeyMilestones.find((m: JourneyMilestone) => m.hour === activeHour)?.title}
                                            </span>
                                            <span className="text-xs font-mono font-semibold text-orange-500 tracking-wider block mt-1">
                                                {journeyMilestones.find((m: JourneyMilestone) => m.hour === activeHour)?.subtitle}
                                            </span>
                                        </motion.div>
                                    </div>
                                )}
                            </div>

                            {/* Right: Timeline */}
                            <div className={`${isMobile ? "relative z-10 flex-1" : "w-[60%] h-full pl-8"}`}>
                                <ScrollableTimeline
                                    milestones={journeyMilestones}
                                    activeHour={activeHour}
                                    onActiveChange={handleScrollActiveChange}
                                    onShowMore={handleShowMore}
                                    scrollTrigger={scrollTrigger}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </section>
    );
};

export default TimeTravelJourney;
