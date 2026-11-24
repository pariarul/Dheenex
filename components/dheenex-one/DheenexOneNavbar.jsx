"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, LogIn, Sparkles, Users, Award, Tag, HelpCircle, LifeBuoy, BookOpen, Globe, ChevronRight } from "lucide-react";

const ADMIN_LOGIN = process.env.NEXT_PUBLIC_ADMIN_URL ? `${process.env.NEXT_PUBLIC_ADMIN_URL.replace(/\/+$/, "")}/login` : "http://localhost:3000/login";

const SECTIONS = [
  { id: "tour", label: "Product", hint: "See every screen", icon: Sparkles },
  { id: "who", label: "Who it's for", hint: "Companies, colleges, institutes", icon: Users },
  { id: "roles", label: "Benefits", hint: "For owners, HR, staff and clients", icon: Award },
  { id: "pricing", label: "Pricing", hint: "Plans and 14-day free trial", icon: Tag },
  { id: "faq", label: "FAQ", hint: "Quick answers", icon: HelpCircle },
];
const PAGES = [
  { href: "/dheenex-one/help", label: "Help", icon: LifeBuoy },
  { href: "/dheenex-one/docs", label: "Docs", icon: BookOpen },
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
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef(null);
  useEffect(() => setMounted(true), []);

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
    `whitespace-nowrap rounded-full px-3 xl:px-3.5 py-2 text-sm font-medium transition ${on ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}`;

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
          <Link href="/" className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center gap-1 whitespace-nowrap text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            by
            <Image src="/dheenex-technology-icon.png" alt="" width={16} height={16} className="h-4 w-4 dark:hidden" />
            <Image src="/dheenex-technology-icon-white.png" alt="" width={16} height={16} className="hidden h-4 w-4 dark:block" />
            DheeneX Technologies
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
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

        <div className="flex shrink-0 items-center gap-2">
          <a href={ADMIN_LOGIN} className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 xl:px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Sign in
          </a>
          <a href={sectionHref("pricing")} className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700">
            Start free trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button type="button" onClick={() => setOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 lg:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="d1-menu">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* The phone menu is rendered on <body>: inside the blurred header a "fixed" panel is trapped in the 64 px bar */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="dx-one fixed inset-0 z-[1000] lg:hidden" id="d1-menu" role="dialog" aria-modal="true" aria-label="Menu">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl"
                >
                  <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-4">
                    <span className="flex items-center gap-2 font-semibold">
                      <Logo />
                      <span className="text-lg text-brand-600">DheeneX One</span>
                    </span>
                    <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200" aria-label="Close menu">
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                    <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Explore</p>
                    <ul className="space-y-1">
                      {SECTIONS.map(({ id, label, hint, icon: Icon }, i) => {
                        const on = onHome && active === id;
                        return (
                          <motion.li key={id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                            <a
                              href={sectionHref(id)}
                              onClick={() => setOpen(false)}
                              aria-current={on ? "true" : undefined}
                              className={`flex items-center gap-3 rounded-2xl px-3 py-3 transition active:scale-[0.99] ${on ? "bg-brand-50" : "hover:bg-gray-50"}`}
                            >
                              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${on ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600"}`}>
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block font-semibold text-gray-900">{label}</span>
                                <span className="block truncate text-xs text-gray-500">{hint}</span>
                              </span>
                              <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" aria-hidden="true" />
                            </a>
                          </motion.li>
                        );
                      })}
                    </ul>

                    <p className="px-3 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Support</p>
                    <ul className="grid grid-cols-2 gap-2 px-1">
                      {PAGES.map(({ href, label, icon: Icon }) => (
                        <li key={href}>
                          <Link href={href} onClick={() => setOpen(false)} className={`flex items-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium transition ${pathname === href ? "border-brand-600 bg-brand-50 text-brand-700" : "border-gray-200 text-gray-800 hover:bg-gray-50"}`}>
                            <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" /> {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/" onClick={() => setOpen(false)} className="mx-1 mt-2 flex items-center gap-2 rounded-2xl px-3 py-3 text-sm text-gray-500 hover:bg-gray-50">
                      <Globe className="h-4 w-4" aria-hidden="true" /> DheeneX Technologies main website
                    </Link>
                  </div>

                  <div className="grid shrink-0 gap-2.5 border-t border-gray-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <a href={sectionHref("pricing")} onClick={() => setOpen(false)} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 font-semibold text-white shadow-lg shadow-brand-600/25">
                      Start 14-day free trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a href={ADMIN_LOGIN} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 px-6 font-semibold text-gray-900">
                      <LogIn className="h-4 w-4" aria-hidden="true" /> Sign in
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
