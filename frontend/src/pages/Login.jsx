import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const logginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <motion.div
        className="border-2 border-l-blue-600 border-b-pink-600 border-r-blue-600 border-t-white rounded-2xl  shadow-2xl w-full max-w-md p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={logginUser}>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-white" size={20} />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-2 text-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-white" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 rounded-xl text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-white"
              onClick={togglePassword}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 py-2 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 hover:cursor-pointer ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            <span>{loading ? "Logging in..." : "Login"}</span>
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Go to Home Button */}
        <div className="mt-4 text-center">

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full py-2 bg-yellow-400 text-gray-900 font-bold rounded-xl shadow-lg hover:bg-yellow-500 transition"
          >
            <FiHome size={20} /> Go to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
