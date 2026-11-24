"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Loads a heavy react-three-fiber scene only when it is useful:
 * - screen at least 768px wide (tablets and computers),
 * - the visitor does not prefer reduced motion,
 * - the block is near the viewport.
 * Otherwise it shows `fallback` (a light static picture, or nothing).
 * The wrapper keeps its size, so nothing jumps while the scene loads.
 */
export default function Lazy3D({ scene: Scene, fallback = null, className = "" }) {
  const ref = useRef(null);
  const [mode, setMode] = useState("pending"); // pending | 3d | static

  useEffect(() => {
    const big = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!big.matches || calm.matches) {
      setMode("static");
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMode("3d");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMode("3d");
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {mode === "3d" ? <Scene /> : mode === "static" ? fallback : null}
    </div>
  );
}

/** Static laptop with the purple DheeneX screen (phone fallback for the hero scene). */
export function LaptopStatic() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="w-[78%] max-w-[320px]">
        <div className="rounded-t-xl border-[6px] border-b-[10px] border-[#2d2d2d] bg-black shadow-2xl shadow-indigo-900/30">
          <div className="aspect-[3/2] rounded-sm bg-gradient-to-br from-[#4f46e5] to-[#9333ea] p-4 text-white">
            <p className="text-xl font-bold leading-none tracking-wide">DHEENEX</p>
            <p className="mt-1 text-xs opacity-90">Technologies</p>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-4/5 rounded bg-white/20" />
              <div className="h-2 w-3/5 rounded bg-white/20" />
              <div className="h-2 w-2/3 rounded bg-white/20" />
            </div>
          </div>
        </div>
        <div className="mx-[-8%] h-3 rounded-b-2xl bg-gradient-to-b from-[#3a3a3a] to-[#1f1f1f] shadow-lg" />
        <div className="mx-auto mt-3 h-3 w-3/4 rounded-full bg-gray-900/10 blur-md" />
      </div>
    </div>
  );
}
