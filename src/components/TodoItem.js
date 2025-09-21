import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const notify = (msg, type="info") => {
    if(type === "error") toast.error(msg);
    else toast.info(msg);
  };

  useEffect(() => {
    if (todo.dueDate && dayjs(todo.dueDate).isBefore(dayjs()) && !todo.completed) {
      notify("Task \"" + todo.text + "\" is overdue!", "error");
    }
  }, [todo]);

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={"todo-item " + (todo.completed ? "completed" : "")}
    >
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === "Enter" && handleEdit()}
          autoFocus
        />
      ) : (
        <>
          <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default TodoItem;
