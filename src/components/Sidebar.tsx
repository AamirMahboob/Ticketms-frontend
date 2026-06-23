// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <aside className="sidebar">
//       <div className="logo">
//         <h2>TMS</h2>
//       </div>

//       <nav>
//         <NavLink to="/dashboard/admin">Dashboard</NavLink>
//         <NavLink to="/users">Users</NavLink>
//         <NavLink to="/tickets">Tickets</NavLink>
//       </nav>
//     </aside>
//   );
// }

import { NavLink, useNavigate } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const mainNav: NavItem[] = [
  {
    to: "/dashboard/admin",
    label: "Dashboard",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    to: "/dashboard/tickets",
    label: "Tickets",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/>
        <path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>
      </svg>
    ),
    badge: 12,
  },
  {
    to: "/dashboard/users",
    label: "Users",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    to: "/dashboard/tickets/agent",
    label: "Assigned Tickets",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
   {
    to: "/dashboard/tickets/customer",
    label: "Create Tickets",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
];

const settingsNav: NavItem[] = [
  {
    to: "/settings",
    label: "Preferences",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 1.41 14.14M4.93 4.93A10 10 0 0 0 3.52 19.07M12 2v2M12 20v2M2 12H4M20 12h2"/>
      </svg>
    ),
  },
  {
    to: "/permissions",
    label: "Permissions",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <aside className="tms-sidebar" role="navigation" aria-label="Main navigation">
        {/* Brand */}
        <div className="tms-brand">
          <div className="tms-brand-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/>
              <path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>
            </svg>
          </div>
          <div>
            <div className="tms-brand-name">TMS</div>
            <div className="tms-brand-sub">Admin Panel</div>
          </div>
        </div>

        {/* Main nav */}
        <div className="tms-nav-section">
          <div className="tms-nav-label">Main</div>
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `tms-nav-item${isActive ? " active" : ""}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="tms-badge" aria-label={`${item.badge} unread`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Settings nav */}
        <div className="tms-nav-section" style={{ paddingTop: "8px" }}>
          <div className="tms-nav-label">Settings</div>
          {settingsNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `tms-nav-item${isActive ? " active" : ""}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className="tms-sidebar-footer">
          <div className="tms-user-mini">
            <div className="tms-user-avatar" aria-hidden="true">{initials}</div>
            <div className="tms-user-info">
              <div className="tms-user-name">{user?.name || "User"}</div>
              <div className="tms-user-role">{user?.role || "Member"}</div>
            </div>
            <button
              className="tms-logout-btn"
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        .tms-sidebar {
          width: 240px;
          background: #0F172A;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .tms-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 22px 20px 18px;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.06);
        }

        .tms-brand-icon {
          width: 32px;
          height: 32px;
          background: #6366F1;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tms-brand-name {
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .tms-brand-sub {
          color: #475569;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-top: 1px;
        }

        .tms-nav-section {
          padding: 18px 12px 4px;
        }

        .tms-nav-label {
          color: #475569;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 0 8px;
          margin-bottom: 6px;
        }

        .tms-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 7px;
          color: #94A3B8;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          position: relative;
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .tms-nav-item svg {
          flex-shrink: 0;
        }

        .tms-nav-item .tms-badge {
          margin-left: auto;
          background: #6366F1;
          color: #ffffff;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
        }

        .tms-nav-item.active {
          background: #1E293B;
          color: #ffffff;
        }

        .tms-nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 60%;
          width: 3px;
          background: #6366F1;
          border-radius: 0 3px 3px 0;
        }

        .tms-nav-item:hover:not(.active) {
          background: #1E293B;
          color: #CBD5E1;
        }

        .tms-sidebar-footer {
          margin-top: auto;
          padding: 12px;
          border-top: 0.5px solid rgba(255, 255, 255, 0.06);
        }

        .tms-user-mini {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 7px;
          transition: background 0.15s;
        }

        .tms-user-mini:hover {
          background: #1E293B;
        }

        .tms-user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #6366F1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: #ffffff;
          flex-shrink: 0;
          letter-spacing: 0.5px;
        }

        .tms-user-info {
          flex: 1;
          min-width: 0;
        }

        .tms-user-name {
          color: #E2E8F0;
          font-size: 12.5px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tms-user-role {
          color: #64748B;
          font-size: 10.5px;
          text-transform: capitalize;
        }

        .tms-logout-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 5px;
          transition: color 0.15s, background 0.15s;
          flex-shrink: 0;
        }

        .tms-logout-btn:hover {
          color: #EF4444;
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </>
  );
}