"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";
import type { DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import type { TaskStatus } from "@/types/tasks";
import { saveState, loadState } from "@/lib/localStorage";
import type { TaskWithCompletion, TaskStateWithCompletion } from "../types/tasks.types";

const initialState: TaskStateWithCompletion = {
  items: {},
  "do-first": { title: "DO FIRST", ids: [] },
  "do-later": { title: "DO LATER", ids: [] },
  delegate: { title: "DELEGATE", ids: [] },
  eliminate: { title: "ELIMINATE", ids: [] },
  tags: {},
  titles: { "Do first": "", "Do later": "", Delegate: "", Eliminate: "" },
};

export const useTaskBoard = () => {
  const [state, setState] = useState<TaskStateWithCompletion>(initialState);
  const [editingTitle, setEditingTitle] = useState<TaskStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedState = loadState();
    setState(savedState || initialState);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveState(state);
    }
  }, [state, isLoading]);

  /**
   * Handles the completion of a drag operation
   * 
   * This function is called when a user finishes dragging a task. It handles:
   * 1. Moving tasks between sections (e.g., from "do-first" to "delegate")
   * 2. Reordering tasks within the same section
   * 3. Updating task status and position in the state
   * 
   * @param result - Contains information about the drag operation:
   *   - draggableId: The ID of the task being dragged
   *   - source: Where the drag started (section and position)
   *   - destination: Where the task was dropped (section and position)
   */
  const findContainer = (id: string): TaskStatus | undefined => {
    if (id in state.items) {
      return state.items[id]?.status;
    }

    const sections: TaskStatus[] = ["do-first", "do-later", "delegate", "eliminate"];
    if (sections.includes(id as TaskStatus)) {
      return id as TaskStatus;
    }

    return sections.find((key) => state[key].ids.includes(id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) {
      return;
    }

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(overId as string);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setState((prev) => {
      const overItems = prev[overContainer].ids;
      const overIndex = overItems.indexOf(overId as string);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
            over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: {
          ...prev[activeContainer],
          ids: [
            ...prev[activeContainer].ids.filter((item) => item !== active.id),
          ],
        },
        [overContainer]: {
          ...prev[overContainer],
          ids: [
            ...prev[overContainer].ids.slice(0, newIndex),
            active.id as string,
            ...prev[overContainer].ids.slice(newIndex, prev[overContainer].ids.length),
          ],
        },
        items: {
          ...prev.items,
          [active.id]: {
            ...prev.items[active.id as string],
            status: overContainer,
          },
        },
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over?.id as string);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    if (!over) return;

    const activeIndex = state[activeContainer].ids.indexOf(active.id as string);
    const overIndex = state[overContainer].ids.indexOf(over.id as string);

    if (activeIndex !== overIndex) {
      setState((prev) => ({
        ...prev,
        [activeContainer]: {
          ...prev[activeContainer],
          ids: arrayMove(prev[activeContainer].ids, activeIndex, overIndex),
        },
      }));
    }
  };

  const addTask = (taskText: string, section: TaskStatus) => {
    const id = uuidv4();
    const task: TaskWithCompletion = {
      id,
      task: taskText,
      status: section,
      tag: null,
      prevTag: null,
      completed: false,
    };

    setState((prev) => ({
      ...prev,
      items: { ...prev.items, [id]: task },
      [section]: {
        ...prev[section],
        ids: [...prev[section].ids, id],
      },
    }));
  };

  const updateTask = (id: string, newText: string) => {
    setState((prev) => {
      if (!prev.items[id]) {
        console.warn(`Attempted to update non-existent task with id ${id}`);
        return prev;
      }
      return {
        ...prev,
        items: {
          ...prev.items,
          [id]: { ...prev.items[id], task: newText },
        },
      };
    });
  };

  const deleteTask = (id: string, status: TaskStatus) => {
    setState((prev) => {
      const newState = { ...prev };
      if (newState.items[id]) {
        delete newState.items[id];
        newState[status].ids = newState[status].ids.filter(
          (itemId) => itemId !== id
        );
      }
      return newState;
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setState((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        [taskId]: {
          ...prev.items[taskId],
          completed: !prev.items[taskId].completed,
        },
      },
    }));
  };

  const updateSectionTitle = (section: TaskStatus, newTitle: string) => {
    setState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        title: newTitle,
      },
    }));
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setState((prev) => {
      const currentStatus = prev.items[taskId]?.status;
      if (!currentStatus || currentStatus === newStatus) return prev;

      return {
        ...prev,
        [currentStatus]: {
          ...prev[currentStatus],
          ids: prev[currentStatus].ids.filter((id) => id !== taskId),
        },
        [newStatus]: {
          ...prev[newStatus],
          ids: [...prev[newStatus].ids, taskId],
        },
        items: {
          ...prev.items,
          [taskId]: {
            ...prev.items[taskId],
            status: newStatus,
          },
        },
      };
    });
  };

  return {
    state,
    editingTitle,
    setEditingTitle,
    isLoading,
    handleDragEnd,
    handleDragOver,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    updateSectionTitle,
    moveTask,
  };
};
