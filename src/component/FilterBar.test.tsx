import { fireEvent, render, screen } from "@testing-library/react";
import FilterBar from "./FilterBar";
import "@testing-library/jest-dom/extend-expect";

describe("FilterBar", () => {
  test("renders all search input fields", () => {
    render(
      <FilterBar
        setSortBy={() => {}}
        onSearch={() => {}}
        onStatusChange={() => {}}
      />
    );
    const searchInput = screen.getByPlaceholderText("Enter Search");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders sortByTask button", () => {
    render(
      <FilterBar
        setSortBy={() => {}}
        onSearch={() => {}}
        onStatusChange={() => {}}
      />
    );
    const sortByTaskButton = screen.getByText("Sort by Task");
    expect(sortByTaskButton).toBeInTheDocument();
  });

  test("renders sortByDueDate button", () => {
    render(
      <FilterBar
        setSortBy={() => {}}
        onSearch={() => {}}
        onStatusChange={() => {}}
      />
    );
    const sortByDueDateButton = screen.getByText("Sort by Due Date");
    expect(sortByDueDateButton).toBeInTheDocument();
  });

  test("renders search input field value", () => {
    const { rerender } = render(
      <FilterBar
        setSortBy={() => {}}
        onSearch={() => {}}
        onStatusChange={() => {}}
      />
    );
    const searchInput = screen.getByPlaceholderText("Enter Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    rerender(
      <FilterBar
        setSortBy={() => {}}
        onSearch={() => {}}
        onStatusChange={() => {}}
      />
    );
    expect(searchInput).toHaveValue("test");
  });

  test("renders status select value", () => {
    const { rerender } = render(
      <FilterBar
        setSortBy={() => {}}
        onSearch={() => {}}
        onStatusChange={() => {}}
      />
    );
    const statusSelect = screen.getByRole("combobox");
    fireEvent.change(statusSelect, { target: { value: "false" } });
    rerender(
      <FilterBar
        setSortBy={() => {}}
        onSearch={() => {}}
        onStatusChange={() => {}}
      />
    );
    expect(statusSelect).toHaveValue("false");
  });
});
