import React, { useState } from "react";
import useFetch from "./useFetch";
import TodoList from "./TodoList";
import "./styles.css";
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const {
    loading,
    error,
    data: todos,
  } = useFetch("https://jsonplaceholder.typicode.com/todos");
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo: Todo = {
      id: todoList.length + 1,
      text: inputValue,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setInputValue("");
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodos);
  };

  return (
    <div className="container">
      <div className="App">
        <h1 className="h1">Todo List</h1>
        <div>
          <input
            className="input"
            type="text"
            placeholder="Enter a todo..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="button" onClick={handleAddTodo}>
            Add
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {todos && (
          <TodoList
            todos={todoList}
            handleToggleComplete={handleToggleComplete}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}
      </div>
    </div>
  );
};

export default Todo;
