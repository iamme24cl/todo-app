import React, { useState } from "react";
import { useMotionValue, Reorder } from "framer-motion";

const TodoItem = (props) => {
  const { todo, handleUpdateTodoStatus, handleTodoRemove } = props;

  return (
    <Reorder.Item value={todo} id={todo.id}  className="todo-item">
      <div onClick={() => handleUpdateTodoStatus(todo.id)}>
        {todo.isCompleted ? (
          <span className="todo-complete">✓</span>
        ) : (
          <span className="todo-incomplete" />
        )}
      </div>
      <div className="todo-item-wrapper">
          {todo.task}
      </div>
      <div
        className="todo-remove"
        onClick={() => handleTodoRemove(todo.id)}
      >
        x
      </div>
    </Reorder.Item>
  );
}

export default TodoItem;