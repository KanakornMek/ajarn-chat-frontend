import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Course from "./pages/Course.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import ThreadList from "./pages/ThreadList.tsx";
import Messages from "./pages/Messages.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route
            path="/courses/:course_id"
            element={
              <ProtectedRoute>
                <Course />
              </ProtectedRoute>
            }
          >
            {/* <Route path="announcement" element={<Announcement />}></Route> */}
            <Route path="threads/:urgency_tag" element={
              <ProtectedRoute>
                <ThreadList />
              </ProtectedRoute>
            }/>
            <Route path="threads/:thread_id/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    <App />
  </React.StrictMode>
);
