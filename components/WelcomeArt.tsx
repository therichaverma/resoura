/** Placeholder welcome painting. Swap this component for a real artwork later. */
export function WelcomeArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 680 480"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <rect width="680" height="480" fill="#faf9f6" />
      <circle cx="440" cy="178" r="92" fill="#ecf39e" />
      <circle cx="440" cy="178" r="34" fill="#3e6fd8" />
      <ellipse cx="150" cy="140" rx="72" ry="14" fill="#ecf39e" opacity="0.7" />
      <ellipse cx="290" cy="176" rx="52" ry="10" fill="#ecf39e" opacity="0.7" />
      <ellipse cx="610" cy="130" rx="48" ry="9" fill="#ecf39e" opacity="0.7" />
      <path d="M0 250 C120 196 240 228 340 212 S560 186 680 238 L680 480 L0 480 Z" fill="#90a955" />
      <path d="M0 318 C140 268 260 308 380 288 S600 256 680 298 L680 480 L0 480 Z" fill="#4f772d" />
      <path d="M170 322 L170 214" stroke="#31572c" strokeWidth="7" strokeLinecap="round" fill="none" />
      <ellipse cx="170" cy="198" rx="52" ry="38" fill="#31572c" />
      <ellipse cx="146" cy="210" rx="30" ry="22" fill="#4f772d" />
      <ellipse cx="196" cy="206" rx="28" ry="20" fill="#90a955" />
      <ellipse cx="172" cy="184" rx="22" ry="14" fill="#ecf39e" />
      <path d="M520 304 L520 216" stroke="#31572c" strokeWidth="6" strokeLinecap="round" fill="none" />
      <ellipse cx="520" cy="204" rx="38" ry="28" fill="#31572c" />
      <ellipse cx="506" cy="212" rx="22" ry="16" fill="#4f772d" />
      <ellipse cx="530" cy="196" rx="16" ry="11" fill="#ecf39e" />
      <path d="M616 308 L616 238" stroke="#31572c" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="616" cy="228" rx="30" ry="22" fill="#31572c" />
      <ellipse cx="606" cy="234" rx="16" ry="12" fill="#4f772d" />
      <ellipse cx="622" cy="222" rx="12" ry="8" fill="#ecf39e" />
      <path d="M0 402 C150 362 300 402 440 382 S620 352 680 382 L680 480 L0 480 Z" fill="#31572c" />
      <path
        d="M330 290 C352 320 298 350 338 380 C378 410 296 440 316 480 L424 480 C404 440 474 410 424 380 C384 350 432 320 382 290 Z"
        fill="#3e6fd8"
        opacity="0.9"
      />
      <path d="M345 330 C360 345 335 360 352 378" stroke="#faf9f6" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M372 400 C388 412 362 430 380 450" stroke="#faf9f6" strokeWidth="2" fill="none" opacity="0.6" />
      <rect x="236" y="424" width="52" height="13" rx="2" fill="#ecf39e" transform="rotate(-8 262 430)" />
      <rect x="246" y="410" width="42" height="12" rx="2" fill="#faf9f6" transform="rotate(5 267 416)" />
      <rect x="452" y="432" width="48" height="12" rx="2" fill="#90a955" transform="rotate(7 476 438)" />
      <rect x="460" y="419" width="38" height="11" rx="2" fill="#ecf39e" transform="rotate(-4 479 424)" />
      <path d="M60 480 Q54 446 70 430" stroke="#90a955" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M76 480 Q74 450 90 438" stroke="#ecf39e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M590 480 Q584 450 600 436" stroke="#90a955" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M608 480 Q608 452 624 442" stroke="#ecf39e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="120" cy="430" r="2.5" fill="#ecf39e" />
      <circle cx="170" cy="450" r="2" fill="#90a955" />
      <circle cx="210" cy="425" r="2.5" fill="#ecf39e" />
      <circle cx="520" cy="410" r="2" fill="#ecf39e" />
      <circle cx="560" cy="440" r="2.5" fill="#90a955" />
      <circle cx="640" cy="420" r="2" fill="#ecf39e" />
    </svg>
  );
}
