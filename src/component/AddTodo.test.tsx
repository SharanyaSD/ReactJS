import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AddTodo from "./AddTodo";

test("render page header", () => {
  render(<AddTodo />);
  const element = screen.getByText("Add Todo");
  expect(element).toBeInTheDocument();
});
