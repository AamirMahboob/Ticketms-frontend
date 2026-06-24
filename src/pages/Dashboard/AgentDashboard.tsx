import {
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

type TicketStatus = "Open" | "In Progress" | "Resolved";
type TicketPriority = "High" | "Medium" | "Low";

interface TicketItem {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
}

const STATS = [
  { label: "Assigned",    value: 24, icon: Ticket,       accent: "#6366F1", light: "#EEF2FF", trend: "+2 today" },
  { label: "In Progress", value: 8,  icon: Clock,        accent: "#F59E0B", light: "#FFFBEB", trend: "3 due soon" },
  { label: "Resolved",    value: 14, icon: CheckCircle,  accent: "#10B981", light: "#ECFDF5", trend: "+5 this week" },
  { label: "Urgent",      value: 2,  icon: AlertCircle,  accent: "#EF4444", light: "#FEF2F2", trend: "Needs action" },
];

const TICKETS: TicketItem[] = [
  { id: "#TK-001", title: "Login issue",           status: "Open",        priority: "High" },
  { id: "#TK-002", title: "Dashboard bug",         status: "In Progress", priority: "Medium" },
  { id: "#TK-003", title: "Unable to upload file", status: "Resolved",    priority: "Low" },
];

const ACTIVITY = [
  { color: "#10B981", title: "Ticket resolved",      sub: "Login issue fixed",                time: "2m ago" },
  { color: "#F59E0B", title: "Status updated",       sub: "Dashboard bug → In Progress",      time: "18m ago" },
  { color: "#6366F1", title: "New ticket assigned",  sub: "File upload error",                time: "1h ago" },
];

const STATUS_STYLE: Record<TicketStatus, { bg: string; text: string }> = {
  Open:          { bg: "#EEF2FF", text: "#4338CA" },
  "In Progress": { bg: "#FFFBEB", text: "#B45309" },
  Resolved:      { bg: "#ECFDF5", text: "#065F46" },
};

const PRIORITY_BAR: Record<TicketPriority, { bar: string; bg: string; text: string }> = {
  High:   { bar: "#EF4444", bg: "#FEF2F2", text: "#B91C1C" },
  Medium: { bar: "#F59E0B", bg: "#FFFBEB", text: "#B45309" },
  Low:    { bar: "#CBD5E1", bg: "#F8FAFC", text: "#64748B" },
};

const AgentDashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "24px", fontFamily: "'Inter', sans-serif" }}>

      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "18px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#fff" }}>JD</div>
          <div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", margin: 0 }}>Good morning, Jordan</p>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "2px 0 0" }}>8 active tickets waiting for your action</p>
          </div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#ECFDF5", color: "#065F46", fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981" }} />
          Online
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: s.light, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={19} color={s.accent} />
                </div>
                <span style={{ fontSize: "11px", color: "#94A3B8", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "3px 8px" }}>{s.trend}</span>
              </div>
              <p style={{ fontSize: "28px", fontWeight: 700, color: "#0F172A", margin: 0, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: "12px", color: "#64748B", margin: "5px 0 0" }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tickets + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "14px" }}>

        {/* Tickets */}
        <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", margin: 0 }}>Assigned tickets</h2>
            <button style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6366F1", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {TICKETS.map((t) => {
              const ss = STATUS_STYLE[t.status];
              const ps = PRIORITY_BAR[t.priority];
              return (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: "#FAFAFA", border: "1px solid #F1F5F9" }}>
                  <div style={{ width: "3px", height: "36px", borderRadius: "99px", background: ps.bar, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#1E293B", margin: 0 }}>{t.title}</p>
                    <p style={{ fontSize: "11px", color: "#94A3B8", margin: "3px 0 0", fontFamily: "monospace" }}>{t.id}</p>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: ss.bg, color: ss.text }}>{t.status}</span>
                    <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: ps.bg, color: ps.text }}>{t.priority}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity */}
        <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", margin: "0 0 16px" }}>Recent activity</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", paddingBottom: i < ACTIVITY.length - 1 ? "16px" : 0, marginBottom: i < ACTIVITY.length - 1 ? "16px" : 0, borderBottom: i < ACTIVITY.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: a.color, flexShrink: 0, marginTop: "3px" }} />
                  {i < ACTIVITY.length - 1 && <div style={{ width: "1px", flex: 1, background: "#F1F5F9", marginTop: "4px" }} />}
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#1E293B", margin: 0 }}>{a.title}</p>
                  <p style={{ fontSize: "12px", color: "#64748B", margin: "2px 0 0" }}>{a.sub}</p>
                  <p style={{ fontSize: "11px", color: "#94A3B8", margin: "4px 0 0" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", margin: 0 }}>Resolution progress</h2>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "3px 0 0" }}>14 of 24 tickets resolved this week</p>
          </div>
          <span style={{ fontSize: "24px", fontWeight: 700, color: "#6366F1" }}>75%</span>
        </div>
        <div style={{ height: "8px", background: "#F1F5F9", borderRadius: "99px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: "75%", background: "linear-gradient(90deg,#6366F1,#8B5CF6)", borderRadius: "99px" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
          <span style={{ fontSize: "11px", color: "#94A3B8" }}>14 resolved</span>
          <span style={{ fontSize: "11px", color: "#94A3B8" }}>10 remaining</span>
        </div>
      </div>

    </div>
  );
};

export default AgentDashboard;