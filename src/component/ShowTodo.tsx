// import React from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ShowTodo = ({
  id,
  title,
  completed,
  dueDate,
  deleteTodo,
  handleCheckbox,
}: {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  deleteTodo: (id: string) => void;
  handleCheckbox: (id: string, checked: boolean) => void;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/todo/${id}`, { state: { id, title, completed, dueDate } });
  };
  return (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => handleCheckbox(id, e.target.checked)}
      />
      <span
        className="span"
        style={{ textDecoration: completed ? "line-through" : "none" }}
      >
        <h6 onClick={handleClick}>{title}</h6>
        <label>
          {dueDate && (
            <div>
              <span>Due Date: {dueDate}</span>
            </div>
          )}
        </label>
        <div className="deletAlign">
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </button>
        </div>
      </span>
    </>
  );
};

export default ShowTodo;
