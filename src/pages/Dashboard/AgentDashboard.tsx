import {
  CheckCircle,
  Clock,
  AlertCircle,
  Ticket,
} from "lucide-react";

import type {
  TicketStatus,
  TicketPriority,
} from "../../types/Types";

/* -----------------------------
   TYPES (already defined, just used here)
------------------------------*/

type TicketItem = {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
};

/* -----------------------------
   DATA
------------------------------*/

const stats = [
  {
    title: "Assigned Tickets",
    value: 24,
    icon: Ticket,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "In Progress",
    value: 8,
    icon: Clock,
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    title: "Resolved",
    value: 14,
    icon: CheckCircle,
    color: "text-green-600 bg-green-50",
  },
  {
    title: "Urgent",
    value: 2,
    icon: AlertCircle,
    color: "text-red-600 bg-red-50",
  },
];

const tickets: TicketItem[] = [
  {
    id: "#TK-001",
    title: "Login issue",
    status: "Open",
    priority: "High",
  },
  {
    id: "#TK-002",
    title: "Dashboard Bug",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "#TK-003",
    title: "Unable to Upload File",
    status: "Resolved",
    priority: "Low",
  },
];

/* -----------------------------
   SAFE MAPPINGS (IMPORTANT FIX)
------------------------------*/

const statusColor: Record<TicketStatus, string> = {
  Open: "bg-blue-50 text-blue-600",
  "In Progress": "bg-yellow-50 text-yellow-600",
  Resolved: "bg-green-50 text-green-600",
};

const priorityColor: Record<TicketPriority, string> = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-orange-50 text-orange-600",
  Low: "bg-slate-100 text-slate-600",
};

/* -----------------------------
   COMPONENT
------------------------------*/

const AgentDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h1 className="text-2xl font-semibold text-slate-800">
          Welcome Back 👋
        </h1>
        <p className="text-slate-500 mt-1">
          You have 8 active tickets waiting for your action.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-800 mt-1">
                    {item.value}
                  </h2>
                </div>

                <div className={`p-3 rounded-xl ${item.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Tickets */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-slate-800">
              Assigned Tickets
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
              >
                <div>
                  <h3 className="font-medium text-slate-800">
                    {ticket.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {ticket.id}
                  </p>
                </div>

                <div className="flex gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${statusColor[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${priorityColor[ticket.priority]}`}
                  >
                    {ticket.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-5">
            Recent Activity
          </h2>

          <div className="space-y-5">
            <div className="flex gap-3">
              <span className="h-2.5 w-2.5 mt-2 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Ticket Resolved
                </p>
                <p className="text-xs text-slate-500">
                  Login issue fixed
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="h-2.5 w-2.5 mt-2 rounded-full bg-yellow-500" />
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Status Updated
                </p>
                <p className="text-xs text-slate-500">
                  Dashboard Bug → In Progress
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="h-2.5 w-2.5 mt-2 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm font-medium text-slate-800">
                  New Ticket Assigned
                </p>
                <p className="text-xs text-slate-500">
                  File Upload Error
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600">Resolution Progress</span>
          <span className="text-slate-800 font-medium">75%</span>
        </div>

        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full w-[75%] bg-blue-500 rounded-full transition-all duration-700" />
        </div>
      </div>

    </div>
  );
};

export default AgentDashboard;