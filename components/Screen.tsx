import type { ReactNode } from "react";
import { Wordmark } from "./Wordmark";

const BLOBS = ["bg-leaf", "bg-moss", "bg-forest", "bg-leaf", "bg-moss"];

/** Poster-style frame for one big question. Used by sign-in and onboarding. */
export function Screen({
  step,
  total,
  tone = 0,
  children,
  footer,
}: {
  step?: number;
  total?: number;
  tone?: number;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className={`absolute -right-[18vmin] top-[8vh] size-[68vmin] rounded-full opacity-90 transition-colors duration-700 ${BLOBS[tone % BLOBS.length]}`}
      />
      <div
        aria-hidden="true"
        className="absolute right-[26vmin] top-[52vh] size-[9vmin] rounded-full bg-azure"
      />

      <div className="relative z-10 flex min-h-dvh flex-col px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center justify-between">
          <Wordmark className="text-2xl" />
          {step && total ? (
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-grass">
              {String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col justify-center py-10 md:max-w-[68%]">{children}</div>

        <div className="flex items-center justify-between gap-4">{footer}</div>
      </div>
    </main>
  );
}

export const questionClass =
  "text-[length:clamp(2.4rem,7vw,5.5rem)] font-light leading-[0.98] tracking-[-0.035em] text-forest";

export const inputClass =
  "mt-8 w-full border-b-2 border-forest bg-transparent pb-3 text-[length:clamp(1.4rem,3.4vw,2.4rem)] font-light tracking-tight text-forest placeholder:text-forest/35 focus:outline-none focus:border-azure";

export const primaryButton =
  "rounded-full bg-forest px-7 py-4 text-base font-medium text-paper transition hover:bg-grass disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure";

export const quietButton =
  "font-mono text-[11px] uppercase tracking-[0.14em] text-grass underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-azure";
