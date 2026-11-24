"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Horizontal swipe row for phones (CSS scroll-snap) with small dot indicators.
 * Pass the scroller layout in `className` (e.g. "flex overflow-x-auto snap-x ... md:grid md:overflow-visible");
 * `pages` is how many snap positions there are. Dots are hidden from `md` up, where the list is a normal grid.
 */
export default function Swipe({ pages, className = "", label, dotsClassName = "", children }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setActive(max > 0 ? Math.round((el.scrollLeft / max) * (pages - 1)) : 0);
  }, [pages]);

  const goTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: pages > 1 ? (max * i) / (pages - 1) : 0, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <>
      <div ref={ref} onScroll={onScroll} className={className} role="region" aria-label={label}>
        {children}
      </div>
      {pages > 1 && (
        <div className={`md:hidden mt-3 flex items-center justify-center ${dotsClassName}`}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${label ? label.toLowerCase() : "items"} ${i + 1} of ${pages}`}
              aria-current={i === active ? "true" : undefined}
              className="p-1.5"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-blue-700" : "w-2 bg-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
