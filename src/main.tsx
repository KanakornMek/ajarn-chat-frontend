import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Course from "./pages/Course.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthProvider from "./components/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route
            path="/courses/:course_id/threads/:thread_urgency"
            element={
              <ProtectedRoute>
                <Course />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    <App />
  </React.StrictMode>
);
