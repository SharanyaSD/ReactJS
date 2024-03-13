import React, { useState } from "react";
import "./styles.css";

const FilterBar = ({
  onSearch,
  onSortByTask,
  onSortByDueDate,
  onStatusChange,
}: {
  onSearch: (value: string) => void;
  onSortByTask: () => void;
  onSortByDueDate: () => void;
  onStatusChange: (value: string) => void;
}) => {
  const [searchItem, setSearchItem] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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

      <button className="sortBtn" onClick={onSortByTask}>
        Sort by Task
      </button>
      <button className="sortBtn" onClick={onSortByDueDate}>
        Sort by Due Date
      </button>

      <select
        className="statusDropdown"
        value={statusValue}
        onChange={handleStatusChange}
      >
        <option value="all">All</option>
        <option value="true">Completed</option>
        <option value="false">Incompleted</option>
      </select>
    </div>
  );
};

export default FilterBar;
