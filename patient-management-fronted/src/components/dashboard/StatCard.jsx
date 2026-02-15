import Card from "../ui/Card";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  onClick,
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{title}</p>

        {Icon && (
          <button
            onClick={onClick}
            className="p-2 rounded-lg hover:bg-zinc-800 transition cursor-pointer"
          >
            <Icon className="h-5 w-5 text-zinc-500 hover:text-blue-400 transition" />
          </button>
        )}
      </div>

      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>
    </Card>
  );
}
