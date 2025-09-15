import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { TaskStatus } from "@/types/tasks";
import type { DragResult } from "@/types/dnd";
import { saveState, loadState } from "@/utils/localStorage";
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
  const handleDragEnd = (result: DragResult) => {
    const { destination, source, draggableId } = result;

    // If dropped outside any droppable area, return task to original position
    if (!destination) {
      return;
    }

    // If dropped in the exact same spot, no changes needed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Safety check: ensure we have the task in our state
    if (!state.items[draggableId]) {
      console.error(`Task ${draggableId} not found in state`);
      return;
    }

    setState((prevState) => {
      // Create a new state object to maintain immutability
      const newState = { ...prevState };
      
      // Get the source and destination section IDs
      const sourceSection = source.droppableId as TaskStatus;
      const destSection = destination.droppableId as TaskStatus;
      
      // Create new arrays for the affected sections
      const sourceIds = [...newState[sourceSection].ids];
      const destIds = sourceSection === destSection 
        ? sourceIds // If same section, use the same array
        : [...newState[destSection].ids]; // If different section, create new array
      
      // Remove the task from its original position
      sourceIds.splice(source.index, 1);
      
      // Insert the task at its new position
      destIds.splice(destination.index, 0, draggableId);
      
      // Update the state with new arrays
      newState[sourceSection] = {
        ...newState[sourceSection],
        ids: sourceIds,
      };
      
      // If moving to a different section, update destination
      if (sourceSection !== destSection) {
        newState[destSection] = {
          ...newState[destSection],
          ids: destIds,
        };
        
        // Update the task's status to match its new section
        newState.items = {
          ...newState.items,
          [draggableId]: {
            ...newState.items[draggableId],
            status: destSection,
          },
        };
      }
      
      return newState;
    });
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

  return {
    state,
    editingTitle,
    setEditingTitle,
    isLoading,
    handleDragEnd,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    updateSectionTitle,
  };
};
