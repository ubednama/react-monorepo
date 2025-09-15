import type { TaskStatus, StatusConfig } from "@/types/tasks"

export const taskStatusConfig: Record<TaskStatus, StatusConfig> = {
  "do-first": {
    bgColor: "bg-emerald-100/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
    titleTextColor: "text-emerald-700 dark:text-emerald-300",
    textColor: "text-emerald-600 dark:text-emerald-200",
    hover: "hover:bg-emerald-200 hover:text-emerald-800 dark:hover:bg-emerald-800/30 dark:hover:text-emerald-100",
    borderColor: "border-emerald-300 dark:border-emerald-700",
  },
  "do-later": {
    bgColor: "bg-blue-100/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800",
    titleTextColor: "text-blue-700 dark:text-blue-300",
    textColor: "text-blue-600 dark:text-blue-200",
    hover: "hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-blue-800/30 dark:hover:text-blue-100",
    borderColor: "border-blue-300 dark:border-blue-700",
  },
  "delegate": {
    bgColor: "bg-amber-100/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800",
    titleTextColor: "text-amber-700 dark:text-amber-300",
    textColor: "text-amber-600 dark:text-amber-200",
    hover: "hover:bg-amber-200 hover:text-amber-800 dark:hover:bg-amber-800/30 dark:hover:text-amber-100",
    borderColor: "border-amber-300 dark:border-amber-700",
  },
  "eliminate": {
    bgColor: "bg-rose-100/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800",
    titleTextColor: "text-rose-700 dark:text-rose-300",
    textColor: "text-rose-600 dark:text-rose-200",
    hover: "hover:bg-rose-200 hover:text-rose-800 dark:hover:bg-rose-800/30 dark:hover:text-rose-100",
    borderColor: "border-rose-300 dark:border-rose-700",
  },
}