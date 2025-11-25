"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="glass dark:bg-black/90 bg-white/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 shadow-2xl max-w-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <DialogHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600">
                    <Edit3 className="h-5 w-5 text-white" />
                  </div>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Edit Task
                  </DialogTitle>
                </div>
                <DialogDescription className="text-gray-600 dark:text-gray-300">
                  Modify your task to better reflect your current priorities.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <label htmlFor="task" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Task Description
                  </label>
                  <Input
                    id="task"
                    value={task}
                    onChange={handleInputChange}
                    placeholder="Enter your task description..."
                    className={`
                      mt-1 bg-white/50 dark:bg-black/50 border-2 transition-all duration-200
                      ${error 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400'
                      }
                      text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400
                    `}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    autoFocus
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center text-xs">
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="flex items-center gap-1 text-red-500 dark:text-red-400"
                        >
                          <AlertCircle className="h-3 w-3" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className={`text-gray-500 dark:text-gray-400 ${task.length > 180 ? 'text-yellow-500' : ''} ${task.length > 195 ? 'text-red-500' : ''}`}>
                      {task.length}/200
                    </span>
                  </div>
                  
                  {hasChanges && !error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1"
                    >
                      <Save className="h-3 w-3" />
                      <span>Changes detected</span>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="ghost"
                      onClick={() => onOpenChange(false)}
                      className="px-6 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!!error || !task.trim() || !hasChanges}
                      className="px-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Update Task
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}