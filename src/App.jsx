import "./app.css";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideBar";

const App = () => {
  return (
    <div>
      <Header />
      <div className="flex min-h-screen">
        <SideBar className="w-1/4 bg-gray-100" />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Content is here</h1>
          <p>Welcome to our Project Manager System app!</p>
        </main>
      </div>
    </div>
  );
};

export default App;
