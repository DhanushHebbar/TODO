import React from "react";
import { motion } from "framer-motion";

function DashboardPage({ todos, toggleTodo }) {
  const completed = todos.filter(t => t.completed).length;

  return (
    <div className="dashboard-page">
      <h2>Task Overview</h2>
      <div className="progress-bar-container">
        <motion.div 
          className="progress-bar" 
          style={{ width: (completed / todos.length) * 100 + "%" }} 
        />
      </div>
      <div className="dashboard-tasks">
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <span 
                style={{ textDecoration: todo.completed ? "line-through" : "none" }} 
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
