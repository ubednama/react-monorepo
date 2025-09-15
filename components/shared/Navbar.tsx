"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import DigitalClock from "./DigitalClock";
import { motion } from "framer-motion";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.nav 
      className="flex items-center justify-between px-4 py-2 backdrop-blur-sm bg-white/80 dark:bg-black/80 border-b border-gray-200/50 dark:border-gray-800/50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-6">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src="/matrix-logo.svg"
                alt="TaskMatrix Logo"
                width={32}
                height={32}
                className="size-8 drop-shadow-sm"
              />
            </motion.div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            TaskMatrix
          </span>
        </motion.div>
        <div className="flex items-center gap-2">
          <motion.span 
            className="text-teal-600 dark:text-teal-400 text-sm hidden sm:flex bg-slate-100/80 dark:bg-gray-800/80 px-2.5 py-1.5 rounded-lg font-medium backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Quick decision making tool
          </motion.span>
          <motion.span 
            className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.05 }}
          >
            BETA
          </motion.span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <DigitalClock />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg h-8 w-8 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 backdrop-blur-sm transition-all duration-200"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-3">
        <DigitalClock />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg h-8 w-8 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 backdrop-blur-sm"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-blue-600" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
