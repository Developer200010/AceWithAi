import { FiHome, FiMessageSquare, FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-20 transition-opacity md:hidden ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-black border-2 border-r-white shadow-lg p-6 flex flex-col justify-between transform transition-transform md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          <div className="w-20 h-20 flex items-center">
            <img
              src="/logo.svg"
              alt="logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <nav className="space-y-4">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 hover:cursor-pointer ${location.pathname === "/dashboard"
                  ? "gradient-text font-bold"
                  : "text-white font-bold"
                }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FiHome className="font-bold text-white" /><span className="text-xl font-bold">TakeTest</span>
            </Link>

            <Link
              to="/dashboard/history"
              className={`flex items-center gap-2 ${location.pathname.startsWith("/dashboard/history")
                  ? "gradient-text font-bold"
                  : "text-white font-bold"
                }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FiMessageSquare className="text-white font-bold" /><span className="text-xl font-bold">History</span>
            </Link>
          </nav>
        </div>

        <button
          onClick={logoutUser}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold mt-6"
        >
          <FiLogOut /> Logout
        </button>
      </aside>
    </>
  );
}
