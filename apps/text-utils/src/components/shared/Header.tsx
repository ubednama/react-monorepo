"use client";

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Icons } from '@/components/features/Icons'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
// import { FindReplace } from '@/components/features/FindReplace'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

interface HeaderProps {
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
}

export function Header({ onUndo, onRedo, canUndo, canRedo }: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // delay state update to avoid synchronous render warning
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const isDarkMode = mounted && resolvedTheme === 'dark'
  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  // Animation variants for the header
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }

  // const handleCloseFindReplace = () => {
  //   onFindToggle()
  // }

  return (
    <motion.header
      className={`${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-50`}
      variants={itemVariants}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden relative`}>
              <Image
                src="/logo.png"
                alt="TextUtils Logo"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
              TextUtils
            </h1>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 relative">
            {/* Find Input Field - appears to the left of find icon when visible */}
            {/* <AnimatePresence>
              {isFindVisible && (
                <motion.div
                  className="absolute right-full mr-2 top-0"
                  initial={{ opacity: 0, x: 20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: "auto" }}
                  exit={{ opacity: 0, x: 20, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FindReplace
                    text={text}
                    onTextChange={onTextChange}
                    onClose={handleCloseFindReplace}
                    matches={matches}
                    setMatches={setMatches}
                    currentMatchIndex={currentMatchIndex}
                    setCurrentMatchIndex={setCurrentMatchIndex}
                  />
                </motion.div>
              )}
            </AnimatePresence> */}

            {/* Find Button */}
            {/* <AnimatedButton
              onClick={onFindToggle}
              variant="ghost"
              size="sm"
              className={`p-2 ${isFindVisible 
                ? (isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-gray-200 text-gray-800') 
                : (isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100')
              }`}
              aria-label="Find and Replace"
            >
              <Icons.Search className="w-4 h-4" />
            </AnimatedButton> */}

            {/* Separator */}
            <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-600' : 'bg-gray-300'}`}></div>

            {/* Undo Button */}
            <AnimatedButton
              onClick={onUndo}
              disabled={!canUndo}
              variant="ghost"
              size="sm"
              className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label="Undo"
            >
              <Icons.Undo className="w-4 h-4" />
            </AnimatedButton>

            {/* Redo Button */}
            <AnimatedButton
              onClick={onRedo}
              disabled={!canRedo}
              variant="ghost"
              size="sm"
              className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label="Redo"
            >
              <Icons.Redo className="w-4 h-4" />
            </AnimatedButton>

            {/* Separator */}
            <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-600' : 'bg-gray-300'}`}></div>

            {/* Dark Mode Toggle */}
            <AnimatedButton
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
              aria-label="Toggle dark mode"
            >
              {resolvedTheme === 'dark' ? <Icons.Sun className="w-4 h-4" /> : <Icons.Moon className="w-4 h-4" />}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </motion.header>
  )
}