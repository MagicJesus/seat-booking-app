import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../actions";
const CounterComponent = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default CounterComponent;
