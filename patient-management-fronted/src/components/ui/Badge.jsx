export default function Badge({ label }) {
  return (
    <span className="rounded-md bg-purple-600/20 px-2 py-1 text-xs text-purple-400">
      {label}
    </span>
  );
}
