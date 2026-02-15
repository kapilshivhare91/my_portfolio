import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JourneyMilestone } from "../../data/journeyData";

interface JourneyDetailViewProps {
    milestone: JourneyMilestone;
    onClose: () => void;
}

const JourneyDetailView: React.FC<JourneyDetailViewProps> = ({
    milestone,
    onClose,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute inset-0 z-50 overflow-y-auto journey-scrollbar bg-white"
        >
            {/* Decorative dial background watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                <svg width="800" height="800" viewBox="0 0 800 800">
                    <circle cx="400" cy="400" r="380" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 12" />
                    <circle cx="400" cy="400" r="300" fill="none" stroke="#64748b" strokeWidth="1" />
                </svg>
            </div>

            {/* Header with close button */}
            <div
                className="sticky top-0 z-10 backdrop-blur-xl border-b border-gray-100"
                style={{ background: "rgba(255,255,255,0.9)" }}
            >
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider text-gray-600 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all font-semibold"
                    >
                        <svg
                            width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        BACK TO TIMELINE
                    </motion.button>

                    <span className="font-mono text-xs text-orange-600 tracking-wider font-bold bg-orange-50 px-3 py-1 rounded shadow-sm border border-orange-100">
                        {milestone.hour === 0 ? "12" : milestone.hour}:00 //
                        CHAPTER {milestone.hour === 0 ? "I" : milestone.hour === 3 ? "II" : milestone.hour === 6 ? "III" : "IV"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                {/* Full color Hero image */}
                <motion.div
                    layoutId={`journey-card-${milestone.hour}`}
                    className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-gray-200"
                    style={{ aspectRatio: "16/7" }}
                >
                    <img
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <span className="text-5xl mb-4 block drop-shadow-md">{milestone.icon}</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-white drop-shadow-lg">
                                {milestone.title}
                            </h2>
                            <span className="font-mono text-sm tracking-wider text-orange-400 font-bold bg-gray-900/50 px-3 py-1 rounded backdrop-blur-md">
                                {milestone.subtitle}
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Detail text */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="space-y-8"
                >
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                        {milestone.detailContent}
                    </p>

                    {/* Decorative divider */}
                    <div className="flex items-center gap-4 py-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
                        <span className="text-orange-400 text-lg">◈</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
                    </div>

                    {/* Phase indicator box */}
                    <div
                        className="rounded-2xl p-8 border border-orange-100 shadow-sm"
                        style={{
                            background: "#fffbeb",
                        }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                            />
                            <span className="font-mono text-sm text-orange-600 tracking-wider font-bold">
                                PHASE {milestone.hour === 0 ? "01" : milestone.hour === 3 ? "02" : milestone.hour === 6 ? "03" : "04"} OF 04
                            </span>
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed">
                            {milestone.description}
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default JourneyDetailView;
