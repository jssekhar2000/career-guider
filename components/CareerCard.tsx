import type { SuggestedCareer } from "@/lib/schema";

export default function CareerCard({ career }: { career: SuggestedCareer }) {
  return (
    <div className="surface surface-hover rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white">{career.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{career.whyItFits}</p>
      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Demand in India
          </dt>
          <dd className="mt-1 text-sm text-slate-200">{career.demandInIndia}</dd>
        </div>
        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-emerald-300/80">
            Typical salary
          </dt>
          <dd className="mt-1 text-sm font-semibold text-emerald-300">
            {career.avgSalaryRange}
          </dd>
        </div>
      </dl>
    </div>
  );
}
