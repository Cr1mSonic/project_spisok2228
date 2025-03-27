import React, { useState } from "react";
import useTaskStore from "./store/useStore";
import "./app.css";

function App() {
  const { tasks, addTask, toggleTask, removeTask, editTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  const handleAddTask = () => {
    if (title && category && deadline) {
      addTask(title, category, priority, deadline);
      setTitle("");
      setCategory("");
      setPriority("Low");
      setDeadline("");
    }
  };

  return (
    <div className="app">
      <h1>Task Planner</h1>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <h3>{task.title}</h3>
            <p>Category: {task.category}</p>
            <p>Priority: {task.priority}</p>
            <p>Deadline: {task.deadline}</p>
            <button onClick={() => toggleTask(task.id)}>Complete</button>
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
