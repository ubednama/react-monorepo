"use client";
"use client";

import { Button, Input } from "@repo/ui"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, AlertCircle, ArrowUp, ArrowRight, ArrowLeft, ArrowDown, Keyboard } from "lucide-react"
import type { TaskStatus } from "@/types/tasks"

interface AddTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (task: string, section: TaskStatus) => void
}

const sectionConfig = {
  "do-first": {
    shortcut: "Cmd/Ctrl + ↑",
    color: "from-red-500 to-rose-600",
    icon: ArrowUp,
    title: "Do First",
    description: "Urgent & Important"
  },
  "do-later": {
    shortcut: "Cmd/Ctrl + →",
    color: "from-blue-500 to-cyan-600",
    icon: ArrowRight,
    title: "Do Later",
    description: "Important but not urgent"
  },
  delegate: {
    shortcut: "Cmd/Ctrl + ←",
    color: "from-amber-500 to-yellow-600",
    icon: ArrowLeft,
    title: "Delegate",
    description: "Urgent but not important"
  },
  eliminate: {
    shortcut: "Cmd/Ctrl + ↓",
    color: "from-slate-500 to-gray-600",
    icon: ArrowDown,
    title: "Eliminate",
    description: "Neither urgent nor important"
  },
}

export function AddTaskModal({ open, onOpenChange, onSubmit }: AddTaskModalProps) {
  console.log("AddTaskModal Render: open =", open);
  const [task, setTask] = useState("")
  const [error, setError] = useState("")
  const [selectedSection, setSelectedSection] = useState<TaskStatus>("do-first")

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setTask("")
      setError("")
      setSelectedSection("do-first")
      setIsSubmitting(false)
    }
  }, [open])

  const validateTask = (text: string): string => {
    if (!text.trim()) return "Task cannot be empty"
    if (text.length < 3) return "Task must be at least 3 characters long"
    if (text.length > 200) return "Task must be less than 200 characters"
    return ""
  }

  const handleSubmit = () => {
    const trimmedTask = task.trim()
    const validationError = validateTask(trimmedTask)

    if (validationError) {
      setError(validationError)
      return
    }

    onSubmit(trimmedTask, selectedSection)
    onOpenChange(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTask(value)
    if (error) {
      const validationError = validateTask(value)
      setError(validationError)
    }
  }

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      const isCmdOrCtrl = e.metaKey || e.ctrlKey

      if (isCmdOrCtrl) {
        let newSection: TaskStatus | null = null
        if (e.key === "ArrowUp") newSection = "do-first"
        else if (e.key === "ArrowRight") newSection = "do-later"
        else if (e.key === "ArrowLeft") newSection = "delegate"
        else if (e.key === "ArrowDown") newSection = "eliminate"

        if (newSection) {
          e.preventDefault()
          setSelectedSection(newSection)

          // Auto-submit if task is valid
          const trimmedTask = task.trim()
          if (!validateTask(trimmedTask)) {
            setIsSubmitting(true)
            setTimeout(() => {
              onSubmit(trimmedTask, newSection!)
              onOpenChange(false)
            }, 100) // Short delay to show selection animation
          }
        } else if (e.key === "Enter") {
          e.preventDefault()
          handleSubmit()
        }
      } else if (e.key === "Enter") {
        e.preventDefault()
        handleSubmit()
      } else if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, task, selectedSection])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-101 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full max-w-xl pointer-events-auto rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6"
            >
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <Plus className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      Create Task
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 pl-9">
                  Type your task and use shortcuts to assign priority.
                </p>
              </div>

              <div className="space-y-6">
                {/* Input Section */}
                <div className="space-y-2">
                  <Input
                    id="task"
                    value={task}
                    onChange={handleInputChange}
                    placeholder="What needs to be done?"
                    className={`
                      text-lg px-4 py-6 bg-transparent border-2 border-zinc-100 dark:border-zinc-900 
                      focus:border-zinc-300 dark:focus:border-zinc-700
                      rounded-xl transition-all duration-200
                      ${error ? 'border-red-500/50 dark:border-red-500/50 focus:border-red-500' : ''}
                      placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                    `}
                    autoFocus
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center text-xs px-1">
                    <AnimatePresence>
                      {error ? (
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium"
                        >
                          <AlertCircle className="h-3 w-3" />
                          <span>{error}</span>
                        </motion.div>
                      ) : <div></div>}
                    </AnimatePresence>
                    <span className={`font-mono ${task.length > 180 ? 'text-amber-500' : 'text-zinc-400 dark:text-zinc-600'}`}>
                      {task.length}/200
                    </span>
                  </div>
                </div>

                {/* Section Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                    Quadrant
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.entries(sectionConfig) as [TaskStatus, (typeof sectionConfig)[keyof typeof sectionConfig]][]).map(
                      ([section, config]) => {
                        const IconComponent = config.icon
                        const isSelected = selectedSection === section

                        // Explicit colors for minimal design
                        const activeColors = {
                          "do-first": "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-700 dark:text-red-400",
                          "do-later": "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400",
                          "delegate": "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400",
                          "eliminate": "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400"
                        }

                        return (
                          <motion.button
                            key={section}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedSection(section)}
                            animate={isSubmitting && isSelected ? { scale: [1, 1.05, 1], transition: { duration: 0.3 } } : {}}
                            className={`
                              relative flex flex-col p-4 rounded-xl border-2 text-left transition-all duration-200
                              ${isSelected
                                ? activeColors[section] + ' ring-1 ring-offset-0 ' + (section === 'do-first' ? 'ring-red-200 dark:ring-red-900' : section === 'do-later' ? 'ring-blue-200 dark:ring-blue-900' : section === 'delegate' ? 'ring-amber-200 dark:ring-amber-900' : 'ring-zinc-200 dark:ring-zinc-800')
                                : 'bg-transparent border-zinc-100 dark:border-zinc-900 text-zinc-500 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                              }
                            `}
                          >
                            <div className="flex items-start justify-between w-full mb-2">
                              <IconComponent className={`h-5 w-5 ${isSelected ? 'opacity-100' : 'opacity-50'}`} />
                              <div className={`hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border ${isSelected ? 'border-current opacity-40' : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
                                {config.shortcut.split(" + ").map((key, i) => (
                                  <span key={i}>{key === "Cmd/Ctrl" ? "⌘" : key}</span> // Simplified symbol
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className="font-semibold text-sm">
                                {config.title}
                              </div>
                              <div className={`text-xs mt-0.5 ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                                {config.description}
                              </div>
                            </div>
                          </motion.button>
                        )
                      }
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                  <Button
                    variant="ghost"
                    onClick={() => onOpenChange(false)}
                    className="px-6 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!!error || !task.trim() || isSubmitting}
                    className={`
                        px-8 font-medium shadow-none hover:opacity-90 transition-all duration-200 text-white rounded-lg
                        ${selectedSection === 'do-first' ? 'bg-red-600 hover:bg-red-700' :
                        selectedSection === 'do-later' ? 'bg-blue-600 hover:bg-blue-700' :
                          selectedSection === 'delegate' ? 'bg-amber-600 hover:bg-amber-700' :
                            'bg-zinc-600 hover:bg-zinc-700'}
                    `}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>Add Task</>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}