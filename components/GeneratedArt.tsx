function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PALETTES = [
  { sky: "#ecf39e", hills: ["#90a955", "#4f772d", "#31572c"], sun: "#3e6fd8" },
  { sky: "#90a955", hills: ["#ecf39e", "#4f772d", "#31572c"], sun: "#faf9f6" },
  { sky: "#31572c", hills: ["#4f772d", "#90a955", "#ecf39e"], sun: "#3e6fd8" },
  { sky: "#faf9f6", hills: ["#ecf39e", "#90a955", "#4f772d"], sun: "#3e6fd8" },
];

/** Procedural green landscape, seeded by the pick's title. Used when a source has no image. */
export function GeneratedArt({ seed, className = "" }: { seed: string; className?: string }) {
  const h = hash(seed);
  const rand = rng(h);
  const p = PALETTES[h % PALETTES.length];
  const sunX = 60 + rand() * 280;
  const sunY = 70 + rand() * 110;
  const sunR = 34 + rand() * 34;
  const bases = [250, 335, 420];

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <rect width="400" height="500" fill={p.sky} />
      <circle cx={sunX} cy={sunY} r={sunR * 1.9} fill={p.sun} opacity="0.18" />
      <circle cx={sunX} cy={sunY} r={sunR} fill={p.sun} />
      {bases.map((y, i) => {
        const a = (rand() - 0.5) * 120;
        const b = (rand() - 0.5) * 120;
        const c = (rand() - 0.5) * 90;
        return (
          <path
            key={i}
            d={`M0 ${y + a * 0.3} C 110 ${y - 40 + a}, 240 ${y + 30 + b}, 400 ${y + c} L400 500 L0 500 Z`}
            fill={p.hills[i]}
          />
        );
      })}
    </svg>
  );
}
