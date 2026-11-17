import Image from "next/image";
import { HeartbeatIcon } from "@phosphor-icons/react/dist/ssr/Heartbeat";
import { HouseLineIcon } from "@phosphor-icons/react/dist/ssr/HouseLine";
import { PlayOnce } from "./PlayOnce";
import "./journey-map.css";

export type MapStep = { title: string; body: string; href: string; phase: string };

/**
 * The journey on wide screens: a heartbeat trace, like the one in the logo,
 * running across soft green hills. It passes through a point for each step;
 * each step's card stands above its point. Between two points the line beats
 * once, and the beat's tall spike falls in the gap between the two cards, so
 * the line never crosses the words. Where a small wave does reach a card, it
 * runs behind it.
 *
 * The first time the map comes into view, the line draws itself in, the
 * points and cards appearing as it reaches them; that plays once and stays.
 * Then a short glowing pulse keeps running along it. Under reduced motion it
 * is simply drawn.
 *
 * The drawing is in a box W units wide and H high. The box is stretched to
 * the page's width but never in height, so a unit of height is one pixel and
 * a unit of width very nearly one (the page is 1,150 to 1,190 px wide here).
 */
const W = 1170;
const H = 420;
const PAD = 92;
// Where each point sits, top down: a gentle rise and fall, like the hills.
const LEVELS = [300, 338, 306, 352, 322, 290];
// How far a card stands above its point (the end points carry a pin).
const STEM = 34;
const PIN = 62;

