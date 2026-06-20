import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Hero */}
      <section className="animate-fade-in text-center">
        <span className="inline-block rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-sm font-medium text-indigo-200">
          🇮🇳 For Indian students
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-6xl">
          Confused about your career?
          <br />
          Let&apos;s find{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
            your path
          </span>
          .
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
          Enter your education, marks and interests — we&apos;ll tell you exactly what
          you&apos;re eligible for and give you a clear, step-by-step roadmap built around
          real Indian exams, colleges and careers.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/discover"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 sm:w-auto"
          >
            Discover my path
          </Link>
          <Link
            href="/goal"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-center font-semibold text-slate-200 transition hover:bg-white/10 sm:w-auto"
          >
            I have a goal
          </Link>
        </div>
      </section>

      {/* Two modes */}
      <section className="stagger grid gap-6 md:grid-cols-2">
        <Link
          href="/discover"
          className="surface surface-hover group rounded-2xl p-7 hover:-translate-y-1"
        >
          <div className="text-3xl">🧭</div>
          <h2 className="mt-3 text-xl font-semibold text-white">
            Discover my path
          </h2>
          <p className="mt-2 text-slate-400">
            Not sure what to become? Enter your class/stream/degree, your marks and the
            things you enjoy. We&apos;ll suggest careers that fit and a roadmap to get
            there.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-medium text-indigo-300 transition-all group-hover:gap-2">
            Get started →
          </span>
        </Link>

        <Link
          href="/goal"
          className="surface surface-hover group rounded-2xl p-7 hover:-translate-y-1"
        >
          <div className="text-3xl">🎯</div>
          <h2 className="mt-3 text-xl font-semibold text-white">I have a goal</h2>
          <p className="mt-2 text-slate-400">
            Already dreaming of becoming a doctor, IAS officer, developer or designer?
            Get the complete guide from where you are now to your goal.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-medium text-indigo-300 transition-all group-hover:gap-2">
            Build my guide →
          </span>
        </Link>
      </section>

      {/* How it works */}
      <section className="surface rounded-2xl p-7">
        <h2 className="text-xl font-semibold text-white">How it works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            {
              n: "1",
              t: "Share your details",
              d: "Your education level, marks, stream/degree and what interests you.",
            },
            {
              n: "2",
              t: "AI builds your roadmap",
              d: "Tailored to the Indian system — real exams, colleges and timelines.",
            },
            {
              n: "3",
              t: "Follow the steps",
              d: "Phases, milestones, exams and tips from where you are to your goal.",
            },
          ].map((s) => (
            <div key={s.n} className="flex gap-3">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 font-bold text-white">
                {s.n}
              </span>
              <div>
                <h3 className="font-medium text-white">{s.t}</h3>
                <p className="mt-1 text-sm text-slate-400">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
