"use client";

import { useState } from "react";
import { Screen, inputClass, primaryButton, questionClass, quietButton } from "./Screen";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Draft stub: no email is sent. The real version signs in with a Supabase magic link.
 */
export function SignIn({ onDone, onBack }: { onDone: (email: string) => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit() {
    if (!EMAIL.test(email.trim())) {
      setError("That doesn't look like an email yet.");
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <Screen
        tone={1}
        footer={
          <>
            <button className={quietButton} onClick={() => setSent(false)}>
              Back
            </button>
            <button className={primaryButton} onClick={() => onDone(email.trim())}>
              I clicked the link
            </button>
          </>
        }
      >
        <h1 className={questionClass}>Check your email.</h1>
        <p className="mt-6 max-w-[40ch] text-lg text-forest/80">
          We sent a link to <span className="font-medium">{email.trim()}</span>. Tap it and you're in. No
          password to remember.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-grass">
          Draft: no email is really sent yet
        </p>
      </Screen>
    );
  }

  return (
    <Screen
      tone={0}
      footer={
        <>
          <button className={quietButton} onClick={onBack}>
            Back
          </button>
          <button className={primaryButton} onClick={submit}>
            Send me a link
          </button>
        </>
      }
    >
      <h1 className={questionClass}>What's your email?</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoFocus
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="you@example.com"
          className={inputClass}
        />
        {error ? (
          <p role="alert" className="mt-3 text-sm text-forest">
            {error}
          </p>
        ) : (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-grass">
            We'll send a magic link. No password.
          </p>
        )}
      </form>
    </Screen>
  );
}
