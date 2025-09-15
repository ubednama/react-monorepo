"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DigitalClock = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const dateString = now.toLocaleDateString([], {
        month: 'short',
        day: 'numeric'
      });
      setTime(timeString);
      setDate(dateString);
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-slate-100/80 to-slate-200/80 dark:from-slate-800/80 dark:to-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.span 
        className="text-sm font-mono font-medium text-slate-800 dark:text-slate-200 tabular-nums tracking-wide"
        key={time}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {time}
      </motion.span>
      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium border-l border-slate-200/50 dark:border-slate-700/50 pl-2">
        {date}
      </span>
    </motion.div>
  );
};

export default DigitalClock;