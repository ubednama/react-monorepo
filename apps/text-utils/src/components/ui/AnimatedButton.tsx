"use client";
'use client'

import { Button } from '@repo/ui'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@repo/ui'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

const MotionButton = motion.create(Button)

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 8px rgb(255, 255, 255, 0.2)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
}

// Map custom variants to Shadcn variants
const variantMap: Record<string, "default" | "secondary" | "destructive" | "ghost" | "link" | "outline"> = {
  primary: 'default',
  secondary: 'secondary',
  danger: 'destructive',
  ghost: 'ghost'
}

// Map custom sizes to Shadcn sizes
const sizeMap: Record<string, "default" | "sm" | "lg" | "icon"> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg'
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: AnimatedButtonProps) {
  return (
    <MotionButton
      onClick={onClick}
      disabled={disabled}
      variant={variantMap[variant]}
      size={sizeMap[size]}
      className={cn(
        'font-medium px-2',
        className
      )}
      variants={buttonVariants}
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      aria-label={ariaLabel}
    >
      {children}
    </MotionButton>
  )
}