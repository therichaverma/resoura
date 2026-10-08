"use client";

import { useState } from "react";
import { LEVEL_LABEL, type Level } from "@/lib/types";
import { Screen, inputClass, primaryButton, questionClass, quietButton } from "./Screen";

export interface Answers {
  topic: string;
  level: Level;
  why: string;
  sources: string[];
}

const TOTAL = 4;
const WHY_CHIPS = ["For a job", "For a project", "Out of curiosity", "A career change"];

export function Onboarding({
  onDone,
  onExit,
}: {
  onDone: (a: Answers) => void;
  onExit: () => void;
}) {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState<Level | null>(null);
  const [why, setWhy] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  const back = () => (step === 1 ? onExit() : setStep(step - 1));

  function addSource() {
    const v = draft.trim();
    if (v && !sources.includes(v)) setSources([...sources, v]);
    setDraft("");
  }

  function finish(withSources: string[]) {
    onDone({ topic: topic.trim(), level: level ?? "starting", why: why.trim(), sources: withSources });
  }

  function next() {
    if (step === 1 && topic.trim()) setStep(2);
    else if (step === 3) setStep(4);
  }

  const backBtn = (
    <button className={quietButton} onClick={back}>
      Back
    </button>
  );

  if (step === 1) {
    return (
      <Screen step={1} total={TOTAL} tone={0} footer={<>{backBtn}<button className={primaryButton} disabled={!topic.trim()} onClick={next}>Continue</button></>}>
        <h1 className={questionClass}>What are you learning?</h1>
        <form onSubmit={(e) => { e.preventDefault(); next(); }}>
          <label className="sr-only" htmlFor="topic">Topic</label>
          <input
            id="topic"
            autoFocus
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Designing for AI"
            className={inputClass}
          />
        </form>
      </Screen>
    );
  }

  if (step === 2) {
    return (
      <Screen step={2} total={TOTAL} tone={1} footer={backBtn}>
        <h1 className={questionClass}>How far along are you?</h1>
        <div className="mt-8 flex flex-col items-start gap-3" role="radiogroup" aria-label="How far along are you?">
          {(Object.keys(LEVEL_LABEL) as Level[]).map((l) => (
            <button
              key={l}
              role="radio"
              aria-checked={level === l}
              onClick={() => {
                setLevel(l);
                setStep(3);
              }}
              className="rounded-full border-2 border-forest px-7 py-4 text-xl font-light tracking-tight text-forest transition hover:bg-forest hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure md:text-2xl"
            >
              {LEVEL_LABEL[l]}
            </button>
          ))}
        </div>
      </Screen>
    );
  }

  if (step === 3) {
    return (
      <Screen step={3} total={TOTAL} tone={2} footer={<>{backBtn}<button className={primaryButton} onClick={next}>Continue</button></>}>
        <h1 className={`${questionClass} text-forest`}>Why are you learning this?</h1>
        <form onSubmit={(e) => { e.preventDefault(); next(); }}>
          <label className="sr-only" htmlFor="why">Why</label>
          <input
            id="why"
            autoFocus
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            placeholder="A few words is plenty"
            className={inputClass}
          />
        </form>
        <div className="mt-6 flex flex-wrap gap-2">
          {WHY_CHIPS.map((c) => (
            <button
              key={c}
              onClick={() => setWhy(c)}
              className="rounded-full border border-forest/40 bg-paper/80 px-4 py-2 text-sm text-forest transition hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure"
            >
              {c}
            </button>
          ))}
        </div>
      </Screen>
    );
  }

  return (
    <Screen
      step={4}
      total={TOTAL}
      tone={3}
      footer={
        <>
          {backBtn}
          <div className="flex items-center gap-5">
            {sources.length === 0 && (
              <button className={quietButton} onClick={() => finish([])}>
                Skip for now
              </button>
            )}
            <button className={primaryButton} onClick={() => finish(draft.trim() ? [...sources, draft.trim()] : sources)}>
              Show my picks
            </button>
          </div>
        </>
      }
    >
      <h1 className={questionClass}>Who or where do you already trust for this?</h1>
      <form onSubmit={(e) => { e.preventDefault(); addSource(); }}>
        <label className="sr-only" htmlFor="source">Favorite source</label>
        <input
          id="source"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="A person, channel, newsletter or site. Press Enter to add"
          className={inputClass}
        />
      </form>
      {sources.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {sources.map((s) => (
            <li key={s}>
              <button
                onClick={() => setSources(sources.filter((x) => x !== s))}
                aria-label={`Remove ${s}`}
                className="flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm text-paper transition hover:bg-grass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure"
              >
                {s}
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Screen>
  );
}
