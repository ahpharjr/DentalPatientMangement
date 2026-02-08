export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-zinc-400">{subtitle}</p>
      </div>

      {action}
    </div>
  );
}
