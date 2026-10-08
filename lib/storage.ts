import type { DailyPicks, Profile, Rating, Reaction } from "./types";

const KEYS = {
  profile: "resoura:profile",
  daily: "resoura:daily",
  opened: "resoura:opened",
  reactions: "resoura:reactions",
} as const;

function read<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable: the app still works for this session
  }
}

function remove(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function today(): string {
  return new Date().toLocaleDateString("en-CA");
}

export const getProfile = () => read<Profile>(KEYS.profile);
export const setProfile = (p: Profile) => write(KEYS.profile, p);

export function getDaily(): DailyPicks | null {
  const d = read<DailyPicks>(KEYS.daily);
  return d && d.date === today() ? d : null;
}
export const setDaily = (d: DailyPicks) => write(KEYS.daily, d);

export const getOpened = () => read<string>(KEYS.opened);
export const setOpened = (pickId: string) => write(KEYS.opened, pickId);
export const clearOpened = () => remove(KEYS.opened);

export const getReactions = () => read<Reaction[]>(KEYS.reactions) ?? [];

export function addReaction(pickId: string, rating: Rating): Reaction[] {
  const next = [
    ...getReactions().filter((r) => r.pickId !== pickId),
    { pickId, rating, at: new Date().toISOString() },
  ];
  write(KEYS.reactions, next);
  return next;
}

export function resetAll() {
  Object.values(KEYS).forEach(remove);
}
