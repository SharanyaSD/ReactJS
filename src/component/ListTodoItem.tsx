import { TodoInterface } from "../utils/TodoInterface";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface ListTodoItemProps {
  currentPage: number;
  setCurrentpage: (x: number) => void;
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

  pages?: number;
}

const ListTodoItem: React.FC<ListTodoItemProps> = (props) => {
  const { currentPage, setCurrentpage } = props;
  const currentRecords = props.todos;

  const navigate = useNavigate();

  const renderRecords = currentRecords.map((todo) => (
    <li className="todoList" key={todo.id}>
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
      <span className="span">
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

  const handlePageClick = (pageNo: number) => {
    setCurrentpage(pageNo);
  };

  const paginationArray = new Array(props.pages)
    .fill(0)
    .map((_, index) => index + 1);
  return (
    <div className="main-container">
      <>
        <div className="todoListContainer">
          <h1 className="ToDoh1">Your to-do List </h1>
          <ul>{renderRecords}</ul>

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {/* Handling condition for no prev page */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentpage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {paginationArray.map((pageNo) => (
                <li
                  key={pageNo}
                  className={`page-item ${
                    currentPage === pageNo ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageClick(pageNo)}
                  >
                    {pageNo}
                  </button>
                </li>
              ))}

              {/* {Array.from({ length: props.pages }).map((_, index) => (
                <li
                  key={index}
                  className={`page-link ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </li>
              ))} */}

              {/* Handling condition for no next page */}
              <li
                className={`page-item ${
                  currentPage === props.pages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === props.pages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </>
    </div>
  );
};

export default ListTodoItem;
