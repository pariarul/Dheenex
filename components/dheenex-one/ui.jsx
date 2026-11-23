"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

/** Section wrapper: consistent spacing, optional soft brand background. */
export function Section({ id, tone = "white", className = "", children }) {
  const bg = tone === "soft" ? "bg-brand-50 dark:bg-brand-950" : "bg-white dark:bg-gray-900";
  return (
    <section id={id} className={`${bg} py-20 md:py-28 scroll-mt-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Small teal label + big heading + optional intro line. */
export function SectionHeading({ eyebrow, title, intro, align = "center" }) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-12 md:mb-16`}>
      {eyebrow && (
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-100/70 dark:bg-brand-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-200">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h2>
      {intro && <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{intro}</p>}
    </Reveal>
  );
}

/** Light fade-up when scrolled into view; no movement for people who prefer reduced motion. */
export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </Tag>
  );
}

/** Pastel circle with an icon, like the admin app's KPI cards. */
export const PASTELS = {
  lavender: "bg-lavender-soft text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  sky: "bg-sky-soft text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  blush: "bg-blush-soft text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
  mint: "bg-mint-soft text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  lemon: "bg-lemon-soft text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  teal: "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-200",
};
export function IconBubble({ icon: Icon, tone = "teal", size = "md" }) {
  const s = size === "lg" ? "w-14 h-14 rounded-2xl" : "w-11 h-11 rounded-xl";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${s} ${PASTELS[tone]}`}>
      <Icon className={size === "lg" ? "w-6 h-6" : "w-5 h-5"} aria-hidden="true" />
    </span>
  );
}

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-gray-900/10 transition hover:bg-black hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-gray-900 transition hover:border-gray-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:border-gray-500",
  teal:
    "inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
};

export const card =
  "rounded-2xl border border-gray-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/5 dark:border-gray-800 dark:bg-gray-900";

/** A screenshot inside a clean browser window. Click opens it full size. */
export function BrowserFrame({ src, alt, width, height, url = "DheeneX One", priority = false, onOpen, className = "" }) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-brand-600/10 dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 hidden sm:block flex-1 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-gray-500 dark:bg-gray-900 dark:text-gray-400">{url}</span>
      </div>
      {onOpen ? (
        <button type="button" onClick={onOpen} className="group relative block w-full cursor-zoom-in" aria-label={`Open full size: ${alt}`}>
          <Image src={src} alt={alt} width={width} height={height} priority={priority} loading={priority ? undefined : "lazy"} sizes="(min-width: 1024px) 760px, 100vw" className="h-auto w-full" />
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" /> Full size
          </span>
        </button>
      ) : (
        <Image src={src} alt={alt} width={width} height={height} priority={priority} loading={priority ? undefined : "lazy"} sizes="(min-width: 1024px) 760px, 100vw" className="h-auto w-full" />
      )}
    </figure>
  );
}

/** A phone screenshot inside a simple phone body. */
export function PhoneFrame({ src, alt, width, height, className = "", priority = false, onOpen }) {
  const img = <Image src={src} alt={alt} width={width} height={height} priority={priority} loading={priority ? undefined : "lazy"} sizes="260px" className="h-auto w-full rounded-[1.6rem]" />;
  return (
    <figure className={`rounded-[2.2rem] border-[6px] border-gray-900 bg-gray-900 p-0.5 shadow-2xl shadow-gray-900/30 dark:border-gray-700 ${className}`}>
      {onOpen ? (
        <button type="button" onClick={onOpen} className="block w-full cursor-zoom-in" aria-label={`Open full size: ${alt}`}>
          {img}
        </button>
      ) : (
        img
      )}
    </figure>
  );
}

/** Full-size image viewer. Escape or the close button closes it; focus moves to the close button. */
export function Lightbox({ image, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!image) return;
    const prev = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [image, onClose]);
  if (!image) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={image.alt} className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/85 p-3 sm:p-8" onClick={onClose}>
      <button ref={closeRef} type="button" onClick={onClose} className="absolute right-3 top-3 sm:right-6 sm:top-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" aria-label="Close">
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="max-h-full max-w-6xl overflow-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="100vw" className="h-auto w-full rounded-xl" />
        {image.caption && <p className="mt-3 text-center text-sm text-gray-200">{image.caption}</p>}
      </div>
    </div>
  );
}

export function useLightbox() {
  const [image, setImage] = useState(null);
  const close = useCallback(() => setImage(null), []);
  return { image, open: setImage, close };
}
