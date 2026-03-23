import {
  DndContext,
  closestCorners,
  pointerWithin,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useTaskStore } from "../store/taskStore";
import Column from "./Column";

const Board = ({ search }: { search: string }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const task = tasks.find((t) => t.id === active.id);
    if (!task) return;

    updateTask({
      ...task,
      status: over.id as any,
      updatedAt: new Date().toISOString(),
    });
  };

  const columns = ["todo", "in-progress", "completed"] as const;

  return (
    <DndContext
      collisionDetection={(args) =>
        pointerWithin(args) || closestCorners(args)
      }
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4">
        {columns.map((col) => (
          <Column
            key={col}
            status={col}
            tasks={tasks
              .filter((t) => t.status === col)
              .filter((t) =>
                search
                  ? t.title.toLowerCase().includes(search.toLowerCase())
                  : true
              )}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default Board;