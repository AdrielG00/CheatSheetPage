import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import Login from "./login";

import RateCalculator from "./pages/RateCalculator";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  if (!user) return <Login setUser={setUser} />;

  return (
    <Router>
      <nav style={{ display: "flex", gap: 20, padding: 15, background: "#111", color: "#fff" }}>
        <NavLink to="/">Rate Calculator</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<RateCalculator />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}