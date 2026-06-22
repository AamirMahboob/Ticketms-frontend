export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="header">
      <h3>Ticket Management System</h3>

      <div className="user-info">
        <span>{user?.name}</span>
      </div>
    </header>
  );
}