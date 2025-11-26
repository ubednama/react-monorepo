'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface IconButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  'aria-label': string
}

export function IconButton({
  children,
  onClick,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: IconButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}