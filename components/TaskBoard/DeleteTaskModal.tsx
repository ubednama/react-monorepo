"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Trash2, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DeleteTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onDoNotShowAgainChange: (value: boolean) => void
}

export function DeleteTaskModal({ open, onOpenChange, onConfirm, onDoNotShowAgainChange }: DeleteTaskModalProps) {
  const [mounted, setMounted] = useState(false)
  const [doNotShowAgain, setDoNotShowAgain] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConfirm = () => {
    onDoNotShowAgainChange(doNotShowAgain)
    onConfirm()
    onOpenChange(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="glass dark:bg-black/90 bg-white/90 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 shadow-2xl max-w-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <DialogHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600">
                    <Trash2 className="h-5 w-5 text-white" />
                  </div>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                    Delete Task
                  </DialogTitle>
                </div>
              </DialogHeader>

              <motion.div 
                className="flex flex-col items-center gap-6 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="p-4 rounded-full bg-red-100 dark:bg-red-900/30"
                >
                  <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
                </motion.div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this task?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This action cannot be undone. The task will be permanently removed from your board.
                  </p>
                </div>

                <motion.div 
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Checkbox
                    id="doNotShow"
                    checked={doNotShowAgain}
                    onCheckedChange={(checked) => setDoNotShowAgain(checked as boolean)}
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <label 
                    htmlFor="doNotShow" 
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    Don't show this confirmation again
                  </label>
                </motion.div>

                <div className="flex gap-3 w-full pt-2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => onOpenChange(false)} 
                      className="w-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={handleConfirm}
                      className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Delete Task
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}