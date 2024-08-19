import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import ProjectsList from "./components/Dashboard/ProjectsList.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsList />} />{" "}
        {/* Projeler için rota */}
        <Route path="/" element={<Login />} />{" "}
        {/* Varsayılan olarak Login sayfasını render eder */}
      </Routes>
    </Router>
  </StrictMode>
);
