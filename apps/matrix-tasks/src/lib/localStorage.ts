import type { TaskStateWithCompletion } from "@/components/types/tasks.types"

const STORAGE_KEY = "task_manager_state"

export const saveState = (state: TaskStateWithCompletion) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (err) {
    console.error("Error saving state:", err)
  }
}

export const loadState = (): TaskStateWithCompletion | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error loading state:", err)
    return undefined
  }
}

