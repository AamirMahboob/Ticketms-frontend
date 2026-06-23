import StatCard from "../../components/StatCard";

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="Total Tickets"
        value={120}
      />

      <StatCard
        title="Open Tickets"
        value={40}
      />

      <StatCard
        title="Agents"
        value={12}
      />

      <StatCard
        title="Customers"
        value={75}
      />
    </div>
  );
}