import React from "react";
import { TodoInterface } from "../utils/todoInterface";
import ShowTodo from "./ShowTodo";
import "./styles.css";

const ListTodoItem = (props: {
  todos: TodoInterface[];
  deleteTodo: (id: number) => void;
  handleCheckbox: (id: number, checked: boolean) => void;
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
