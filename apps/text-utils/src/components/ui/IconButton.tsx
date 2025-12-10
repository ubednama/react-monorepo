"use client";
'use client'

import { Button } from '@repo/ui'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@repo/ui'

interface IconButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  'aria-label': string
}

const MotionButton = motion.create(Button)

export function IconButton({
  children,
  onClick,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: IconButtonProps) {
  return (
    <MotionButton
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'transition-colors',
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={ariaLabel}
    >
      {children}
    </MotionButton>
  )
}