import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("user", email);
      navigate("/profile");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* 🐶 LEFT SIDE (IMAGE SECTION) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-500 to-green-400 items-center justify-center relative overflow-hidden">

        {/* Background Image */}
        <img
          src="https://placedog.net/800"
          alt="pet"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/* Overlay Content */}
        <div className="relative text-white text-center p-10">
          <h1 className="text-4xl font-bold mb-4">
            🐾 Pet Health AI
          </h1>

          <p className="text-lg mb-4">
            Care for your pets with smart AI assistance
          </p>

          {/* Floating Emojis */}
          <div className="text-4xl animate-bounce">
            🐶 🐱 🐾
          </div>
        </div>
      </div>

      {/* 🔐 RIGHT SIDE (LOGIN FORM) */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">

        <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 transform hover:scale-105 transition duration-300">

          <h2 className="text-2xl font-bold text-center text-teal-600 mb-2">
            Welcome Back 🐶
          </h2>

          <p className="text-center text-gray-500 mb-4">
            Login to continue caring for your pet
          </p>

          {/* Small Pet Icons */}
          <div className="text-center text-2xl mb-4">
            🐾 🐕 🐈
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-teal-600 font-semibold">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;