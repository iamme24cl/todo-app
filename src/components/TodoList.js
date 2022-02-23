import { Reorder } from "framer-motion";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const { handleUpdateTodoStatus, handleTodoRemove, setTodos, todos } = props;

  return (
    <div className="todo-list">
      <Reorder.Group axis="y" values={todos} onReorder={setTodos}>
        {todos.map((todo) => {
          return (
            <TodoItem 
              key={todo.id}
              todo={todo}
              handleUpdateTodoStatus={handleUpdateTodoStatus}
              handleTodoRemove={handleTodoRemove}
            />
          );
        })}
      </Reorder.Group>
    </div>
  );
}

export default TodoList;


 






