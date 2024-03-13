import React, { useEffect, useState } from "react";
import { TodoInterface } from "../utils/TodoInterface";
import ListTodoItem from "./ListTodoItem";
import { url } from "../utils/TodoApi";
import "./styles.css";

import FilterBar from "./FilterBar";
import useFetch from "./useFetch";

function Todo() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const { data, isLoading, error } = useFetch();

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

  console.log(todos);

  const handleSearch = (value: string) => {
    if (value === "") {
      setTodos(data);
    } else {
      const filterTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(value.toLowerCase())
      );
      setTodos(filterTodos);
    }
  };

  const sortByTitle = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });
    setTodos(sortedTodos);
  };

  const sortByDate = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.dueDate > b.dueDate) return 1;
      if (a.dueDate < b.dueDate) return -1;
      return 0;
    });
    setTodos(sortedTodos);
  };

  const handleStatusChange = (value: string) => {
    let filteredTodos = [...todos];
    if (value === "completed")
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
    else if (value === "incomplete")
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  if (error) {
    return <>{error}</>;
  }

  if (isLoading) {
    return <>Loading..</>;
  }
  return (
    <>
      <FilterBar
        onSearch={handleSearch}
        onSortByTask={sortByTitle}
        onSortByDueDate={sortByDate}
        onStatusChange={handleStatusChange}
      />

      <ListTodoItem
        todos={todos}
        deleteTodo={deleteTodo}
        handleCheckbox={handleCheckbox}
        loading={isLoading}
        error={error}
      />
    </>
  );
}

export default Todo;
