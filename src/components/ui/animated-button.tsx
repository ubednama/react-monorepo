'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 8px rgb(255, 255, 255, 0.2)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
}

const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'bg-transparent hover:bg-gray-200 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300'
}

const sizeStyles = {
  sm: 'px-3 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[44px]', // Touch-friendly
  md: 'px-4 py-2 text-base min-h-[44px]',
  lg: 'px-6 py-3 text-lg min-h-[48px]'
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
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-md transition-colors font-medium',
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      variants={buttonVariants}
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}