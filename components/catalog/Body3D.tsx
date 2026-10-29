"use client";

import { useEffect, useRef } from "react";
import type * as T from "three";

export type Sex = "male" | "female";

type Props = {
  sex: Sex;
  hover: string | null;
  picked: string | null;
  /** Bumped by the "turn around" button: each change turns the body half a circle. */
  turn: number;
  onHover: (area: string | null) => void;
  onPick: (area: string) => void;
  onDragging: (on: boolean) => void;
};

/**
 * A simple body in 3D, made of separate pieces, that turns all the way round
 * when dragged. Each piece that leads to treatments is tagged with its body
 * area; tapping it picks that area. three.js loads only when this mounts.
 */
export function Body3D({ sex, hover, picked, turn, onHover, onPick, onDragging }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const state = useRef({ hover, picked, sex, turn });
  // Callbacks change every render; keep the latest without restarting the scene.
  const cb = useRef({ onHover, onPick, onDragging });
  useEffect(() => {
    state.current.hover = hover;
    state.current.picked = picked;
    cb.current = { onHover, onPick, onDragging };
  });

  const api = useRef<{ build: (sex: Sex) => void; turn: () => void } | null>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed || !box.current) return;
      cleanup = start(THREE, box.current, state, cb, api);
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (state.current.sex !== sex) {
      state.current.sex = sex;
      api.current?.build(sex);
    }
  }, [sex]);

  useEffect(() => {
    if (state.current.turn !== turn) {
      state.current.turn = turn;
      api.current?.turn();
    }
  }, [turn]);

  return <div ref={box} className="absolute inset-0" />;
}

/* ------------------------------------------------------------------ */

type Three = typeof T;

function css(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#888888";
}

