import React from "react";
import { useUser } from "./context";

function Header() {
  const { name, loggedIn } = useUser();
  return (
    <header>
      <a href="#">Home</a> Hello {name}, {loggedIn ? "Logged in" : "anonymous"}!
    </header>
  );
}

export default Header;
