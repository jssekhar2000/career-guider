export default function LoadingState() {
  return (
    <div className="animate-fade-in space-y-4" aria-live="polite" aria-busy="true">
      <div className="flex items-center gap-3 text-indigo-300">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-400" />
        <span className="font-medium">Building your personalised roadmap…</span>
      </div>
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="surface rounded-xl p-5">
            <div className="mb-3 h-4 w-1/3 animate-pulse rounded bg-white/10" />
            <div className="mb-2 h-3 w-full animate-pulse rounded bg-white/5" />
            <div className="mb-2 h-3 w-5/6 animate-pulse rounded bg-white/5" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
