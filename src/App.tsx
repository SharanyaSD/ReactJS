import Todo from "./component/Todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/component/Header";
import AddTodo from "./component/AddTodo";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Todo />} />

        <Route path="/addtodo" element={<AddTodo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
