"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  PlayCircle,
  Check,
  ScanFace,
  UserCheck,
  ListChecks,
  CalendarCheck2,
  Users,
  Clock3,
  Wallet,
  FolderKanban,
  Handshake,
  FileText,
  Globe,
  School,
  BookOpen,
  LifeBuoy,
  Smartphone,
  Zap,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { BrowserFrame, PhoneFrame } from "@/components/dheenex-one/ui";

/** The word in the headline cycles through who it is for. */
const WHO = ["company", "college", "institute", "team"];

/** Real modules of the product, shown as a moving strip. */
const MODULES = [
  { icon: Users, label: "People & HR" },
  { icon: Clock3, label: "Attendance & leave" },
  { icon: Wallet, label: "Payroll with PF / ESI" },
  { icon: FolderKanban, label: "Projects & tasks" },
  { icon: Handshake, label: "Clients & CRM" },
  { icon: FileText, label: "Quotations & invoices" },
  { icon: Globe, label: "Website builder" },
  { icon: School, label: "College ERP" },
  { icon: BookOpen, label: "Courses & tests" },
  { icon: LifeBuoy, label: "Helpdesk" },
];

/** Facts that are true for every plan. */
const FACTS = [
  { icon: Layers, value: "11", label: "modules, one app" },
  { icon: Smartphone, value: "Web + app", label: "one login" },
  { icon: Zap, value: "Live", label: "no refresh needed" },
  { icon: ShieldCheck, value: "Private", label: "data per company" },
];

// Numbers match the demo dashboard in the screenshot
const STATS = [
  { icon: UserCheck, label: "Attendance today", value: "19 / 24", tone: "bg-white text-violet-800", dot: "bg-violet-500", pos: "-left-2 top-[18%] sm:-left-6" },
  { icon: ListChecks, label: "Tasks due today", value: "2", tone: "bg-white text-amber-800", dot: "bg-amber-500", pos: "-right-2 top-[52%] hidden sm:flex sm:-right-4" },
  { icon: CalendarCheck2, label: "Leave approvals", value: "4 waiting", tone: "bg-white text-emerald-800", dot: "bg-emerald-500", pos: "left-6 -bottom-6 sm:left-12" },
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % WHO.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block align-bottom" aria-live="polite">
      <span key={WHO[i]} className="dx-word inline-block bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
        {WHO[i]}
      </span>
    </span>
  );
}

export default function DheenexOneHero() {
  return (
    <section className="relative overflow-hidden bg-[#020b24] text-white">
      {/* Background: navy glow, soft grid, orbit ring like the logo */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[1100px] -translate-x-1/2 rounded-full bg-[#1e4ba8]/40 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute left-1/2 top-24 h-[640px] w-[640px] -translate-x-1/2 rounded-full border border-white/5 sm:h-[820px] sm:w-[820px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Text */}
          <div className="text-center lg:text-left">
            <a
              href="#tour"
              className="dx-fade-up inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-3 text-xs sm:text-sm text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#020b24]">
                <ScanFace className="h-3.5 w-3.5" aria-hidden="true" /> New
              </span>
              <span className="truncate">Face check-in with liveness</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>

            <h1 className="dx-fade-up mt-6 text-[2.15rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]" style={{ animationDelay: "60ms" }}>
              Run your whole <RotatingWord />
              <br className="hidden sm:block" /> from one place
            </h1>

            <p className="dx-fade-up mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0" style={{ animationDelay: "120ms" }}>
              People, attendance, payroll, projects, clients, your website and college work — together in one simple app for web and phone.
            </p>

            <div className="dx-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start" style={{ animationDelay: "180ms" }}>
              <a
                href="#pricing"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-7 text-base font-semibold text-[#020b24] shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-sky-50"
              >
                Start 14-day free trial <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#tour"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <PlayCircle className="h-5 w-5" aria-hidden="true" /> See how it works
              </a>
            </div>

            <ul className="dx-fade-up mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/70 lg:justify-start" style={{ animationDelay: "240ms" }}>
              {["14-day free trial", "No card needed", "Cancel anytime"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/20">
                    <Check className="h-3 w-3 text-emerald-300" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Product visual */}
          <div className="dx-fade-up relative mx-auto w-full max-w-xl lg:max-w-none" style={{ animationDelay: "200ms" }}>
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-sky-500/20 via-transparent to-cyan-300/20 blur-2xl" aria-hidden="true" />
            <div className="relative pr-10 sm:pr-16">
              <BrowserFrame
                src="/dheenex-one/admin-dashboard.webp"
                width={1600}
                height={1000}
                priority
                className="!border-white/10 !shadow-black/40"
                alt="DheeneX One admin dashboard: KPI cards for employees, leave, interns and departments, this week's list, leave approvals and a month calendar"
              />
            </div>
            <div className="absolute -bottom-6 right-0 w-[96px] sm:w-[150px] lg:w-[170px]">
              <PhoneFrame src="/dheenex-one/phone-employee-dashboard.webp" width={780} height={1688} alt="Employee dashboard on a phone with pending tasks and hours logged" />
            </div>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`dx-float absolute flex items-center gap-2.5 rounded-2xl ${s.tone} px-3 py-2 sm:px-4 sm:py-3 shadow-2xl shadow-black/30 ring-1 ring-black/5 ${s.pos}`}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <span className="relative inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-100">
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                  <span className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${s.dot}`} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10px] sm:text-[11px] font-medium text-gray-500">{s.label}</span>
                  <span className="block text-base sm:text-lg font-semibold leading-tight">{s.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* True facts */}
        <dl className="dx-fade-up mt-16 grid grid-cols-2 gap-3 sm:mt-20 lg:grid-cols-4" style={{ animationDelay: "300ms" }}>
          {FACTS.map((f) => (
            <div key={f.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-lg font-semibold leading-tight">{f.value}</dd>
                <dd className="text-xs leading-snug text-white/60">{f.label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {/* Moving strip of modules */}
      <div className="relative border-t border-white/10 bg-white/[0.03] py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="dx-marquee flex w-max gap-3" aria-label="Modules">
          {[...MODULES, ...MODULES].map((m, i) => (
            <span
              key={`${m.label}-${i}`}
              aria-hidden={i >= MODULES.length ? "true" : undefined}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
            >
              <m.icon className="h-4 w-4 text-cyan-200" aria-hidden="true" /> {m.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
