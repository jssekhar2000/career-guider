"use client";

import {
  EDUCATION_LEVELS,
  STREAMS,
  COURSES,
  specializationsFor,
  LEVELS_WITH_STREAM,
  LEVELS_WITH_DEGREE,
  LEVELS_WITH_CLASS10_MARKS,
  LEVELS_WITH_CLASS12_MARKS,
  LEVELS_WITH_DEGREE_SCORE,
  type EducationLevel,
  type Stream,
} from "@/lib/india";

export interface EducationState {
  level: EducationLevel | "";
  stream: Stream | "";
  degree: string;
  specialization: string;
  class10Percent: string;
  class12Percent: string;
  degreeScore: string;
}

export const emptyEducation: EducationState = {
  level: "",
  stream: "",
  degree: "",
  specialization: "",
  class10Percent: "",
  class12Percent: "",
  degreeScore: "",
};

interface Props {
  value: EducationState;
  onChange: (next: EducationState) => void;
}

const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";
const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20";

function PercentInput({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}{" "}
        <span className="font-normal text-slate-400">(optional)</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          max={100}
          step="0.1"
          className={fieldClass + " pr-9"}
          placeholder={hint ?? "e.g. 85"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500">
          %
        </span>
      </div>
    </div>
  );
}

export default function EducationFields({ value, onChange }: Props) {
  const lvl = value.level as EducationLevel;
  const showStream = value.level !== "" && LEVELS_WITH_STREAM.includes(lvl);
  const showDegree = value.level !== "" && LEVELS_WITH_DEGREE.includes(lvl);
  const showClass10 = value.level !== "" && LEVELS_WITH_CLASS10_MARKS.includes(lvl);
  const showClass12 = value.level !== "" && LEVELS_WITH_CLASS12_MARKS.includes(lvl);
  const showDegreeScore = value.level !== "" && LEVELS_WITH_DEGREE_SCORE.includes(lvl);

  const specializations = specializationsFor(value.degree);
  const anyMarks = showClass10 || showClass12 || showDegreeScore;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={showStream || showDegree ? "" : "sm:col-span-2"}>
          <label htmlFor="level" className={labelClass}>
            Current education level
          </label>
          <select
            id="level"
            className={fieldClass}
            value={value.level}
            onChange={(e) =>
              onChange({
                ...emptyEducation,
                level: e.target.value as EducationLevel,
              })
            }
          >
            <option value="" disabled>
              Select your level
            </option>
            {EDUCATION_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {showStream && (
          <div>
            <label htmlFor="stream" className={labelClass}>
              Stream
            </label>
            <select
              id="stream"
              className={fieldClass}
              value={value.stream}
              onChange={(e) =>
                onChange({ ...value, stream: e.target.value as Stream })
              }
            >
              <option value="" disabled>
                Select your stream
              </option>
              {STREAMS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

        {showDegree && (
          <div>
            <label htmlFor="degree" className={labelClass}>
              Course / Degree
            </label>
            <input
              id="degree"
              list="course-options"
              className={fieldClass}
              placeholder="e.g. B.Tech, B.Sc, MBBS, MBA"
              value={value.degree}
              onChange={(e) =>
                // changing the course clears the old specialisation
                onChange({ ...value, degree: e.target.value, specialization: "" })
              }
            />
            <datalist id="course-options">
              {COURSES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        )}

        {showDegree && value.degree.trim() !== "" && (
          <div className={showStream ? "sm:col-span-2" : ""}>
            <label htmlFor="specialization" className={labelClass}>
              Specialisation / Branch{" "}
              <span className="font-normal text-slate-500">
                {specializations.length > 0 ? "(choose or type)" : "(optional)"}
              </span>
            </label>
            <input
              id="specialization"
              list="specialization-options"
              className={fieldClass}
              placeholder={
                specializations.length > 0
                  ? `e.g. ${specializations[0]}`
                  : "e.g. your branch / major"
              }
              value={value.specialization}
              onChange={(e) =>
                onChange({ ...value, specialization: e.target.value })
              }
            />
            <datalist id="specialization-options">
              {specializations.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>
        )}
      </div>

      {anyMarks && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="mb-3 text-sm font-medium text-slate-200">
            Your marks{" "}
            <span className="font-normal text-slate-500">
              — add these so we can check what you&apos;re eligible for
            </span>
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {showClass10 && (
              <PercentInput
                id="class10"
                label="Class 10"
                value={value.class10Percent}
                onChange={(v) => onChange({ ...value, class10Percent: v })}
              />
            )}
            {showClass12 && (
              <PercentInput
                id="class12"
                label="Class 12"
                value={value.class12Percent}
                onChange={(v) => onChange({ ...value, class12Percent: v })}
              />
            )}
            {showDegreeScore && (
              <div>
                <label htmlFor="degreeScore" className={labelClass}>
                  Degree CGPA / %{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="degreeScore"
                  type="text"
                  inputMode="decimal"
                  className={fieldClass}
                  placeholder="e.g. 8.2 CGPA or 78%"
                  value={value.degreeScore}
                  onChange={(e) =>
                    onChange({ ...value, degreeScore: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
