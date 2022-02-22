const TodoForm = (props) => {
  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      const newTodo = {
        task: props.task,
        isCompleted: false
      };
      props.handleTodoCreate(newTodo);
      props.setTask("");
    }
  }

  return (
    <div className="todo-form">
      <input
        type="text"
        value={props.task}
        placeholder="Enter a new todo..."
        onChange={props.handleInputChange}
        onKeyPress={handleInputEnter}
      />
    </div>
  );
};

export default TodoForm;