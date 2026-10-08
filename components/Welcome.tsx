import { Wordmark } from "./Wordmark";
import { WelcomeArt } from "./WelcomeArt";

export function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-paper">
      <WelcomeArt className="absolute inset-x-0 bottom-0 h-[min(64dvh,max(58vw,50dvh))] w-full" />

      <div className="relative z-10 flex min-h-dvh flex-col px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-start justify-between">
          <Wordmark className="text-2xl md:text-3xl" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-grass">
            A learning companion
          </span>
        </div>

        <h1
          className="rise mt-8 max-w-[13ch] text-[length:clamp(2.75rem,6.2vw,5.5rem)] font-light leading-[0.93] tracking-[-0.04em] text-forest md:mt-12"
          style={{ "--d": "0.15s" } as React.CSSProperties}
        >
          The next right thing to learn, picked for you.
        </h1>

        <div className="rise mt-auto pt-10" style={{ "--d": "0.4s" } as React.CSSProperties}>
          <button
            onClick={onStart}
            className="rounded-full bg-leaf px-8 py-4 text-lg font-medium text-forest transition hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
          >
            Get started
          </button>
        </div>
      </div>
    </main>
  );
}
