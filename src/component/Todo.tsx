import React, { useEffect, useReducer } from "react";
import { TodoInterface } from "../utils/TodoInterface";
import ListTodoItem from "./ListTodoItem";
import { url } from "../utils/TodoApi";
import "./styles.css";

import FilterBar from "./FilterBar";
import useFetch from "./useFetch";
import { useQueryClient } from "@tanstack/react-query";

type State = {
  currentPage: number;
  sortBy: string;
  todos: TodoInterface[];
  status: string;
};

type Action =
  | { type: "SET_TODOS"; payload: TodoInterface[] }
  | { type: "SET_STATUS"; payload: string }
  | { type: "SET_SORT_BY"; payload: string }
  | { type: "SET_CURRENT_PAGE"; payload: number };

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
function Todo() {
  const initialState: State = {
    currentPage: 1,
    sortBy: "none",
    todos: [],
    status: "all",
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { currentPage, sortBy, todos, status } = state;
  const { data, isLoading, error } = useFetch(currentPage, sortBy, status);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_TODOS", payload: data.data });
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
      dispatch({ type: "SET_TODOS", payload: updatedTodos });

      await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title, completed: checked, dueDate }),
      });
    } catch (error) {
      console.error("error updating todo: ", error);
      dispatch({ type: "SET_TODOS", payload: todos });
    }
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      dispatch({ type: "SET_TODOS", payload: data });
    } else {
      const filterTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(value.toLowerCase())
      );
      dispatch({ type: "SET_TODOS", payload: filterTodos });
    }
  };

  const handleStatusChange = (value: string) => {
    dispatch({ type: "SET_STATUS", payload: value });
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
        setSortBy={(value: string) =>
          dispatch({ type: "SET_SORT_BY", payload: value })
        }
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
      />

      <ListTodoItem
        currentPage={currentPage}
        setCurrentpage={(value: number) =>
          dispatch({ type: "SET_CURRENT_PAGE", payload: value })
        }
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
