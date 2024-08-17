import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";

createRoot(document.getElementById("root")).render(<Register />);
