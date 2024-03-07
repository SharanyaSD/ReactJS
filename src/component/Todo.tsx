import React, { useEffect, useState } from "react";
import { TodoInterface } from "../utils/todoInterface";
import AddTodo from "./AddTodo";
import ListTodoItem from "./ListTodoItem";
import useFetch from "./useFetch";
import usePost from "./usePost";
import { url } from "../utils/TodoApi";
import "./styles.css";
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
    if (flag) {
      setTodos([...todos, newTodo]);
      alert("Added sucessfully");
    }
  };
  console.log("Todos", todos);

  const deleteTodo = (id: number) => {
    const filterTodo = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodo);
  };

  const handleCheckbox = (id: number, checked: boolean) => {
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
