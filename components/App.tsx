"use client";

import { useCallback, useEffect, useState } from "react";
import type { Pick, Profile } from "@/lib/types";
import { getDaily, getProfile, resetAll, setDaily, setProfile, today } from "@/lib/storage";
import { getPicks } from "@/lib/picks";
import { Welcome } from "./Welcome";
import { SignIn } from "./SignIn";
import { Onboarding, type Answers } from "./Onboarding";
import { Loader } from "./Loader";
import { Home } from "./Home";

type Stage = "boot" | "welcome" | "signin" | "onboarding" | "loading" | "home";

const MIN_LOADING_MS = 4200;

export function App() {
  const [stage, setStage] = useState<Stage>("boot");
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [picks, setPicks] = useState<Pick[]>([]);

  // Decide where a returning visitor lands.
  useEffect(() => {
    const p = getProfile();
    if (!p) return setStage("welcome");
    setProfileState(p);
    if (!p.topic) return setStage("onboarding");
    const daily = getDaily();
    if (daily) {
      setPicks(daily.picks);
      setStage("home");
    } else {
      setStage("loading");
    }
  }, []);

  // Generate the day's picks once, then cache them.
  useEffect(() => {
    if (stage !== "loading" || !profile) return;
    let cancelled = false;
    (async () => {
      const [result] = await Promise.all([
        getPicks(profile),
        new Promise((r) => setTimeout(r, MIN_LOADING_MS)),
      ]);
      if (cancelled) return;
      setDaily({ date: today(), picks: result });
      setPicks(result);
      setStage("home");
    })();
    return () => {
      cancelled = true;
    };
  }, [stage, profile]);

  const signedIn = useCallback((email: string) => {
    const p: Profile = { email, topic: "", level: "starting", why: "", sources: [] };
    setProfile(p);
    setProfileState(p);
    setStage("onboarding");
  }, []);

  const onboarded = useCallback(
    (a: Answers) => {
      if (!profile) return;
      const p: Profile = { ...profile, ...a };
      setProfile(p);
      setProfileState(p);
      setStage("loading");
    },
    [profile],
  );

  const startOver = useCallback(() => {
    resetAll();
    setProfileState(null);
    setPicks([]);
    setStage("welcome");
  }, []);

  if (stage === "boot") return <div className="min-h-dvh bg-paper" />;
  if (stage === "welcome") return <Welcome onStart={() => setStage("signin")} />;
  if (stage === "signin") return <SignIn onDone={signedIn} onBack={() => setStage("welcome")} />;
  if (stage === "onboarding") return <Onboarding onDone={onboarded} onExit={startOver} />;
  if (stage === "loading") return <Loader />;
  if (stage === "home" && profile) return <Home profile={profile} picks={picks} onReset={startOver} />;
  return null;
}
