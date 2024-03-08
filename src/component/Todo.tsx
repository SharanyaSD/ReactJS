import React, { useEffect, useState } from "react";
import { TodoInterface } from "../utils/todoInterface";
import AddTodo from "./AddTodo";
import ListTodoItem from "./ListTodoItem";
import useFetch from "./useFetch";
import usePost from "./usePost";
import { url } from "../utils/TodoApi";
import "./styles.css";
import FilterBar from "./FilterBar";

function Todo() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const { data, loading, error } = useFetch();
  const { fetchPost } = usePost();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = (title: string, dueDate: string) => {
    const newTodo = { id: todos.length + 1, title, dueDate, completed: false };
    const flag = fetchPost(newTodo);
    if (!flag) {
      alert("Not added");
    }
    setTodos([...todos, newTodo]);
    alert("Added successfully");
  };

  const deleteTodo = (id: number) => {
    const filterTodo = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodo);
  };

  // const updateTodoEndpoint = (id: number, completed: boolean) =>
  //   `/api/todos/${id}completed=#{completed}`;

  const handleCheckbox = (id: number, checked: boolean) => {
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
    let filteredTodos = [...data];
    if (value === "completed")
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
    else if (value === "incomplete")
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  return (
    <>
      <AddTodo addTodo={addTodo} />
      <FilterBar
        onSearch={handleSearch}
        onSortByTask={sortByTitle}
        onSortByDueDate={sortByDate}
        onStatusChange={handleStatusChange}
      />
      {error ? (
        <p> {error} </p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <ListTodoItem
          todos={todos}
          deleteTodo={deleteTodo}
          handleCheckbox={handleCheckbox}
        />
      )}
    </>
  );
}

export default Todo;
