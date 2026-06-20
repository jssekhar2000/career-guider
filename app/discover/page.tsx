"use client";

import { useState } from "react";
import EducationFields, {
  emptyEducation,
  type EducationState,
} from "@/components/EducationFields";
import InterestPicker from "@/components/InterestPicker";
import RoadmapView from "@/components/RoadmapView";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import PrintButton from "@/components/PrintButton";
import Stepper from "@/components/Stepper";
import { useGuide } from "@/lib/useGuide";
import {
  LEVELS_WITH_STREAM,
  type EducationLevel,
  type InterestArea,
} from "@/lib/india";

const STEPS = ["About you", "Interests & goals"];

export default function DiscoverPage() {
  const [step, setStep] = useState(0);
  const [education, setEducation] = useState<EducationState>(emptyEducation);
  const [interests, setInterests] = useState<InterestArea[]>([]);
  const [hobby, setHobby] = useState("");
  const [notes, setNotes] = useState("");
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
    // On step 1, Enter / primary button should advance, not submit.
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
    if (interests.length === 0) {
      setFormError("Please pick at least one interest area.");
      return;
    }
    setFormError("");

    submit({
      mode: "discover",
      education: {
        level: education.level as EducationLevel,
        stream: education.stream || undefined,
        degree: education.degree.trim() || undefined,
        specialization: education.specialization.trim() || undefined,
        class10Percent: education.class10Percent.trim() || undefined,
        class12Percent: education.class12Percent.trim() || undefined,
        degreeScore: education.degreeScore.trim() || undefined,
      },
      interests,
      hobby: hobby.trim() || undefined,
      notes: notes.trim() || undefined,
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
            Your career roadmap
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
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Discover my path
        </h1>
        <p className="mt-1 text-sm text-slate-400 sm:text-base">
          Tell us where you are and what you enjoy. We&apos;ll suggest careers and a
          roadmap built for the Indian system.
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
            <div className="animate-fade-in space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  What are you interested in?{" "}
                  <span className="font-normal text-slate-500">
                    (pick one or more)
                  </span>
                </label>
                <InterestPicker selected={interests} onChange={setInterests} />
              </div>

              <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
                <label
                  htmlFor="hobby"
                  className="mb-1.5 block text-sm font-medium text-indigo-100"
                >
                  🚀 A hobby you&apos;d love to turn into a career?{" "}
                  <span className="font-normal text-indigo-200/70">(optional)</span>
                </label>
                <input
                  id="hobby"
                  type="text"
                  maxLength={200}
                  value={hobby}
                  onChange={(e) => setHobby(e.target.value)}
                  placeholder="e.g. gaming, making reels, travelling, photography…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20"
                />
                <p className="mt-2 text-xs text-indigo-200/70">
                  We&apos;ll show you how to make it a real, money-making profession
                  in India.
                </p>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Anything else?{" "}
                  <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  maxLength={500}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. I prefer government jobs, my family budget is limited…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20"
                />
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
            {step === 0 ? (
              <button
                type="submit"
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 focus:ring-4 focus:ring-indigo-500/30"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 focus:ring-4 focus:ring-indigo-500/30"
              >
                Build my roadmap
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
