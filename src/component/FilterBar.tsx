import React, { useState } from "react";
import "./styles.css";

interface FilterBarProps {
  setSortBy: (sort: string) => void;
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  setSortBy,
  onSearch,
  onStatusChange,
}) => {
  const [searchItem, setSearchItem] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("all");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    onSearch(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(e.target.value);
    onStatusChange(e.target.value);
  };

  return (
    <div className="filter-bar">
      <input
        className="input"
        type="text"
        placeholder="Enter Search"
        value={searchItem}
        onChange={handleSearchChange}
      />
      <div className="filterButtons">
        <button
          style={{ margin: "0 5px" }}
          className="btn btn-outline-primary"
          onClick={() => setSortBy("title")}
        >
          Sort by Task
        </button>
        <button
          style={{ margin: "0 5px" }}
          className="btn btn-outline-primary"
          onClick={() => setSortBy("dueDate")}
        >
          Sort by Due Date
        </button>

        <select
          style={{ margin: "0 5px" }}
          className="btn btn-secondary"
          value={statusValue}
          onChange={handleStatusChange}
        >
          <option value="all">All</option>
          <option value="true">Completed</option>
          <option value="false">Incompleted</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
