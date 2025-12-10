"use client";

import { Button, Input } from "@repo/ui"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Edit3, AlertCircle, Save } from "lucide-react"

interface EditTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (task: string) => void
  initialValue: string
}

export function EditTaskModal({ open, onOpenChange, onSubmit, initialValue }: EditTaskModalProps) {
  const [task, setTask] = useState(initialValue)
  const [error, setError] = useState("")

  useEffect(() => {
    setTask(initialValue)
    setError("")
  }, [initialValue])

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

    onSubmit(trimmedTask)
    setError("")
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

  const hasChanges = task.trim() !== initialValue.trim()

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
              className="w-full max-w-md pointer-events-auto rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6"
            >
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    <Edit3 className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Edit Task
                  </h2>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Modify your task to better reflect your current priorities.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    id="task"
                    value={task}
                    onChange={handleInputChange}
                    placeholder="Enter your task description..."
                    className={`
                      text-lg px-4 py-3 bg-transparent border-2 border-zinc-100 dark:border-zinc-900 
                      focus:border-amber-500 dark:focus:border-amber-500/50
                      rounded-xl transition-all duration-200
                      ${error ? 'border-red-500/50 dark:border-red-500/50 focus:border-red-500' : ''}
                      placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                    `}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
                      ) : (
                        hasChanges ? (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-amber-600 dark:text-amber-400 flex items-center gap-1"
                          >
                            <Save className="h-3 w-3" />
                            <span>Changes detected</span>
                          </motion.div>
                        ) : <div></div>
                      )}
                    </AnimatePresence>
                    <span className={`font-mono ${task.length > 180 ? 'text-amber-500' : 'text-zinc-400 dark:text-zinc-600'}`}>
                      {task.length}/200
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="ghost"
                      onClick={() => onOpenChange(false)}
                      className="px-6 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleSubmit}
                      disabled={!!error || !task.trim() || !hasChanges}
                      className="px-6 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                    >
                      Update Task
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}