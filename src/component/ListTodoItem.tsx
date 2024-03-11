import React from "react";
import { TodoInterface } from "../utils/TodoInterface";
import ShowTodo from "./ShowTodo";
import "./styles.css";

const ListTodoItem = (props: {
  todos: TodoInterface[];
  deleteTodo: (id: string) => void;
  handleCheckbox: (id: string, checked: boolean) => void;
}) => {
  return (
    <div className="main-container">
      <h1 className="ToDoh1">Your to-do List </h1>
      <ul>
        {" "}
        {props.todos.map((todo) => (
          <li key={todo.id}>
            <ShowTodo
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              dueDate={todo.dueDate}
              deleteTodo={props.deleteTodo}
              handleCheckbox={props.handleCheckbox}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTodoItem;
