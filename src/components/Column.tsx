import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ status, tasks }: any) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className="p-4 rounded-xl shadow-lg w-1/3 min-h-[400px] bg-white dark:bg-gray-800 transition"
    >
      <h2 className="font-bold mb-2 capitalize">{status}</h2>

      {tasks.length === 0 && (
        <p className="text-gray-400">📭 No tasks</p>
      )}

      {tasks.map((t: any) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </div>
  );
};

export default Column;