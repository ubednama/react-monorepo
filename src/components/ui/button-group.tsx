'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonGroupProps {
  children: ReactNode
  className?: string
  title?: string
}

export function ButtonGroup({ children, className, title }: ButtonGroupProps) {
  return (
    <div className={cn('mb-2 sm:mb-4', className)}>
      {title && (
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
      )}
      <motion.div
        className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 p-2 sm:p-3 bg-gray-100 dark:bg-gray-900 sm:rounded-lg border border-gray-200 dark:border-gray-700"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}