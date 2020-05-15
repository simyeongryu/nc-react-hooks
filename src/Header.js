import React, { useContext } from "react";
import { UserContext } from "./context";

function Header() {
  const context = useContext(UserContext);
  const {
    user: { name, loggedIn }
  } = context;
  return (
    <header>
      <a href="#">Home</a> Hello {name}, {loggedIn ? "Logged in" : "anonymous"}!
    </header>
  );
}

export default Header;
