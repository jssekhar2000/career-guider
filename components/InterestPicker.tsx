"use client";

import { INTEREST_GROUPS, type InterestArea } from "@/lib/india";

interface Props {
  selected: InterestArea[];
  onChange: (next: InterestArea[]) => void;
}

export default function InterestPicker({ selected, onChange }: Props) {
  const toggle = (area: InterestArea) => {
    if (selected.includes(area)) {
      onChange(selected.filter((a) => a !== area));
    } else {
      onChange([...selected, area]);
    }
  };

  return (
    <div className="space-y-4">
      {INTEREST_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((area) => {
              const active = selected.includes(area);
              return (
                <button
                  key={area}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(area)}
                  className={
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition " +
                    (active
                      ? "border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/25"
                      : "border-white/15 bg-white/5 text-slate-300 hover:border-indigo-400/60 hover:text-white")
                  }
                >
                  {area}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
