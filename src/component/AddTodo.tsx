import { useState } from "react";
import usePost from "./usePost";
import { v4 as uuidv4 } from "uuid";
import { TodoInterface } from "../utils/TodoInterface";

const AddTodo = () => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { postTodo } = usePost();

  const handleAddTodo = () => {
    const today = new Date();
    const enteredDate = new Date(dueDate);
    const newTodo: TodoInterface = {
      id: uuidv4(),
      title: inputValue,
      dueDate,
      completed: false,
    };
    if (enteredDate < today) {
      alert("Invalid due date. Please enter a date that is not in the past.");
      return;
    }
    postTodo(newTodo);

    alert("Added successfully");

    setInputValue("");
    setDueDate("");
  };

  return (
    <div className="addTodoForm">
      <form>
        <h1>Add Todo</h1>
        <input
          className="input"
          type="text"
          placeholder="Enter a todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          className="input"
          placeholder="Enter a date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <br></br>
        <button
          className="addButton"
          onClick={(e) => {
            e.preventDefault();
            handleAddTodo();
          }}
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
