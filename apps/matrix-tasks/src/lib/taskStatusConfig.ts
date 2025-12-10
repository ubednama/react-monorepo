import type { TaskStatus, StatusConfig } from "@/types/tasks"

export const taskStatusConfig: Record<TaskStatus, StatusConfig> = {
  "do-first": {
    bgColor: "bg-red-50/80 dark:bg-red-950/20 border-red-100 dark:border-red-900/50",
    titleTextColor: "text-red-700 dark:text-red-400",
    textColor: "text-red-700 dark:text-red-300",
    hover: "hover:bg-red-100 dark:hover:bg-red-900/40",
    borderColor: "border-red-200 dark:border-red-800",
  },
  "do-later": {
    bgColor: "bg-blue-50/80 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50",
    titleTextColor: "text-blue-700 dark:text-blue-400",
    textColor: "text-blue-700 dark:text-blue-300",
    hover: "hover:bg-blue-100 dark:hover:bg-blue-900/40",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  "delegate": {
    bgColor: "bg-amber-50/80 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/50",
    titleTextColor: "text-amber-700 dark:text-amber-400",
    textColor: "text-amber-700 dark:text-amber-300",
    hover: "hover:bg-amber-100 dark:hover:bg-amber-900/40",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  "eliminate": {
    bgColor: "bg-zinc-50/80 dark:bg-zinc-900/20 border-zinc-100 dark:border-zinc-800/50",
    titleTextColor: "text-zinc-700 dark:text-zinc-400",
    textColor: "text-zinc-700 dark:text-zinc-300",
    hover: "hover:bg-zinc-100 dark:hover:bg-zinc-900/40",
    borderColor: "border-zinc-200 dark:border-zinc-800",
  },
}