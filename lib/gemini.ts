import { GoogleGenAI, Type } from "@google/genai";
import type { Schema } from "@google/genai";
import { INDIAN_EXAMS_REFERENCE } from "./india";
import type { GuideRequest, GuideResult } from "./schema";

const MODEL = "gemini-2.5-flash";

// Structured JSON schema the model must return. Mirrors GuideResult in schema.ts.
const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "2-3 sentence encouraging overview tailored to the student.",
    },
    suggestedCareers: {
      type: Type.ARRAY,
      description:
        "Career options that fit the student. Required for discover mode; empty array for goal mode.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          whyItFits: { type: Type.STRING },
          demandInIndia: { type: Type.STRING },
          avgSalaryRange: {
            type: Type.STRING,
            description: "Realistic India salary range in INR, e.g. '4-12 LPA'.",
          },
        },
        required: ["title", "whyItFits", "demandInIndia", "avgSalaryRange"],
      },
    },
    eligibility: {
      type: Type.ARRAY,
      description:
        "Concrete things the student is/isn't eligible for RIGHT NOW based on their marks: " +
        "exams, courses, colleges, scholarships. Judge realistically against typical Indian cutoffs.",
      items: {
        type: Type.OBJECT,
        properties: {
          item: {
            type: Type.STRING,
            description: "e.g. 'JEE Main / NITs', 'MBBS (Govt via NEET)', 'B.Com (Hons), DU'",
          },
          status: {
            type: Type.STRING,
            enum: ["Eligible", "Likely eligible", "Needs improvement", "Aspirational"],
            format: "enum",
          },
          reason: {
            type: Type.STRING,
            description:
              "Short reason referencing the student's marks/eligibility criteria where relevant.",
          },
        },
        required: ["item", "status", "reason"],
      },
    },
    phases: {
      type: Type.ARRAY,
      description:
        "Ordered roadmap phases starting from the student's CURRENT stage to the goal/career.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          timeframe: {
            type: Type.STRING,
            description: "e.g. 'Now - 6 months', 'Class 11-12', 'Years 1-4'.",
          },
          description: { type: Type.STRING },
          milestones: { type: Type.ARRAY, items: { type: Type.STRING } },
          exams: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Relevant Indian entrance/competitive exams for this phase.",
          },
          skills: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["title", "timeframe", "description", "milestones", "exams", "skills"],
      },
    },
    entranceExams: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          whenToTake: { type: Type.STRING },
          notes: { type: Type.STRING },
        },
        required: ["name", "whenToTake", "notes"],
      },
    },
    alternativePaths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Backup / alternative routes (private colleges, distance, skill-based).",
    },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable, practical tips specific to India.",
    },
  },
  required: [
    "summary",
    "suggestedCareers",
    "eligibility",
    "phases",
    "entranceExams",
    "alternativePaths",
    "tips",
  ],
};

const SYSTEM_INSTRUCTION = `You are an expert Indian career counsellor with deep knowledge of the Indian education system.

Rules you MUST follow:
- Everything is specific to INDIA. Reference real Indian entrance/competitive exams (${INDIAN_EXAMS_REFERENCE}), real degrees, and real institutions (IITs, NITs, IIITs, AIIMS, IIMs, NLUs, state universities, polytechnics) where relevant.
- ALWAYS start the roadmap from the student's CURRENT stated stage of education and move forward step by step. Never assume they are further ahead than stated.
- USE THE STUDENT'S MARKS to judge eligibility realistically. Fill the "eligibility" list with concrete exams/courses/colleges/scholarships and mark each as Eligible, Likely eligible, Needs improvement, or Aspirational, with a short reason that references their marks and typical cutoffs. If marks are not provided, base eligibility on their stage and note that marks would refine it.
- TREAT MODERN / PASSION CAREERS AS SERIOUS PROFESSIONS. For creator and new-age paths (YouTuber, content creator, Instagram Reels, gaming & esports, game development, streaming, travel vlogging, podcasting, influencing, photography/videography, music, fashion/beauty, fitness coaching, entrepreneurship, digital marketing), do NOT dismiss them or force a college-exam template. Instead build the roadmap around: picking a niche, the core skills to learn (e.g. video editing, scripting, SEO/thumbnails, on-camera presence, game sense, brand building), affordable gear/setup, posting consistency, growing an audience, and MONETISATION IN INDIA (YouTube AdSense, brand deals/sponsorships, affiliate, channel memberships, Instagram collabs, esports prize money/team contracts, Patreon/courses). Give realistic India income progression and timelines, name relevant platforms/communities/events, and ALWAYS recommend a sensible parallel education or backup skill since these careers are uncertain. For eligibility of such careers, focus on "you can start today" readiness rather than exam cutoffs. In the phase "exams" field, list platforms/certifications/tools instead of entrance exams when exams don't apply.
- Give realistic timelines, realistic INR salary/income ranges, and include BOTH stable and creative/independent options where relevant.
- Be practical, specific and encouraging. Avoid vague filler. No markdown, no asterisks — return plain text values only.
- Respond ONLY with JSON matching the provided schema.`;

