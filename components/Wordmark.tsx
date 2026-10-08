export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-medium tracking-[-0.03em] ${className}`}
      aria-label="Resoura"
    >
      Resoura<span className="text-azure">.</span>
    </span>
  );
}
