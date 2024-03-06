import React from "react";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./component/Todo";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/addtodo" element={<Todo />} />
        {/* <Route path="/addtodo" element={<AddTodo />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
