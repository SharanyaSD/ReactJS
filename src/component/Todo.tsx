import React, { useEffect, useState } from "react";
import { TodoInterface } from "../utils/TodoInterface";
import ListTodoItem from "./ListTodoItem";
import { url } from "../utils/TodoApi";
import "./styles.css";

import FilterBar from "./FilterBar";
import useFetch from "./useFetch";
import { useQueryClient } from "@tanstack/react-query";

function Todo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("none");
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [status, setStatus] = useState<string>("all");
  const { data, isLoading, error } = useFetch(currentPage, sortBy, status);

  useEffect(() => {
    if (data) {
      setTodos(data.data);
    }
  }, [data]);

  const queryClient = useQueryClient();

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`${url}/${id}`, { method: "DELETE" });
      queryClient.refetchQueries({ queryKey: ["todos"] });
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const handleCheckbox = async (
    id: string,
    title: string,
    checked: boolean,
    dueDate: string
  ) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: checked } : todo
      );
      setTodos(updatedTodos);
      await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title, completed: checked, dueDate }),
      });
      // queryClient.refetchQueries({ queryKey: ["todos"] });
    } catch (error) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !checked } : todo
        )
      );
    }
    console.error("Error updating todo: ", error);
  };

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

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const filteredTodoByStatus =
    status === "all"
      ? todos
      : todos.filter((todo) => String(todo.completed) === status);

  if (error) {
    return <>{error}</>;
  }

  if (isLoading) {
    return <>Loading..</>;
  }

  return (
    <>
      <FilterBar
        setSortBy={setSortBy}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
      />

      <ListTodoItem
        currentPage={currentPage}
        setCurrentpage={setCurrentPage}
        todos={filteredTodoByStatus}
        deleteTodo={deleteTodo}
        handleCheckbox={handleCheckbox}
        loading={isLoading}
        error={error}
        pages={data.pages}
      />
    </>
  );
}

export default Todo;
