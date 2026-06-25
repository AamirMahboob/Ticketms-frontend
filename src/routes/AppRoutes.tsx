import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";

import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import AgentDashboard from "../pages/Dashboard/AgentDashboard";
import CustomerDashboard from "../pages/Dashboard/CustomerDashboard";

import Users from "../pages/Dashboard/User";
import AdminTickets from "../pages/Dashboard/AdminTickets";
import AgentTickets from "../pages/Dashboard/AgentTickets";
import CustomerTicket from "../pages/Dashboard/CustomerTicket";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Admin */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="tickets"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminTickets />
              </ProtectedRoute>
            }
          />

          {/* Agent */}
          <Route
            path="agent"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="tickets/agent"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <AgentTickets />
              </ProtectedRoute>
            }
          />

          {/* Customer */}
          <Route
            path="customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="tickets/customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerTicket />
              </ProtectedRoute>
            }
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}