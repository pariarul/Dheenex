"use client";

import { Building2, School, GraduationCap, Rocket, CheckCircle2, UserPlus, Users, PlayCircle, ShieldCheck, Lock, KeyRound, History, LogOut, Database } from "lucide-react";
import { Section, SectionHeading, Reveal, IconBubble, card } from "@/components/dheenex-one/ui";
import Swipe from "@/components/Swipe";

const WHO = [
  { icon: Building2, tone: "teal", title: "Companies", text: "HR, attendance, payroll, projects, clients, quotations and invoices for teams of any size.", points: ["Employees and departments", "Payroll and GST invoices"] },
  { icon: School, tone: "sky", title: "Colleges", text: "Students, classes, college staff and placement tests, with your own college website.", points: ["Student records", "MCQ and coding tests"] },
  { icon: GraduationCap, tone: "lavender", title: "Training institutes", text: "Courses, batches, interns and assessments with progress you can see.", points: ["Courses and certificates", "Intern tasks and mentors"] },
  { icon: Rocket, tone: "lemon", title: "Startups & agencies", text: "Win clients with quick quotations, run projects and keep your website fresh.", points: ["Quotations and CRM", "Projects and task boards"] },
];

const STEPS = [
  { icon: UserPlus, title: "Sign up", text: "Pick a plan and start your 14-day free trial. No card needed." },
  { icon: Users, title: "Add your people", text: "Invite employees, add departments, clients or colleges." },
  { icon: PlayCircle, title: "Run your day", text: "Attendance, leave, tasks and approvals start flowing in DheeneX One." },
];

const TRUST = [
  { icon: ShieldCheck, title: "Role-based access", text: "Each role sees only the modules you allow." },
  { icon: Database, title: "Your data stays yours", text: "Every organization's data is kept separate from every other." },
  { icon: Lock, title: "Encrypted secrets", text: "Saved client passwords and worker ID numbers are stored encrypted." },
  { icon: KeyRound, title: "Secure sign-in", text: "Hashed passwords, lock after failed tries, OTP password reset." },
  { icon: LogOut, title: "Auto sign-out", text: "Sign out idle sessions after the time you choose." },
  { icon: History, title: "Activity log", text: "See who changed what, and when." },
];

/** Who it is for. */
export function DheenexOneAudience() {
  return (
    <Section id="who" tone="soft">
      <SectionHeading eyebrow="Who it's for" title="Built for the way you work" intro="Turn on only the modules you need. Start small and add more later." />
      <Swipe pages={WHO.length} label="Who it is for" dotsClassName="sm:hidden" className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 no-scrollbar sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible lg:grid-cols-4">
        {WHO.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06} className={`${card} w-[82%] shrink-0 snap-start sm:w-auto p-5 sm:p-6`}>
            <IconBubble icon={w.icon} tone={w.tone} size="lg" />
            <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{w.text}</p>
            <ul className="mt-4 space-y-1.5">
              {w.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </Swipe>
    </Section>
  );
}

/** How to start: 3 steps. */
export function DheenexOneStart() {
  return (
    <Section id="start">
      <SectionHeading eyebrow="How to start" title="Up and running today" intro="Three simple steps. Our team can help you set up." />
      <ol className="relative grid gap-5 md:gap-6 md:grid-cols-3">
        <div className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-brand-100 via-brand-200 to-brand-100 md:block dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" aria-hidden="true" />
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.08} className="relative flex items-start gap-4 text-left md:block md:text-center">
            <span className="relative shrink-0 md:mx-auto inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900">
              <s.icon className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
              <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">{i + 1}</span>
            </span>
            <div>
              <h3 className="md:mt-5 text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{s.title}</h3>
              <p className="md:mx-auto mt-1 md:mt-2 md:max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-300">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/** Security & trust: only things the product really does. */
export function DheenexOneSecurity() {
  return (
    <Section id="security" tone="soft">
      <SectionHeading eyebrow="Security & trust" title="Safe by design" intro="Your organization's data is protected at every step." />
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRUST.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.04} className={`${card} flex gap-4 p-4 sm:p-5`}>
            <IconBubble icon={t.icon} tone="teal" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{t.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
