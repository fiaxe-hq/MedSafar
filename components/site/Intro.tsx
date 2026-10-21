import logo from "@/public/brand/medsafar-logo.png";
import "./intro.css";

/**
 * The home page intro: a heartbeat trace sweeps in, runs into the logo's own
 * heartbeat and writes the logo, which then flies to the header and opens
 * the page with a circle wipe.
 *
 * Plays on the first visit, on a hard refresh, or with ?intro in the URL.
 * A hard refresh is told from a normal one by the stylesheet: a hard refresh
 * downloads it in full, a normal one takes it from the cache.
 *
 * It runs as an inline script at the top of the page, so the white screen is
 * up before anything else paints, and it needs no hydration.
 */
export function Intro() {
  return <script dangerouslySetInnerHTML={{ __html: `(${intro.toString()})(${JSON.stringify(logo.src)})` }} />;
}

/** Stringified into the page, so it must not use anything from outside. */
function intro(src: string) {
  let play = false;
  try {
    if (!matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const forced = /[?&]intro\b/.test(location.search);
    const seen = localStorage.getItem("ms-intro") === "1";
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    let hard = false;
    if (nav && nav.type === "reload") {
      for (const r of performance.getEntriesByType("resource") as PerformanceResourceTiming[]) {
        if (
          r.initiatorType === "link" &&
          r.name.includes("/_next/static/") &&
          r.encodedBodySize > 0 &&
          r.transferSize > r.encodedBodySize
        )
          hard = true;
      }
    }
    play = forced || !seen || hard;
    if (play) localStorage.setItem("ms-intro", "1");
  } catch {
    return;
  }
  if (!play) return;

  history.scrollRestoration = "manual";
  scrollTo(0, 0);

  // The white screen goes up at once; the rest waits for the first frame,
  // when the viewport has its size.
  const root = document.createElement("div");
  root.className = "intro";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `<div class="intro-bg"></div>`;
  document.body.appendChild(root);

  const block = (e: Event) => e.preventDefault();
  const keys = (e: KeyboardEvent) => {
    if ([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) e.preventDefault();
  };
  addEventListener("wheel", block, { passive: false });
  addEventListener("touchmove", block, { passive: false });
  addEventListener("keydown", keys);

  const done = () => {
    root.remove();
    removeEventListener("wheel", block);
    removeEventListener("touchmove", block);
    removeEventListener("keydown", keys);
    history.scrollRestoration = "auto";
  };

  const go = () => {
    if (!innerWidth) return requestAnimationFrame(go);
    try {
      start();
    } catch {
      done();
    }
  };
  requestAnimationFrame(go);

  function start() {
    // The logo is 546 x 202. Its heartbeat runs through these points (pixel
    // centres), fitted to the image so a line of this width sits inside its
    // strokes, then on under the lettering to x = 506. The two deep strokes
    // run off the foot of the image, so their points sit below it.
    const vw = innerWidth;
    const vh = innerHeight;
    const W = Math.min(460, vw * 0.62);
    const s = W / 546;
    const H = 202 * s;
    const L = (vw - W) / 2;
    const T = (vh - H) / 2;
    const px = (x: number) => L + x * s;
    const py = (y: number) => T + y * s;
    // The line sits a touch lower left of the logo than under the lettering.
    const bl = py(122.1);
    const br = py(119.3);
    const sw = 8.5 * s;
    const points = [
      [0, 122.1], [10.5, 123], [23, 116], [27, 119], [43, 128], [53, 112.5], [61, 214.5], [73.5, 20],
      [87.5, 134.5], [102.5, 112], [120, 131], [134, 21], [146, 214.5], [155, 119.3], [506.5, 119.3],
    ];

    // Beats either side of the logo, in true ECG form: P wave, PR segment,
    // QRS, ST segment, T wave. Spaced so the logo's tall strokes keep the rhythm.
    const RR = 0.6 * W;
    const u = 0.72 * RR;
    const A = 75 * s;
    const beat = (b: number) => (R: number) =>
      ` L${R - 0.42 * u} ${b} Q${R - 0.33 * u} ${b - 0.26 * A} ${R - 0.24 * u} ${b}` +
      ` L${R - 0.07 * u} ${b} L${R - 0.04 * u} ${b + 0.12 * A} L${R} ${b - A}` +
      ` L${R + 0.045 * u} ${b + 0.3 * A} L${R + 0.085 * u} ${b} L${R + 0.2 * u} ${b}` +
      ` C${R + 0.3 * u} ${b - 0.3 * A} ${R + 0.42 * u} ${b - 0.3 * A} ${R + 0.5 * u} ${b}`;
    const before: number[] = [];
    for (let R = px(73) - RR; R + 0.5 * u > 0; R -= RR) before.unshift(R);
    const after: number[] = [];
    let next = px(133.5) + RR;
    while (next - 0.42 * u < px(506) + 12) next += RR;
    for (; next - 0.42 * u < vw; next += RR) after.push(next);
    const x0 = Math.min(-20, (before[0] ?? 0) - 0.42 * u - 10);
    let d =
      `M${x0} ${bl}` +
      before.map(beat(bl)).join("") +
      points.map((p) => ` L${px(p[0]).toFixed(1)} ${py(p[1]).toFixed(1)}`).join("") +
      after.map(beat(br)).join("");

    root.innerHTML =
      `<div class="intro-bg"></div><div class="intro-ring"></div>` +
      `<img class="intro-logo" alt="" src="${src}" style="left:${L}px;top:${T}px;width:${W}px;height:${H}px;opacity:0">` +
      `<svg class="intro-trace" viewBox="0 0 ${vw} ${vh}" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
      `<defs><clipPath id="intro-cut"><rect x="-1e5" y="-1e5" width="2e5" height="${1e5 + T + H}"/></clipPath>` +
      `<clipPath id="intro-m"><rect x="${L}" y="${T}" width="${160 * s}" height="${H}"/></clipPath>` +
      `<linearGradient id="intro-ink" gradientUnits="userSpaceOnUse" x1="0" x2="1" y1="0" y2="0">` +
      `<stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
      `<mask id="intro-reveal" maskUnits="userSpaceOnUse" x="${L}" y="${T}" width="${W}" height="${H}">` +
      `<path class="intro-ink" clip-path="url(#intro-m)" stroke="#fff" stroke-width="${22 * s}" stroke-linecap="butt"/>` +
      `<rect x="${px(160)}" y="${T}" width="${W}" height="${H}" fill="url(#intro-ink)"/></mask></defs>` +
      `<image href="${src}" x="${L}" y="${T}" width="${W}" height="${H}" preserveAspectRatio="none" mask="url(#intro-reveal)"/>` +
      `<path class="intro-line" clip-path="url(#intro-cut)" stroke-width="${sw}"/>` +
      `<circle class="intro-dot" r="${Math.max(3, 5 * s)}" cx="-99" cy="-99"/></svg>`;

    const bg = root.querySelector(".intro-bg") as HTMLElement;
    const ring = root.querySelector(".intro-ring") as HTMLElement;
    const img = root.querySelector("img") as HTMLImageElement;
    const drawn = root.querySelector("image") as SVGImageElement;
    const line = root.querySelector(".intro-line") as SVGPathElement;
    const ink = root.querySelector(".intro-ink") as SVGPathElement;
    const dot = root.querySelector("circle") as SVGCircleElement;
    const fade = root.querySelector("linearGradient") as SVGLinearGradientElement;

    // The line has a fixed length: it reaches a little past the logo. Until
    // then it seems to run on from the left edge; after, it lets go and the
    // whole line slides off to the right. The path runs on far enough for that.
    line.setAttribute("d", d);
    const reach = px(506) + Math.max(90, 0.08 * vw);
    let S = 0;
    while (line.getPointAtLength(S).x < reach) S += 4;
    d += ` L${vw + u + S + 100} ${br}`;
    line.setAttribute("d", d);
    ink.setAttribute("d", d);
    const total = line.getTotalLength();

    const tween = (ms: number, fn: (p: number) => void) =>
      new Promise<void>((resolve) => {
        let begin = 0;
        const tick = (now: number) => {
          if (!begin) begin = now;
          const p = Math.min(1, (now - begin) / ms);
          fn(p);
          if (p < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
    const wait = (ms: number) => tween(ms, () => {});
    const smooth = (p: number) => p * p * (3 - 2 * p);

    // The sweep: head and tail move along the path, at about 110 beats a
    // minute until the line lets go, then gathering speed as it leaves.
    let clear = () => {};
    const logoClear = new Promise<void>((r) => (clear = r));
    const sweep = () =>
      new Promise<void>((resolve) => {
        const v0 = S / 2;
        let head = 0;
        let hx = -Infinity;
        let last = 0;
        let freed = 0;
        let cleared = false;
        const tick = (now: number) => {
          const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
          last = now;
          const boost = freed ? 1 + 1.3 * smooth(Math.min(1, (now - freed) / 900)) : 1;
          head += v0 * boost * dt;
          if (!freed && head >= S) freed = now;
          const tail = Math.max(0, head - S);
          line.style.strokeDasharray = `${head - tail} ${total * 2}`;
          line.style.strokeDashoffset = `${-tail}`;
          ink.style.strokeDasharray = `${head} ${total * 2}`;
          const p = line.getPointAtLength(head);
          hx = Math.max(hx, p.x);
          dot.setAttribute("cx", `${p.x}`);
          dot.setAttribute("cy", `${p.y}`);
          fade.setAttribute("x1", `${hx - 50}`);
          fade.setAttribute("x2", `${hx - 6}`);
          const tx = tail > 0 ? line.getPointAtLength(tail).x : -Infinity;
          if (!cleared && tx > L + W) {
            cleared = true;
            clear();
          }
          if (tx > vw + sw) resolve();
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    line.style.strokeDasharray = `0 ${total * 2}`;
    ink.style.strokeDasharray = `0 ${total * 2}`;

    const run = async () => {
      await Promise.all([img.decode().catch(() => {}), wait(200)]);
      const swept = sweep();
      await logoClear;
      await wait(120);

      if (document.readyState === "loading") {
        await new Promise((r) => document.addEventListener("DOMContentLoaded", r, { once: true }));
      }
      const target = document.querySelector("header [data-logo] img")?.getBoundingClientRect();
      if (!target || !target.width) {
        await root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" }).finished;
        return;
      }

      // The drawn logo hands over to an identical image, which flies to the
      // header logo and settles with a small pop.
      img.style.opacity = "1";
      drawn.style.visibility = "hidden";
      const k = target.width / W;
      const dx = target.left - L;
      const dy = target.top - T;
      const at = (pop: number) =>
        `translate(${dx - ((pop - 1) * target.width) / 2}px, ${dy - ((pop - 1) * target.height) / 2}px) scale(${k * pop})`;
      await img.animate([{ transform: "none" }, { transform: at(1) }], {
        duration: 950,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        fill: "forwards",
      }).finished;
      img.animate(
        [
          { transform: at(1) },
          { transform: at(1.1), offset: 0.4 },
          { transform: at(0.985), offset: 0.75 },
          { transform: at(1) },
        ],
        { duration: 520, easing: "cubic-bezier(0.33, 1, 0.68, 1)", fill: "forwards" },
      );
      await wait(180);

      // The wave: a circle opens from the logo and the page comes in around
      // it. The page itself is clipped, and the ring only scales and fades,
      // so the browser can run both off the main thread.
      const page = document.querySelector("[data-home]") as HTMLElement | null;
      if (!page) return;
      const cx = target.left + target.width / 2;
      const cy = target.top + target.height / 2;
      const max = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy)) + 8;
      const from = target.width / 2;
      const wave = { duration: 1200, easing: "cubic-bezier(0.55, 0, 0.2, 1)", fill: "both" as const };
      const opening = page.animate(
        [{ clipPath: `circle(${from}px at ${cx}px ${cy}px)` }, { clipPath: `circle(${max}px at ${cx}px ${cy}px)` }],
        wave,
      );
      bg.style.visibility = "hidden";
      ring.style.left = `${cx}px`;
      ring.style.top = `${cy}px`;
      ring.style.width = `${2 * max}px`;
      ring.style.height = `${2 * max}px`;
      ring.animate(
        [
          { transform: `scale(${from / max})`, opacity: 0.9 },
          { transform: "scale(1)", opacity: 0 },
        ],
        wave,
      );
      await opening.finished;
      opening.cancel();
      await swept;
    };

    run().then(done, done);
  }
}
