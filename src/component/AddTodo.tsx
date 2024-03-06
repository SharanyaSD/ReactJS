import { useState } from "react";

const AddTodo = ({ addTodo }: { addTodo: (title: string) => void }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <input
        className="input"
        type="text"
        placeholder="Enter a todo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="addButton"
        onClick={() => {
          addTodo(inputValue);
          setInputValue("");
        }}
      >
        ADD
      </button>
    </div>
  );
};

export default AddTodo;
