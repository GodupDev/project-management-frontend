import "./app.css";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideBar";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppContent() {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-[var(--color-background-default)] text-[var(--color-text-primary)] transition-colors duration-300">
      <Header />
      <div className="flex min-h-screen pt-[4.5rem]">
        <SideBar />
        <div
          className={`flex-1 p-6 bg-[var(--color-background-default)] ${
            isOpen ? "ml-[20rem]" : "ml-[5rem]"
          }`}
        >
          <h1 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
            Content is here
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Welcome to our Project Manager System app!
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
