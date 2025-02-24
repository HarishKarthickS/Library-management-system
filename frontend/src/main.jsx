import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import global styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
          <ToastContainer position="top-right" autoClose={10} />
          <App />
  </React.StrictMode>
);
