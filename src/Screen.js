import React from "react";
import Header from "./Header";
import { useFns } from "./context";

function Screen() {
  const { logUserIn, logUserOut } = useFns();

  return (
    <div>
      <Header />
      <h1>First screen</h1>
      <button onClick={logUserIn}> Log user In</button>
      <button onClick={logUserOut}> Log user Out</button>
    </div>
  );
}

export default Screen;
