'use client'

import { useRef, useEffect, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface HighlightedTextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  matches?: Array<{ start: number; end: number }>
  currentMatchIndex?: number
}

export const HighlightedTextarea = forwardRef<HTMLTextAreaElement, HighlightedTextareaProps>(
  ({ value, onChange, placeholder, className, matches = [], currentMatchIndex = -1 }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const highlightRef = useRef<HTMLDivElement>(null)
    const [scrollTop, setScrollTop] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    // Combine refs
    useEffect(() => {
      if (ref && typeof ref === 'object') {
        ref.current = textareaRef.current
      }
    }, [ref])

    // Scroll to current match when it changes (without forcing focus)
    useEffect(() => {
      if (textareaRef.current && matches.length > 0 && currentMatchIndex >= 0) {
        const textarea = textareaRef.current
        const currentMatch = matches[currentMatchIndex]
        
        if (currentMatch) {
          // Set cursor position to the start of the current match
          textarea.setSelectionRange(currentMatch.start, currentMatch.end)
          // Only focus if the textarea is already focused or if no other element has focus
          if (document.activeElement === textarea || document.activeElement === document.body) {
            textarea.focus()
          }
        }
      }
    }, [currentMatchIndex, matches])

    // Sync scroll between textarea and highlight layer
    const handleScroll = () => {
      if (textareaRef.current) {
        setScrollTop(textareaRef.current.scrollTop)
        setScrollLeft(textareaRef.current.scrollLeft)
      }
    }

    // Create highlighted text with matches
    const createHighlightedText = () => {
      if (matches.length === 0) {
        return value.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
      }

      let highlightedText = ''
      let lastIndex = 0

      matches.forEach((match, index) => {
        // Add text before match
        const beforeMatch = value.slice(lastIndex, match.start)
        highlightedText += beforeMatch.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')

        // Add highlighted match
        const matchText = value.slice(match.start, match.end)
        const isCurrentMatch = index === currentMatchIndex
        const highlightClass = isCurrentMatch 
          ? 'bg-orange-400 text-black' 
          : 'bg-yellow-300 text-black'
        
        highlightedText += `<span class="${highlightClass}">${matchText.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}</span>`
        
        lastIndex = match.end
      })

      // Add remaining text after last match
      const remainingText = value.slice(lastIndex)
      highlightedText += remainingText.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')

      return highlightedText
    }

    return (
      <div className="relative">
        {/* Highlight layer */}
        <div
          ref={highlightRef}
          className={cn(
            "absolute inset-0 pointer-events-none overflow-hidden",
            "text-base leading-relaxed font-mono",
            "whitespace-pre-wrap break-words",
            "text-transparent",
            className
          )}
          style={{
            transform: `translate(-${scrollLeft}px, -${scrollTop}px)`,
            padding: textareaRef.current ? getComputedStyle(textareaRef.current).padding : '0.75rem',
            border: textareaRef.current ? getComputedStyle(textareaRef.current).border : 'none',
          }}
          dangerouslySetInnerHTML={{
            __html: createHighlightedText()
          }}
        />
        
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onClick={() => {
            // Ensure textarea gets focus when clicked
            if (textareaRef.current) {
              textareaRef.current.focus()
            }
          }}
          placeholder={placeholder}
          className={cn(
            "bg-transparent resize-none relative z-10",
            "text-base leading-relaxed focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-transparent",
            "font-mono overflow-y-auto",
            className
          )}
        />
      </div>
    )
  }
)

HighlightedTextarea.displayName = 'HighlightedTextarea'