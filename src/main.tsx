import React from "react";
import ReactDOM from "react-dom";
import Index from "./Component/Index";
import "./CSS/Index.css";
import Routing from "./Routing/Index";

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById("root")
);
