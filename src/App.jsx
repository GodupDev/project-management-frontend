import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import { MockDataProvider } from "./context/MockDataContext";
import LayoutWithBreadcrumb from "./components/layouts/LayoutWithBreadcrumb";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Login from "./pages/Login";
import Projects from "./pages/project/Main";
import Tasks from "./pages/task/Main.jsx";
import WorkLogs from "./pages/WorkLogs";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MockDataProvider>
          <SidebarProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<LayoutWithBreadcrumb />}>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects/*"
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tasks/*"
                  element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/worklogs/*"
                  element={
                    <ProtectedRoute>
                      <WorkLogs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </SidebarProvider>
        </MockDataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
