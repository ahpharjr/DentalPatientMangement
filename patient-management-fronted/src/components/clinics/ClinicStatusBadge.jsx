export default function ClinicStatusBadge({ status }) {
  const styles =
    status === "Active"
      ? "bg-green-500/20 text-green-400"
      : "bg-zinc-500/20 text-zinc-400";

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
