import React, { useState , useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const baseUrl = "https://guarded-mountain-15696.herokuapp.com/";

  const getTodos = async () => {
    try {
      const { data } = await axios.get(baseUrl);
      const todos = data.map(todo => {
        return { 
          id: todo.id,
          task: todo.task,
          isCompleted: todo.is_completed
        }
      })
      setTodos(todos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  const handleInputChange = (e) => {
    setTask(e.target.value)
  }

  const handleTodoCreate = async (todo) => {
    try {
      const { data } = await axios.post(`${baseUrl}api/todos`, {
        todo: {
          task: todo.task,
          is_completed: todo.isCompleted
        }
      });
      const todosCopy = [ ...todos ];
      todosCopy.push(data);
      setTodos(todosCopy);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateTodoStatus = async (id) => {
    try {
      const todosCopy = [ ...todos ];
      let todo = todosCopy.find(todo => todo.id === id);
      const { data } = await axios.put(`${baseUrl}api/todos/${id}`, {
        todo: { is_completed: !todo.isCompleted }
      });
      todo.isCompleted = data.is_completed;
      setTodos(todosCopy);
    } catch (error) {
      console.error(error);
    }
  }

  const handleTodoRemove = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}api/todos/${id}`);
      if (response.status === 202) {
        const todosCopy = todos.filter(
          (todo) => todo.id !== id
        );
        setTodos(todosCopy);
      }
    } catch (error) {
      console.error(error);
    }
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
