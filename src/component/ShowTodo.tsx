import React from "react";
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
  dueDate: Date;
  deleteTodo: (id: string) => void;
  handleCheckbox: (id: string, checked: boolean) => void;
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
        <label>
          {dueDate && (
            <div>
              <span>Due Date: {dueDate}</span>
            </div>
          )}
        </label>
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
