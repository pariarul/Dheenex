"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard, Users, CalendarCheck, Banknote, KanbanSquare, Handshake, ReceiptIndianRupee, Globe, School, BarChart3, Smartphone, CheckCircle2, ArrowRight, Sparkles,
} from "lucide-react";
import { Section, SectionHeading, BrowserFrame, PhoneFrame, Lightbox, useLightbox, IconBubble } from "@/components/dheenex-one/ui";

const IMG = (name, w = 1600, h = 1000) => ({ src: `/dheenex-one/${name}.webp`, width: w, height: h });

/**
 * Product tour. Every screen is a real DheeneX One screen with made-up demo data (company "Acme Technologies").
 * Text describes only what the product really does (see admin/src/app/dashboard and server/src).
 */
const AREAS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    tone: "teal",
    title: "See your whole day on one screen",
    what: "The home screen shows what needs your attention today: who is in, who is on leave, tasks due, client meetings and requests waiting for you.",
    steps: ["Sign in and land on the dashboard.", "Tap a coloured card (employees, leave, interns, departments) to open that list.", "Click any calendar day to see everything on that day."],
    benefit: "No more asking around. You know what is happening in under a minute.",
    features: ["KPI cards that open the page behind the number", "Month calendar with holidays, leave, birthdays and tasks", "Day details drawer: attendance, leave and tasks due for a day", "Leave approvals with one-click approve or reject", "Attendance chart, notice board and upcoming holidays"],
    shots: [
      { ...IMG("admin-dashboard"), alt: "DheeneX One admin dashboard with KPI cards, this week list, leave approvals and a teal month calendar", caption: "Admin dashboard" },
      { ...IMG("admin-day-details"), alt: "Day details drawer showing attendance, leave and tasks due for Monday 23 November", caption: "Day details (open any day on the calendar)" },
    ],
  },
  {
    id: "people",
    label: "People & HR",
    icon: Users,
    tone: "lavender",
    title: "All your people in one list",
    what: "Employees, interns, departments and site workers, each with a full profile: job, department, documents, salary details and joining date.",
    steps: ["Invite an employee by email.", "They finish their own profile and upload documents.", "HR checks the documents and marks onboarding done."],
    benefit: "One correct record per person instead of many spreadsheets.",
    features: ["Employee and intern profiles with documents", "Departments with heads, budgets and an org chart", "Site workers with daily wage, skill and bulk import", "Onboarding checklists, shifts and performance reviews", "Export to CSV or Excel any time"],
    shots: [
      { ...IMG("employees"), alt: "Employees page listing demo employees with role, status and department", caption: "Employees" },
      { ...IMG("departments"), alt: "Departments page with heads, members present today and monthly budget", caption: "Departments" },
    ],
  },
  {
    id: "attendance",
    label: "Attendance & Leave",
    icon: CalendarCheck,
    tone: "mint",
    title: "Check-in, check-out and leave without WhatsApp",
    what: "Staff clock in and out from the web or the mobile app. Leave requests go to the right approver, and balances update by themselves.",
    steps: ["Employee taps Clock In when they start work.", "They apply for leave with dates and a reason.", "The manager or HR approves it from the dashboard."],
    benefit: "Late arrivals, absences and leave balances are always up to date — no manual counting at month end.",
    features: ["Daily register with late, half day and absent", "Check-in location saved with each clock-in", "Annual, sick and unpaid leave with balances", "Holiday calendar for the whole organization", "Long-absence and late-arrival alerts"],
    shots: [
      { ...IMG("attendance"), alt: "Attendance page showing present, late, absent and on-leave counts for today", caption: "Attendance today" },
      { ...IMG("leave"), alt: "Leave management page with leave balances and a list of leave requests to approve", caption: "Leave requests" },
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    icon: Banknote,
    tone: "lemon",
    title: "Salary slips in a few clicks",
    what: "Run the monthly payroll from attendance and salary details. PF and ESI are worked out for the employees they apply to.",
    steps: ["Pick the month and check the list.", "Generate payslips for everyone.", "Send them by email or WhatsApp; employees also see them in My Portal."],
    benefit: "Fewer mistakes and no more typing payslips one by one.",
    features: ["Monthly payroll runs with totals", "Gross, basic, PF, ESI and other deductions", "Payslip PDF for every employee", "Send payslips by email or WhatsApp", "Payroll report in Excel, CSV or PDF"],
    shots: [{ ...IMG("payroll"), alt: "Payroll page showing the October payroll run and payslips of demo employees", caption: "Payroll" }],
  },
  {
    id: "projects",
    label: "Projects & Tasks",
    icon: KanbanSquare,
    tone: "sky",
    title: "Know where every project stands",
    what: "Create a project, build the team, split the work into tasks and follow progress, deadlines and hours.",
    steps: ["Create a project and link the client.", "Add team members and give each a role.", "Assign tasks; people move them from To Do to Done."],
    benefit: "Deadlines stop slipping because everyone sees what is due and who owns it.",
    features: ["Project list with progress, deadline and priority", "Team roles and access per project", "Task board: To Do, In Progress, Review, Done", "Milestones, checklists, comments and time logs", "Overdue and due-today views"],
    shots: [
      { ...IMG("projects"), alt: "Projects list with client, project admin, team, progress bar and deadline", caption: "Projects" },
      { ...IMG("project-detail"), alt: "One project page with progress, team, tasks done and days left", caption: "Project page" },
      { ...IMG("tasks"), alt: "Task list with assignee, status and due date", caption: "Tasks" },
    ],
  },
  {
    id: "clients",
    label: "Clients & Quotations",
    icon: Handshake,
    tone: "blush",
    title: "From first quote to happy client",
    what: "Keep every client in one place with contacts, websites, domains and renewals. Make a branded quotation and see when the client opens and accepts it.",
    steps: ["Add the client with contact person and needs.", "Create a quotation with items, GST and payment milestones.", "Send the link; the client views it and accepts or rejects online."],
    benefit: "Faster quotes and no lost follow-ups.",
    features: ["Client profiles with sites, domains and hosting expiry", "Renewal reminders for domains and hosting", "Quotations with GST, PDF and online accept / reject", "Leads and sales pipeline (CRM)", "Client bookings: meetings and visits"],
    shots: [
      { ...IMG("clients"), alt: "Client management page listing demo clients with contact, location and needs", caption: "Clients" },
      { ...IMG("quotations"), alt: "Quotations page with draft, sent, accepted and rejected quotations and total value", caption: "Quotations" },
    ],
  },
  {
    id: "invoices",
    label: "Invoices & Accounts",
    icon: ReceiptIndianRupee,
    tone: "mint",
    title: "GST invoices and payments that add up",
    what: "Raise GST invoices, record payments and see what is still unpaid. Inventory, purchases, expenses and accounts are part of the same system.",
    steps: ["Create an invoice for a customer (or from a quotation).", "Post it and share the PDF.", "Record payments as they come in; the balance updates."],
    benefit: "You always know who owes you money.",
    features: ["GST invoices with CGST / SGST / IGST", "Payments by bank, UPI, cash, cheque or card", "Unpaid and overdue invoice lists", "Inventory, purchases and expense claims", "Accounts and journals"],
    shots: [{ ...IMG("invoices"), alt: "Sales invoices list with status, total and balance, including paid and partly paid invoices", caption: "Invoices" }],
  },
  {
    id: "website",
    label: "Website builder",
    icon: Globe,
    tone: "lavender",
    title: "Your own website, no developer needed",
    what: "Build your organization's website from ready blocks: banner, text, images, gallery, courses and a contact form whose messages land in Enquiries.",
    steps: ["Pick a page and add blocks.", "Type your text and choose images.", "Press Publish — visitors see the new version."],
    benefit: "Update your website in minutes, by yourself.",
    features: ["Pages, menus and image library", "Draft and publish, with unpublished-changes notice", "Contact form that creates enquiries", "Search title and description per page", "Your own domain"],
    shots: [{ ...IMG("website-builder"), alt: "Website page editor with a hero banner block and page settings", caption: "Website page editor" }],
  },
  {
    id: "college",
    label: "College & Assessments",
    icon: School,
    tone: "sky",
    title: "Colleges, students and tests together",
    what: "Partner colleges with their staff, classes and students. Run MCQ and coding tests and see the results.",
    steps: ["Add a college, its classes and students (or import them).", "Create an assessment for a college, a class or interns.", "Students take it online; scores come in automatically."],
    benefit: "Placement and training results without paper or spreadsheets.",
    features: ["Colleges, classes and student records", "College staff logins for their own college", "MCQ and JavaScript coding questions", "Coding answers run in a safe sandbox", "Results by college or intern batch"],
    shots: [
      { ...IMG("colleges"), alt: "Colleges page listing demo partner colleges with students and licence status", caption: "Colleges" },
      { ...IMG("assessments"), alt: "Assessments page with an MCQ quiz and a mixed campus placement test", caption: "Assessments" },
    ],
  },
  {
    id: "reports",
    label: "Reports & Access",
    icon: BarChart3,
    tone: "lemon",
    title: "Reports and the right access for everyone",
    what: "Download ready reports and decide exactly who can open what. Every important change is written to the activity log.",
    steps: ["Open Reports and pick a report and dates.", "Preview it, then download Excel, CSV or PDF.", "On Roles & Permissions, switch modules on or off per role."],
    benefit: "Clear numbers for decisions, and staff only see what they should.",
    features: ["Headcount, attendance, leave, payroll and project reports", "Custom report builder", "Built-in roles plus your own custom roles", "Activity log of who changed what", "Idle sign-out and security settings"],
    shots: [
      { ...IMG("reports"), alt: "Reports and analytics page with headcount, attendance, leave and payroll report cards", caption: "Reports" },
      { ...IMG("roles"), alt: "Roles and permissions page listing built-in roles with modules open", caption: "Roles & permissions" },
    ],
  },
  {
    id: "mobile",
    label: "On your phone",
    icon: Smartphone,
    tone: "teal",
    title: "Works on any phone",
    what: "DheeneX One works in the phone browser, and there is a mobile app for employees and for your clients.",
    steps: ["Open DheeneX One on your phone and sign in.", "Employees clock in, apply for leave and see tasks.", "Clients see their projects, invoices, quotations and book meetings in their app."],
    benefit: "Your team and clients use it wherever they are.",
    features: ["Phone-friendly screens for every page", "Employee app: attendance, leave, tasks, payslips, courses", "Client app: projects, invoices, quotations, support tickets", "Notifications for approvals and updates"],
    phones: [
      { ...IMG("phone-admin-dashboard", 780, 1688), alt: "Admin dashboard on a phone screen", caption: "Admin on a phone" },
      { ...IMG("phone-employee-dashboard", 780, 1688), alt: "Employee dashboard on a phone screen with pending tasks and hours logged", caption: "Employee on a phone" },
    ],
  },
];

