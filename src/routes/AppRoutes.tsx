import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import AgentDashboard from "../pages/Dashboard/AgentDashboard";
import CustomerDashboard from "../pages/Dashboard/CustomerDashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import Users from "../pages/Dashboard/User";
import AdminTickets from "../pages/Dashboard/AdminTickets";
import AgentTickets from "../pages/Dashboard/AgentTickets";
import CustomerTicket from "../pages/Dashboard/CustomerTicket";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="agent" element={<AgentDashboard />} />
          <Route path="customer" element={<CustomerDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="tickets" element={<AdminTickets />} />
          <Route path="tickets/agent" element={<AgentTickets />} />
          <Route path="tickets/customer" element={<CustomerTicket/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
