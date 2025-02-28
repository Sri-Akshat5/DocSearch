import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://docsearch-y8m5.onrender.com/api/auth/login", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center mt-5 p-4 ">
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg text-center ">
        <h2 className="text-3xl font-bold text-white mb-6">🔐 Login to <span className="text-blue-400">DocSearch</span></h2>

        
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md  text-gray-950 border border-gray-600  "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md  text-gray-950 border border-gray-600  "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>


        <p className="text-gray-300 text-sm mt-4">
          Don't have an account? <a href="/register" className="text-blue-400 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
