"use client";

import { useState, type CSSProperties } from "react";
import { Wordmark } from "./Wordmark";

const INK = "#31572c";
const LEAF = "#ecf39e";
const MOSS = "#90a955";
const PAPER = "#faf9f6";
const AZURE = "#3e6fd8";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const stroke = {
  fill: "none",
  stroke: INK,
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  pathLength: 1,
  className: "draw",
} as const;

function MagnifierDoodle() {
  return (
    <svg viewBox="40 30 190 210" className="w-full h-auto" aria-hidden="true">
      <circle className="fillin" style={d(3)} cx="125" cy="115" r="42" fill={LEAF} />
      <ellipse className="fillin" style={d(3.2)} cx="111" cy="108" rx="13" ry="6" transform="rotate(-30 111 108)" fill={MOSS} />
      <ellipse className="fillin" style={d(3.2)} cx="139" cy="100" rx="13" ry="6" transform="rotate(30 139 100)" fill={MOSS} />
      <circle {...stroke} style={d(0.1)} cx="125" cy="115" r="42" />
      <path {...stroke} style={d(0.9)} d="M155 146 L188 182" stroke={AZURE} strokeWidth={9} />
      <path {...stroke} style={d(1.5)} d="M125 140 L125 106" />
      <ellipse {...stroke} style={d(1.9)} cx="111" cy="108" rx="13" ry="6" transform="rotate(-30 111 108)" strokeWidth={2} />
      <ellipse {...stroke} style={d(2.2)} cx="139" cy="100" rx="13" ry="6" transform="rotate(30 139 100)" strokeWidth={2} />
      <path {...stroke} style={d(2.6)} d="M178 62 L178 76 M171 69 L185 69" strokeWidth={2.5} />
      <path {...stroke} style={d(2.8)} d="M70 74 L70 84 M65 79 L75 79" strokeWidth={2.5} />
    </svg>
  );
}

function BookStackDoodle() {
  return (
    <svg viewBox="245 30 190 210" className="w-full h-auto" aria-hidden="true">
      <rect className="fillin" style={d(3)} x="290" y="178" width="100" height="26" rx="5" fill={MOSS} />
      <rect className="fillin" style={d(3.1)} x="300" y="150" width="84" height="26" rx="5" fill={LEAF} />
      <rect className="fillin" style={d(3.2)} x="296" y="122" width="92" height="26" rx="5" fill={PAPER} />
      <circle className="fillin" style={d(3.4)} cx="340" cy="86" r="8" fill={AZURE} />
      <circle className="fillin" style={d(2.4)} cx="330" cy="161" r="2.5" fill={INK} />
      <circle className="fillin" style={d(2.4)} cx="352" cy="161" r="2.5" fill={INK} />
      <rect {...stroke} style={d(0.1)} x="290" y="178" width="100" height="26" rx="5" />
      <rect {...stroke} style={d(0.7)} x="300" y="150" width="84" height="26" rx="5" />
      <rect {...stroke} style={d(1.3)} x="296" y="122" width="92" height="26" rx="5" />
      <path {...stroke} style={d(2)} d="M333 168 Q341 174 349 168" strokeWidth={2.5} />
      <path {...stroke} style={d(2.7)} d="M340 70 L340 62 M326 78 L320 72 M354 78 L360 72" strokeWidth={2.5} />
    </svg>
  );
}

function WalkingBookDoodle() {
  return (
    <svg viewBox="450 30 190 210" className="w-full h-auto" aria-hidden="true">
      <rect className="fillin" style={d(3)} x="505" y="100" width="80" height="68" rx="7" fill={LEAF} />
      <circle className="fillin" style={d(3.2)} cx="545" cy="64" r="7" fill={AZURE} />
      <circle className="fillin" style={d(2.6)} cx="541" cy="127" r="3" fill={INK} />
      <circle className="fillin" style={d(2.6)} cx="565" cy="127" r="3" fill={INK} />
      <rect {...stroke} style={d(0.1)} x="505" y="100" width="80" height="68" rx="7" />
      <path {...stroke} style={d(0.9)} d="M517 100 L517 168" />
      <path {...stroke} style={d(1.3)} d="M543 142 Q553 151 563 142" strokeWidth={2.5} />
      <path {...stroke} style={d(1.6)} d="M526 168 L520 198 L510 198" />
      <path {...stroke} style={d(2)} d="M564 168 L572 192 L582 192" />
      <path {...stroke} style={d(2.3)} d="M505 125 L488 138" />
      <path {...stroke} style={d(2.5)} d="M585 125 L603 112" />
    </svg>
  );
}

const DOODLES = [
  { Art: MagnifierDoodle, line: "Finding three good ones for you…" },
  { Art: BookStackDoodle, line: "Stacking up the good stuff…" },
  { Art: WalkingBookDoodle, line: "Out for a walk to find something worth your time…" },
];

export function Loader() {
  const [index] = useState(() => Math.floor(Math.random() * DOODLES.length));
  const { Art, line } = DOODLES[index];

  return (
    <main
      className="min-h-dvh flex flex-col px-6 py-6 md:px-12 md:py-8"
      aria-busy="true"
      aria-live="polite"
    >
      <Wordmark className="text-2xl" />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
        <div className="w-56 md:w-72">
          <Art />
        </div>
        <p className="rise text-3xl md:text-5xl font-light tracking-tight leading-[1.05] max-w-[18ch] md:max-w-[22ch]" style={d(0.3)}>
          {line}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-grass">
          This can take a few seconds
        </p>
      </div>
    </main>
  );
}
