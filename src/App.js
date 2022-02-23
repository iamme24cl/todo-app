import React, { useState , useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, createTodo, updateTodoStatus, removeTodo} from './utils/api';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const baseUrl = "https://guarded-mountain-15696.herokuapp.com/";

  useEffect(() => {
    getTodos(setIsFetching, setTodos);
  }, []);

  const handleInputChange = (e) => {
    setTask(e.target.value)
  }

  const handleTodoCreate = (todo) => {
    createTodo(todo, todos, setTodos)
  }

  const handleUpdateTodoStatus = (id) => {
    updateTodoStatus(id, todos, setTodos);
  }

  const handleTodoRemove = (id) => {
    removeTodo(id, todos, setTodos);
  };

  if (isFetching) {
    return <div>Loading todo...</div> 
  }

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <TodoForm
        setTask={setTask}
        task={task}
        todos={todos}
        handleTodoCreate={handleTodoCreate}
        handleInputChange={handleInputChange}
      />
      <TodoList
        task={task}
        todos={todos}
        setTodos={setTodos}
        handleTodoRemove={handleTodoRemove}
        handleUpdateTodoStatus={handleUpdateTodoStatus}
      />
    </div>
  );
}

export default App;
