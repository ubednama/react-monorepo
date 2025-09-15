import { Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { taskStatusConfig } from "@/lib/taskStatusConfig";
import type { TaskItemProps } from "../types/tasks.types";

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  sectionStatus,
  onToggleCompletion,
  onEdit,
  onDelete,
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        // Create a container div for draggable that doesn't interfere with motion
        const dragStyles: React.CSSProperties = {
          ...provided.draggableProps.style,
          // Enhanced drag transform and positioning
          transform: snapshot.isDragging
            ? `${provided.draggableProps.style?.transform || ''} scale(1.05) rotate(2deg)`
            : provided.draggableProps.style?.transform || '',
          // Critical: Use fixed positioning during drag to escape all container constraints
          position: snapshot.isDragging ? 'fixed' : 'relative',
          // Ensure proper z-index stacking
          zIndex: snapshot.isDragging ? 10000 : 'auto',
          // Disable transitions during drag for responsive movement
          transition: snapshot.isDragging ? 'none' : 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
          // Enhanced shadow effects
          boxShadow: snapshot.isDragging 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 25px rgba(59, 130, 246, 0.3)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          // Hardware acceleration
          willChange: 'transform',
          // Ensure pointer events work during drag
          pointerEvents: 'auto' as const,
          // Prevent text selection during drag
          userSelect: 'none' as const,
          // Smooth cursor feedback
          cursor: snapshot.isDragging ? 'grabbing' : 'grab',
        };

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={dragStyles}
          >
            <motion.div
              className={cn(
                taskStatusConfig[sectionStatus].bgColor,
                taskStatusConfig[sectionStatus].borderColor,
                "rounded-lg flex items-center justify-between p-3 border-2 backdrop-blur-sm",
                task.completed && "opacity-50",
                snapshot.isDragging && "shadow-2xl ring-2 ring-blue-500/50",
                !snapshot.isDragging && "hover:shadow-md mb-2"
              )}
              // Only use Framer Motion for entry/exit animations, not drag
              initial={{ opacity: 0, y: 5 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: snapshot.isDragging ? 1 : 1
              }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              transition={{ 
                duration: 0.15, 
                ease: "easeOut"
              }}
              // Prevent Framer Motion from interfering with drag
              drag={false}
              dragConstraints={false}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    // Disable interactions during drag
                    style={{ pointerEvents: snapshot.isDragging ? 'none' : 'auto' }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleCompletion(task.id)}
                      className={`${taskStatusConfig[sectionStatus].textColor} ${taskStatusConfig[sectionStatus].hover} rounded-full`}
                      disabled={snapshot.isDragging}
                    >
                      <motion.div
                        initial={false}
                        animate={{ rotate: task.completed ? 360 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </motion.div>
                    </Button>
                  </motion.div>
                  <span
                    className={cn(
                      taskStatusConfig[sectionStatus].textColor,
                      "font-medium select-none",
                      task.completed && "line-through opacity-60"
                    )}
                  >
                    {task.task}
                  </span>
                </div>
                
                <div 
                  className="flex items-center gap-1"
                  // Disable button interactions during drag
                  style={{ pointerEvents: snapshot.isDragging ? 'none' : 'auto' }}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(task.id)}
                      className="h-8 w-8 hover:bg-white/10 rounded-full transition-all duration-150"
                      disabled={snapshot.isDragging}
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
                      className="h-8 w-8 hover:bg-red-500/20 rounded-full transition-all duration-150"
                      disabled={snapshot.isDragging}
                    >
                      <Trash2
                        className={`h-4 w-4 text-red-600 ${
                          sectionStatus === "eliminate"
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
      }}
    </Draggable>
  );
};
