'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedButton } from '@/components/ui/animated-button'
import { IconButton } from '@/components/ui/icon-button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Icons } from '@/components/ui/icons'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
// import { FindReplace } from '@/components/ui/find-replace'
// import { HighlightedTextarea } from '@/components/ui/highlighted-textarea'
import { LoadingBar } from '@/components/ui/loading-bar'
import { AnimatePresence } from 'framer-motion'
import { useTypewriterSound } from '@/hooks/use-typewriter-sound'

export default function TextCraft() {
  const [text, setText] = useState('')
  const [history, setHistory] = useState<string[]>([''])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading for effect
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])
  // const [isFindVisible, setIsFindVisible] = useState(false)
  // const [matches, setMatches] = useState<Array<{ start: number; end: number }>>([])
  // const [matches, setMatches] = useState<Array<{ start: number; end: number }>>([])
  // const [currentMatchIndex, setCurrentMatchIndex] = useState(-1)

  const playTypewriterSound = useTypewriterSound()

  // Add to history when text changes
  const addToHistory = useCallback((newText: string) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newText)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const handleTextChange = (newText: string) => {
    if (newText.length < text.length) {
      playTypewriterSound('delete')
    } else if (newText.length > text.length) {
      playTypewriterSound('type')
    }
    setText(newText)
    addToHistory(newText)
  }

  // Undo/Redo functionality
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setText(history[newIndex])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setText(history[newIndex])
    }
  }

  // Text transformation functions
  const transformText = (transformer: (text: string) => string) => {
    const newText = transformer(text)
    setText(newText)
    addToHistory(newText)
  }

  // Case transformation functions
  const caseTransformations = [
    { label: 'UPPER', action: () => transformText(text => text.toUpperCase()) },
    { label: 'lower', action: () => transformText(text => text.toLowerCase()) },
    {
      label: 'Title', action: () => transformText(text => text.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))
    },
    { label: 'Sentence', action: () => transformText(text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()) },
  ]

  const codeTransformations = [
    {
      label: 'camelCase', action: () => transformText(text =>
        text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''))
    },
    {
      label: 'PascalCase', action: () => transformText(text =>
        text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) =>
          word.toUpperCase()).replace(/\s+/g, ''))
    },
    { label: 'snake_case', action: () => transformText(text => text.toLowerCase().replace(/\s+/g, '_')) },
    { label: 'kebab-case', action: () => transformText(text => text.toLowerCase().replace(/\s+/g, '-')) },
    { label: 'CONSTANT_CASE', action: () => transformText(text => text.toUpperCase().replace(/\s+/g, '_')) }
  ]

  const otherTransformations = [
    {
      label: 'aLtErNaTiNg', action: () => transformText(text =>
        text.split('').map((char, index) =>
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join(''))
    },
  ]

  // Remove/Clean functions
  const cleanTransformations = [
    { label: 'Trim', action: () => transformText(text => text.trim()) },
    { label: 'Extra Spaces', action: () => transformText(text => text.replace(/\s+/g, ' ').trim()) },
    { label: 'Empty Lines', action: () => transformText(text => text.replace(/^\s*[\r\n]/gm, '')) },
  ]

  const removeTransformations = [
    {
      label: 'Duplicates', action: () => transformText(text => {
        const lines = text.split('\n')
        const unique = [...new Set(lines)]
        return unique.join('\n')
      })
    },
    { label: 'Numbers', action: () => transformText(text => text.replace(/\d/g, '')) },
    { label: 'Special Chars', action: () => transformText(text => text.replace(/[^a-zA-Z0-9\s]/g, '')) },
  ]

  const reverseTransformation = [
    { label: 'Reverse', action: () => transformText(text => text.split('').reverse().join('')) },
  ]

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleClearText = () => {
    setText('')
    addToHistory('')
  }

  // const handleFindToggle = () => {
  //   setIsFindVisible(!isFindVisible)
  //   if (!isFindVisible) {
  //     // Clear search when closing
  //     setMatches([])
  //     setCurrentMatchIndex(-1)
  //   }
  // }

  // const handleCloseFindReplace = () => {
  //   setIsFindVisible(false)
  //   setMatches([])
  //   setCurrentMatchIndex(-1)
  // }

  // Statistics
  const stats = [
    { label: 'Words', value: text.trim() === '' ? 0 : text.trim().split(/\s+/).length },
    { label: 'Characters', value: text.length },
    { label: 'Lines', value: text === '' ? 0 : text.split('\n').length },
    { label: 'Paragraphs', value: text.trim() === '' ? 0 : text.trim().split(/\n\s*\n/).filter(p => p.trim().length > 0).length },
    { label: 'Spaces', value: (text.match(/\s/g) || []).length },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div
      className="h-screen bg-background text-foreground font-mono flex flex-col overflow-hidden relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="absolute inset-0 flex items-center justify-center bg-background z-50"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <LoadingBar />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex flex-col flex-1 w-full h-full"
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Header
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-0 relative z-10">
          {/* Text Area */}
          <motion.section
            className="flex-1 p-6 min-h-0 relative"
            variants={itemVariants}
          >
            <div className="w-full h-full relative group">
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-black/10 dark:border-white/10 transition-all duration-300 group-hover:border-black/20 dark:group-hover:border-white/20 group-hover:bg-black/10 dark:group-hover:bg-white/10 pointer-events-none"></div>
              <Textarea
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Start typing or paste your text here..."
                className="w-full h-full min-h-60 bg-transparent border-none resize-none text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-600 text-base leading-relaxed focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-transparent overflow-y-auto p-6 font-typewriter relative z-20"
              />
            </div>
            {/* <HighlightedTextarea
        value={text}
        onChange={handleTextChange}
        placeholder="Start typing or paste your text here..."
        className="w-full h-full min-h-[15rem] bg-transparent border-none resize-none text-gray-800 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-600 text-base leading-relaxed focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-transparent overflow-y-auto pr-20"
        matches={matches}
        currentMatchIndex={currentMatchIndex}
      /> */}

            {/* Floating Action Buttons */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 border border-gray-200 dark:border-gray-900">
              <IconButton
                onClick={handleCopyText}
                className="text-blue-600 hover:text-blue-700 shadow-lg"
                aria-label="Copy text"
              >
                <Icons.Copy />
              </IconButton>
              <div className="h-8 w-px bg-gray-300 dark:bg-gray-400"></div>
              <IconButton
                onClick={handleClearText}
                className="text-red-600 hover:text-red-700 shadow-lg"
                aria-label="Clear text"
              >
                <Icons.Trash />
              </IconButton>
            </div>
          </motion.section>

          {/* Action Buttons */}
          <motion.section
            className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 shrink-0"
            variants={itemVariants}
          >
            {/* Case Conversion Group */}
            <ButtonGroup>
              {caseTransformations.map((transform) => (
                <AnimatedButton key={transform.label} onClick={transform.action}>
                  {transform.label}
                </AnimatedButton>
              ))}

              <div className="h-6 w-px bg-gray-400 dark:bg-gray-300 mx-2"></div>

              {codeTransformations.map((transform) => (
                <AnimatedButton key={transform.label} onClick={transform.action}>
                  {transform.label}
                </AnimatedButton>
              ))}

              <div className="h-6 w-px bg-gray-400 dark:bg-gray-300 mx-2"></div>

              {otherTransformations.map((transform) => (
                <AnimatedButton key={transform.label} onClick={transform.action}>
                  {transform.label}
                </AnimatedButton>
              ))}
            </ButtonGroup>

            {/* Remove/Clean Group */}
            <ButtonGroup>
              {cleanTransformations.map((transform) => (
                <AnimatedButton key={transform.label} onClick={transform.action}>
                  {transform.label}
                </AnimatedButton>
              ))}

              <div className="h-6 w-px bg-gray-400 dark:bg-gray-300 mx-2"></div>

              {removeTransformations.map((transform) => (
                <AnimatedButton key={transform.label} onClick={transform.action}>
                  {transform.label}
                </AnimatedButton>
              ))}

              <div className="h-6 w-px bg-gray-300 mx-2"></div>

              {reverseTransformation.map((transform) => (
                <AnimatedButton key={transform.label} onClick={transform.action}>
                  {transform.label}
                </AnimatedButton>
              ))}
            </ButtonGroup>
          </motion.section>

          {/* Statistics Footer */}
          <Footer stats={stats} itemVariants={itemVariants} />
        </main>
      </motion.div>
    </motion.div>
  );
}
