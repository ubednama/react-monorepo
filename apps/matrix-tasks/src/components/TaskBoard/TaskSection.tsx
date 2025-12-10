"use client";

import React from "react";
import { TaskItem } from "./TaskItem";
import { Button, Input } from "@repo/ui";
import { Pencil, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { taskStatusConfig } from "@/lib/taskStatusConfig";
import type { TaskSectionProps, TaskStatus } from "../types/tasks.types";
import { useDroppable } from "@dnd-kit/core";

interface ExtendedTaskSectionProps extends TaskSectionProps {
  onMove: (taskId: string, newStatus: TaskStatus) => void;
}

export const TaskSection: React.FC<ExtendedTaskSectionProps> = ({
  section,
  sectionData,
  tasks,
  editingTitle,
  onTitleEdit,
  onTitleUpdate,
  onToggleCompletion,
  onEdit,
  onDelete,
  onMove,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: section,
  });

  const sectionTasks = sectionData.ids.map((id) => tasks[id]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-0.5 mt-2 px-2">
        {editingTitle === section ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              autoFocus
              defaultValue={sectionData.title}
              className="h-8 text-sm font-bold"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onTitleUpdate(section, e.currentTarget.value);
                }
              }}
              onBlur={(e) => onTitleUpdate(section, e.currentTarget.value)}
            />
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => onTitleEdit(null)}
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className={cn(
            "flex items-center gap-2 group",
            (section === 'do-later' || section === 'eliminate') && "flex-row-reverse ml-auto"
          )}>
            <h2
              className={cn(
                "text-lg font-bold tracking-tight flex items-center gap-2",
                taskStatusConfig[section].textColor
              )}
            >
              {sectionData.title}
              <span className="text-xs opacity-50 font-normal bg-secondary px-2 py-0.5 rounded-full">
                {sectionTasks.length}
              </span>
            </h2>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onTitleEdit(section)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 rounded-xl p-4 transition-all duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800",
          taskStatusConfig[section].bgColor,
          "backdrop-blur-sm border-2 border-transparent",
          isOver && "ring-2 ring-blue-500/50"
        )
        }
        style={{
          minHeight: '200px',
        }}
      >
        <div className="flex flex-col">
          {sectionTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              sectionStatus={section}
              onToggleCompletion={onToggleCompletion}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))}
        </div>
      </div>
    </div >
  );
};
