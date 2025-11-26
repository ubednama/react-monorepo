'use client'

import { motion } from 'framer-motion'
import { StatItem } from './stat-item'

interface FooterProps {
  stats: Array<{ label: string; value: number; mobileLabel?: string }>
  itemVariants: any
}

export function Footer({ stats, itemVariants }: FooterProps) {
  return (
    <motion.footer
      className="md:px-6 md:py-4 px-2 py-2 bg-gray-900 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-gray-400 shrink-0 gap-2 md:gap-4 sm:gap-2"
      variants={itemVariants}
    >
      <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 md:gap-x-6 gap-y-2">
        {stats.map((stat) => (
          <StatItem key={stat.label} label={stat.label} value={stat.value} mobileLabel={stat.mobileLabel} />
        ))}
      </div>
      <div className="text-xs text-center sm:text-right">
        Built with ❤️ by <a href="https://github.com/ubednama" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline">ubednama</a>
      </div>
    </motion.footer>
  )
}