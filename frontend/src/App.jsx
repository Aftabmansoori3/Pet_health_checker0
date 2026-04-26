import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/login";
import Home from "./pages/Home";
import PetProfile from "./pages/PetProfile";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">

        {/* Navbar */}
        <Navbar />

        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="fixed top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-lg z-50"
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<PetProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;