function start(
  THREE: Three,
  el: HTMLDivElement,
  state: React.RefObject<{ hover: string | null; picked: string | null; sex: Sex; turn: number }>,
  cb: React.RefObject<Pick<Props, "onHover" | "onPick" | "onDragging">>,
  api: React.RefObject<{ build: (sex: Sex) => void; turn: () => void } | null>,
) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  el.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.touchAction = "pan-y";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 20);
  camera.position.set(0, 0.95, 4.1);
  camera.lookAt(0, 0.9, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfe9e1, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(2, 3, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xbff5e4, 1.1);
  rim.position.set(-2.5, 1.5, -3);
  scene.add(rim);

  const colors = {
    inert: new THREE.Color(css("--hairline")).lerp(new THREE.Color("#ffffff"), 0.15),
    live: new THREE.Color(css("--line")),
    hover: new THREE.Color(css("--brand")),
    picked: new THREE.Color(css("--accent")),
    hair: new THREE.Color(css("--ink")).lerp(new THREE.Color("#ffffff"), 0.55),
  };

  const body = new THREE.Group();
  scene.add(body);
  let meshes: T.Mesh[] = [];

  const build = (sex: Sex) => {
    for (const m of meshes) {
      m.geometry.dispose();
      (m.material as T.Material).dispose();
    }
    body.clear();
    meshes = makeBody(THREE, sex);
    for (const m of meshes) {
      const area = m.userData.area as string | null;
      (m.material as T.MeshStandardMaterial).color.copy(
        m.userData.hair && !area ? colors.hair : area ? colors.live : colors.inert,
      );
      body.add(m);
    }
  };
  build(state.current.sex);

  // Turning: drag spins round the vertical axis and tilts a little; a flick
  // keeps spinning and slows down. Until the first touch it turns slowly.
  let rotY = 0.35;
  let rotX = 0.05;
  let velY = 0;
  let target: number | null = null;
  let idle = !reduce;
  let drag: { x: number; y: number; ry: number; rx: number; moved: boolean; lastX: number; lastT: number } | null = null;

  const turn = () => {
    idle = false;
    velY = 0;
    target = (target ?? rotY) + Math.PI;
  };
  api.current = { build, turn };

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const areaAt = (e: PointerEvent): string | null => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(meshes, false)[0];
    return (hit?.object.userData.area as string | null) ?? null;
  };

  const canvas = renderer.domElement;
  const down = (e: PointerEvent) => {
    // Stops a drag from selecting the text around the canvas.
    e.preventDefault();
    drag = { x: e.clientX, y: e.clientY, ry: rotY, rx: rotX, moved: false, lastX: e.clientX, lastT: performance.now() };
    idle = false;
    target = null;
    velY = 0;
  };
  const move = (e: PointerEvent) => {
    if (drag) {
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) > 6) {
        drag.moved = true;
        canvas.setPointerCapture(e.pointerId);
        cb.current.onDragging(true);
        cb.current.onHover(null);
        canvas.style.cursor = "grabbing";
      }
      if (drag.moved) {
        rotY = drag.ry + dx * 0.012;
        rotX = Math.max(-0.35, Math.min(0.35, drag.rx + dy * 0.004));
        const now = performance.now();
        const dt = Math.max(1, now - drag.lastT);
        velY = ((e.clientX - drag.lastX) * 0.012) / (dt / 16.7);
        drag.lastX = e.clientX;
        drag.lastT = now;
        return;
      }
    }
    if (e.pointerType === "mouse") {
      const a = areaAt(e);
      if (a !== state.current.hover) cb.current.onHover(a);
      canvas.style.cursor = a ? "pointer" : "grab";
    }
  };
  const up = (e: PointerEvent) => {
    if (drag && !drag.moved) {
      const a = areaAt(e);
      if (a) cb.current.onPick(a);
    }
    if (drag?.moved) cb.current.onDragging(false);
    drag = null;
    canvas.style.cursor = "grab";
  };
  const leave = () => {
    if (!drag) cb.current.onHover(null);
  };
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("pointerleave", leave);
  canvas.style.cursor = "grab";

  const resize = () => {
    const w = el.clientWidth;
    const h = el.clientHeight;
    renderer.setSize(w, h, false);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    camera.aspect = w / h;
    // Keep the whole body in view on narrow screens.
    camera.position.z = w / h < 0.6 ? 4.6 : 4.1;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();

  // Draw only while the canvas is on screen and the tab is open; otherwise the
  // loop keeps a phone's processor busy for nothing.
  let frame = 0;
  let onScreen = true;
  const running = () => onScreen && !document.hidden;
  const wake = () => {
    if (running() && !frame) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  };
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    wake();
  });
  io.observe(el);
  document.addEventListener("visibilitychange", wake);

  let last = performance.now();
  const tick = (now: number) => {
    if (!running()) {
      frame = 0;
      return;
    }
    const dt = Math.min(50, now - last) / 16.7;
    last = now;

    if (!drag) {
      if (target !== null) {
        rotY += (target - rotY) * 0.12 * dt;
        if (Math.abs(target - rotY) < 0.001) target = null;
      } else if (Math.abs(velY) > 0.0005) {
        rotY += velY * dt;
        velY *= Math.pow(0.94, dt);
      } else if (idle) {
        rotY += 0.004 * dt;
      }
      rotX += (0.05 - rotX) * 0.05 * dt;
    }
    body.rotation.y = rotY;
    body.rotation.x = rotX;

    const { hover, picked } = state.current;
    for (const m of meshes) {
      const area = m.userData.area as string | null;
      if (!area) continue;
      const to = area === picked ? colors.picked : area === hover ? colors.hover : colors.live;
      (m.material as T.MeshStandardMaterial).color.lerp(to, 0.2 * dt);
    }

    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", wake);
    canvas.removeEventListener("pointerdown", down);
    canvas.removeEventListener("pointermove", move);
    canvas.removeEventListener("pointerup", up);
    canvas.removeEventListener("pointercancel", up);
    canvas.removeEventListener("pointerleave", leave);
    for (const m of meshes) {
      m.geometry.dispose();
      (m.material as T.Material).dispose();
    }
    renderer.dispose();
    // Browsers allow only a few WebGL contexts at once; free this one now
    // rather than when the garbage collector gets round to it.
    renderer.forceContextLoss();
    canvas.remove();
    api.current = null;
  };
}

