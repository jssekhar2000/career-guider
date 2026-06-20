"use client";

import { useState, useCallback } from "react";
import type { GuideRequest, GuideResult } from "./schema";

type Status = "idle" | "loading" | "success" | "error";

export function useGuide() {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<GuideResult | null>(null);
  const [error, setError] = useState<string>("");

  const submit = useCallback(async (payload: GuideRequest) => {
    setStatus("loading");
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(
          (data && typeof data.error === "string" && data.error) ||
            "Could not generate your roadmap. Please try again."
        );
        setStatus("error");
        return;
      }

      setResult(data as GuideResult);
      setStatus("success");
    } catch {
      setError("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError("");
  }, []);

  return { status, result, error, submit, reset };
}
