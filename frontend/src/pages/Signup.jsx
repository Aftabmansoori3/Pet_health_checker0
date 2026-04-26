import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    // simple storage
    localStorage.setItem("user", email);
    alert("Account created!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-400">

      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-80 text-white">

        <h1 className="text-3xl font-bold text-center mb-4">🐾 Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded-lg text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded-lg text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg font-semibold"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;