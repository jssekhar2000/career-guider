"use client";

import { useState } from "react";
import EducationFields, {
  emptyEducation,
  type EducationState,
} from "@/components/EducationFields";
import RoadmapView from "@/components/RoadmapView";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import PrintButton from "@/components/PrintButton";
import Stepper from "@/components/Stepper";
import { useGuide } from "@/lib/useGuide";
import { LEVELS_WITH_STREAM, type EducationLevel } from "@/lib/india";

const STEPS = ["About you", "Your goal"];

const EXAMPLE_GOALS = [
  "Become a doctor",
  "Software engineer at a top company",
  "Crack UPSC / become an IAS officer",
  "Chartered Accountant (CA)",
  "Become a YouTuber / content creator",
  "Pro gamer / esports athlete",
  "Travel vlogger",
  "Game developer",
  "Instagram content creator",
  "Data scientist",
];

export default function GoalPage() {
  const [step, setStep] = useState(0);
  const [education, setEducation] = useState<EducationState>(emptyEducation);
  const [goal, setGoal] = useState("");
  const [formError, setFormError] = useState("");

  const { status, result, error, submit, reset } = useGuide();

  const validateStep1 = () => {
    if (!education.level) return "Please select your current education level.";
    if (
      LEVELS_WITH_STREAM.includes(education.level as EducationLevel) &&
      !education.stream
    )
      return "Please select your stream.";
    return "";
  };

  const goNext = () => {
    const err = validateStep1();
    if (err) {
      setFormError(err);
      return;
    }
    setFormError("");
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 0) {
      goNext();
      return;
    }

    const err = validateStep1();
    if (err) {
      setStep(0);
      setFormError(err);
      return;
    }
    if (goal.trim().length < 3) {
      setFormError("Please tell us your goal.");
      return;
    }
    setFormError("");

    submit({
      mode: "goal",
      education: {
        level: education.level as EducationLevel,
        stream: education.stream || undefined,
        degree: education.degree.trim() || undefined,
        specialization: education.specialization.trim() || undefined,
        class10Percent: education.class10Percent.trim() || undefined,
        class12Percent: education.class12Percent.trim() || undefined,
        degreeScore: education.degreeScore.trim() || undefined,
      },
      goal: goal.trim(),
    });
  };

  const startOver = () => {
    reset();
    setStep(0);
  };

  if (status === "success" && result) {
    return (
      <div className="space-y-6">
        <div className="no-print flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-white sm:text-2xl">
            Your guide to: {goal}
          </h1>
          <div className="flex items-center gap-2">
            <PrintButton />
            <button
              type="button"
              onClick={startOver}
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Start over
            </button>
          </div>
        </div>
        <RoadmapView result={result} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white sm:text-2xl">I have a goal</h1>
        <p className="mt-1 text-sm text-slate-400 sm:text-base">
          Tell us your goal and where you are right now. We&apos;ll give you the
          complete step-by-step guide to reach it.
        </p>
      </div>

      {status === "loading" ? (
        <LoadingState />
      ) : status === "error" ? (
        <ErrorState message={error} onRetry={startOver} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="surface space-y-6 rounded-2xl p-4 sm:p-6"
        >
          <Stepper steps={STEPS} current={step} />

          {step === 0 && (
            <div className="animate-fade-in">
              <EducationFields value={education} onChange={setEducation} />
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <label
                htmlFor="goal"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                What&apos;s your goal?
              </label>
              <input
                id="goal"
                type="text"
                maxLength={200}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Become a software engineer"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLE_GOALS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400 transition hover:border-indigo-400/60 hover:text-white"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {formError && <p className="text-sm text-rose-400">{formError}</p>}

          {/* Action bar */}
          <div className="flex gap-3">
            {step === 1 && (
              <button
                type="button"
                onClick={() => {
                  setFormError("");
                  setStep(0);
                }}
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 focus:ring-4 focus:ring-indigo-500/30"
            >
              {step === 0 ? "Next →" : "Get my complete guide"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
