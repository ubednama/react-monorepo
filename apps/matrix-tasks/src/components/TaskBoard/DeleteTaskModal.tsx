"use client";

import { Button, Checkbox } from "@repo/ui"
import { AlertTriangle, Trash2 } from "lucide-react"
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
              className="w-full max-w-sm pointer-events-auto rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <Trash2 className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Delete this task?
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    This action cannot be undone.
                  </p>
                </div>

                <motion.label
                  className="flex items-center gap-3 p-3 w-full rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <Checkbox
                    id="doNotShow"
                    checked={doNotShowAgain}
                    onCheckedChange={(checked) => setDoNotShowAgain(checked as boolean)}
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Don't ask me again
                  </span>
                </motion.label>

                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="w-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20"
                  >
                    Delete
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