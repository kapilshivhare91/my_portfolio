import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = "" }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Card;
