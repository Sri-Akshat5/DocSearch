import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiFile, FiUpload, FiSearch, FiLogIn, FiLogOut } from "react-icons/fi"; // Import icons

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); 
  const [menuOpen, setMenuOpen] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">

        <h1 className="text-2xl font-bold tracking-wide flex items-center">
          <FiFile className="mr-2 text-blue-400" size={24} />
          DocSearch
        </h1>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FiHome size={20} /> Home
          </Link>
          {/* <Link to="/view" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FiFile size={20} /> View Document
          </Link> */}
          <Link to="/view" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FiUpload size={20} /> Upload Document
          </Link>
          <Link to="/search" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FiSearch size={20} /> Search Document
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              <FiLogOut size={20} /> Logout
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-2 hover:text-blue-400 transition">
              <FiLogIn size={20} /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>


      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-800 mt-2 p-4 rounded-lg shadow-md">
          <Link to="/" className="flex items-center gap-2 py-2 hover:text-blue-400 transition">
            <FiHome size={20} /> Home
          </Link>
          <Link to="/view" className="flex items-center gap-2 py-2 hover:text-blue-400 transition">
            <FiFile size={20} /> View Document
          </Link>
          <Link to="/view" className="flex items-center gap-2 py-2 hover:text-blue-400 transition">
            <FiUpload size={20} /> Upload Document
          </Link>
          <Link to="/search" className="flex items-center gap-2 py-2 hover:text-blue-400 transition">
            <FiSearch size={20} /> Search Document
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 mt-2 rounded-lg transition"
            >
              <FiLogOut size={20} /> Logout
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-2 py-2 hover:text-blue-400 transition">
              <FiLogIn size={20} /> Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
