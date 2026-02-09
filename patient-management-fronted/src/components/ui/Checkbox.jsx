export default function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm text-zinc-300">
      <input
        type="checkbox"
        {...props}
        className="h-4 w-4 rounded border-white/20 bg-zinc-900"
      />
      {label}
    </label>
  );
}
