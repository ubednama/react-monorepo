"use client";

// import {
//   DndContext,
//   DragOverlay,
//   closestCorners,
//   KeyboardSensor,

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TaskStatus } from "@/types/tasks";
import { Button } from "@repo/ui";
import { Plus } from "lucide-react";
import { AddTaskModal } from "./AddTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { LoadingScreen } from "../shared/LoadingScreen";
import { TaskSection } from "./TaskSection";
import { useTaskBoard } from "../hooks/useTaskBoard";
import { TaskItem, TaskCard } from "./TaskItem";

export default function TaskBoard() {
  const {
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
  } = useTaskBoard();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Reduced distance for easier touch activation
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleAddTask = (taskText: string, section: TaskStatus) => {
    addTask(taskText, section);
    setIsAddModalOpen(false);
  };

  const sections: TaskStatus[] = [
    "do-first",
    "do-later",
    "delegate",
    "eliminate",
  ];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    // Use the new class that doesn't break layout
    document.body.classList.add('body-dragging');
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    document.body.classList.remove('body-dragging');
    handleDragEnd(event);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={onDragEnd}
    >
      <div
        className="h-full w-full relative"
        style={{
          overflow: 'visible',
          isolation: 'isolate',
        }}
      >
        <div
          className="min-h-full w-full grid grid-cols-2 grid-rows-2 gap-2 p-3"
          style={{
            height: 'calc(100vh - 4rem)', // Exact height minus navbar
            minHeight: 'calc(100vh - 4rem)',
            overflow: 'hidden', // Prevent main container scroll
            position: 'relative',
            zIndex: 1,
          }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.05,
                ease: "easeOut"
              }}
              className="min-h-0 h-full overflow-hidden" // Confine height
            >
              <TaskSection
                section={section}
                sectionData={state[section]}
                tasks={state.items}
                editingTitle={editingTitle}
                onTitleEdit={setEditingTitle}
                onTitleUpdate={(section, newTitle) => {
                  updateSectionTitle(section, newTitle);
                  setEditingTitle(null);
                }}
                onToggleCompletion={toggleTaskCompletion}
                onEdit={(taskId) => {
                  setSelectedTask(taskId);
                  setIsEditModalOpen(true);
                }}
                onDelete={(taskId) => {
                  if (showDeleteConfirmation) {
                    setSelectedTask(taskId);
                    setIsDeleteModalOpen(true);
                  } else {
                    deleteTask(taskId, state.items[taskId].status);
                  }
                }}
                onMove={moveTask}
              />
            </motion.div>
          ))}

          {/* Centered Add Button */}
          <AnimatePresence>
            {!activeId && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 0.3
                }}
              >
                <motion.div
                  className="pointer-events-auto"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                  whileTap={{ scale: 0.95, rotate: -5 }}
                >
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="rounded-full h-16 w-16 shadow-xl hover:shadow-2xl transition-all duration-200 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 border-2 border-white/10 dark:border-black/10"
                  >
                    <Plus className="h-8 w-8 text-white dark:text-black" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AddTaskModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onSubmit={handleAddTask}
        />

        {selectedTask && state.items[selectedTask] && (
          <>
            <EditTaskModal
              open={isEditModalOpen}
              onOpenChange={setIsEditModalOpen}
              onSubmit={(newText) => {
                updateTask(selectedTask, newText);
                setSelectedTask(null);
              }}
              initialValue={state.items[selectedTask].task}
            />

            <DeleteTaskModal
              open={isDeleteModalOpen}
              onOpenChange={setIsDeleteModalOpen}
              onConfirm={() => {
                deleteTask(selectedTask, state.items[selectedTask].status);
                setSelectedTask(null);
              }}
              onDoNotShowAgainChange={(value) =>
                setShowDeleteConfirmation(!value)
              }
            />
          </>
        )}
      </div>

      <DragOverlay>
        {activeId && state.items[activeId] ? (
          <TaskCard
            task={state.items[activeId]}
            index={0}
            sectionStatus={state.items[activeId].status}
            onToggleCompletion={() => { }}
            onEdit={() => { }}
            onDelete={() => { }}
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
