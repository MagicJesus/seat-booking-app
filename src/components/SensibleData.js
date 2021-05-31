import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../actions";

const SensibleData = (props) => {
  const logged = useSelector((state) => state.logged);
  const dispatch = useDispatch();

  const renderAuthButton = () => {
    if (logged) {
      return (
        <h3>
          Sensible data{" "}
          <button onClick={() => dispatch(signOut())}>Log Out</button>
        </h3>
      );
    } else {
      return (
        <h3>
          <button onClick={() => dispatch(signIn())}>Sign In</button>
        </h3>
      );
    }
  };
  return renderAuthButton();
};

export default SensibleData;
