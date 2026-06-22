import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>TMS</h2>
      </div>

      <nav>
        <NavLink to="/dashboard/admin">Dashboard</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
      </nav>
    </aside>
  );
}