function educationLine(req: GuideRequest): string {
  const {
    level,
    stream,
    degree,
    specialization,
    class10Percent,
    class12Percent,
    degreeScore,
  } = req.education;
  const parts = [`Current education: ${level}`];
  if (stream) parts.push(`Stream: ${stream}`);
  if (degree) parts.push(`Course/Degree: ${degree}`);
  if (specialization) parts.push(`Specialisation/Branch: ${specialization}`);
  if (class10Percent) parts.push(`Class 10 marks: ${class10Percent}%`);
  if (class12Percent) parts.push(`Class 12 marks: ${class12Percent}%`);
  if (degreeScore) parts.push(`Latest CGPA/Percentage: ${degreeScore}`);
  return parts.join(". ");
}

function buildPrompt(req: GuideRequest): string {
  if (req.mode === "discover") {
    const lines = [
      educationLine(req),
      `Interest areas: ${req.interests.join(", ")}`,
    ];
    if (req.hobby) {
      lines.push(
        `Hobby they want to turn into a profession: ${req.hobby}`
      );
    }
    if (req.notes) lines.push(`Extra context from the student: ${req.notes}`);
    lines.push(
      "",
      "Task: Suggest 3-5 well-fitting career options for this student (fill suggestedCareers).",
      req.hobby
        ? `Seriously evaluate how they can turn their hobby (${req.hobby}) into a real, money-making profession in India — make this a prominent option among suggestedCareers and centre the roadmap on it, covering skills, monetisation, audience/clients and a sensible backup.`
        : "",
      "Assess what they are eligible for now based on their marks (fill eligibility).",
      "Then give ONE clear, phased roadmap from their current stage toward the best-fitting option(s),",
      "including the entrance exams they should target, skills to build, alternative paths and practical tips."
    );
    return lines.filter(Boolean).join("\n");
  }

  // goal mode
  return [
    educationLine(req),
    `Goal: ${req.goal}`,
    "",
    "Task: Give a complete, step-by-step guide for this student to reach the stated goal,",
    "starting from their current stage. Assess what they are eligible for now based on their marks",
    "(fill eligibility, focused on this goal). Build the phased roadmap, list the entrance exams,",
    "skills, alternative paths and practical tips. For goal mode, leave suggestedCareers as an empty array.",
  ].join("\n");
}

export async function generateGuide(req: GuideRequest): Promise<GuideResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: buildPrompt(req),
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.7,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("EMPTY_RESPONSE");
  }

  let parsed: GuideResult;
  try {
    parsed = JSON.parse(text) as GuideResult;
  } catch {
    throw new Error("PARSE_ERROR");
  }

  // Defensive defaults so the UI never crashes on a missing array.
  return {
    summary: parsed.summary ?? "",
    suggestedCareers: parsed.suggestedCareers ?? [],
    eligibility: parsed.eligibility ?? [],
    phases: parsed.phases ?? [],
    entranceExams: parsed.entranceExams ?? [],
    alternativePaths: parsed.alternativePaths ?? [],
    tips: parsed.tips ?? [],
  };
}