/* ------------------------------------------------------------------ */
/* The pieces                                                          */
/* ------------------------------------------------------------------ */

/** Front is +z. Feet at y = 0, top of the head near y = 1.75. */
function makeBody(THREE: Three, sex: Sex): T.Mesh[] {
  const male = sex === "male";
  const sw = male ? 0.205 : 0.175; // shoulders
  const w = male ? 0.135 : 0.11; // waist
  const hw = male ? 0.15 : 0.18; // hips
  const depth = 0.58; // torso depth against its width
  const out: T.Mesh[] = [];

  const mat = () => new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.05, side: THREE.DoubleSide });
  const add = (geo: T.BufferGeometry, area: string | null, opts: { pos?: number[]; scale?: number[]; rot?: number[]; hair?: boolean } = {}) => {
    const m = new THREE.Mesh(geo, mat());
    if (opts.pos) m.position.set(opts.pos[0], opts.pos[1], opts.pos[2]);
    if (opts.scale) m.scale.set(opts.scale[0], opts.scale[1], opts.scale[2]);
    if (opts.rot) m.rotation.set(opts.rot[0], opts.rot[1], opts.rot[2]);
    m.userData = { area, hair: opts.hair };
    out.push(m);
    return m;
  };
  /** Both sides: the given x and its mirror. */
  const pair = (fn: (side: 1 | -1) => void) => {
    fn(1);
    fn(-1);
  };

  // Head, in pieces: brain on top at the front, face below it, scalp behind.
  const hr = 0.105;
  const hy = 1.62;
  const gap = 0.006;
  const piece = (phiStart: number, phiLen: number, thStart: number, thLen: number) =>
    new THREE.SphereGeometry(hr, 40, 24, phiStart, phiLen, thStart, thLen);
  // SphereGeometry: phi = 0 faces -x and runs round through +z at phi = π/2... so the
  // front half (+z) is phi from 0 to π.
  add(piece(0, Math.PI, 0, Math.PI * 0.48), "brain", { pos: [0, hy + gap, gap], scale: [1, 1.15, 1] });
  add(piece(0, Math.PI, Math.PI * 0.5, Math.PI * 0.5), "face", { pos: [0, hy - gap, gap], scale: [1, 1.15, 1] });
  if (male) {
    add(piece(Math.PI, Math.PI, 0, Math.PI * 0.62), "scalp", { pos: [0, hy + gap, -gap], scale: [1, 1.15, 1] });
    add(piece(Math.PI, Math.PI, Math.PI * 0.64, Math.PI * 0.36), null, { pos: [0, hy - gap, -gap], scale: [1, 1.15, 1] });
  } else {
    // Long hair: a shell over the back of the head that falls to the shoulders.
    add(new THREE.SphereGeometry(hr * 1.1, 40, 24, Math.PI, Math.PI, 0, Math.PI * 0.75), "scalp", {
      pos: [0, hy + 0.004, -0.004],
      scale: [1, 1.15, 1],
    });
    add(new THREE.CapsuleGeometry(0.085, 0.16, 8, 24), "scalp", { pos: [0, 1.5, -0.06], scale: [1.15, 1, 0.45] });
  }

  // Neck
  add(new THREE.CylinderGeometry(0.045, 0.05, 0.08, 24), "neck", { pos: [0, 1.47, 0] });

  // Torso: three round bands (chest, belly, pelvis), each cut into a front
  // half and a back half so the front and back can lead to different areas.
  const lathe = (pts: number[][], phiStart: number, phiLen: number) =>
    new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 40, phiStart, phiLen);
  const chest = male
    ? [[0, 1.17], [w * 1.08, 1.17], [w * 1.2, 1.24], [sw * 0.9, 1.36], [sw, 1.405], [sw * 0.6, 1.435], [0, 1.44]]
    : [[0, 1.17], [w * 1.08, 1.17], [w * 1.25, 1.22], [sw * 0.88, 1.3], [sw * 0.95, 1.38], [sw, 1.405], [sw * 0.6, 1.435], [0, 1.44]];
  const belly = [[0, 0.95], [hw * 0.93, 0.95], [(w + hw) / 2, 1.02], [w, 1.09], [w * 1.06, 1.155], [0, 1.155]];
  const pelvis = [[0, 0.79], [hw * 0.55, 0.79], [hw * 0.92, 0.84], [hw, 0.89], [hw * 0.95, 0.935], [0, 0.935]];
  // Lathe: phi = 0 faces +z, so the front half is phi from -π/2 to π/2.
  const front = [-Math.PI / 2, Math.PI] as const;
  const back = [Math.PI / 2, Math.PI] as const;
  const torso = (pts: number[][], frontArea: string | null, backArea: string | null) => {
    add(lathe(pts, ...front), frontArea, { pos: [0, 0, gap], scale: [1, 1, depth] });
    add(lathe(pts, ...back), backArea, { pos: [0, 0, -gap], scale: [1, 1, depth] });
  };
  torso(chest, "chest", "upper-back");
  torso(belly, "belly", "middle-back");
  torso(pelvis, "pelvis", "lower-back");

  // Back: upper, middle and lower zones (the back halves above), with a
  // column of small bones for the whole spine and a kidney either side.
  const all = [...pelvis, ...belly, ...chest].filter(([r]) => r > 0).sort((a, b) => a[1] - b[1]);
  const radiusAt = (y: number) => {
    for (let i = 1; i < all.length; i++) {
      const [r0, y0] = all[i - 1];
      const [r1, y1] = all[i];
      if (y <= y1) return r0 + ((r1 - r0) * (y - y0)) / Math.max(1e-6, y1 - y0);
    }
    return all[all.length - 1][0];
  };
  for (let y = 0.84; y < 1.43; y += 0.034) {
    const z = -radiusAt(y) * depth;
    add(new THREE.BoxGeometry(y < 0.95 ? 0.032 : 0.04, 0.024, 0.03), "spine", { pos: [0, y, z - 0.004] });
  }
  pair((s) => {
    const y = 1.07;
    add(new THREE.SphereGeometry(1, 20, 14), "kidneys", {
      pos: [s * 0.065, y, -radiusAt(y) * depth + 0.012],
      scale: [0.03, 0.05, 0.022],
      rot: [0, 0, s * 0.25],
    });
  });

  // Arms
  pair((s) => {
    const x = s * (sw + 0.04);
    add(new THREE.CapsuleGeometry(0.044, 0.22, 8, 20), "hands", { pos: [x + s * 0.012, 1.25, 0], rot: [0, 0, s * 0.06] });
    add(new THREE.CapsuleGeometry(0.037, 0.2, 8, 20), "hands", { pos: [x + s * 0.027, 0.98, 0.01], rot: [0, 0, s * 0.04] });
    add(new THREE.SphereGeometry(1, 20, 14), "hands", { pos: [x + s * 0.034, 0.79, 0.015], scale: [0.032, 0.065, 0.02] });
  });

  // Legs
  pair((s) => {
    const x = s * hw * 0.52;
    add(new THREE.SphereGeometry(0.052, 20, 14), "hips", { pos: [s * hw * 0.9, 0.855, 0] });
    add(new THREE.CapsuleGeometry(male ? 0.066 : 0.07, 0.2, 8, 20), "legs", { pos: [x, 0.65, 0], rot: [0, 0, -s * 0.03] });
    add(new THREE.SphereGeometry(0.054, 20, 14), "knees", { pos: [x * 0.92, 0.475, 0.01] });
    add(new THREE.CapsuleGeometry(0.046, 0.26, 8, 20), "legs", { pos: [x * 0.88, 0.27, 0] });
    // Ankle and foot, one area.
    add(new THREE.SphereGeometry(0.05, 20, 14), "feet", { pos: [x * 0.88, 0.085, 0] });
    add(new THREE.SphereGeometry(1, 20, 14), "feet", { pos: [x * 0.88, 0.035, 0.04], scale: [0.045, 0.034, 0.105] });
  });

  return out;
}
