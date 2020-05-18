import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <ToDosProvider>
    <App />
  </ToDosProvider>,
  document.getElementById("root")
);
