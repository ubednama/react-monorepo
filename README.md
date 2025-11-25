# Drag and Drop Implementation Status

## Overview
The project currently uses `@dnd-kit` for drag-and-drop functionality. However, due to persistent issues with z-index stacking contexts and visual glitches where dragged items appear behind other sections, we have temporarily disabled this feature in favor of a "Click to Move" interaction.

## Current Implementation (Disabled)
The drag-and-drop logic is implemented across three main components:

1.  **`TaskBoard.tsx`**:
    *   Uses `DndContext` to manage the drag state.
    *   Implements `DragOverlay` to render the dragged item on top of everything.
    *   **Issue**: Despite `DragOverlay` and high z-index, there are still reports of items being obscured or interactions feeling "off".

2.  **`TaskSection.tsx`**:
    *   Uses `SortableContext` to define the drop zones.
    *   **To Fix**: Ensure `overflow` properties on parent containers do not clip the dragged item.

3.  **`TaskItem.tsx`**:
    *   Uses `useSortable` to make items draggable.
    *   **To Fix**: The `transform` property needs to be applied carefully to avoid conflicting with layout transitions.

## How to Re-enable Drag and Drop
To re-enable the drag-and-drop functionality:
1.  Uncomment the `DndContext` and `DragOverlay` in `TaskBoard.tsx`.
2.  Uncomment `SortableContext` in `TaskSection.tsx`.
3.  Uncomment `useSortable` hooks and logic in `TaskItem.tsx`.

## Alternative Approach: Click to Move
As a fallback, we have implemented a dropdown menu on each task. Clicking a task (or a specific move icon) reveals a menu to instantly move the task to one of the four Eisenhower Matrix quadrants:
*   Do First
*   Do Later
*   Delegate
*   Eliminate

This approach ensures usability while the complex drag-and-drop issues are investigated.
