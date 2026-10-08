"use client";

import { useEffect, useRef } from "react";
import type { Pick, Rating } from "@/lib/types";
import { RATING_LABEL } from "@/lib/types";

export function RatingCard({ pick, onRate }: { pick: Pick; onRate: (r: Rating) => void }) {
  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    first.current?.focus();
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 md:p-8">
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby="rating-title"
        className="rise w-full max-w-lg rounded-[1.75rem] bg-forest p-6 text-paper shadow-2xl md:p-8"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-leaf">Welcome back</p>
        <h2 id="rating-title" className="mt-3 text-2xl font-light leading-tight tracking-tight md:text-3xl">
          How was “{pick.title}”?
        </h2>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {(Object.keys(RATING_LABEL) as Rating[]).map((r, i) => (
            <button
              key={r}
              ref={i === 0 ? first : undefined}
              onClick={() => onRate(r)}
              className="rounded-2xl border border-paper/30 px-2 py-4 text-sm font-medium transition hover:bg-leaf hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf md:text-base"
            >
              {RATING_LABEL[r]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
