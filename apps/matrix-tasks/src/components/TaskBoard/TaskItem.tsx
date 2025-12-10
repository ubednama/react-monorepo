"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@repo/ui";
import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { taskStatusConfig } from "@/lib/taskStatusConfig";
import type { TaskItemProps, TaskStatus } from "../types/tasks.types";

interface ExtendedTaskItemProps extends TaskItemProps {
  isOverlay?: boolean;
  onMove?: (taskId: string, newStatus: TaskStatus) => void;
}

// Pure presentation component for the task card
export const TaskCard: React.FC<ExtendedTaskItemProps & {
  dragHandleProps?: any;
  style?: React.CSSProperties;
  innerRef?: React.Ref<HTMLDivElement>;
  isDragging?: boolean;
}> = ({
  task,
  sectionStatus,
  onToggleCompletion,
  onEdit,
  onDelete,
  onMove,
  isOverlay,
  dragHandleProps,
  style,
  innerRef,
  isDragging
}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Close menu when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (isMenuOpen && !(event.target as Element).closest(`.task-menu-${task.id}`)) {
          setIsMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen, task.id]);

    const sectionTitles: Record<TaskStatus, string> = {
      "do-first": "Do First",
      "do-later": "Do Later",
      "delegate": "Delegate",
      "eliminate": "Eliminate",
    };

    const otherSections = Object.entries(taskStatusConfig)
      .filter(([key]) => key !== sectionStatus)
      .map(([key, config]) => ({
        key,
        ...config,
        title: sectionTitles[key as TaskStatus]
      }));

    return (
      <div
        ref={innerRef}
        style={style}
        {...dragHandleProps}
        className={cn("touch-none relative", isOverlay && "cursor-grabbing")}
      >
        <motion.div
          className={cn(
            "bg-white dark:bg-zinc-900",
            taskStatusConfig[sectionStatus].borderColor,
            "rounded-lg flex items-center justify-between p-3 border shadow-sm",
            task.completed && "opacity-50",
            "hover:shadow-md mb-2 transition-all duration-200",
            isDragging && "opacity-30", // Fade original when dragging
            isOverlay && "opacity-100! shadow-xl scale-105 rotate-2" // Style the overlay
          )}
          initial={!isOverlay ? { opacity: 0, y: 5 } : undefined}
          animate={!isOverlay ? { opacity: 1, y: 0 } : undefined}
          exit={!isOverlay ? { opacity: 0, y: -5, scale: 0.98 } : undefined}
          transition={{ duration: 0.15 }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompletion(task.id);
                  }}
                  className={`${taskStatusConfig[sectionStatus].textColor} ${taskStatusConfig[sectionStatus].hover} rounded-full`}
                  onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking button
                >
                  <motion.div
                    initial={false}
                    whileTap={{ scale: 0.8 }}
                    animate={{ scale: task.completed ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>

              {/* Clickable Task Text Area - Use title/text as drag handle indirectly or effectively entire card is handle */}
              <div
                className={cn(
                  "flex-1 cursor-pointer p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative",
                  `task-menu-${task.id}`
                )}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onPointerDown={(e) => {
                  // Allow dragging from text area, but stop propagation if we are clicking menu items?
                  // Actually dnd-kit handles this via activators. 
                  // We default to whole card draggable, but buttons stop propagation.
                }}
              >
                <span
                  className={cn(
                    taskStatusConfig[sectionStatus].textColor,
                    "font-medium select-none",
                    task.completed && "line-through opacity-60"
                  )}
                >
                  {task.task}
                </span>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden cursor-auto"
                      onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when interacting with menu
                    >
                      <div className="p-1">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 py-1.5">
                          Move to...
                        </div>
                        {otherSections.map((section) => (
                          <button
                            key={section.key}
                            onClick={(e) => {
                              e.stopPropagation();
                              onMove?.(task.id, section.key as TaskStatus);
                              setIsMenuOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-2 py-1.5 text-sm rounded-lg flex items-center gap-2 transition-colors",
                              "hover:bg-gray-100 dark:hover:bg-gray-700",
                              section.textColor
                            )}
                          >
                            <div className={cn("w-2 h-2 rounded-full", section.bgColor.replace('bg-', 'bg-opacity-100 bg-'))} />
                            {section.title}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(task.id)}
                  className="h-8 w-8 hover:bg-white/10 rounded-full transition-all duration-150 flex items-center justify-center p-0"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Pencil
                    className={`h-4 w-4 ${taskStatusConfig[sectionStatus].textColor}`}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 hover:bg-red-500/20 rounded-full transition-all duration-150 flex items-center justify-center p-0"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Trash2
                    className={`h-4 w-4 text-red-600 ${sectionStatus === "eliminate"
                      ? "dark:text-red-400"
                      : "dark:text-red-500"
                      }`}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

export const TaskItem: React.FC<ExtendedTaskItemProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.task.id,
    data: {
      type: "Task",
      task: props.task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (props.isOverlay) {
    return <TaskCard {...props} isOverlay />;
  }

  return (
    <TaskCard
      {...props}
      innerRef={setNodeRef}
      style={style}
      isDragging={isDragging}
      dragHandleProps={{ ...attributes, ...listeners }}
    />
  );
};
