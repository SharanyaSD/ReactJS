import { useState } from "react";

const AddTodo = ({
  addTodo,
}: {
  addTodo: (title: string, dueDate: Date) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddTodo = () => {
    addTodo(inputValue, dueDate);
    setInputValue("");
    setDueDate("");
  };

  return (
    <div>
      <form>
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
