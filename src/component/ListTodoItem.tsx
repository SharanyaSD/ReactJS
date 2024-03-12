import React from "react";
import { TodoInterface } from "../utils/TodoInterface";
import ShowTodo from "./ShowTodo";
import "./styles.css";

interface ListTodoItemProps {
  todos: TodoInterface[];
  deleteTodo: (id: string) => void;
  handleCheckbox: (id: string, checked: boolean) => void;
  loading?: boolean;
  error?: string | null;
}

const ListTodoItem: React.FC<ListTodoItemProps> = (props) => {
  // const { loading, error } = useFetch();

  return (
    <div className="main-container">
      <h1 className="ToDoh1">Your to-do List </h1>
      <ul>
        {props.todos.map((todo) => (
          <li key={todo.id}>
            {props.error ? (
              <p> {props.error} </p>
            ) : props.loading ? (
              <p>Loading...</p>
            ) : (
              <ShowTodo
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                dueDate={todo.dueDate}
                deleteTodo={props.deleteTodo}
                handleCheckbox={props.handleCheckbox}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTodoItem;
