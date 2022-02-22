import TodoItem from "./TodoItem";

const TodoList = (props) => {
  return (
    <div className="todo-list">
      <ul>
        {props.todos.map((todo) => {
          return (
            <li key={todo.id}>
              <TodoItem 
                todo={todo}
                handleTodoUpdate={props.handleTodoUpdate}
                handleTodoComplete={props.handleTodoComplete}
                handleTodoRemove={props.handleTodoRemove}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;





