import React, { useEffect, useState } from "react";
import { TodoInterface } from "../utils/TodoInterface";
import ListTodoItem from "./ListTodoItem";
import { url } from "../utils/TodoApi";
import "./styles.css";

import FilterBar from "./FilterBar";
import useFetch from "./useFetch";
// import { useQueryClient } from "react-query";

function Todo() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const { data, isLoading, error } = useFetch();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // const queryClient = useQueryClient();
  const deleteTodo = async (id: string) => {
    await fetch(`${url}/${id}`, { method: "DELETE" });
    const filterTodo = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodo);
  };

  // const deleteTodo = async (id: string) => {
  //   console.log("Working delete");
  //   try {
  //     await fetch(`${url}/${id}`, { method: "DELETE" });
  //     queryClient.refetchQueries(["todoList"]);
  //   } catch (error) {
  //     console.error("Error deleting todo: ", error);
  //   }
  // };

  const handleCheckbox = async (id: string, checked: boolean) => {
    await fetch(`${url}/${id}, {method}`);
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

  return (
    <>
      <FilterBar
        onSearch={handleSearch}
        onSortByTask={sortByTitle}
        onSortByDueDate={sortByDate}
        onStatusChange={handleStatusChange}
      />
      {error ? (
        // <p> {error} </p>
        alert(error)
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <ListTodoItem
          todos={todos}
          deleteTodo={deleteTodo}
          handleCheckbox={handleCheckbox}
          loading={isLoading}
          error={error}
        />
      )}
    </>
  );
}

export default Todo;
