import React, { useEffect, useState } from "react";
import { TodoInterface } from "../utils/TodoInterface";
import AddTodo from "./AddTodo";
import ListTodoItem from "./ListTodoItem";
import useFetch from "./useFetch";
import usePost from "./usePost";
import { v4 as uuidv4 } from "uuid";
import { url } from "../utils/TodoApi";
import "./styles.css";

function Todo() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const { loading, error } = useFetch();
  const { fetchPost } = usePost();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = (title: string, dueDate: string) => {
    const today = new Date();
    const enteredDate = new Date(dueDate);
    const newTodo: TodoInterface = {
      id: uuidv4(),
      title,
      dueDate,
      completed: false,
    };
    if (enteredDate < today) {
      alert("Invalid due date. Please enter a date that is not in the past.");
      return;
    }
    const flag = fetchPost(newTodo);
    if (!flag) {
      alert("Not added");
    }

    setTodos([...todos, newTodo]);
    alert("Added successfully");
  };

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
    <>
      <AddTodo addTodo={addTodo} />

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
