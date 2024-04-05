import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Course from "./pages/Course.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/courses/:course_id/threads/:thread_urgency"
          element={<Course />}
        />
      </Routes>
    </BrowserRouter>
    <App />
  </React.StrictMode>
);
