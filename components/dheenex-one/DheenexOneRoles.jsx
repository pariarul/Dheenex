"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Crown, HeartHandshake, UsersRound, UserRound, GraduationCap, Handshake, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading, BrowserFrame, PhoneFrame, Lightbox, useLightbox, IconBubble } from "@/components/dheenex-one/ui";

const img = (name, w = 1600, h = 1000) => ({ src: `/dheenex-one/${name}.webp`, width: w, height: h });

const ROLES = [
  {
    id: "owner",
    label: "Owner / Admin",
    icon: Crown,
    tone: "teal",
    headline: "The full picture, every morning",
    benefits: ["See attendance, leave, tasks and meetings for today at a glance", "Approve leave in one click from the dashboard", "Track quotations, unpaid invoices and project deadlines", "Decide who can open what with roles and permissions"],
    shot: { ...img("admin-dashboard"), alt: "Admin dashboard with KPI cards, leave approvals and month calendar", caption: "Admin dashboard" },
  },
  {
    id: "hr",
    label: "HR",
    icon: HeartHandshake,
    tone: "lavender",
    headline: "Less paperwork, more people work",
    benefits: ["Invite staff and check their documents in one place", "Leave balances and holiday calendar kept for you", "Monthly payroll with PF and ESI, payslips by email or WhatsApp", "Attendance, leave and payroll reports in Excel or PDF"],
    shot: { ...img("payroll"), alt: "Payroll page with the monthly payroll run and payslips", caption: "Payroll" },
  },
  {
    id: "manager",
    label: "Manager / Team Lead",
    icon: UsersRound,
    tone: "sky",
    headline: "Keep the team on track",
    benefits: ["Build project teams and assign tasks", "See progress, tasks done and days left per project", "Approve your team's leave and check who is in today", "Run performance reviews and set goals"],
    shot: { ...img("project-detail"), alt: "Project page with progress, team size, tasks done and days left", caption: "Project page" },
  },
  {
    id: "employee",
    label: "Employee",
    icon: UserRound,
    tone: "mint",
    headline: "Everything about my work in one app",
    benefits: ["Clock in and out from the web or the mobile app", "Apply for leave and see the balance", "See my tasks, deadlines and projects", "Download payslips and keep my documents in My Portal"],
    shot: { ...img("employee-dashboard"), alt: "Employee dashboard with pending tasks, upcoming leave, hours logged and documents", caption: "Employee dashboard" },
    phone: { ...img("phone-employee-dashboard", 780, 1688), alt: "Employee dashboard on a phone" },
  },
  {
    id: "intern",
    label: "Intern / Student",
    icon: GraduationCap,
    tone: "lemon",
    headline: "Learn, practise and show progress",
    benefits: ["See attendance rate, tasks completed and leave balance", "Take MCQ and coding assessments online", "Get tasks from a mentor and mark them done", "Follow courses with lessons and certificates on the mobile app"],
    shot: { ...img("intern-dashboard"), alt: "Intern dashboard with attendance, tasks completed, leave balance and assessments", caption: "Intern dashboard" },
  },
  {
    id: "client",
    label: "Client",
    icon: Handshake,
    tone: "blush",
    headline: "Clients stay informed without calling you",
    benefits: ["Open quotations online and accept or reject them", "See their projects, invoices and payments in the client app", "Book meetings or visits and raise support tickets", "Get reminders before domain or hosting renewals"],
    shot: { ...img("client-detail"), alt: "A client's page in DheeneX One with contact details, services and projects", caption: "A client's page (what your team sees)" },
  },
];

export default function DheenexOneRoles() {
  const [active, setActive] = useState("owner");
  const lightbox = useLightbox();
  const reduce = useReducedMotion();
  const role = ROLES.find((r) => r.id === active);

  return (
    <Section id="roles">
      <SectionHeading
        eyebrow="Benefits for everyone"
        title="Made for every person in your organization"
        intro="Each person signs in and sees only what they need. Pick a role to see their screen."
      />

      <div role="tablist" aria-label="Roles" className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [scrollbar-width:none]">
        {ROLES.map((r) => {
          const on = r.id === active;
          return (
            <button
              key={r.id}
              role="tab"
              id={`role-tab-${r.id}`}
              aria-selected={on}
              aria-controls="role-panel"
              onClick={() => setActive(r.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                on ? "bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900" : "bg-brand-50 text-gray-700 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              <r.icon className="h-4 w-4" aria-hidden="true" /> {r.label}
            </button>
          );
        })}
      </div>

      <div id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${role.id}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={role.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid items-center gap-10 lg:grid-cols-[1.7fr_1fr]"
          >
            <div className="relative min-w-0 pb-6 sm:pr-12">
              <BrowserFrame {...role.shot} onOpen={() => lightbox.open(role.shot)} />
              {role.phone && (
                <div className="absolute -bottom-2 right-0 w-[96px] sm:w-[150px]">
                  <PhoneFrame {...role.phone} onOpen={() => lightbox.open(role.phone)} />
                </div>
              )}
            </div>
            <div>
              <IconBubble icon={role.icon} tone={role.tone} size="lg" />
              <h3 className="mt-5 text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{role.headline}</h3>
              <ul className="mt-6 space-y-3">
                {role.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-base text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-200" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">{role.shot.caption} · demo data</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox image={lightbox.image} onClose={lightbox.close} />
    </Section>
  );
}
