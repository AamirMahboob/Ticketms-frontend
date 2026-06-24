import { useState } from "react";
import { createTicket } from "../../services/ticket";
import { notification } from "antd";
// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "Low" | "Medium" | "High";
type Status = "Open" | "In Progress" | "Resolved" | "Closed";

interface Ticket {
  id: string;
  title: string;
  category: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_TICKETS: Ticket[] = [
  {
    id: "TKT-1042",
    title: "Unable to download invoice PDF",
    category: "Billing & payments",
    priority: "High",
    status: "Open",
    createdAt: "2025-06-20",
    updatedAt: "2025-06-21",
  },
  {
    id: "TKT-1039",
    title: "Dashboard charts not loading",
    category: "Technical issue",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2025-06-18",
    updatedAt: "2025-06-20",
  },
  {
    id: "TKT-1031",
    title: "Request to add team member seat",
    category: "Account access",
    priority: "Low",
    status: "Resolved",
    createdAt: "2025-06-10",
    updatedAt: "2025-06-12",
  },
  {
    id: "TKT-1028",
    title: "Export to CSV missing date filter",
    category: "Feature request",
    priority: "Low",
    status: "Closed",
    createdAt: "2025-06-05",
    updatedAt: "2025-06-08",
  },
  {
    id: "TKT-1021",
    title: "Two-factor auth code not arriving",
    category: "Account access",
    priority: "High",
    status: "Resolved",
    createdAt: "2025-05-29",
    updatedAt: "2025-05-30",
  },
];

const STATS = [
  { label: "Total tickets", value: 12, icon: "🎫" },
  { label: "Open", value: 3, icon: "🟡" },
  { label: "In progress", value: 2, icon: "🔵" },
  { label: "Resolved", value: 7, icon: "🟢" },
];

// ─── Style Helpers ────────────────────────────────────────────────────────────

const priorityConfig: Record<Priority, { bg: string; color: string; dot: string }> = {
  Low:    { bg: "#EAF3DE", color: "#3B6D11", dot: "#639922" },
  Medium: { bg: "#FAEEDA", color: "#854F0B", dot: "#BA7517" },
  High:   { bg: "#FCEBEB", color: "#A32D2D", dot: "#E24B4A" },
};

const statusConfig: Record<Status, { bg: string; color: string }> = {
  "Open":        { bg: "#FAEEDA", color: "#854F0B" },
  "In Progress": { bg: "#E6F1FB", color: "#185FA5" },
  "Resolved":    { bg: "#EAF3DE", color: "#3B6D11" },
  "Closed":      { bg: "#F1EFE8", color: "#5F5E5A" },
};

const ALL_STATUSES: Status[] = ["Open", "In Progress", "Resolved", "Closed"];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Badge = ({
  label,
  bg,
  color,
}: {
  label: string;
  bg: string;
  color: string;
}) => (
  <span
    style={{
      display: "inline-block",
      fontSize: 11,
      fontWeight: 500,
      padding: "3px 8px",
      borderRadius: 20,
      background: bg,
      color,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </span>
);

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) => (
  <div
    style={{
      background: "var(--color-background-secondary, #f8f8f8)",
      borderRadius: 8,
      padding: "1rem",
      flex: "1 1 0",
      minWidth: 100,
    }}
  >
    <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
    <div style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary, #111)", lineHeight: 1 }}>
      {value}
    </div>
    <div style={{ fontSize: 12, color: "var(--color-text-secondary, #888)", marginTop: 4 }}>
      {label}
    </div>
  </div>
);

// ─── Create Ticket Modal ──────────────────────────────────────────────────────

type Priority2 = "low" | "medium" | "high";

const CATEGORIES = [
  "Billing & payments",
  "Technical issue",
  "Account access",
  "Feature request",
  "Other",
];

const PRIORITIES: { value: Priority2; label: string; sub: string }[] = [
  { value: "low",    label: "Low",    sub: "Not urgent"   },
  { value: "medium", label: "Medium", sub: "Some impact"  },
  { value: "high",   label: "High",   sub: "Blocking work"},
];

const priStyles: Record<Priority2, { border: string; bg: string; iconBg: string; color: string }> = {
  low:    { border: "#3B6D11", bg: "#EAF3DE", iconBg: "#EAF3DE", color: "#3B6D11" },
  medium: { border: "#854F0B", bg: "#FAEEDA", iconBg: "#FAEEDA", color: "#854F0B" },
  high:   { border: "#A32D2D", bg: "#FCEBEB", iconBg: "#FCEBEB", color: "#A32D2D" },
};

const priIcons: Record<Priority2, string> = { low: "↓", medium: "–", high: "↑" };

function CreateTicketForm({ onClose, onSubmit }: { onClose: () => void; onSubmit: (t: Ticket) => void }) {
  const [title, setTitle]       = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc]         = useState("");
  const [priority, setPriority] = useState<Priority2>("medium");
  const [done, setDone]         = useState(false);

  // const handleSubmit = () => {
  //   if (!title.trim() || !desc.trim()) return;
  //   const newTicket: Ticket = {
  //     id: `TKT-${1000 + Math.floor(Math.random() * 900)}`,
  //     title: title.trim(),
  //     // category: category || "Other",
  //     priority: (priority.charAt(0).toUpperCase() + priority.slice(1)) as Priority,
  //     // status: "Open",
  //     createdAt: new Date().toISOString().slice(0, 10),
  //     updatedAt: new Date().toISOString().slice(0, 10),
  //   };
  //   console.log(newTicket,"newTicket")
  //   onSubmit(newTicket);
  //   setDone(true);
  // };

const handleSubmit = async () => {
  if (!title.trim() || !desc.trim()) return;

  try {
    const response = await createTicket({
      title: title.trim(),
      description: desc.trim(),
      priority,
    });

    notification.success({
      message: "Ticket Created",
      description: response.message,
      placement: "topRight",
    });

    console.log(response);

    setDone(true);

    setTitle("");
    setDesc("");
  } catch (error: any) {
    notification.error({
      message: "Failed",
      description:
        error?.response?.data?.message ||
        "Unable to create ticket",
      placement: "topRight",
    });

    console.error(error);
  }
};

  const inputSt: React.CSSProperties = {
    width: "100%",
    fontSize: 14,
    padding: "9px 12px",
    border: "0.5px solid #ccc",
    borderRadius: 8,
    background: "transparent",
    color: "inherit",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--color-background-primary, #fff)",
          borderRadius: 12,
          padding: "1.5rem",
          width: "100%",
          maxWidth: 480,
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
              New ticket
            </div>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary, #888)", marginTop: 2 }}>
              We typically respond within 2–4 hours.
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--color-text-secondary, #888)", lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {done ? (
          <div style={{ padding: "1.5rem 0", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6, color: "var(--color-text-primary,#111)" }}>
              Ticket submitted
            </div>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary,#888)", marginBottom: "1.25rem" }}>
              Our team will get back to you shortly.
            </div>
            <button
              onClick={onClose}
              style={{ fontSize: 13, fontWeight: 500, background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontFamily: "inherit" }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary,#888)", marginBottom: 5 }}>
                Title <span style={{ color: "#E24B4A" }}>*</span>
              </label>
              <input type="text" value={title} maxLength={80} placeholder="Brief summary of your issue" onChange={(e) => setTitle(e.target.value)} style={inputSt} />
              <div style={{ fontSize: 11, color: "#aaa", textAlign: "right", marginTop: 3 }}>{title.length}/80</div>
            </div>

            <div className="hidden" style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary,#888)", marginBottom: 5 }}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputSt}>
                <option value="" disabled>Select a category…</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary,#888)", marginBottom: 5 }}>
                Description <span style={{ color: "#E24B4A" }}>*</span>
              </label>
              <textarea value={desc} maxLength={2000} rows={4} placeholder="Describe the issue in detail…" onChange={(e) => setDesc(e.target.value)} style={{ ...inputSt, resize: "vertical", lineHeight: 1.6 }} />
              <div style={{ fontSize: 11, color: "#aaa", textAlign: "right", marginTop: 3 }}>{desc.length}/2000</div>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary,#888)", marginBottom: 5 }}>Priority</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                {PRIORITIES.map((p) => {
                  const active = priority === p.value;
                  const s = priStyles[p.value];
                  return (
                    <button key={p.value} onClick={() => setPriority(p.value)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px", border: `${active ? "1.5px" : "0.5px"} solid ${active ? s.border : "#ccc"}`, borderRadius: 8, background: active ? s.bg : "transparent", cursor: "pointer", fontFamily: "inherit" }}>
                      <span style={{ width: 24, height: 24, borderRadius: "50%", background: s.iconBg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{priIcons[p.value]}</span>
                      <span>
                        <div style={{ fontSize: 12, fontWeight: 500, color: "inherit" }}>{p.label}</div>
                        <div style={{ fontSize: 10, color: "#999" }}>{p.sub}</div>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={onClose} style={{ fontSize: 13, color: "var(--color-text-secondary,#888)", background: "none", border: "0.5px solid #ccc", borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
              <button onClick={handleSubmit} style={{ fontSize: 13, fontWeight: 500, background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontFamily: "inherit" }}>Submit ticket</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const CustomerDashboard = () => {
  const [tickets, setTickets]       = useState<Ticket[]>(MOCK_TICKETS);
  const [filterStatus, setFilter]   = useState<Status | "All">("All");
  const [search, setSearch]         = useState("");
  const [showModal, setShowModal]   = useState(false);

  const filtered = tickets.filter((t) => {
    const matchStatus = filterStatus === "All" || t.status === filterStatus;
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleNewTicket = (t: Ticket) => {
    setTickets((prev) => [t, ...prev]);
  };

  const thStyle: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: 11,
    fontWeight: 500,
    color: "var(--color-text-tertiary, #aaa)",
    textAlign: "left",
    borderBottom: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
    whiteSpace: "nowrap",
  };

  const tdStyle: React.CSSProperties = {
    padding: "12px",
    fontSize: 13,
    color: "var(--color-text-primary, #111)",
    borderBottom: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
    verticalAlign: "middle",
  };

  return (
    <div style={{ padding: "1.5rem", fontFamily: "inherit",    }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary,#111)", margin: 0 }}>
            My tickets
          </h1>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary,#888)", marginTop: 4, marginBottom: 0 }}>
            Track and manage your support requests.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontFamily: "inherit" }}
        >
          + New ticket
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search tickets…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ fontSize: 13, padding: "8px 12px", border: "0.5px solid #ccc", borderRadius: 8, background: "transparent", color: "inherit", fontFamily: "inherit", outline: "none", flex: "1 1 160px", minWidth: 140 }}
        />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(["All", ...ALL_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 20,
                border: filterStatus === s ? "1.5px solid #185FA5" : "0.5px solid #ccc",
                background: filterStatus === s ? "#E6F1FB" : "transparent",
                color: filterStatus === s ? "#185FA5" : "var(--color-text-secondary,#888)",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: filterStatus === s ? 500 : 400,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "var(--color-background-primary,#fff)", border: "0.5px solid var(--color-border-tertiary,#e5e5e5)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "12%" }} />
              <col style={{ width: "34%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead>
              <tr style={{ background: "var(--color-background-secondary,#f8f8f8)" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Priority</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ ...tdStyle, textAlign: "center", padding: "2rem", color: "var(--color-text-secondary,#888)" }}>
                    No tickets found.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => {
                  const pc = priorityConfig[t.priority];
                  const sc = statusConfig[t.status];
                  return (
                    <tr key={t.id} style={{ transition: "background 0.1s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-background-secondary,#f8f8f8)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12, color: "var(--color-text-secondary,#888)" }}>{t.id}</td>
                      <td style={{ ...tdStyle, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</td>
                      <td style={{ ...tdStyle, color: "var(--color-text-secondary,#888)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.category}</td>
                      <td style={tdStyle}>
                        <Badge label={t.priority} bg={pc.bg} color={pc.color} />
                      </td>
                      <td style={tdStyle}>
                        <Badge label={t.status} bg={sc.bg} color={sc.color} />
                      </td>
                      <td style={{ ...tdStyle, color: "var(--color-text-secondary,#888)", fontSize: 12 }}>{t.updatedAt}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: "var(--color-text-tertiary,#aaa)" }}>
        {filtered.length} of {tickets.length} tickets
      </div>

      {/* Modal */}
      {showModal && (
        <CreateTicketForm
          onClose={() => setShowModal(false)}
          onSubmit={(t) => { handleNewTicket(t); }}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;