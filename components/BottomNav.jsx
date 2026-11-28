"use client";

import { motion } from "framer-motion";
import { Home, Briefcase, Settings2, PhoneCall, Laptop } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Process", href: "#process", icon: Settings2 },
  { name: "Projects", href: "#projects", icon: Laptop },
  { name: "Services", href: "#services", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: PhoneCall },
];

/** Phone/tablet tab bar for the main DheeneX Technologies site (the DheeneX One pages have their own menu). */
export default function BottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastY = useRef(0);
  const [active, setActive] = useState("/");
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Hide while scrolling down, show again when scrolling up or near the top
      setIsVisible(!(y > lastY.current && y > 100));
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in view (home page only)
  useEffect(() => {
    if (!onHome) return;
    const ids = navItems.filter((i) => i.href.startsWith("#")).map((i) => i.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const seen = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)));
        const current = ids.filter((id) => seen.has(id)).pop();
        setActive(current ? `#${current}` : "/");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  if (pathname?.startsWith("/dheenex-one")) return null;

  // The main-site Footer leaves room at the bottom for this bar and the WhatsApp button
  return (
    <>
      <motion.div
        initial={false}
        animate={{ y: isVisible ? 0 : 120 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden fixed inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40"
      >
        <nav aria-label="Quick links" className="bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl shadow-gray-900/10 px-1 py-1">
          <ul className="flex items-stretch justify-between">
            {navItems.map((item) => {
              const Icon = item.icon;
              const href = item.href.startsWith("#") && !onHome ? `/${item.href}` : item.href;
              const on = onHome ? active === item.href : item.href === "/" && pathname === "/";
              return (
                <li key={item.name} className="flex-1">
                  <Link
                    href={href}
                    aria-current={on ? "location" : undefined}
                    className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 group transition-colors ${
                      on ? "bg-blue-50 dark:bg-blue-900/30" : "active:bg-blue-50 dark:active:bg-blue-900/20"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`transition-colors ${on ? "text-blue-700 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"}`}
                    />
                    <span className={`text-[10px] font-bold uppercase tracking-tight ${on ? "text-blue-700 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600"}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.div>
    </>
  );
}
