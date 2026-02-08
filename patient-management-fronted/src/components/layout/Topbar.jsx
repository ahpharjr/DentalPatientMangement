import Badge from "../ui/Badge";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
      <div className="flex items-center gap-3">
        <h2 className="text-white font-semibold">Dr. Sai Pee</h2>
        <Badge label="Owner" />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-zinc-400 hover:text-white">🌙</button>
        <img
          src="/ahphar.png"
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover border border-white/10"
        />
      </div>
    </header>
  );
}
