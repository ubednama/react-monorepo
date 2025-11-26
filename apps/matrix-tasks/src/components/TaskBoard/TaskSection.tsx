"use client";

import React from "react";
import { TaskItem } from "./TaskItem";
import { Button } from "@/components/ui/button";
import { Pencil, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
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
      <div className="flex items-center justify-between mb-4 px-2">
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
          <div className="flex items-center gap-2 group">
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
          "flex-1 rounded-xl p-4 transition-all duration-300",
          "bg-white/50 dark:bg-black/20 backdrop-blur-sm border-2 border-transparent",
          isOver && "border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/20 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
        )}
        style={{
          minHeight: '200px',
        }}
      >
        {/* <SortableContext
          items={sectionData.ids}
          strategy={verticalListSortingStrategy}
        > */}
        <div className="flex flex-col gap-3">
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
        {/* </SortableContext> */}
      </div>
    </div>
  );
};
