import Card from "../ui/Card";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{title}</p>

        {Icon && (
          <Icon className="h-5 w-5 text-zinc-500" />
        )}
      </div>

      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>
    </Card>
  );
}
