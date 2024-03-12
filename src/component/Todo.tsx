import React, { useEffect, useState } from "react";
import { TodoInterface } from "../utils/TodoInterface";
import ListTodoItem from "./ListTodoItem";
import { url } from "../utils/TodoApi";
import "./styles.css";

import useFetch from "./useFetch";

function Todo() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const { loading, error } = useFetch();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const deleteTodo = (id: string) => {
    const filterTodo = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodo);
  };

  const handleCheckbox = (id: string, checked: boolean) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: checked } : todo
    );
    setTodos(updatedTodos);
  };

  console.log({ todos });
  return (
    <ListTodoItem
      todos={todos}
      deleteTodo={deleteTodo}
      handleCheckbox={handleCheckbox}
      loading={loading}
      error={error}
    />
  );
}

export default Todo;
