import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Remove this line if you don't have an index.css file
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);