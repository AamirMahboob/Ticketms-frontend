// export default function Header() {
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   return (
//     <header className="header">
//       <h3>Ticket Management System</h3>

//       <div className="user-info">
//         <span>{user?.name}</span>
//       </div>
//     </header>
//   );
// }

import { useState } from "react";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const [search, setSearch] = useState("");

  return (
    <>
      <header className="tms-header">
        {/* Left: breadcrumb + page title */}
        <div className="tms-header-left">
          <div className="tms-breadcrumb">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
            <span>Dashboard</span>
          </div>
          <div className="tms-header-title">Overview</div>
        </div>

        {/* Right: search, notifications, avatar */}
        <div className="tms-header-actions">
          <div className="tms-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search tickets…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tickets"
            />
          </div>

          <button className="tms-icon-btn" aria-label="Notifications">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="tms-notif-dot" aria-hidden="true" />
          </button>

          <div className="tms-header-divider" aria-hidden="true" />

          <div className="tms-avatar-btn" role="button" tabIndex={0} aria-label="User menu">
            <div className="tms-avatar" aria-hidden="true">{initials}</div>
            <div className="tms-avatar-info">
              <div className="tms-avatar-name">{user?.name || "User"}</div>
              <div className="tms-avatar-role">{user?.role || "Member"}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </header>

      <style>{`
        .tms-header {
          height: 60px;
          background: #ffffff;
          border-bottom: 0.5px solid #E2E8F0;
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 16px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .tms-header-left {
          flex: 1;
        }

        .tms-breadcrumb {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #94A3B8;
          font-size: 12px;
          margin-bottom: 2px;
        }

        .tms-breadcrumb span:last-child {
          color: #64748B;
          font-weight: 500;
        }

        .tms-header-title {
          font-size: 15px;
          font-weight: 600;
          color: #0F172A;
          letter-spacing: -0.2px;
        }

        .tms-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tms-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F8FAFC;
          border: 0.5px solid #E2E8F0;
          border-radius: 8px;
          padding: 7px 12px;
          width: 210px;
          transition: border-color 0.15s;
        }

        .tms-search:focus-within {
          border-color: #6366F1;
          background: #ffffff;
        }

        .tms-search svg {
          color: #94A3B8;
          flex-shrink: 0;
        }

        .tms-search input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13px;
          color: #0F172A;
          font-family: inherit;
          width: 100%;
        }

        .tms-search input::placeholder {
          color: #CBD5E1;
        }

        .tms-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 0.5px solid #E2E8F0;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          color: #64748B;
          transition: background 0.15s;
        }

        .tms-icon-btn:hover {
          background: #F8FAFC;
          color: #0F172A;
        }

        .tms-notif-dot {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #EF4444;
          border: 1.5px solid #ffffff;
        }

        .tms-header-divider {
          width: 0.5px;
          height: 28px;
          background: #E2E8F0;
        }

        .tms-avatar-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 5px 8px;
          border-radius: 8px;
          transition: background 0.15s;
          color: #94A3B8;
        }

        .tms-avatar-btn:hover {
          background: #F8FAFC;
        }

        .tms-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #6366F1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          flex-shrink: 0;
          letter-spacing: 0.5px;
        }

        .tms-avatar-info {
          line-height: 1.3;
        }

        .tms-avatar-name {
          font-size: 12.5px;
          font-weight: 500;
          color: #0F172A;
        }

        .tms-avatar-role {
          font-size: 10.5px;
          color: #94A3B8;
          text-transform: capitalize;
        }
      `}</style>
    </>
  );
}