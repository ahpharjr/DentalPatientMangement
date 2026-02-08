export default function Input({ label, required, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm text-zinc-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...props}
        className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>
  );
}
