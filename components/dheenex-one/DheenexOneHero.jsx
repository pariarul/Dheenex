"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PlayCircle, Building2, School, GraduationCap, UserCheck, ListChecks, CalendarCheck2, Check } from "lucide-react";
import Image from "next/image";
import { BrowserFrame, PhoneFrame, btn } from "@/components/dheenex-one/ui";

const CHIPS = [
  { icon: Building2, label: "Companies" },
  { icon: School, label: "Colleges" },
  { icon: GraduationCap, label: "Training institutes" },
];

// Numbers match the demo dashboard in the screenshot
const STATS = [
  { icon: UserCheck, label: "Attendance today", value: "19 / 24", tone: "bg-lavender-soft text-violet-800", pos: "left-0 top-6 sm:-left-6" },
  { icon: ListChecks, label: "Tasks due today", value: "2", tone: "bg-lemon-soft text-amber-800", pos: "right-0 top-1/3 sm:-right-4" },
  { icon: CalendarCheck2, label: "Leave approvals", value: "4 waiting", tone: "bg-mint-soft text-emerald-800", pos: "left-4 bottom-10 sm:left-10" },
];

export default function DheenexOneHero() {
  const reduce = useReducedMotion();
  const fade = (delay = 0) => (reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay } });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white pb-20 pt-10 dark:from-brand-950 dark:via-gray-900 dark:to-gray-900 lg:pb-28 lg:pt-16">
      {/* soft teal glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fade(0)} className="mb-5 flex justify-center">
            <Image src="/dheenex-one/dheenex-one-logo.png" alt="DheeneX One" width={1016} height={508} priority className="h-20 w-auto sm:h-24 dark:hidden" />
            <Image src="/dheenex-one/dheenex-one-logo-white.png" alt="DheeneX One" width={1016} height={508} className="hidden h-20 w-auto sm:h-24 dark:block" />
          </motion.div>
          <motion.div {...fade(0)} className="flex flex-wrap justify-center gap-2">
            {CHIPS.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-brand-200">
                <c.icon className="h-3.5 w-3.5" aria-hidden="true" /> {c.label}
              </span>
            ))}
          </motion.div>

          <motion.h1 {...fade(0.05)} className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Run your whole organization <span className="text-brand-600 dark:text-brand-200">from one place</span>
          </motion.h1>

          <motion.p {...fade(0.1)} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            DheeneX One brings people, attendance and leave, payroll, projects and tasks, clients and quotations, your website and college work into one simple app — for companies, colleges and institutes.
          </motion.p>

          <motion.div {...fade(0.15)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#pricing" className={btn.primary}>
              Start 14-day free trial <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#tour" className={btn.secondary}>
              <PlayCircle className="h-5 w-5" aria-hidden="true" /> See how it works
            </a>
          </motion.div>

          <motion.ul {...fade(0.2)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            {["14-day free trial", "No card needed", "Web + mobile app"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Product visual: real admin dashboard + employee view on a phone */}
        <motion.div {...(reduce ? {} : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.25 } })} className="relative mx-auto mt-14 max-w-6xl lg:mt-20">
          <div className="relative pr-0 sm:pr-16 lg:pr-24">
            <BrowserFrame
              src="/dheenex-one/admin-dashboard.webp"
              width={1600}
              height={1000}
              priority
              alt="DheeneX One admin dashboard: KPI cards for employees, leave, interns and departments, this week's list, leave approvals and a month calendar"
            />
          </div>
          <div className="absolute -bottom-8 right-2 w-[110px] sm:right-0 sm:w-[170px] lg:w-[210px]">
            <PhoneFrame src="/dheenex-one/phone-employee-dashboard.webp" width={780} height={1688} alt="Employee dashboard on a phone with pending tasks and hours logged" />
          </div>

          {/* floating KPI chips, styled like the product's cards (hidden on very small screens) */}
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              {...(reduce ? {} : { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.6 + i * 0.15 } })}
              className={`absolute hidden md:flex items-center gap-3 rounded-2xl ${s.tone} px-4 py-3 shadow-xl shadow-gray-900/10 ring-1 ring-white/70 ${s.pos}`}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
                <s.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[11px] font-medium opacity-80">{s.label}</span>
                <span className="block text-lg font-semibold leading-tight">{s.value}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
