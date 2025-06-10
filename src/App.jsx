import React from "react";
import { Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import LayoutWithBreadcrumb from "./components/layouts/LayoutWithBreadcrumb";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth";
import Projects from "./pages/project/main";
import Tasks from "./pages/task/main";
import WorkLogs from "./pages/WorkLogs";
import Home from "./pages/Home";
import Performance from "./pages/Performance";
import NotFound from "./pages/NotFound";
import Setting from "./pages/settings/main";

function App() {
  return (
    <AppProvider>
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
            path="/performance"
            element={
              <ProtectedRoute>
                <Performance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/*"
            element={
              <ProtectedRoute>
                <Setting />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
