import type { Level, Pick, PickFormat, Profile } from "./types";

/**
 * Draft data layer. `getPicks` is the single function the backend replaces later
 * (favorites reading + Gemini search + link check). It returns the same shape.
 */

interface Sample {
  id: string;
  title: string;
  url: string;
  author: string;
  sourceName: string;
  format: PickFormat;
  minutes: number;
  keywords: string[];
  why: Record<Level, string>;
}

const SAMPLES: Record<string, Sample> = {
  pair: {
    id: "pair-guidebook",
    title: "People + AI Guidebook",
    url: "https://pair.withgoogle.com/guidebook/",
    author: "Google PAIR",
    sourceName: "pair.withgoogle.com",
    format: "Guide",
    minutes: 25,
    keywords: ["pair", "google"],
    why: {
      starting: "Plain-language chapters from people who build it, with real product examples.",
      weeks: "Turns the ideas you've met into concrete patterns you can reuse.",
      confident: "A solid reference to check your own instincts against.",
    },
  },
  hax: {
    id: "hax-toolkit",
    title: "HAX Toolkit: Guidelines for Human-AI Interaction",
    url: "https://www.microsoft.com/en-us/haxtoolkit/",
    author: "Microsoft Research",
    sourceName: "microsoft.com",
    format: "Toolkit",
    minutes: 15,
    keywords: ["microsoft", "hax"],
    why: {
      starting: "Eighteen clear guidelines, each with an example, so you learn by seeing it.",
      weeks: "A practical checklist you can hold your own designs up against.",
      confident: "Research-backed rules to pressure-test what you ship.",
    },
  },
  apple: {
    id: "apple-hig-ml",
    title: "Machine learning: Human Interface Guidelines",
    url: "https://developer.apple.com/design/human-interface-guidelines/machine-learning",
    author: "Apple",
    sourceName: "developer.apple.com",
    format: "Guide",
    minutes: 10,
    keywords: ["apple", "hig"],
    why: {
      starting: "A short, calm read on how a major platform thinks about AI in everyday UI.",
      weeks: "See how a design-led company turns the theory into rules.",
      confident: "A quick benchmark for how the big platforms handle AI behavior.",
    },
  },
  shape: {
    id: "shape-of-ai",
    title: "The Shape of AI",
    url: "https://www.shapeof.ai/",
    author: "Emily Campbell",
    sourceName: "shapeof.ai",
    format: "Library",
    minutes: 12,
    keywords: ["shape", "emily"],
    why: {
      starting: "Browse real AI interfaces by pattern. Examples first, theory later.",
      weeks: "Not what you'd search for, but a fast way to see how others solve the same problems.",
      confident: "A pattern library to spot gaps and fresh ideas in your own work.",
    },
  },
};

const BY_LEVEL: Record<Level, [string, string, string]> = {
  starting: ["apple", "pair", "shape"],
  weeks: ["pair", "hax", "shape"],
  confident: ["hax", "shape", "apple"],
};

function trim(text: string, max = 70) {
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

export async function getPicks(profile: Profile): Promise<Pick[]> {
  const favorites = profile.sources.map((s) => s.toLowerCase());
  const keys = BY_LEVEL[profile.level];

  return keys.map((key, i) => {
    const s = SAMPLES[key];
    const isFavorite = favorites.some((f) => s.keywords.some((k) => f.includes(k)));
    const tag = i === 2 ? "discovery" : isFavorite ? "favorites" : "ai";
    let why = s.why[profile.level];
    if (i === 0 && profile.why.trim()) {
      why = `${why} Fits your goal: ${trim(profile.why)}.`;
    }
    return {
      id: s.id,
      title: s.title,
      url: s.url,
      author: s.author,
      sourceName: s.sourceName,
      format: s.format,
      minutes: s.minutes,
      tag,
      why,
    } satisfies Pick;
  });
}