export default function DheenexOneTour() {
  const [active, setActive] = useState(AREAS[0].id);
  const [shotIndex, setShotIndex] = useState(0);
  const lightbox = useLightbox();
  const reduce = useReducedMotion();
  const area = AREAS.find((a) => a.id === active);
  const shots = area.shots ?? [];
  const shot = shots[Math.min(shotIndex, shots.length - 1)];

  const pick = (id) => {
    setActive(id);
    setShotIndex(0);
  };

  return (
    <Section id="tour" tone="soft">
      <SectionHeading
        eyebrow="Product tour"
        title="See DheeneX One in action"
        intro="Real screens from the product, filled with demo data. Pick an area to see what it does, how you use it and what you gain."
      />

      {/* Area picker: a scrollable chip row on phones, a list on large screens */}
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
        <div role="tablist" aria-label="Product areas" aria-orientation="vertical" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [scrollbar-width:none]">
          {AREAS.map((a) => {
            const on = a.id === active;
            return (
              <button
                key={a.id}
                role="tab"
                id={`tour-tab-${a.id}`}
                aria-selected={on}
                aria-controls="tour-panel"
                onClick={() => pick(a.id)}
                className={`flex shrink-0 items-center gap-3 rounded-full lg:rounded-2xl px-4 py-2.5 lg:py-3 text-left text-sm font-medium transition ${
                  on
                    ? "bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900"
                    : "bg-white text-gray-700 hover:bg-white/70 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <a.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">{a.label}</span>
              </button>
            );
          })}
        </div>

        <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${area.id}`} className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={area.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6"
            >
              {/* Screens */}
              <div className="min-w-0">
                {area.phones ? (
                  <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10 rounded-3xl bg-white/60 p-6 sm:p-10 dark:bg-gray-900/60">
                    {area.phones.map((p) => (
                      <div key={p.src} className="w-[200px] sm:w-[240px] text-center">
                        <PhoneFrame {...p} onOpen={() => lightbox.open(p)} />
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{p.caption}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <BrowserFrame {...shot} onOpen={() => lightbox.open(shot)} />
                    {shots.length > 1 && (
                      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="More screens">
                        {shots.map((s, i) => (
                          <button
                            key={s.src}
                            type="button"
                            aria-pressed={i === shotIndex}
                            onClick={() => setShotIndex(i)}
                            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                              i === shotIndex ? "bg-brand-600 text-white" : "bg-white text-gray-700 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                            }`}
                          >
                            {s.caption}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Explanation */}
              <div className="grid gap-6 rounded-3xl bg-white p-6 sm:p-8 shadow-sm dark:bg-gray-900 md:grid-cols-2 md:gap-10">
                <div>
                <div className="flex items-center gap-3">
                  <IconBubble icon={area.icon} tone={area.tone} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{area.title}</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">{area.what}</p>

                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">How you use it</p>
                <ol className="mt-3 space-y-2.5">
                  {area.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[11px] font-semibold text-white">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>

                </div>
                <div>
                <div className="flex gap-3 rounded-2xl bg-mint-soft p-4 dark:bg-emerald-500/10">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
                  <p className="text-sm text-emerald-900 dark:text-emerald-100"><span className="font-semibold">Benefit: </span>{area.benefit}</p>
                </div>

                <ul className="mt-6 space-y-2">
                  {area.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-200" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Screens show made-up demo data. <a href="#pricing" className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline dark:text-brand-200">Try it with your own data <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
      </p>

      <Lightbox image={lightbox.image} onClose={lightbox.close} />
    </Section>
  );
}
