import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HistoryDetail from "./components/HistoryDetails.jsx";
import History from "./components/History.jsx";
import DashboardHome from "./components/DashboardHome.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route
    path="/dashboard/*"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  >
    <Route index element={<DashboardHome />} />
    <Route path="history" element={<History />} />
    <Route path="history/:id" element={<HistoryDetail />} /> {/* child route */}
  </Route>
    </Routes>
  );
}

export default App;
