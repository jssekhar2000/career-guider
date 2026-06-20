interface Props {
  steps: string[];
  current: number; // zero-based index
}

export default function Stepper({ steps, current }: Props) {
  const pct = ((current + 1) / steps.length) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-400">
        <span>
          Step {current + 1} of {steps.length}
          <span className="text-slate-500"> · {steps[current]}</span>
        </span>
        <span className="text-slate-500">{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
