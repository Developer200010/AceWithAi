import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const registeringUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!validatePassword(password)) {
      setError(
        "Password must have at least 8 characters, including uppercase, lowercase, number & special character."
      );
      return;
    }

    setLoading(true); // start loading
    try {
      const user = await axios.post(
        "http://localhost:4000/api/auth/register",
        { username, email, password },
        { withCredentials: true }
      );
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <motion.div
        className="border-2 border-l-blue-600 border-b-pink-600 border-r-blue-600 border-t-white rounded-2xl shadow-2xl w-full max-w-md p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}

        <form onSubmit={registeringUser} className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-white" size={20} />
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-white" size={20} />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-white" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-white focus:outline-none text-white focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-white"
              onClick={togglePassword}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading} 
            className={`w-full py-2 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 hover:cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600"
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
            <span>{loading ? "Registering..." : "Register"}</span>
          </button>
        </form>

        <div className="mt-4 text-center flex flex-col gap-2">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

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
