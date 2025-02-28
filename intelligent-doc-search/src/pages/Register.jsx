import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "./config";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
      navigate("/"); 
    } catch (err) {
      setError("Email already exists or invalid details");
    }
  };

  return (
    <div className="flex justify-center mt-5 p-4">
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg text-center ">
        <h2 className="text-3xl font-bold text-white mb-6">📝 Register for <span className="text-blue-400">DocSearch</span></h2>

        
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

       
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-md   text-gray-950 border border-gray-600 "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md   text-gray-950 border border-gray-600 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md   text-gray-950 border border-gray-600 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Register
          </button>
        </form>

       
        <p className="text-gray-300 text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
