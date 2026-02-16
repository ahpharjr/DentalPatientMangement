export default function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-all duration-200 
                  rounded-xl border border-white/10 bg-zinc-900 p-5 shadow-sm 
                 hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="rounded-lg bg-zinc-800 p-2 transition group-hover:bg-zinc-700">
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}

        <div>
          <p className="font-medium text-white">{title}</p>
          <p className="text-xs text-zinc-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
