'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonGroupProps {
  children: ReactNode
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <motion.div
      className="flex flex-wrap items-center mb-2 sm:mb-4 justify-center sm:justify-start gap-1.5 p-2 sm:p-3 bg-gray-100 dark:bg-gray-900 sm:rounded-lg border border-gray-200 dark:border-gray-700"
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
  )
}