interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent?: "indigo" | "green" | "amber" | "red" | "blue";
}

const ACCENTS = {
  indigo: { bg: "#eef2ff", color: "#4f46e5" },
  green:  { bg: "#f0fdf4", color: "#16a34a" },
  amber:  { bg: "#fffbeb", color: "#d97706" },
  red:    { bg: "#fef2f2", color: "#dc2626" },
  blue:   { bg: "#eff6ff", color: "#2563eb" },
};

export default function StatCard({ label, value, icon, accent = "indigo" }: StatCardProps) {
  const { bg, color } = ACCENTS[accent];
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: bg, color }}>{icon}</div>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}