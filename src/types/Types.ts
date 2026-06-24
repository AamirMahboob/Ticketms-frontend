// ─── Shared Types ─────────────────────────────────────────────────────────────

export type Role = "admin" | "agent" | "customer";
export type TicketStatus = "Open" | "In Progress" | "Resolved";
export type TicketPriority = "Low" | "Medium" | "High";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AdminStats {
  totalUsers: number;
  totalTickets: number;
  openTickets: number;
  closedTickets: number;
}

export interface AgentStats {
  assignedTickets: number;
  openTickets: number;
  resolvedTickets: number;
}

export interface CustomerStats {
  myTickets: number;
  openTickets: number;
  resolvedTickets: number;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  priority: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketResponse {
  success: boolean;
  message: string;
  ticket: Ticket;
}