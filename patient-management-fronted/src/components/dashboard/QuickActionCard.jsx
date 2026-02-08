import Card from "../ui/Card";

export default function QuickActionCard({
  title,
  description,
  icon: Icon,
}) {
  return (
    <Card className="cursor-pointer transition hover:bg-zinc-800">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="rounded-lg bg-zinc-800 p-2">
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}

        <div>
          <p className="font-medium text-white">{title}</p>
          <p className="text-xs text-zinc-400">{description}</p>
        </div>
      </div>
    </Card>
  );
}
