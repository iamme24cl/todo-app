import axios from 'axios';
const BASEURL = "https://guarded-mountain-15696.herokuapp.com/";

export const getTodos = async (setIsFetching, setTodos) => {
  try {
    const { data } = await axios.get(BASEURL);
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

export const createTodo = async (todo, todos, setTodos) => {
  try {
    const { data } = await axios.post(`${BASEURL}api/todos`, {
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

export const updateTodoStatus = async (id, todos, setTodos) => {
  try {
    const todosCopy = [ ...todos ];
    let todo = todosCopy.find(todo => todo.id === id);
    const { data } = await axios.put(`${BASEURL}api/todos/${id}`, {
      todo: { is_completed: !todo.isCompleted }
    });
    todo.isCompleted = data.is_completed;
    setTodos(todosCopy);
  } catch (error) {
    console.error(error);
  }
}

export const removeTodo = async (id, todos, setTodos) => {
  try {
    const response = await axios.delete(`${BASEURL}api/todos/${id}`);
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