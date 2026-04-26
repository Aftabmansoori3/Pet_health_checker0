import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="flex justify-between items-center p-4 shadow bg-white dark:bg-gray-800">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600">🐾 PetCare AI</h1>

      {/* Links */}
      <div className="flex gap-4">
        <Link to="/home" className={linkStyle("/home")}>
          Home
        </Link>

        <Link to="/dashboard" className={linkStyle("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/profile" className={linkStyle("/profile")}>
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Navbar;