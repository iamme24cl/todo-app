import React, { useState } from "react";

const TodoItem = (props) => {
  const [updatedTask, setUpdatedTask] = useState("");

  return (
    <div className="todo-item">
      <div onClick={() => props.handleTodoComplete(props.todo.id)}>
        {props.todo.isCompleted ? (
          <span className="todo-complete">✓</span>
        ) : (
          <span className="todo-incomplete" />
        )}
      </div>
      <div className="todo-item-input-wrapper">
          <input 
            value={updatedTask.length > 0 ? updatedTask : props.todo.task}
            onKeyPress={e => props.handleTodoUpdate(e, props.todo.id, updatedTask)}
            onChange={e => setUpdatedTask(e.target.value)}
          />
      </div>
      <div
        className="todo-remove"
        onClick={() => props.handleTodoRemove(props.todo.id)}
      >
        x
      </div>
    </div>
  );
}

export default TodoItem;