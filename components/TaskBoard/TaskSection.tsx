"use client";

import { Droppable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { taskStatusConfig } from "@/lib/taskStatusConfig";
import { TaskItem } from "./TaskItem";
import type { TaskSectionProps } from "../types/tasks.types";
import { useState } from "react";

export const TaskSection: React.FC<TaskSectionProps> = ({
  section,
  sectionData,
  tasks,
  editingTitle,
  onTitleEdit,
  onTitleUpdate,
  onToggleCompletion,
  onEdit,
  onDelete,
}) => {
  const [editValue, setEditValue] = useState(sectionData.title);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isEditing = editingTitle === section;
  const config = taskStatusConfig[section];

  // Track mouse position for dynamic drop zone effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleTitleSubmit = () => {
    onTitleUpdate(section, editValue);
  };

  const handleTitleCancel = () => {
    setEditValue(sectionData.title);
    onTitleEdit(null);
  };

  return (
    <motion.div
      className={cn(
        "relative border-2 p-4 flex flex-col h-full rounded-2xl shadow-lg backdrop-blur-sm",
        config.bgColor,
        config.borderColor,
        "transition-all duration-200 hover:shadow-xl group"
      )}
      whileHover={{ 
        scale: 1.002, 
        y: -1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{
        background: 'transparent',
      }}
    >
      {/* Section Title */}
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className={cn(
                "text-lg font-bold bg-white/80 dark:bg-gray-800/80",
                config.textColor
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTitleSubmit();
                if (e.key === "Escape") handleTitleCancel();
              }}
              autoFocus
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleTitleSubmit}
              className="text-green-600 hover:bg-green-100 dark:hover:bg-green-800/30"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleTitleCancel}
              className="text-red-600 hover:bg-red-100 dark:hover:bg-red-800/30"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <h2
              className={cn(
                "text-lg font-bold cursor-pointer",
                config.titleTextColor
              )}
              onClick={() => onTitleEdit(section)}
            >
              {sectionData.title}
            </h2>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onTitleEdit(section)}
                className={cn(
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  config.hover
                )}
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            </motion.div>
          </div>
        )}
        
        <div className={cn("text-sm font-medium", config.textColor)}>
          {sectionData.ids.length}
        </div>
      </div>

      {/* Task List */}
      {/* 
        Droppable area for each section
        - Uses droppableId to identify the section
        - Provides visual feedback during drag operations
        - Handles task reordering and section changes
      */}
      <Droppable droppableId={section}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            onMouseMove={handleMouseMove}
            className={cn(
              // Base styles for the droppable area
              "flex-1 rounded-lg transition-all duration-200 relative",
              // Enhanced drop zone styling
              snapshot.isDraggingOver && "ring-2 ring-blue-500/50 bg-blue-50/20 dark:bg-blue-900/20"
            )}
            style={{
              // Critical: Remove any overflow restrictions that could constrain dragged items
              overflow: 'visible',
              // Ensure adequate minimum height for drop zones
              minHeight: '200px',
              // Enhanced visual feedback during drag operations
              background: snapshot.isDraggingOver 
                ? `
                  radial-gradient(
                    circle at ${mousePos.x}% ${mousePos.y}%, 
                    rgba(59, 130, 246, 0.15) 0%, 
                    rgba(59, 130, 246, 0.08) 30%, 
                    rgba(59, 130, 246, 0.03) 60%, 
                    transparent 100%
                  )
                `
                : 'transparent',
              // Smooth scale and glow effects
              transform: snapshot.isDraggingOver ? 'scale(1.005)' : 'scale(1)',
              boxShadow: snapshot.isDraggingOver 
                ? `
                  inset 0 0 0 2px rgba(59, 130, 246, 0.3),
                  0 0 20px rgba(59, 130, 246, 0.15),
                  inset 0 0 30px rgba(59, 130, 246, 0.08)
                `
                : 'none',
              // Enable hardware acceleration for smooth animations
              willChange: snapshot.isDraggingOver ? 'transform, box-shadow, background' : 'auto',
              // Responsive transitions
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              // Ensure the drop zone can accept items from any direction
              position: 'relative' as const,
              // Allow interaction with dragged items
              pointerEvents: 'auto' as const,
            } as React.CSSProperties}
          >
            {/* Enhanced drop zone indicator */}
            <AnimatePresence>
              {snapshot.isDraggingOver && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: 0.3
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.98,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut"
                    }
                  }}
                  className="absolute inset-1 border-2 border-dashed rounded-lg pointer-events-none z-10"
                  style={{
                    borderColor: 'rgba(59, 130, 246, 0.6)',
                    background: `
                      radial-gradient(
                        circle at ${mousePos.x}% ${mousePos.y}%,
                        rgba(59, 130, 246, 0.1) 0%,
                        rgba(59, 130, 246, 0.05) 40%,
                        transparent 70%
                      )
                    `,
                    backdropFilter: 'blur(1px)',
                  }}
                >
                  {/* Pulsing glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.02, 1],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    style={{
                      background: `
                        radial-gradient(
                          circle at ${mousePos.x}% ${mousePos.y}%,
                          rgba(59, 130, 246, 0.12) 0%,
                          rgba(59, 130, 246, 0.06) 30%,
                          transparent 60%
                        )
                      `,
                    }}
                  />
                  
                  {/* Central drop indicator */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      transition: {
                        delay: 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      }
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-500/60 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-3 h-3 rounded-full bg-blue-500/80 animate-pulse" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Task list with improved layout */}
            <div className="space-y-2 relative z-0">
              <AnimatePresence mode="popLayout">
                {sectionData.ids.map((taskId, index) => {
                  const task = tasks[taskId];
                  if (!task) return null;

                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.2
                      }}
                      className="relative"
                    >
                      <TaskItem
                        task={task}
                        index={index}
                        sectionStatus={section}
                        onToggleCompletion={onToggleCompletion}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            {/* Critical: Placeholder must be outside the motion container to avoid conflicts */}
            {provided.placeholder}
            
            {/* Empty state with improved styling */}
            {sectionData.ids.length === 0 && !snapshot.isDraggingOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center justify-center h-32 text-center space-y-2"
              >
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", config.bgColor, "opacity-30")}>
                  <div className={cn("w-6 h-6 rounded-full", config.borderColor)} />
                </div>
                <p className={cn("text-sm font-medium", config.textColor, "opacity-50")}>
                  Drop tasks here
                </p>
                <p className={cn("text-xs", config.textColor, "opacity-30")}>
                  or click + to add new
                </p>
              </motion.div>
            )}
          </div>
        )}
      </Droppable>
    </motion.div>
  );
};
