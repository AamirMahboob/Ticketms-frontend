import { useEffect, useState } from "react";
import { message } from "antd";
import {
  getUsers,
  registerUser,
  updateUser,
  activateUser,
  deactivateUser,
} from "../../services/user";
import type { User } from "../../types/Types";
import type { CreateUserPayload, UpdateUserPayload } from "../../services/user";

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES: User["role"][] = ["admin", "agent", "customer"];

const roleConfig: Record<string, { bg: string; color: string }> = {
  admin:    { bg: "#FCEBEB", color: "#A32D2D" },
  agent:    { bg: "#E6F1FB", color: "#185FA5" },
  customer: { bg: "#EAF3DE", color: "#3B6D11" },
};

// ─── Style Tokens ─────────────────────────────────────────────────────────────

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

const labelSt: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "var(--color-text-secondary, #888)",
  marginBottom: 5,
};

const thSt: React.CSSProperties = {
  padding: "10px 14px",
  fontSize: 11,
  fontWeight: 500,
  color: "var(--color-text-tertiary, #aaa)",
  textAlign: "left",
  borderBottom: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
  whiteSpace: "nowrap",
  background: "var(--color-background-secondary, #f8f8f8)",
};

const tdSt: React.CSSProperties = {
  padding: "12px 14px",
  fontSize: 13,
  color: "var(--color-text-primary, #111)",
  borderBottom: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
  verticalAlign: "middle",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: string }) {
  const { bg, color } = roleConfig[role] ?? { bg: "#F1EFE8", color: "#5F5E5A" };
  return (
    <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 20, background: bg, color, whiteSpace: "nowrap", textTransform: "capitalize" }}>
      {role}
    </span>
  );
}

function StatusBadge({ active }: { active?: boolean }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap",
      background: active ? "#EAF3DE" : "#F1EFE8",
      color: active ? "#3B6D11" : "#5F5E5A",
    }}>
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function ActionBtn({ label, onClick, color }: { label: string; onClick: () => void; color?: string }) {
  return (
    <button
      onClick={onClick}
      style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, border: `0.5px solid ${color ?? "#ccc"}`, color: color ?? "var(--color-text-secondary,#888)", background: "none", cursor: "pointer", fontFamily: "inherit" }}
    >
      {label}
    </button>
  );
}

// ─── User Modal (Add / Edit) ──────────────────────────────────────────────────

interface ModalProps {
  initial?: User | null;
  onClose: () => void;
  onSave: () => Promise<void>; // triggers re-fetch, not local state patch
}

