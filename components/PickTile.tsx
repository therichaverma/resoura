import type { Pick, Rating } from "@/lib/types";
import { RATING_LABEL, TAG_LABEL } from "@/lib/types";
import { GeneratedArt } from "./GeneratedArt";

const chip =
  "whitespace-nowrap rounded-full bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-forest md:text-[11px] md:tracking-[0.12em]";

export function PickTile({
  pick,
  index,
  total,
  lead,
  rating,
  onOpen,
}: {
  pick: Pick;
  index: number;
  total: number;
  lead: boolean;
  rating?: Rating;
  onOpen: (pick: Pick) => void;
}) {
  return (
    <button
      onClick={() => onOpen(pick)}
      className={`group relative isolate flex h-full min-h-[26rem] w-full overflow-hidden rounded-[1.75rem] text-left text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure ${
        lead ? "lg:min-h-0" : "lg:min-h-0"
      }`}
      aria-label={`${pick.title}, opens in a new tab`}
    >
      {pick.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={pick.imageUrl} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      ) : (
        <GeneratedArt
          seed={pick.title}
          className="absolute inset-0 -z-20 h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/95 via-forest/65 to-forest/5" />

      <div className="flex w-full flex-col justify-between p-5 md:p-7">
        <div className="flex items-start justify-between gap-2">
          <span className={chip}>{TAG_LABEL[pick.tag]}</span>
          <div className="flex items-center gap-2">
            {rating && <span className={`${chip} bg-leaf`}>{RATING_LABEL[rating]}</span>}
            <span className={chip}>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div>
          <h2
            className={`font-medium leading-[0.95] tracking-[-0.035em] ${
              lead ? "text-[length:clamp(2.2rem,4.4vw,4.4rem)]" : "text-[length:clamp(1.75rem,2.6vw,2.6rem)]"
            }`}
          >
            {pick.title}
          </h2>
          <p className={`mt-4 max-w-[46ch] font-light leading-snug text-paper/90 ${lead ? "text-lg md:text-xl" : "text-base"}`}>
            {pick.why}
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/80">
            <span>{pick.format}</span>
            <span aria-hidden="true">·</span>
            <span>{pick.minutes} min</span>
            <span aria-hidden="true">·</span>
            <span className="normal-case tracking-normal">{pick.author}</span>
          </p>
        </div>
      </div>
    </button>
  );
}
