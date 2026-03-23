import { useState } from "react";
import Board from "./components/Board";
import { useTaskStore } from "./store/taskStore";
import { v4 as uuidv4 } from "uuid";

function App() {
  const { addTask, tasks } = useTaskStore();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  const handleAddTask = () => {
    if (!title.trim()) return;

    addTask({
      id: uuidv4(),
      title,
      status: "todo",
      priority: priority as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setTitle("");
    setSearch("");
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:bg-gray-900 dark:text-white">

        {/* 🌙 Dark Mode */}
        <button
          onClick={() => setDark(!dark)}
          className="mb-4 px-4 py-2 bg-black text-white rounded dark:bg-white dark:text-black"
        >
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* 📊 Dashboard */}
        <div className="flex gap-4 mb-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow">
            Total: {tasks.length}
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow">
            Completed: {tasks.filter(t => t.status === "completed").length}
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow">
            Pending: {tasks.filter(t => t.status !== "completed").length}
          </div>
        </div>

        {/* 🔍 Search */}
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 mb-3 w-full dark:bg-gray-800 dark:text-white"
        />

        {/* ➕ Add Task */}
        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
            className="border p-2 dark:bg-gray-800 dark:text-white"
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-2 dark:bg-gray-800 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <Board search={search} />
      </div>
    </div>
  );
}

export default App;