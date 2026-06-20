import { z } from "zod";
import {
  EDUCATION_LEVELS,
  STREAMS,
  INTEREST_AREAS,
} from "./india";

// ---- Request validation (browser -> /api/guide) ----

// Marks are stored as strings from the form (e.g. "85", "8.7"). Kept optional —
// students can still get guidance without them, but they sharpen the eligibility check.
const scoreField = z
  .string()
  .trim()
  .max(10)
  .optional()
  .or(z.literal(""));

const educationSchema = z.object({
  level: z.enum(EDUCATION_LEVELS),
  stream: z.enum(STREAMS).optional(),
  degree: z.string().trim().max(120).optional(),
  specialization: z.string().trim().max(120).optional(),
  class10Percent: scoreField,
  class12Percent: scoreField,
  degreeScore: scoreField,
});

export const discoverRequestSchema = z.object({
  mode: z.literal("discover"),
  education: educationSchema,
  interests: z
    .array(z.enum(INTEREST_AREAS))
    .min(1, "Pick at least one interest")
    .max(INTEREST_AREAS.length),
  hobby: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(500).optional(),
});

export const goalRequestSchema = z.object({
  mode: z.literal("goal"),
  education: educationSchema,
  goal: z
    .string()
    .trim()
    .min(3, "Tell us your goal")
    .max(200),
});

export const guideRequestSchema = z.discriminatedUnion("mode", [
  discoverRequestSchema,
  goalRequestSchema,
]);

export type GuideRequest = z.infer<typeof guideRequestSchema>;
export type GuideMode = GuideRequest["mode"];

// ---- Result shape (Gemini JSON -> UI). Kept in sync with the responseSchema in gemini.ts ----

export interface SuggestedCareer {
  title: string;
  whyItFits: string;
  demandInIndia: string;
  avgSalaryRange: string;
}

export interface RoadmapPhase {
  title: string;
  timeframe: string;
  description: string;
  milestones: string[];
  exams: string[];
  skills: string[];
}

export interface EntranceExam {
  name: string;
  whenToTake: string;
  notes: string;
}

export type EligibilityStatus =
  | "Eligible"
  | "Likely eligible"
  | "Needs improvement"
  | "Aspirational";

export interface EligibilityItem {
  item: string; // e.g. "JEE Main / NITs", "MBBS (govt)", "B.Com (Hons), DU"
  status: EligibilityStatus;
  reason: string; // why, referencing the student's marks where relevant
}

export interface GuideResult {
  summary: string;
  suggestedCareers: SuggestedCareer[];
  eligibility: EligibilityItem[];
  phases: RoadmapPhase[];
  entranceExams: EntranceExam[];
  alternativePaths: string[];
  tips: string[];
}
