import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import AgentDashboard from "../pages/Dashboard/AgentDashboard";
import CustomerDashboard from "../pages/Dashboard/CustomerDashboard";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="agent" element={<AgentDashboard />} />
          <Route path="customer" element={<CustomerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
