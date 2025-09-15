"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import type { TaskStatus } from "@/types/tasks"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, Keyboard, ArrowUp, ArrowRight, ArrowLeft, ArrowDown } from "lucide-react"

interface SelectSectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (section: TaskStatus) => void
  task: string
}

const sectionConfig = {
  "do-first": { 
    shortcut: "Shift + ↑", 
    color: "from-emerald-500 to-green-600", 
    icon: ArrowUp,
    title: "Do First",
    description: "Urgent & Important"
  },
  "do-later": { 
    shortcut: "Shift + →", 
    color: "from-blue-500 to-cyan-600", 
    icon: ArrowRight,
    title: "Do Later",
    description: "Important but not urgent"
  },
  delegate: { 
    shortcut: "Shift + ←", 
    color: "from-amber-500 to-yellow-600", 
    icon: ArrowLeft,
    title: "Delegate",
    description: "Urgent but not important"
  },
  eliminate: { 
    shortcut: "Shift + ↓", 
    color: "from-red-500 to-rose-600", 
    icon: ArrowDown,
    title: "Eliminate",
    description: "Neither urgent nor important"
  },
}

export function SelectSectionModal({ open, onOpenChange, onSelect, task }: SelectSectionModalProps) {
  const [selectedSection, setSelectedSection] = useState<TaskStatus>("do-first")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open || !e.shiftKey) return

      const sectionMap: Record<string, TaskStatus> = {
        ArrowUp: "do-first",
        ArrowRight: "do-later",
        ArrowLeft: "delegate",
        ArrowDown: "eliminate",
      }

      if (sectionMap[e.key]) {
        setSelectedSection(sectionMap[e.key])
        onSelect(sectionMap[e.key])
        onOpenChange(false)
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onSelect, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="glass dark:bg-black/90 bg-white/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 shadow-2xl max-w-lg">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <DialogHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Choose Priority
                  </DialogTitle>
                </div>
                <DialogDescription className="text-gray-600 dark:text-gray-300">
                  Select the priority level for: <span className="font-medium text-gray-800 dark:text-gray-200">"{task}"</span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 mt-6">
                {(Object.entries(sectionConfig) as [TaskStatus, (typeof sectionConfig)[keyof typeof sectionConfig]][]).map(
                  ([section, config], index) => {
                    const IconComponent = config.icon
                    return (
                      <motion.button
                        key={section}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          setSelectedSection(section)
                          onSelect(section)
                          onOpenChange(false)
                        }}
                        className={`
                          w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200
                          ${selectedSection === section 
                            ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }
                          bg-gradient-to-r ${config.color} hover:shadow-lg group
                        `}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-white text-lg">{config.title}</div>
                            <div className="text-white/80 text-sm">{config.description}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                          <Keyboard className="h-4 w-4 text-white/80" />
                          <span className="text-white/90 text-sm font-mono">{config.shortcut}</span>
                        </div>
                      </motion.button>
                    )
                  }
                )}
                
                <motion.div 
                  className="flex justify-end pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => onOpenChange(false)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}