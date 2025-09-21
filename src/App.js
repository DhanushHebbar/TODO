import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TodoList from "./components/TodoList";
import DashboardPage from "./components/DashboardPage";
import { ToastContainer } from "react-toastify";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || []);
  const [darkMode, setDarkMode] = useState(false);
  const [viewDashboard, setViewDashboard] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority="low", dueDate=null, recurring=null) => {
    setTodos([...todos, { id: Date.now(), text, completed: false, priority, dueDate, recurring }]);
  };
  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));
  const toggleTodo = (id) => setTodos(todos.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  const editTodo = (id, newText) => setTodos(todos.map(t => t.id === id ? {...t, text: newText} : t));
  const reorderTodos = (start, end) => {
    const result = Array.from(todos);
    const [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);
    setTodos(result);
  };

  return (
    <div className={'app-container ' + (darkMode ? "dark" : "")}>
      <div className="sidebar">
        <button onClick={() => setViewDashboard(false)} className={!viewDashboard ? "active" : ""}>Tasks</button>
        <button onClick={() => setViewDashboard(true)} className={viewDashboard ? "active" : ""}>Dashboard</button>
        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="main-content">
        <AnimatePresence exitBeforeEnter>
          {viewDashboard ? (
            <DashboardPage todos={todos} toggleTodo={toggleTodo} key="dashboard" />
          ) : (
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              reorderTodos={reorderTodos}
              addTodo={addTodo}
              key="tasks"
            />
          )}
        </AnimatePresence>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
