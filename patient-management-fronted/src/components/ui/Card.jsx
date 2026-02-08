export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-zinc-900 p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
