"use client";
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Icons } from './Icons'
import { AnimatedButton } from '@/components/ui/AnimatedButton'

interface FindReplaceProps {
  text: string
  onTextChange: (newText: string) => void
  onClose: () => void
  matches: Array<{ start: number; end: number }>
  setMatches: (matches: Array<{ start: number; end: number }>) => void
  currentMatchIndex: number
  setCurrentMatchIndex: (index: number) => void
}

export function FindReplace({
  text,
  onTextChange,
  onClose,
  matches,
  setMatches,
  currentMatchIndex,
  setCurrentMatchIndex
}: FindReplaceProps) {
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const findInputRef = useRef<HTMLInputElement>(null)

  // Find matches in text
  const findMatches = useCallback((searchText: string, targetText: string, caseSensitive: boolean) => {
    if (!searchText) return []

    const flags = caseSensitive ? 'g' : 'gi'
    const regex = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags)
    const matches: Array<{ start: number; end: number }> = []
    let match

    while ((match = regex.exec(targetText)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length
      })
      if (regex.lastIndex === match.index) {
        regex.lastIndex++
      }
    }

    return matches
  }, [])

  // Live search as you type (immediate, no debounce for browser-like experience)
  useEffect(() => {
    if (!findText.trim()) {
      setMatches([])
      setCurrentMatchIndex(-1)
      return
    }

    const newMatches = findMatches(findText, text, caseSensitive)
    setMatches(newMatches)

    // Set current match index
    const newIndex = newMatches.length > 0 ? 0 : -1
    setCurrentMatchIndex(newIndex)
  }, [findText, text, caseSensitive, setMatches, setCurrentMatchIndex, findMatches])

  // Focus input when component mounts
  useEffect(() => {
    if (findInputRef.current) {
      findInputRef.current.focus()
    }
  }, [])

  const handleFindNext = () => {
    if (matches.length === 0) return
    const nextIndex = (currentMatchIndex + 1) % matches.length
    setCurrentMatchIndex(nextIndex)
  }

  const handleFindPrevious = () => {
    if (matches.length === 0) return
    const prevIndex = currentMatchIndex <= 0 ? matches.length - 1 : currentMatchIndex - 1
    setCurrentMatchIndex(prevIndex)
  }

  const handleReplace = () => {
    if (matches.length === 0 || currentMatchIndex === -1) return

    const currentMatch = matches[currentMatchIndex]
    const beforeMatch = text.slice(0, currentMatch.start)
    const afterMatch = text.slice(currentMatch.end)
    const newText = beforeMatch + replaceText + afterMatch

    onTextChange(newText)
  }

  const handleReplaceAll = () => {
    if (matches.length === 0 || !findText.trim()) return

    try {
      const escapedText = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(escapedText, caseSensitive ? 'g' : 'gi')
      const newText = text.replace(regex, replaceText)
      onTextChange(newText)
    } catch (error) {
      // Invalid regex, do nothing
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.shiftKey) {
        handleFindPrevious()
      } else {
        handleFindNext()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg min-w-[320px]">
      {/* Find Section */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 relative">
          <input
            ref={findInputRef}
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              // Ensure the input stays focused
              if (findInputRef.current) {
                findInputRef.current.focus()
              }
            }}
            onBlur={(e) => {
              // Prevent blur unless clicking outside the component
              setTimeout(() => {
                if (findInputRef.current && document.activeElement !== findInputRef.current) {
                  findInputRef.current.focus()
                }
              }, 10)
            }}
            placeholder="Find"
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            autoFocus
          />
        </div>

        {/* Match Counter */}
        <div className="text-xs text-slate-400 min-w-[60px] text-center">
          {matches.length > 0 ? `${currentMatchIndex + 1} of ${matches.length}` : '0 of 0'}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-1">
          <AnimatedButton
            onClick={handleFindPrevious}
            disabled={matches.length === 0}
            size="sm"
            variant="ghost"
            className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-50"
          >
            <Icons.ChevronUp className="w-3 h-3" />
          </AnimatedButton>
          <AnimatedButton
            onClick={handleFindNext}
            disabled={matches.length === 0}
            size="sm"
            variant="ghost"
            className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-50"
          >
            <Icons.ChevronDown className="w-3 h-3" />
          </AnimatedButton>
        </div>

        {/* Case Sensitive Toggle */}
        <AnimatedButton
          onClick={() => setCaseSensitive(!caseSensitive)}
          size="sm"
          variant="ghost"
          className={`p-1 text-xs font-mono ${caseSensitive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Aa
        </AnimatedButton>

        {/* Close Button */}
        <AnimatedButton
          onClick={onClose}
          size="sm"
          variant="ghost"
          className="p-1 text-slate-400 hover:text-slate-200"
        >
          <Icons.X className="w-3 h-3" />
        </AnimatedButton>
      </div>

      {/* Replace Section */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Replace"
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Replace Buttons */}
        <div className="flex items-center gap-1">
          <AnimatedButton
            onClick={handleReplace}
            disabled={matches.length === 0}
            size="sm"
            className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Replace
          </AnimatedButton>
          <AnimatedButton
            onClick={handleReplaceAll}
            disabled={matches.length === 0}
            size="sm"
            className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            All
          </AnimatedButton>
        </div>
      </div>
    </div>
  )
}