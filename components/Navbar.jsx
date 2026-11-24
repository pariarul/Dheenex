"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  Search,
  Mail,
  Phone,
  Home,
  Info,
  Briefcase,
  PhoneCall,
  Settings2,
  Laptop,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

/* NAV LINKS (section anchors live on the home page) */
const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About Us", href: "#about", icon: Info },
  { name: "How We Work", href: "#process", icon: Settings2 },
  { name: "Projects", href: "#projects", icon: Laptop },
  { name: "Services", href: "#services", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: PhoneCall },
];

/** Same key as the inline script in app/layout.js (hides the bar before first paint). */
const ANNOUNCE_KEY = "dx-announce-off";

/**
 * Slim "New launch" bar. One line on every screen: short text on phones, a longer line on
 * tablets, the full sentence on computers. Height comes from --announce-h (globals.css),
 * so the page below always starts right under it, even after it is closed.
 */
function AnnouncementBar() {
  const close = () => {
    document.documentElement.dataset.announce = "off";
    try {
      sessionStorage.setItem(ANNOUNCE_KEY, "1");
    } catch {
      /* private mode: hide for this page view only */
    }
  };

  return (
    <div className="announce-bar w-full h-[var(--announce-h)] bg-gradient-to-r from-blue-900 via-blue-900 to-slate-900 text-white border-b border-blue-500/20">
      <div className="max-w-7xl h-full mx-auto pl-3 pr-1 sm:px-4 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-medium">
        <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500 text-white uppercase tracking-wider">
          <span className="sm:hidden">New</span>
          <span className="hidden sm:inline">New launch</span>
        </span>

        <p className="min-w-0 truncate">
          <span className="min-[420px]:hidden">
            <strong>DheeneX One</strong> is here
          </span>
          <span className="hidden min-[420px]:inline sm:hidden">
            Meet <strong>DheeneX One</strong>: all-in-one SaaS
          </span>
          <span className="hidden sm:inline lg:hidden">
            <strong>DheeneX One</strong> is here: HR, projects, learning and more in one app
          </span>
          <span className="hidden lg:inline">
            Introducing <strong>DheeneX One</strong> — Workforce • Internship • Learning • Projects in a unified SaaS platform.
          </span>
        </p>

        <Link
          href="/dheenex-one"
          className="shrink-0 inline-flex items-center gap-1 h-10 px-2 sm:px-1 font-semibold underline-offset-2 hover:underline hover:text-blue-200"
        >
          Explore<span className="hidden lg:inline"> Platform</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={close}
          aria-label="Close announcement"
          className="shrink-0 inline-flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-full text-white/70 hover:text-white hover:bg-white/10"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Section anchors only exist on the home page
  const linkHref = (href) => (href.startsWith("#") && pathname !== "/" ? `/${href}` : href);

  /* SCROLL EFFECT */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* LOCK BODY SCROLL + ESCAPE CLOSES THE MENU */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuButton = (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      suppressHydrationWarning
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="flex items-center gap-2 h-11 min-w-11 justify-center px-3 sm:px-4 rounded-full bg-blue-800 text-white dark:bg-white dark:text-blue-700 transition active:scale-95"
    >
      <motion.div
        key={isOpen ? "close" : "menu"}
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.div>
      <span className="hidden sm:block text-sm font-semibold">
        {isOpen ? "CLOSE" : "MENU"}
      </span>
    </button>
  );

  return (
    <>
      {/* NAVBAR CONTAINER */}
      <nav
        className={clsx(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 flex flex-col",
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <AnnouncementBar />

        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img src="/dheenex-technology-logo.png" alt="DheeneX Technologies" width={220} height={44} className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain dark:hidden" />
            <img src="/dheenex-technology-logo-white.png" alt="DheeneX Technologies" width={220} height={44} className="hidden h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain dark:block" />
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Search" suppressHydrationWarning className="hidden sm:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
              <Search size={20} />
            </button>
            {menuButton}
          </div>
        </div>
      </nav>

      {/* FULL SCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] bg-white flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            {/* MENU HEADER */}
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 shrink-0 flex items-center justify-between">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
                <img src="/dheenex-technology-logo.png" alt="DheeneX Technologies" width={220} height={44} className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain" />
              </Link>
              <div className="flex items-center gap-3">
                <button type="button" aria-label="Search" className="hidden sm:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                  <Search size={20} />
                </button>
                {menuButton}
              </div>
            </div>

            {/* MENU CONTENT */}
            <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">

              {/* NAV LINKS */}
              <div className="flex flex-col justify-center space-y-1 sm:space-y-4 py-4">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={linkHref(link.href)}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 rounded-xl
                                   text-xl sm:text-3xl font-bold text-blue-800
                                   hover:bg-blue-50 transition"
                      >
                        <div className="flex items-center gap-4">
                          <span className="p-2 rounded-lg bg-blue-100">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
                          </span>
                          <span className="group-hover:translate-x-2 transition-transform">
                            {link.name}
                          </span>
                        </div>

                        <ArrowRight className="opacity-40 lg:opacity-0 group-hover:opacity-100 transition" />
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Phones and tablets: quick contact */}
                <div className="lg:hidden grid grid-cols-2 gap-3 pt-4">
                  <a href="tel:+919361430865" className="flex items-center justify-center gap-2 h-12 rounded-full border border-blue-200 text-blue-800 font-semibold">
                    <Phone size={18} /> Call
                  </a>
                  <a href="mailto:contact@dheenex.com" className="flex items-center justify-center gap-2 h-12 rounded-full bg-blue-800 text-white font-semibold">
                    <Mail size={18} /> Email
                  </a>
                </div>
              </div>

              {/* CONTACT INFO */}
              <div className="hidden lg:flex flex-col justify-center pl-16 relative">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-32 bg-blue-600 rounded-full" />

                <span className="text-xs uppercase tracking-widest font-bold text-blue-600 mb-4">
                  Contact
                </span>

                <a
                  href="mailto:contact@dheenex.com"
                  className="flex items-center gap-3 mb-3 text-lg font-semibold hover:text-blue-700"
                >
                  <Mail className="text-blue-600" />
                  contact@dheenex.com
                </a>

                <a
                  href="tel:+919361430865"
                  className="flex items-center gap-3 mb-8 text-lg font-semibold hover:text-blue-700"
                >
                  <Phone className="text-blue-600" />
                  +91 93614 30865
                </a>

                <a
                  href="https://wa.me/919361430865"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition w-fit"
                >
                  Get Started
                  <ArrowRight />
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