function UserModal({ initial, onClose, onSave }: ModalProps) {
  const isEdit = !!initial;
  const [name, setName]         = useState(initial?.name ?? "");
  const [email, setEmail]       = useState(initial?.email ?? "");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState<User["role"]>(initial?.role ?? "customer");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || (!isEdit && !password.trim())) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      if (isEdit && initial) {
        const payload: UpdateUserPayload = { name: name.trim(), email: email.trim(), role };
        await updateUser(initial.id, payload);
        message.success("User updated successfully.");
      } else {
        const payload: CreateUserPayload = { name: name.trim(), email: email.trim(), password: password.trim(), role };
        await registerUser(payload);
        message.success("User added successfully.");
      }
      await onSave(); // re-fetch fresh data from server
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}
      onClick={onClose}
    >
      <div
        style={{ background: "var(--color-background-primary, #fff)", borderRadius: 12, padding: "1.5rem", width: "100%", maxWidth: 420, boxSizing: "border-box" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
              {isEdit ? "Edit user" : "Add user"}
            </div>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary, #888)", marginTop: 2 }}>
              {isEdit ? "Update the user's details." : "Fill in the details to create a new user."}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--color-text-secondary, #888)", lineHeight: 1 }}>✕</button>
        </div>

        {/* Fields */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelSt}>Name <span style={{ color: "#E24B4A" }}>*</span></label>
          <input
            type="text"
            value={name}
            placeholder="Jane Smith"
            autoComplete="off"
            onChange={(e) => { setName(e.target.value); setError(""); }}
            style={inputSt}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelSt}>Email <span style={{ color: "#E24B4A" }}>*</span></label>
          <input
            type="text"
            value={email}
            placeholder="jane@company.com"
            autoComplete="off"
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            style={inputSt}
          />
        </div>

        {!isEdit && (
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelSt}>Password <span style={{ color: "#E24B4A" }}>*</span></label>
            <input
              type="password"
              value={password}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              style={inputSt}
            />
          </div>
        )}

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelSt}>Role <span style={{ color: "#E24B4A" }}>*</span></label>
          <select value={role} onChange={(e) => { setRole(e.target.value as User["role"]); setError(""); }} style={{ ...inputSt, textTransform: "capitalize" }}>
            {ROLES.map((r) => <option key={r} value={r} style={{ textTransform: "capitalize" }}>{r}</option>)}
          </select>
        </div>

        {error && (
          <div style={{ fontSize: 12, color: "#A32D2D", background: "#FCEBEB", borderRadius: 6, padding: "8px 12px", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} disabled={loading} style={{ fontSize: 13, color: "var(--color-text-secondary,#888)", background: "none", border: "0.5px solid #ccc", borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontFamily: "inherit" }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{ fontSize: 13, fontWeight: 500, background: loading ? "#7AAAD8" : "#185FA5", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            {loading ? "Saving…" : isEdit ? "Save changes" : "Add user"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Users() {
  const [data, setData]            = useState<User[]>([]);
  const [loading, setLoading]      = useState(true);
  const [search, setSearch]        = useState("");
  const [modal, setModal]          = useState<"add" | "edit" | null>(null);
  const [selected, setSelected]    = useState<User | null>(null);
  const [actionLoading, setActing] = useState<string | null>(null);

  // ── Shared re-fetch — called after every mutation ────────────────────────
  const refreshUsers = async () => {
    try {
      const users = await getUsers();
      setData(users);
    } catch {
      message.error("Failed to load users.");
    }
  };

  useEffect(() => {
    (async () => {
      await refreshUsers();
      setLoading(false);
    })();
  }, []);

  // ── Search — filtered from server data, completely isolated from modal ────
  const filtered = data?.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.role || "").toLowerCase().includes(search.toLowerCase())
  );

  // ── Activate / deactivate: re-fetch after toggle ─────────────────────────
  const handleToggleStatus = async (user: User & { isActive?: boolean }) => {
    setActing(user.id);
    try {
      if (user.isActive) {
        await deactivateUser(user.id);
      } else {
        await activateUser(user.id);
      }
      await refreshUsers(); // re-fetch instead of patching local state
      message.success(`${user.name} has been ${user.isActive ? "deactivated" : "activated"}.`);
    } catch {
      message.error("Failed to update user status.");
    } finally {
      setActing(null);
    }
  };

  // ── Modal open: clear search so the search box doesn't capture modal input
  const openAdd = () => {
    setSearch("");
    setModal("add");
  };

  const openEdit = (user: User) => {
    setSearch("");
    setSelected(user);
    setModal("edit");
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  return (
    <div style={{ fontFamily: "inherit", margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text-primary, #111)", margin: 0 }}>Users</h1>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary, #888)", marginTop: 3, marginBottom: 0 }}>
            {data.length} total user{data.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openAdd}
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontFamily: "inherit" }}
        >
          + Add user
        </button>
      </div>

      {/* Search — only shown when modal is closed */}
      {!modal && (
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search by name, email or role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputSt, maxWidth: 320, fontSize: 13, padding: "8px 12px" }}
          />
        </div>
      )}

      {/* Table */}
      <div style={{ background: "var(--color-background-primary, #fff)", border: "0.5px solid var(--color-border-tertiary, #e5e5e5)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thSt}>#</th>
                <th style={thSt}>Name</th>
                <th style={thSt}>Email</th>
                <th style={thSt}>Role</th>
                <th style={thSt}>Status</th>
                <th style={{ ...thSt, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ ...tdSt, textAlign: "center", padding: "2rem", color: "var(--color-text-secondary,#888)" }}>
                    Loading users…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ ...tdSt, textAlign: "center", padding: "2rem", color: "var(--color-text-secondary,#888)" }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((user: any, i) => (
                  <tr
                    key={user.id}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-background-secondary, #f8f8f8)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    style={{ transition: "background 0.1s", opacity: actionLoading === user.id ? 0.5 : 1 }}
                  >
                    <td style={{ ...tdSt, fontSize: 12, color: "var(--color-text-tertiary, #aaa)", width: 40 }}>{i + 1}</td>
                    <td style={{ ...tdSt, fontWeight: 500 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#E6F1FB", color: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                          {(user.name || "U").charAt(0).toUpperCase()}
                        </span>
                        {user.name || "Unknown User"}
                      </div>
                    </td>
                    <td style={{ ...tdSt, color: "var(--color-text-secondary, #888)" }}>{user.email}</td>
                    <td style={tdSt}><RoleBadge role={user.role} /></td>
                    <td style={tdSt}><StatusBadge active={user.isActive} /></td>
                    <td style={{ ...tdSt, textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                        <ActionBtn label="Edit" onClick={() => openEdit(user)} color="#185FA5" />
                        <ActionBtn
                          label={user.isActive ? "Deactivate" : "Activate"}
                          onClick={() => handleToggleStatus(user)}
                          color={user.isActive ? "#A32D2D" : "#3B6D11"}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: "var(--color-text-tertiary, #aaa)" }}>
        Showing {filtered.length} of {data.length} users
      </div>

      {/* Modal */}
      {(modal === "add" || modal === "edit") && (
        <UserModal
          initial={modal === "edit" ? selected : null}
          onClose={closeModal}
          onSave={refreshUsers}
        />
      )}
    </div>
  );
}