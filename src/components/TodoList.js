import React from "react";
import TodoItem from "./TodoItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AnimatePresence, motion } from "framer-motion";

function TodoList({ todos, deleteTodo, toggleTodo, editTodo, reorderTodos }) {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
            <AnimatePresence>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <motion.li 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}
                      layout
                      initial={{ opacity: 0, y: -20, scale:0.95 }}
                      animate={{ opacity: 1, y: 0, scale:1 }}
                      exit={{ opacity: 0, y: 20, scale:0.95 }}
                      transition={{ duration: 0.3 }}
                      style={{...provided.draggableProps.style, boxShadow: snapshot.isDragging ? "0 5px 15px rgba(0,0,0,0.2)" : "none"}}
                    >
                      <TodoItem
                        todo={todo}
                        deleteTodo={deleteTodo}
                        toggleTodo={toggleTodo}
                        editTodo={editTodo}
                      />
                    </motion.li>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
