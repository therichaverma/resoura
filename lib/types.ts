export type Level = "starting" | "weeks" | "confident";

export interface Profile {
  email: string;
  topic: string;
  level: Level;
  why: string;
  sources: string[];
}

export type PickTag = "favorites" | "ai" | "discovery";
export type PickFormat = "Guide" | "Toolkit" | "Library" | "Article" | "Video";

export interface Pick {
  id: string;
  title: string;
  url: string;
  author: string;
  sourceName: string;
  format: PickFormat;
  minutes: number;
  tag: PickTag;
  why: string;
  imageUrl?: string;
}

export type Rating = "basic" | "right" | "deep";

export interface Reaction {
  pickId: string;
  rating: Rating;
  at: string;
}

export interface DailyPicks {
  date: string;
  picks: Pick[];
}

export const LEVEL_LABEL: Record<Level, string> = {
  starting: "Just starting",
  weeks: "A few weeks in",
  confident: "Fairly confident",
};

export const TAG_LABEL: Record<PickTag, string> = {
  favorites: "From your favorites",
  ai: "AI found",
  discovery: "Discovery",
};

export const RATING_LABEL: Record<Rating, string> = {
  basic: "Too basic",
  right: "Just right",
  deep: "Too deep",
};
