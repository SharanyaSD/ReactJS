import React, { useState } from "react";
import { TodoInterface } from "../utils/TodoInterface";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface ListTodoItemProps {
  todos: TodoInterface[];
  deleteTodo: (id: string) => void;
  handleCheckbox: (
    id: string,
    title: string,
    checked: boolean,
    dueDate: string
  ) => void;
  loading?: boolean;
  error?: string | null;
}

const ListTodoItem: React.FC<ListTodoItemProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = props.todos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate(`/todo/${id}`, { state: { id, title, completed, dueDate } });
  // };

  const renderRecords = currentRecords.map((todo) => (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) =>
          props.handleCheckbox(
            todo.id,
            todo.title,
            e.target.checked,
            todo.dueDate
          )
        }
      />
      <span
        className="span"
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        <h6 onClick={() => navigate(`/todo/${todo.id}`, { state: todo })}>
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
  ));

  const totalPages = Math.ceil(props.todos.length / recordsPerPage);
  const handlePageClick = (pageNo: number) => {
    setCurrentPage(pageNo);
  };

  return (
    <div className="main-container">
      <h1 className="ToDoh1">Your to-do List </h1>

      <>
        <ul>{renderRecords}</ul>
        {totalPages > 1 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {/* Handling condition for no prev page */}
              <li className={`page-item ${currentPage == 1 ? "disabled" : ""}`}>
                <a
                  className="page-link"
                  onClick={() => handlePageClick(currentPage - 1)}
                  href={`#${currentPage - 1}`}
                >
                  Previous
                </a>
              </li>

              {/* create array with length totalPages -5 */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className="page-item active">
                  <a
                    className={`page-link ${
                      currentPage == index + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageClick(index + 1)}
                    href={`#${index + 1}`}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}

              {/* Handling condition for no next page */}
              <li
                className={`page-item ${
                  currentPage == totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  onClick={() => handlePageClick(currentPage + 1)}
                  href={`#${currentPage + 1}`}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        )}
      </>
    </div>
  );
};

export default ListTodoItem;
