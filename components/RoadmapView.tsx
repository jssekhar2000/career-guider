import type { GuideResult, EligibilityStatus } from "@/lib/schema";
import CareerCard from "./CareerCard";

function Chip({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "exam" | "skill";
}) {
  const cls =
    tone === "exam"
      ? "bg-amber-400/10 text-amber-200 border-amber-400/25"
      : "bg-sky-400/10 text-sky-200 border-sky-400/25";
  return (
    <span
      className={`inline-block rounded-md border px-2 py-0.5 text-xs font-medium ${cls}`}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold text-white">{children}</h2>;
}

const ELIGIBILITY_STYLES: Record<
  EligibilityStatus,
  { dot: string; badge: string; icon: string }
> = {
  Eligible: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
    icon: "✓",
  },
  "Likely eligible": {
    dot: "bg-lime-400",
    badge: "bg-lime-400/10 text-lime-300 border-lime-400/30",
    icon: "✓",
  },
  "Needs improvement": {
    dot: "bg-amber-400",
    badge: "bg-amber-400/10 text-amber-300 border-amber-400/30",
    icon: "↑",
  },
  Aspirational: {
    dot: "bg-rose-400",
    badge: "bg-rose-400/10 text-rose-300 border-rose-400/30",
    icon: "★",
  },
};

function eligibilityStyle(status: EligibilityStatus) {
  return ELIGIBILITY_STYLES[status] ?? ELIGIBILITY_STYLES["Likely eligible"];
}

export default function RoadmapView({ result }: { result: GuideResult }) {
  return (
    <div className="animate-fade-in space-y-10">
      {/* Summary */}
      {result.summary && (
        <div className="rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 to-transparent p-5">
          <p className="text-slate-200">{result.summary}</p>
        </div>
      )}

      {/* Eligibility — what the student can get into based on marks */}
      {result.eligibility.length > 0 && (
        <section className="space-y-4">
          <SectionTitle>What you&apos;re eligible for</SectionTitle>
          <div className="stagger grid gap-3 sm:grid-cols-2">
            {result.eligibility.map((e, i) => {
              const s = eligibilityStyle(e.status);
              return (
                <div key={`${e.item}-${i}`} className="surface rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
                      <h3 className="font-semibold text-white">{e.item}</h3>
                    </div>
                    <span
                      className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.badge}`}
                    >
                      {s.icon} {e.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{e.reason}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Suggested careers (discover mode) */}
      {result.suggestedCareers.length > 0 && (
        <section className="space-y-4">
          <SectionTitle>Careers that fit you</SectionTitle>
          <div className="stagger grid gap-4 sm:grid-cols-2">
            {result.suggestedCareers.map((c, i) => (
              <CareerCard key={`${c.title}-${i}`} career={c} />
            ))}
          </div>
        </section>
      )}

      {/* Roadmap timeline */}
      {result.phases.length > 0 && (
        <section className="space-y-5">
          <SectionTitle>Your step-by-step roadmap</SectionTitle>
          <ol className="relative space-y-6 border-l-2 border-indigo-400/30 pl-6">
            {result.phases.map((phase, i) => (
              <li key={`${phase.title}-${i}`} className="relative">
                <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/30">
                  {i + 1}
                </span>
                <div className="surface surface-hover rounded-xl p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {phase.title}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs font-medium text-slate-400">
                      {phase.timeframe}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{phase.description}</p>

                  {phase.milestones.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {phase.milestones.map((m, j) => (
                        <li key={j} className="flex gap-2 text-sm text-slate-300">
                          <span className="mt-0.5 text-indigo-400">✓</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {(phase.exams.length > 0 || phase.skills.length > 0) && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {phase.exams.map((e, j) => (
                        <Chip key={`e-${j}`} tone="exam">
                          {e}
                        </Chip>
                      ))}
                      {phase.skills.map((sk, j) => (
                        <Chip key={`s-${j}`} tone="skill">
                          {sk}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Entrance exams */}
      {result.entranceExams.length > 0 && (
        <section className="space-y-4">
          <SectionTitle>Key entrance exams</SectionTitle>
          <div className="surface overflow-x-auto rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Exam</th>
                  <th className="px-4 py-3 font-medium">When to take</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {result.entranceExams.map((exam, i) => (
                  <tr key={`${exam.name}-${i}`}>
                    <td className="px-4 py-3 font-medium text-white">{exam.name}</td>
                    <td className="px-4 py-3 text-slate-400">{exam.whenToTake}</td>
                    <td className="px-4 py-3 text-slate-400">{exam.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Alternatives + tips */}
      <div className="grid gap-6 md:grid-cols-2">
        {result.alternativePaths.length > 0 && (
          <section className="space-y-3">
            <SectionTitle>Alternative paths</SectionTitle>
            <ul className="space-y-2">
              {result.alternativePaths.map((p, i) => (
                <li
                  key={i}
                  className="flex gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-300"
                >
                  <span className="text-violet-400">→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {result.tips.length > 0 && (
          <section className="space-y-3">
            <SectionTitle>Practical tips</SectionTitle>
            <ul className="space-y-2">
              {result.tips.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-100"
                >
                  <span>💡</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
