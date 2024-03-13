import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { Decrement, Increment, Reset } from "../redux/actions";

const Counter = () => {
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch: AppDispatch = useDispatch();
  return (
    <div>
      <h1>Redux Counter App</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={() => dispatch(Increment())}>Increment</button>
      <button onClick={() => dispatch(Decrement())}>Decrement</button>
      <button onClick={() => dispatch(Reset())}>Reset</button>
    </div>
  );
};

export default Counter;
