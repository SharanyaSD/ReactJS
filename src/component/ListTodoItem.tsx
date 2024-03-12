import React from "react";
import { TodoInterface } from "../utils/TodoInterface";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface ListTodoItemProps {
  todos: TodoInterface[];
  deleteTodo: (id: string) => void;
  handleCheckbox: (id: string, checked: boolean) => void;
  loading?: boolean;
  error?: string | null;
}

const ListTodoItem: React.FC<ListTodoItemProps> = (props) => {
  const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate(`/todo/${id}`, { state: { id, title, completed, dueDate } });
  // };
  return (
    <div className="main-container">
      <h1 className="ToDoh1">Your to-do List </h1>
      {props.error && <p> {props.error}</p>}
      {props.loading && <p> Loading... </p>}
      {!props.loading && (
        <ul>
          {props.todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  props.handleCheckbox(todo.id, e.target.checked)
                }
              />
              <span
                className="span"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                <h6
                  onClick={() => navigate(`/todo/${todo.id}`, { state: todo })}
                >
                  {todo.title}
                </h6>
                <label>
                  {todo.dueDate && (
                    <div>
                      <span>Due Date: {todo.dueDate}</span>
                    </div>
                  )}
                </label>
                <div className="deletAlign">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => props.deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListTodoItem;
