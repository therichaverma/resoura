"use client";

import { useEffect, useState } from "react";
import type { Pick, Profile, Rating, Reaction } from "@/lib/types";
import { addReaction, clearOpened, getOpened, getReactions, setOpened } from "@/lib/storage";
import { Wordmark } from "./Wordmark";
import { PickTile } from "./PickTile";
import { RatingCard } from "./RatingCard";

export function Home({
  profile,
  picks,
  onReset,
}: {
  profile: Profile;
  picks: Pick[];
  onReset: () => void;
}) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [askFor, setAskFor] = useState<Pick | null>(null);

  useEffect(() => {
    setReactions(getReactions());
  }, []);

  // Ask for a rating when the user comes back to this tab after opening a pick.
  useEffect(() => {
    function check() {
      if (document.visibilityState !== "visible") return;
      const id = getOpened();
      if (!id) return;
      const pick = picks.find((p) => p.id === id);
      if (pick) setAskFor(pick);
      else clearOpened();
    }
    check();
    document.addEventListener("visibilitychange", check);
    return () => document.removeEventListener("visibilitychange", check);
  }, [picks]);

  function open(pick: Pick) {
    setOpened(pick.id);
    window.open(pick.url, "_blank", "noopener,noreferrer");
  }

  function rate(rating: Rating) {
    if (!askFor) return;
    setReactions(addReaction(askFor.id, rating));
    clearOpened();
    setAskFor(null);
  }

  const date = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <main className="min-h-dvh bg-paper px-6 py-6 md:px-12 md:py-8">
      <header className="flex items-center justify-between gap-4">
        <Wordmark className="text-2xl" />
        <span
          title={profile.topic}
          className="max-w-[55%] truncate rounded-full border border-forest/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em]"
        >
          {profile.topic}
        </span>
      </header>

      <section className="mt-8 md:mt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-grass">{date}</p>
        <h1 className="mt-3 text-[length:clamp(2.2rem,5.4vw,4.6rem)] font-light leading-[0.98] tracking-[-0.035em]">
          Three worth your time today.
        </h1>
      </section>

      <section
        aria-label="Today's three picks"
        className="no-scrollbar -mx-6 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 md:-mx-12 md:px-12 lg:mx-0 lg:grid lg:h-[min(46rem,calc(100dvh-17rem))] lg:min-h-[34rem] lg:grid-cols-12 lg:grid-rows-2 lg:gap-4 lg:overflow-visible lg:px-0"
      >
        {picks.map((pick, i) => {
          const lead = i === 0;
          const reaction = reactions.find((r) => r.pickId === pick.id);
          return (
            <div
              key={pick.id}
              className={`h-[28rem] w-[86%] shrink-0 snap-center sm:h-[32rem] sm:w-[62%] lg:h-auto lg:w-auto ${
                lead ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"
              }`}
            >
              <PickTile
                pick={pick}
                index={i}
                total={picks.length}
                lead={lead}
                rating={reaction?.rating}
                onOpen={open}
              />
            </div>
          );
        })}
      </section>

      <footer className="mt-10 flex items-center justify-between gap-4 pb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-grass">
        <span>Draft · sample picks</span>
        <button onClick={onReset} className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-azure">
          Start over
        </button>
      </footer>

      {askFor && <RatingCard pick={askFor} onRate={rate} />}
    </main>
  );
}
