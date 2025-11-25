"use client";

// import {
//   DndContext,
//   DragOverlay,
//   closestCorners,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragStartEvent,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TaskStatus } from "@/types/tasks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddTaskModal } from "./AddTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { SelectSectionModal } from "./SelectSectionModal";
import { LoadingScreen } from "../shared/LoadingScreen";
import { TaskSection } from "./TaskSection";
import { useTaskBoard } from "../hooks/useTaskBoard";
// import { TaskItem } from "./TaskItem";
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
  const [isSelectSectionModalOpen, setIsSelectSectionModalOpen] =
    useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       distance: 8,
  //     },
  //   }),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleAddTask = (taskText: string) => {
    setNewTaskText(taskText);
    setIsAddModalOpen(false);
    setIsSelectSectionModalOpen(true);
  };

  const finalizeAddTask = (section: TaskStatus) => {
    addTask(newTaskText, section);
    setIsSelectSectionModalOpen(false);
    setNewTaskText("");
  };

  const sections: TaskStatus[] = [
    "do-first",
    "do-later",
    "delegate",
    "eliminate",
  ];

  // const handleDragStart = (event: DragStartEvent) => {
  //   setActiveId(event.active.id as string);
  //   document.body.style.overflow = 'hidden';
  //   document.body.classList.add('is-dragging');
  // };

  // const onDragEnd = (event: DragEndEvent) => {
  //   setActiveId(null);
  //   document.body.style.overflow = '';
  //   document.body.classList.remove('is-dragging');
  //   handleDragEnd(event);
  // };

  return (
    // <DndContext
    //   sensors={sensors}
    //   collisionDetection={closestCorners}
    //   onDragStart={handleDragStart}
    //   onDragOver={handleDragOver}
    //   onDragEnd={onDragEnd}
    // >
    <div
      className="h-full w-full relative"
      style={{
        overflow: 'visible',
        isolation: 'isolate',
      }}
    >
      <div
        className="min-h-full w-full grid grid-cols-2 grid-rows-2 gap-4 p-4"
        style={{
          minHeight: 'calc(100vh - 4rem)',
          overflow: 'visible',
          overflowX: 'hidden',
          overflowY: 'hidden',
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
            className="min-h-0"
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
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
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
                  className="rounded-full h-16 w-16 shadow-xl hover:shadow-2xl transition-all duration-200 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 border-2 border-white/30 backdrop-blur-sm"
                >
                  <Plus className="h-8 w-8 text-white drop-shadow-sm" />
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

      <SelectSectionModal
        open={isSelectSectionModalOpen}
        onOpenChange={setIsSelectSectionModalOpen}
        onSelect={finalizeAddTask}
        task={newTaskText}
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

    /* <DragOverlay>
      {activeId && state.items[activeId] ? (
         <TaskItem
           task={state.items[activeId]}
           index={0}
           sectionStatus={state.items[activeId].status}
           onToggleCompletion={() => {}}
           onEdit={() => {}}
           onDelete={() => {}}
           isOverlay
         />
      ) : null}
    </DragOverlay> */
    // </DndContext>
  );
}
