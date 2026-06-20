import { NextResponse } from "next/server";
import { z } from "zod";
import { guideRequestSchema } from "@/lib/schema";
import { generateGuide } from "@/lib/gemini";

// The Gemini SDK needs the Node runtime (not edge).
export const runtime = "nodejs";
// Generation can take a while; never cache.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = guideRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check your input.",
        details: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    const result = await generateGuide(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "UNKNOWN";

    if (message === "MISSING_API_KEY") {
      return NextResponse.json(
        {
          error:
            "The server is missing its Gemini API key. Add GEMINI_API_KEY to .env.local and restart.",
        },
        { status: 500 }
      );
    }

    if (message === "PARSE_ERROR" || message === "EMPTY_RESPONSE") {
      return NextResponse.json(
        { error: "The AI returned an unexpected response. Please try again." },
        { status: 502 }
      );
    }

    console.error("[/api/guide] generation failed:", err);
    return NextResponse.json(
      { error: "Something went wrong while generating your roadmap. Please try again." },
      { status: 500 }
    );
  }
}
