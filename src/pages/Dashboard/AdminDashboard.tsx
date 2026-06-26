import React, { useState } from "react";
import {
  Ticket,
  Clock,
  CheckCircle,
  Users,
  UserCheck,
  ArrowRight,
  MoreHorizontal,
  ChevronDown,
  Shield,
  Mail,
  Search,
  Edit2,
  Power
} from "lucide-react";

// Types
type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type TicketPriority = "High" | "Medium" | "Low";
type TabType = "Overview" | "Tickets" | "Users";

interface DashboardTicket {
  id: string;
  title: string;
  date: string;
  status: TicketStatus;
  priority: TicketPriority;
  agent?: string;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Agent" | "Customer";
  status: "Active" | "Inactive";
}

// Initial Mock Data
const INITIAL_STATS = [
  { label: "Total tickets", value: 120, subText: "all time", icon: Ticket, accent: "#38BDF8" },
  { label: "Open", value: 40, subText: "need attention", icon: Clock, accent: "#F59E0B" },
  { label: "In progress", value: 30, subText: "being handled", icon: LoaderIcon, accent: "#3B82F6" },
  { label: "Resolved", value: 50, subText: "closed or resolved", icon: CheckCircle, accent: "#10B981" },
  { label: "Agents", value: 12, subText: "support staff", icon: UserCheck, accent: "#F43F5E" },
  { label: "Customers", value: 75, subText: "registered users", icon: Users, accent: "#10B981" },
];

const INITIAL_TICKETS: DashboardTicket[] = [
  { id: "TKT-1042", title: "Unable to download invoice PDF", date: "2025-06-21", status: "Open", priority: "High", agent: "Unassigned" },
  { id: "TKT-1039", title: "Dashboard charts not loading", date: "2025-06-20", status: "In Progress", priority: "Medium", agent: "Jordan Smith" },
  { id: "TKT-1031", title: "Request to add team member seats", date: "2025-06-12", status: "Resolved", priority: "Low", agent: "Alex Morgan" },
  { id: "TKT-1028", title: "Export to CSV missing date filter", date: "2025-06-08", status: "Closed", priority: "Low", agent: "Jordan Smith" },
  { id: "TKT-1021", title: "Two-factor auth not arriving", date: "2025-05-30", status: "Open", priority: "High", agent: "Unassigned" },
  { id: "TKT-1011", title: "Dark mode contrast issues in app", date: "2025-05-14", status: "Open", priority: "Low", agent: "Unassigned" },
];

const INITIAL_USERS: UserItem[] = [
  { id: "USR-001", name: "Alex Morgan", email: "alex@company.com", role: "Admin", status: "Active" },
  { id: "USR-002", name: "Jordan Smith", email: "jordan@company.com", role: "Agent", status: "Active" },
  { id: "USR-003", name: "Sarah Jenkins", email: "sarah@client.com", role: "Customer", status: "Active" },
  { id: "USR-004", name: "Michael Brown", email: "mbrown@client.com", role: "Customer", status: "Inactive" },
];

// Dark theme styles matching preview_2.png
const STATUS_STYLES: Record<TicketStatus, { bg: string; text: string }> = {
  Open: { bg: "rgba(239, 68, 68, 0.15)", text: "#F87171" },
  "In Progress": { bg: "rgba(59, 130, 246, 0.15)", text: "#60A5FA" },
  Resolved: { bg: "rgba(16, 185, 129, 0.15)", text: "#34D399" },
  Closed: { bg: "rgba(75, 85, 99, 0.3)", text: "#9CA3AF" },
};

const PRIORITY_STYLES: Record<TicketPriority, { bg: string; text: string }> = {
  High: { bg: "rgba(220, 38, 38, 0.2)", text: "#F87171" },
  Medium: { bg: "rgba(217, 119, 6, 0.2)", text: "#FBBF24" },
  Low: { bg: "rgba(16, 185, 129, 0.15)", text: "#A7F3D0" },
};

function LoaderIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={{ transform: "rotate(45deg)" }}>
      <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [tickets, setTickets] = useState<DashboardTicket[]>(INITIAL_TICKETS);
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);

  // Filter States
  const [ticketSearch, setTicketSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "All">("All");
  const [userSearch, setUserSearch] = useState("");

  // Assign Ticket Logic
  const handleAssignTicket = (ticketId: string) => {
    const agentName = prompt("Enter Agent name to assign/reassign to:");
    if (agentName !== null) {
      setTickets(prev =>
        prev.map(t => (t.id === ticketId ? { ...t, agent: agentName || "Unassigned" } : t))
      );
    }
  };

  // Change Ticket Status Logic
  const handleUpdateStatus = (ticketId: string, newStatus: TicketStatus) => {
    setTickets(prev => prev.map(t => (t.id === ticketId ? { ...t, status: newStatus } : t)));
  };

  // Toggle User Activation Status
  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u))
    );
  };

  // Inline User Edit Logic
  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    const newName = prompt("Edit name:", user.name);
    const newEmail = prompt("Edit email:", user.email);
    if (newName && newEmail) {
      setUsers(prev => prev.map(u => (u.id === userId ? { ...u, name: newName, email: newEmail } : u)));
    }
  };

  // Data Selectors
  const unassignedTickets = tickets.filter(t => t.agent === "Unassigned" || !t.agent);
  
  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(ticketSearch.toLowerCase()) || t.id.toLowerCase().includes(ticketSearch.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div style={{ background: "#111827", minHeight: "100vh", padding: "32px", fontFamily: "'Inter', sans-serif", color: "#F3F4F6" }}>
      
      {/* 6-Column Metrics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {INITIAL_STATS.map((s, index) => {
          const Icon = s.icon;
          let metricValue = s.value;
          
          // Match totals dynamically based on client mutations
          if (index === 1) metricValue = tickets.filter(t => t.status === "Open").length;
          if (index === 2) metricValue = tickets.filter(t => t.status === "In Progress").length;
          if (index === 3) metricValue = tickets.filter(t => t.status === "Resolved").length;

          return (
            <div key={index} style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: "12px", padding: "20px", position: "relative" }}>
              {index === 3 && (
                <MoreHorizontal size={16} color="#6B7280" style={{ position: "absolute", top: "16px", right: "16px", cursor: "pointer" }} />
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Icon size={16} color={s.accent} />
                <span style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: 500 }}>{s.label}</span>
              </div>
              <p style={{ fontSize: "32px", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1 }}>{metricValue}</p>
              <p style={{ fontSize: "12px", color: "#6B7280", margin: "6px 0 0" }}>{s.subText}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs Menu Navigation */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #374151", paddingBottom: "16px", marginBottom: "20px" }}>
        {(["Overview", "Tickets", "Users"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "#3B82F6" : "#1F2937",
              color: activeTab === tab ? "#FFFFFF" : "#9CA3AF",
              border: activeTab === tab ? "none" : "1px solid #374151",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Screen Routing */}
      {activeTab === "Overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px", alignItems: "start" }}>
          
          {/* Recent Tickets Section */}
          <div style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: "14px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Recent tickets</h2>
              <button onClick={() => setActiveTab("Tickets")} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#FFFFFF", background: "#374151", border: "none", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontWeight: 500 }}>
                View all <ArrowRight size={14} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {tickets.slice(0, 5).map((t, idx) => {
                const ss = STATUS_STYLES[t.status];
                const ps = PRIORITY_STYLES[t.priority];
                return (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: idx < 4 ? "1px solid #374151" : "none" }}>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "#FFFFFF", margin: 0 }}>{t.title}</p>
                      <p style={{ fontSize: "12px", color: "#6B7280", margin: "4px 0 0" }}>{t.id} · {t.date} · <span style={{ color: "#9CA3AF" }}>{t.agent}</span></p>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "12px", background: ps.bg, color: ps.text }}>{t.priority}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "12px", background: ss.bg, color: ss.text }}>{t.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
              <div style={{ background: "#374151", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronDown size={14} color="#9CA3AF" />
              </div>
            </div>
          </div>

          {/* Unassigned Panel */}
          <div style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: "14px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Unassigned tickets</h2>
              <span style={{ background: "#FEE2E2", color: "#EF4444", fontSize: "12px", fontWeight: 700, borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}>{unassignedTickets.length}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {unassignedTickets.map((t, idx) => {
                const ps = PRIORITY_STYLES[t.priority];
                return (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: idx < unassignedTickets.length - 1 ? "1px solid #374151" : "none" }}>
                    <div style={{ maxWidth: "55%" }}>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "#FFFFFF", margin: 0, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{t.title}</p>
                      <p style={{ fontSize: "12px", color: "#6B7280", margin: "4px 0 0" }}>{t.id}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "12px", background: ps.bg, color: ps.text }}>{t.priority}</span>
                      <button onClick={() => handleAssignTicket(t.id)} style={{ background: "#3B82F6", color: "#FFFFFF", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Assign</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Tickets" && (
        <div style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: "14px", padding: "24px" }}>
          
          {/* Filtering Controls Submenu */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "20px" }}>
            <div style={{ position: "relative", minWidth: "260px" }}>
              <Search size={16} color="#6B7280" style={{ position: "absolute", top: "10px", left: "12px" }} />
              <input
                type="text"
                placeholder="Search ticket title or ID..."
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                style={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#FFFFFF", padding: "8px 12px 8px 36px", fontSize: "13px", width: "100%", outline: "none" }}
              />
            </div>
            
            <div style={{ display: "flex", gap: "6px" }}>
              {(["All", "Open", "In Progress", "Resolved", "Closed"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    background: statusFilter === status ? "#3B82F6" : "#111827",
                    color: statusFilter === status ? "#FFFFFF" : "#9CA3AF",
                    border: "1px solid #374151",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Data Table Layout */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #374151", color: "#9CA3AF", textAlign: "left" }}>
                  <th style={{ padding: "12px 8px" }}>ID</th>
                  <th style={{ padding: "12px 8px" }}>Subject</th>
                  <th style={{ padding: "12px 8px" }}>Priority</th>
                  <th style={{ padding: "12px 8px" }}>Status View & Inline Mutator</th>
                  <th style={{ padding: "12px 8px" }}>Assigned Staff</th>
                  <th style={{ padding: "12px 8px", textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map(t => (
                  <tr key={t.id} style={{ borderBottom: "1px solid #111827" }}>
                    <td style={{ padding: "14px 8px", fontFamily: "monospace", color: "#9CA3AF" }}>{t.id}</td>
                    <td style={{ padding: "14px 8px", fontWeight: 500 }}>{t.title}</td>
                    <td style={{ padding: "14px 8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "12px", ...PRIORITY_STYLES[t.priority] }}>{t.priority}</span>
                    </td>
                    <td style={{ padding: "14px 8px" }}>
                      <select
                        value={t.status}
                        onChange={(e) => handleUpdateStatus(t.id, e.target.value as TicketStatus)}
                        style={{
                          background: STATUS_STYLES[t.status].bg,
                          color: STATUS_STYLES[t.status].text,
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          outline: "none"
                        }}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td style={{ padding: "14px 8px", color: "#9CA3AF" }}>{t.agent}</td>
                    <td style={{ padding: "14px 8px", textAlign: "right" }}>
                      <button onClick={() => handleAssignTicket(t.id)} style={{ background: "#374151", color: "#FFFFFF", border: "none", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}>
                        {t.agent === "Unassigned" ? "Assign" : "Reassign"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Users" && (
        <div style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: "14px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "24px" }}>
            <div style={{ position: "relative", minWidth: "260px" }}>
              <Search size={16} color="#6B7280" style={{ position: "absolute", top: "10px", left: "12px" }} />
              <input
                type="text"
                placeholder="Search user name, email, role..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                style={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#FFFFFF", padding: "8px 12px 8px 36px", fontSize: "13px", width: "100%", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {filteredUsers.map((user) => (
              <div key={user.id} style={{ background: "#111827", border: "1px solid #374151", borderRadius: "12px", padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: user.status === "Inactive" ? 0.6 : 1 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#FFFFFF", margin: 0 }}>{user.name}</h3>
                      <p style={{ fontSize: "12px", color: "#6B7280", margin: "2px 0 0", fontFamily: "monospace" }}>{user.id}</p>
                    </div>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "10px",
                      background: user.status === "Active" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      color: user.status === "Active" ? "#34D399" : "#F87171"
                    }}>
                      {user.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#9CA3AF", fontSize: "13px", marginBottom: "8px" }}>
                    <Mail size={14} color="#6B7280" />
                    <span>{user.email}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #1F2937" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: user.role === "Admin" ? "#F43F5E" : user.role === "Agent" ? "#60A5FA" : "#A7F3D0", fontSize: "12px", fontWeight: 600 }}>
                    <Shield size={13} />
                    <span>{user.role}</span>
                  </div>
                  
                  {/* Action Triggers */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleEditUser(user.id)} style={{ display: "flex", alignItems: "center", gap: "4px", background: "#1F2937", color: "#9CA3AF", border: "1px solid #374151", borderRadius: "6px", padding: "4px 8px", fontSize: "12px", cursor: "pointer" }}>
                      <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={() => handleToggleUserStatus(user.id)} style={{ display: "flex", alignItems: "center", gap: "4px", background: user.status === "Active" ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)", color: user.status === "Active" ? "#F87171" : "#34D399", border: "none", borderRadius: "6px", padding: "4px 8px", fontSize: "12px", cursor: "pointer" }}>
                      <Power size={12} /> {user.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}