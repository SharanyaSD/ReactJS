import Todo from "./component/Todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/component/Header";
import AddTodo from "./component/AddTodo";
import TodoDetails from "./component/TodoDetails";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Todo />} />
          {/* <Route path="/todos/:id" element={<TodoRoutes/>} /> */}

          <Route path="/addtodo" element={<AddTodo />} />
          <Route path="/todo/:id" element={<TodoDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
