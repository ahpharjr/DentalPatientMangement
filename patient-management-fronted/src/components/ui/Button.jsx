export default function Button({ variant = "primary", children, ...props }) {
  const styles = {
    primary: "bg-white text-black hover:bg-zinc-200",
    ghost: "bg-zinc-800 text-white hover:bg-zinc-700",
    danger: "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 text-sm transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
