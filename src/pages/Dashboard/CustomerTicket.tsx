import { useState } from "react";

type Priority = "low" | "medium" | "high";

const CATEGORIES = [
  "Billing & payments",
  "Technical issue",
  "Account access",
  "Feature request",
  "Other",
];

const PRIORITIES: { value: Priority; label: string; sub: string; icon: string }[] = [
  { value: "low",    label: "Low",    sub: "Not urgent",    icon: "↓" },
  { value: "medium", label: "Medium", sub: "Some impact",   icon: "–" },
  { value: "high",   label: "High",   sub: "Blocking work", icon: "🔥" },
];

const priorityStyles: Record<Priority, { border: string; bg: string; iconBg: string; iconColor: string }> = {
  low:    { border: "#3B6D11", bg: "#EAF3DE", iconBg: "#EAF3DE", iconColor: "#3B6D11" },
  medium: { border: "#854F0B", bg: "#FAEEDA", iconBg: "#FAEEDA", iconColor: "#854F0B" },
  high:   { border: "#A32D2D", bg: "#FCEBEB", iconBg: "#FCEBEB", iconColor: "#A32D2D" },
};

export default function CreateTicket() {
  const [title, setTitle]       = useState("");
  const [category, setCategory] = useState("");
  const [description, setDesc]  = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;
    setSubmitted(true);
  };

  const handleClear = () => {
    setTitle("");
    setCategory("");
    setDesc("");
    setPriority("medium");
    setSubmitted(false);
  };

  return (
    <div style={{ padding: "1.5rem 0", fontFamily: "inherit" }}>

      {/* Title */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>
          Title <span style={{ color: "#E24B4A" }}>*</span>
        </label>
        <input
          type="text"
          value={title}
          maxLength={80}
          placeholder="Brief summary of your issue"
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <div style={charStyle}>{title.length}/80</div>
      </div>

      {/* Category */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="" disabled>Select a category…</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>
          Description <span style={{ color: "#E24B4A" }}>*</span>
        </label>
        <textarea
          value={description}
          maxLength={2000}
          rows={5}
          placeholder="Describe the issue in detail — include steps to reproduce, error messages, and expected outcome."
          onChange={(e) => setDesc(e.target.value)}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6, minHeight: 100 }}
        />
        <div style={charStyle}>{description.length}/2000</div>
      </div>

      {/* Priority */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Priority</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {PRIORITIES.map((p) => {
            const active = priority === p.value;
            const s = priorityStyles[p.value];
            return (
              <button
                key={p.value}
                onClick={() => setPriority(p.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                  border: `${active ? "1.5px" : "0.5px"} solid ${active ? s.border : "#ccc"}`,
                  borderRadius: 8,
                  background: active ? s.bg : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: s.iconBg,
                    color: s.iconColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </span>
                <span>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "inherit" }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{p.sub}</div>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: "1.5rem" }}>
        <button onClick={handleClear} style={ghostBtnStyle}>Clear</button>
        <button onClick={handleSubmit} style={primaryBtnStyle}>Submit ticket</button>
      </div>

      {/* Success toast */}
      {submitted && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: "1rem",
          padding: "10px 14px",
          background: "#EAF3DE",
          border: "0.5px solid #3B6D11",
          borderRadius: 8,
          fontSize: 13,
          color: "#3B6D11",
        }}>
          ✓ Ticket submitted successfully.
        </div>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "#666",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 14,
  padding: "9px 12px",
  border: "0.5px solid #ccc",
  borderRadius: 8,
  background: "transparent",
  color: "inherit",
  fontFamily: "inherit",
  outline: "none",
};

const charStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#aaa",
  textAlign: "right",
  marginTop: 4,
};

const ghostBtnStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#666",
  background: "none",
  border: "0.5px solid #ccc",
  borderRadius: 8,
  padding: "9px 16px",
  cursor: "pointer",
  fontFamily: "inherit",
};

const primaryBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13,
  fontWeight: 500,
  background: "#185FA5",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "9px 20px",
  cursor: "pointer",
  fontFamily: "inherit",
};