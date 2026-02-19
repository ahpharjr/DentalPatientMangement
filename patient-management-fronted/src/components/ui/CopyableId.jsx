import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CopyableId({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      title="Click to copy"
      className="flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-green-400" />
          <span className="text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>{value}</span>
        </>
      )}
    </button>
  );
}