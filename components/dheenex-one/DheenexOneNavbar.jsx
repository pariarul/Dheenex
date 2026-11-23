"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, LogIn } from "lucide-react";

const ADMIN_LOGIN = process.env.NEXT_PUBLIC_ADMIN_URL ? `${process.env.NEXT_PUBLIC_ADMIN_URL.replace(/\/+$/, "")}/login` : "http://localhost:3000/login";

const SECTIONS = [
  { id: "tour", label: "Product" },
  { id: "who", label: "Who it's for" },
  { id: "roles", label: "Benefits" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];
const PAGES = [
  { href: "/dheenex-one/help", label: "Help" },
  { href: "/dheenex-one/docs", label: "Docs" },
];

/** The "1" orbit mark from the DheeneX One logo (white version in dark mode). */
function Logo() {
  return (
    <>
      <Image src="/dheenex-one/dheenex-one-mark.png" alt="" width={36} height={36} className="h-9 w-9 dark:hidden" priority />
      <Image src="/dheenex-one/dheenex-one-mark-white.png" alt="" width={36} height={36} className="hidden h-9 w-9 dark:block" priority />
    </>
  );
}

/** The DheeneX One product bar (the main site keeps its own Navbar). */
export default function DheenexOneNavbar() {
  const pathname = usePathname();
  const onHome = pathname === "/dheenex-one";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY < 400) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in view (home page only)
  useEffect(() => {
    if (!onHome) return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  // Phone menu: Escape closes, body does not scroll behind it
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const sectionHref = (id) => (onHome ? `#${id}` : `/dheenex-one#${id}`);
  const linkCls = (on) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition ${on ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80" : "border-transparent bg-white/60 backdrop-blur-md dark:bg-gray-900/60"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="DheeneX One">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/dheenex-one" className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
            <Logo />
            <span className="text-lg tracking-tight text-brand-600 dark:text-white">DheeneX One</span>
          </Link>
          <Link href="/" className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            by
            <Image src="/dheenex-technology-icon.png" alt="" width={16} height={16} className="h-4 w-4 dark:hidden" />
            <Image src="/dheenex-technology-icon-white.png" alt="" width={16} height={16} className="hidden h-4 w-4 dark:block" />
            DheeneX Technologies
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <a key={s.id} href={sectionHref(s.id)} className={linkCls(onHome && active === s.id)} aria-current={onHome && active === s.id ? "true" : undefined}>
              {s.label}
            </a>
          ))}
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href} className={linkCls(pathname === p.href)} aria-current={pathname === p.href ? "page" : undefined}>
              {p.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href={ADMIN_LOGIN} className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Sign in
          </a>
          <a href={sectionHref("pricing")} className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700">
            Start free trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button type="button" onClick={() => setOpen(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 lg:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="d1-menu">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {open && (
        <div id="d1-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-white dark:bg-gray-900 lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
            <span className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
              <Logo />
              <span className="text-brand-600 dark:text-white">DheeneX One</span>
            </span>
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close menu">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={sectionHref(s.id)} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-lg font-medium text-gray-900 hover:bg-brand-50 dark:text-white dark:hover:bg-gray-800">
                    {s.label}
                  </a>
                </li>
              ))}
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-lg font-medium text-gray-900 hover:bg-brand-50 dark:text-white dark:hover:bg-gray-800">
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/" onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-base text-gray-500 hover:bg-brand-50 dark:text-gray-400 dark:hover:bg-gray-800">
                  DheeneX main website
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid gap-3 border-t border-gray-200 p-4 dark:border-gray-800">
            <a href={sectionHref("pricing")} onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white">
              Start free trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={ADMIN_LOGIN} className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3.5 font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
              <LogIn className="h-4 w-4" aria-hidden="true" /> Sign in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
