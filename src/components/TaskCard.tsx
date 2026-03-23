import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTaskStore } from "../store/taskStore";

const getColor = (p: string) => {
  if (p === "high") return "bg-red-100 text-red-600";
  if (p === "medium") return "bg-yellow-100 text-yellow-600";
  return "bg-green-100 text-green-600";
};

const TaskCard = ({ task }: any) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-3 rounded-xl shadow mb-3 bg-white dark:bg-gray-700"
    >
      <div className="flex justify-between mb-1">
        <span className={`text-xs px-2 py-1 rounded ${getColor(task.priority)}`}>
          {task.priority}
        </span>

        <button onClick={() => deleteTask(task.id)}>❌</button>
      </div>

      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            updateTask({ ...task, title });
            setEditing(false);
          }}
          className="border p-1 w-full dark:bg-gray-800 dark:text-white"
        />
      ) : (
        <div
          {...listeners}
          {...attributes}
          onDoubleClick={() => setEditing(true)}
        >
          {task.title}
        </div>
      )}
    </div>
  );
};

export default TaskCard;