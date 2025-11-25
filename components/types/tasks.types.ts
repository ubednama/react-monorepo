import type { Task, TaskState, TaskStatus } from "@/types/tasks";

export type { TaskStatus };

// Task Board Types
export interface TaskWithCompletion extends Task {
  completed?: boolean;
}

export interface TaskStateWithCompletion extends TaskState {
  items: { [key: string]: TaskWithCompletion };
}

export interface TaskBoardProps {
  className?: string;
}

export interface TaskItemProps {
  task: TaskWithCompletion;
  index: number;
  sectionStatus: TaskStatus;
  onToggleCompletion: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskSectionProps {
  section: TaskStatus;
  sectionData: {
    title: string;
    ids: string[];
  };
  tasks: { [key: string]: TaskWithCompletion };
  editingTitle: TaskStatus | null;
  onTitleEdit: (section: TaskStatus | null) => void;
  onTitleUpdate: (section: TaskStatus, newTitle: string) => void;
  onToggleCompletion: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}