function geometry(count: number) {
  const gap = (W - 2 * PAD) / Math.max(1, count - 1);
  const pts = Array.from({ length: count }, (_, i) => ({ x: PAD + i * gap, y: LEVELS[i % LEVELS.length] }));
  // One beat, in true ECG form (P wave, QRS, T wave), centred on x at height
  // b. Narrow at its spike so that fits the gap between two cards.
  const u = Math.min(110, gap * 0.56);
  const A = 74;
  const beat = (x: number, b: number) =>
    ` L${x - 0.42 * u} ${b} Q${x - 0.33 * u} ${b - 0.24 * A} ${x - 0.24 * u} ${b}` +
    ` L${x - 0.07 * u} ${b} L${x - 0.04 * u} ${b + 0.12 * A} L${x} ${b - A}` +
    ` L${x + 0.045 * u} ${b + 0.32 * A} L${x + 0.085 * u} ${b} L${x + 0.2 * u} ${b}` +
    ` C${x + 0.29 * u} ${b - 0.28 * A} ${x + 0.4 * u} ${b - 0.28 * A} ${x + 0.48 * u} ${b}`;
  const r = (n: number) => Math.round(n * 10) / 10;
  let d = `M0 ${pts[0].y} L${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < count - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    // Ease from the point to the beat's baseline, beat, and ease on to the
    // next point, leaving each point level so the line passes through it
    // cleanly.
    const s = mx - 0.42 * u;
    const e = mx + 0.48 * u;
    d += ` C${r((a.x + s) / 2)} ${a.y} ${r((a.x + s) / 2)} ${my} ${r(s)} ${my}`;
    d += beat(mx, my).replace(/-?\d+\.\d+/g, (n) => String(r(Number(n))));
    d += ` C${r((e + b.x) / 2)} ${my} ${r((e + b.x) / 2)} ${b.y} ${b.x} ${b.y}`;
  }
  d += ` L${W} ${pts[count - 1].y}`;

  // How far along the line each point sits, as a share of its length: the
  // flat lead-in, then per gap the level distance, the climb between levels
  // and the beat's strokes (about 2.9 A up and down).
  const seg = pts.slice(1).map((b, i) => gap + 2.9 * A + Math.abs(b.y - pts[i].y));
  const total = 2 * PAD + seg.reduce((a, b) => a + b, 0);
  const along = pts.map((_, i) => (PAD + seg.slice(0, i).reduce((a, b) => a + b, 0)) / total);
  return { pts, d, along };
}

/** The draw's easing, cubic-bezier(0.45, 0.05, 0.25, 1), as in journey-map.css. */
const EASE = [0.45, 0.05, 0.25, 1] as const;

/** When (as a share of the draw's time) the line has reached `share` of its length. */
function timeAt(share: number) {
  const [x1, y1, x2, y2] = EASE;
  const bez = (t: number, a: number, b: number) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (bez(mid, y1, y2) < share) lo = mid;
    else hi = mid;
  }
  return bez((lo + hi) / 2, x1, x2);
}

export function JourneyMap({ steps, photos }: { steps: MapStep[]; photos: string[] }) {
  const count = steps.length;
  const { pts, d, along } = geometry(count);
  const pct = (x: number) => `${((x / W) * 100).toFixed(3)}%`;

  return (
    <PlayOnce className="journey-map relative isolate overflow-hidden rounded-[1.75rem] border border-hairline" style={{ height: H }}>
      {/* The hills: two soft layers of green behind everything. */}
      <svg
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 -z-10 size-full rtl:-scale-x-100"
      >
        <defs>
          <linearGradient id="jm-sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--accent-soft)" stopOpacity="0.15" />
            <stop offset="1" stopColor="var(--accent-soft)" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#jm-sky)" />
        <path
          d={`M0 210 C 150 150, 260 140, 390 190 S 640 250, 780 180 S 1030 120, ${W} 170 L ${W} ${H} L 0 ${H} Z`}
          className="fill-accent/[0.06]"
        />
        <path
          d={`M0 300 C 170 250, 330 260, 470 300 S 760 360, 900 300 S 1100 250, ${W} 280 L ${W} ${H} L 0 ${H} Z`}
          className="fill-accent/[0.05]"
        />
      </svg>

      {/* The trace: a faint full line, the drawn line over it, and the pulse. */}
      <svg
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible rtl:-scale-x-100"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} className="stroke-accent/12" strokeWidth={2} />
        <path d={d} pathLength={1} className="jm-line stroke-brand" strokeWidth={2.75} />
        <path d={d} pathLength={1} className="jm-pulse stroke-glow" strokeWidth={4} />
      </svg>

      {steps.map((step, n) => {
        const p = pts[n];
        const end = n === 0 || n === count - 1;
        // --t: when the line reaches this point, as a share of the draw.
        const at = { "--x": pct(p.x), "--t": timeAt(along[n]).toFixed(3) } as React.CSSProperties;
        return (
          <div key={step.title}>
            {/* The point on the line: a pin at either end, a ring between. */}
            {end ? (
              <span
                aria-hidden
                className="jm-stop absolute start-(--x) z-10 -translate-x-1/2 rtl:translate-x-1/2"
                style={{ ...at, top: p.y - 52 }}
              >
                <span className="grid size-11 place-items-center rounded-[50%_50%_50%_0] bg-accent text-accent-ink shadow-[0_6px_16px_-6px_rgb(12_126_99/0.6)] [rotate:-45deg]">
                  <span className="[rotate:45deg]">
                    {n === 0 ? <HeartbeatIcon size={20} weight="bold" /> : <HouseLineIcon size={20} weight="bold" />}
                  </span>
                </span>
              </span>
            ) : (
              <span
                aria-hidden
                className="jm-stop absolute start-(--x) z-10 size-4 -translate-1/2 rounded-full border-[3px] border-accent bg-surface shadow-[0_0_0_5px_rgb(255_255_255/0.85)] rtl:translate-x-1/2"
                style={{ ...at, top: p.y }}
              />
            )}
            {/* A short stem from the point up to the card. */}
            {end ? null : (
              <span
                aria-hidden
                className="jm-stop absolute start-(--x) w-px -translate-x-1/2 bg-accent/30 rtl:translate-x-1/2"
                style={{ ...at, top: p.y - STEM, height: STEM - 8 }}
              />
            )}

            {/* The card, standing on its point. Above the line, so the line
                runs behind it. */}
            <a
              href={step.href}
              className="jm-card group absolute start-(--x) z-20 w-[14.5%] -translate-x-1/2 rounded-2xl border border-hairline bg-surface/95 px-4 pt-9 pb-4 text-center shadow-card backdrop-blur-sm transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-line hover:shadow-lift rtl:translate-x-1/2"
              style={{ ...at, bottom: H - p.y + (end ? PIN : STEM) }}
            >
              <span className="absolute start-1/2 top-0 size-14 -translate-1/2 overflow-hidden rounded-full bg-surface-2 ring-4 ring-surface rtl:translate-x-1/2">
                <Image
                  src={photos[n]}
                  alt={step.title}
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.08]"
                />
              </span>
              <span className="block text-[0.65625rem] font-semibold tracking-[0.06em] whitespace-nowrap text-accent uppercase">
                {String(n + 1).padStart(2, "0")} · {step.phase}
              </span>
              <span className="mt-1.5 block text-[0.9375rem] leading-snug font-medium tracking-[-0.01em] text-balance transition-colors group-hover:text-accent">
                {step.title}
              </span>
              <span className="mt-1 block text-[0.8125rem] leading-snug text-pretty text-ink-3">{step.body}</span>
            </a>
          </div>
        );
      })}
    </PlayOnce>
  );
}
