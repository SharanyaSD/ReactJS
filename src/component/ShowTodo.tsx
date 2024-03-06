import React from "react";
import "./styles.css";

const ShowTodo = ({
  id,
  title,
  completed,
  deleteTodo,
  handleCheckbox,
}: {
  id: number;
  title: string;
  completed: boolean;
  deleteTodo: (id: number) => void;
  handleCheckbox: (id: number, checked: boolean) => void;
}) => {
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
        <label>{title}</label>
        <div className="deletAlign">
          <button className="deletButton" onClick={() => deleteTodo(id)}>
            Delete
          </button>
        </div>
      </span>
    </>
  );
};

export default ShowTodo;
