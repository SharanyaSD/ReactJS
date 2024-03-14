import { fireEvent, render, screen } from "@testing-library/react";
import AddTodo from "./AddTodo";
import "@testing-library/jest-dom/extend-expect";
// import { usePostMock } from "./__mocks__/usePost";

// jest.mock("./usePost", () => usePostMock);

const testProps = {
  pastDueDate: "Please enter a date that is not in the past",
};

describe("AddTodo", () => {
  test("render page header", () => {
    render(<AddTodo />);
    const element = screen.getByText("Add Todo");
    expect(element).toBeDefined();
  });

  test("render input fields", () => {
    render(<AddTodo />);
    const input = screen.getByPlaceholderText("Enter a todo...");
    const dateInput = screen.getByPlaceholderText("Enter a date");
    expect(input).toBeDefined();
    expect(dateInput).toBeDefined();
  });

  test("ADD button initially disabled", () => {
    render(<AddTodo />);
    const addButton = screen.getByText("ADD");
    expect(addButton).toBeDisabled();
  });

  test("ADD button is enabled after entering input values", () => {
    render(<AddTodo />);
    const input = screen.getByPlaceholderText("Enter a todo...");
    const dateInput = screen.getByPlaceholderText("Enter a date");
    const addButton = screen.getByText("ADD");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.change(dateInput, { target: { value: "2024-10-10" } });
    expect(addButton).toBeEnabled();
  });

  // test("Error when added dueDate of past", () => {
  //   render(<AddTodo />);
  //   const input = screen.getByPlaceholderText("Enter a todo...");
  //   const dateInput = screen.getByPlaceholderText("Enter a date");
  //   const addButton = screen.getByText("ADD");
  //   fireEvent.change(input, { target: { value: "New Todo" } });
  //   fireEvent.change(dateInput, { target: { value: "2024-10-10" } });
  //   fireEvent.click(addButton);
  //   const errorMessage = screen.getByText(`${testProps.pastDueDate}`);
  //   expect(errorMessage).toBeDefined();
  // });

  // test("add todo successfully", () => {
  //   render(<AddTodo />);
  //   const input = screen.getByPlaceholderText("Enter a todo...");
  //   const dateInput = screen.getByPlaceholderText("Enter a date");
  //   const addButton = screen.getByText("ADD");

  //   fireEvent.change(input, { target: { value: "New Todo" } });
  //   fireEvent.change(dateInput, { target: { value: "2023-12-10" } });
  //   fireEvent.click(addButton);

  //   expect(usePostMock.postTodo).toHaveBeenCalledWith({
  //     id: expect.any(String),
  //     title: "New todo",
  //     dueDate: "2022-12-31",
  //     completed: false,
  //   });
  // });
});
//initially input add and date is empty
//add todo successfully
//input field and date picker are updated when the user types in the input field or selects a date
//input field and date picker are cleared after the todo is added
//postTodo function is called with correc input and add click
//alert on sucessfuly adding todo
