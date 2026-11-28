"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2, MinusCircle, Users, HardDrive, Clock, Sparkles, RefreshCw, ChevronDown, Gift, X, ArrowRight, Info, Target, Layers,
} from "lucide-react";
import PricingSignupModal from "@/components/dheenex-one/PricingSignupModal";
import { SectionHeading, Reveal } from "@/components/dheenex-one/ui";
import Swipe from "@/components/Swipe";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const formatPrice = (amount, currency = "INR") => {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  }
};

const usersText = (n) => (n == null ? "Unlimited users" : `Up to ${n.toLocaleString("en-IN")} users`);
const storageText = (mb) => (mb == null ? "Unlimited storage" : mb >= 1024 ? `${Math.round(mb / 1024)} GB storage` : `${mb} MB storage`);
/** Percent saved by paying yearly instead of 12 months (0 when not cheaper). */
const yearlySaving = (p) => (p.priceMonthly > 0 && p.priceYearly > 0 ? Math.max(0, Math.round((1 - p.priceYearly / (p.priceMonthly * 12)) * 100)) : 0);

/** Plain one-line explanation of each module (falls back to the description the API sends). */
const MODULE_HELP = {
  HRMS: "People and HR: employees, interns, departments, attendance, leave, shifts, onboarding, reviews and payroll.",
  PROJECTS: "Projects with teams, task boards, deadlines and progress.",
  CRM: "Clients, enquiries, quotations, renewal reminders, leads and the sales pipeline.",
  HELPDESK: "Support tickets from your staff and clients, with replies and status.",
  LMS: "Courses with lessons and certificates, plus MCQ and coding assessments.",
  CAMPUS: "College work: colleges, classes, college staff and students, with campus records.",
  ERP: "Inventory, purchases, sales with GST invoices, expense claims and accounts.",
  CMS: "Your organization's website: pages, images and menus on your own domain.",
  AUTOMATION: "Automatic triggers, approval steps and scheduled follow-ups.",
  AI: "AI chatbot, insights, summaries and reports.",
  DEVELOPER: "API keys, public API, webhooks and OAuth apps for your developers.",
};
const moduleHelp = (m) => MODULE_HELP[m.key] || m.description || "";

/** "Best for" text from the plan's modules. */
function bestFor(plan) {
  const k = new Set(plan.modules.map((m) => m.key));
  if (k.size >= 8) return "Large companies and groups that want every module";
  if (k.has("CAMPUS")) return "Colleges and universities";
  if (k.has("HRMS") && k.has("ERP")) return "Growing companies with staff, projects and billing";
  if (k.has("LMS")) return "Training institutes and coaching centres";
  if (k.has("CRM")) return "Agencies and service businesses that win clients online";
  if (k.has("CMS")) return "Small shops and businesses that need a website";
  return "Organizations of any size";
}

function Skeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading plans">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 animate-pulse">
          <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-800 mb-4" />
          <div className="h-10 w-40 rounded bg-gray-200 dark:bg-gray-800 mb-6" />
          {[0, 1, 2, 3].map((j) => (
            <div key={j} className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800 mb-3" />
          ))}
          <div className="h-11 w-full rounded-full bg-gray-200 dark:bg-gray-800 mt-6" />
        </div>
      ))}
    </div>
  );
}

const Yes = ({ label }) => (
  <span className="inline-flex justify-center">
    <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-200" aria-hidden="true" />
    <span className="sr-only">{label ? `${label}: included` : "Included"}</span>
  </span>
);
const No = ({ label }) => (
  <span className="inline-flex justify-center">
    <MinusCircle className="h-5 w-5 text-gray-300 dark:text-gray-600" aria-hidden="true" />
    <span className="sr-only">{label ? `${label}: not included` : "Not included"}</span>
  </span>
);

function PriceBlock({ plan, cycle, big = true }) {
  const yearly = cycle === "YEARLY";
  const price = yearly ? plan.priceYearly : plan.priceMonthly;
  const saving = yearlySaving(plan);
  if (!(price > 0)) return <span className="text-2xl font-semibold text-gray-900 dark:text-white">Not sold {yearly ? "yearly" : "monthly"}</span>;
  return (
    <>
      <span className={`${big ? "text-4xl" : "text-2xl"} font-semibold tracking-tight text-gray-900 dark:text-white`}>{formatPrice(price, plan.currency)}</span>
      <span className="text-gray-500 dark:text-gray-400"> / {yearly ? "year" : "month"}</span>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {yearly ? `${formatPrice(Math.round(plan.priceYearly / 12), plan.currency)} per month${saving ? `, save ${saving}%` : ""} · plus GST` : "Plus GST, billed monthly"}
      </p>
      {yearly && plan.yearlyNote && <p className="mt-1 text-xs text-brand-600 dark:text-brand-200">{plan.yearlyNote}</p>}
    </>
  );
}

function PlanCard({ plan, cycle, popular, onPick, onDetails }) {
  const sold = (cycle === "YEARLY" ? plan.priceYearly : plan.priceMonthly) > 0;
  return (
    <Reveal
      className={`relative flex w-[86%] shrink-0 snap-start flex-col rounded-3xl bg-white p-5 sm:p-8 transition duration-300 md:w-auto md:hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-900 ${
        popular ? "border-2 border-brand-600 shadow-xl shadow-brand-600/10" : "border border-gray-200/80 shadow-sm dark:border-gray-800"
      }`}
    >
      {popular && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {plan.badge || "Most popular"}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mint-soft px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
          <Gift className="h-3.5 w-3.5" aria-hidden="true" /> {plan.trialDays}-day trial
        </span>
      </div>
      {(plan.tagline || plan.description) && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{plan.tagline || plan.description}</p>}

      <div className="mt-6">
        <PriceBlock plan={plan} cycle={cycle} />
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
        <li className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 dark:bg-gray-800"><Users className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {plan.limits?.maxUsers == null ? "Unlimited" : plan.limits.maxUsers.toLocaleString("en-IN")} users</li>
        <li className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 dark:bg-gray-800"><HardDrive className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {storageText(plan.limits?.storageMb).replace(" storage", "")}</li>
      </ul>

      <div className="mt-6 flex-1 border-t border-gray-100 pt-5 dark:border-gray-800">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Included modules</p>
        <ul className="space-y-2 text-sm">
          {plan.modules.map((m) => (
            <li key={m.key} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {m.name}
            </li>
          ))}
          {plan.features.map((f) => (
            <li key={f.text} className={`flex items-start gap-2 ${f.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}>
              {f.included ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" /> : <MinusCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
              <span>{f.text}{!f.included && <span className="sr-only"> (not included)</span>}</span>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => onDetails(plan)} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-200">
          View full details <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onPick(plan, "SIGNUP")}
          className={`w-full rounded-full px-6 py-3 font-semibold transition ${
            popular ? "bg-gray-900 text-white shadow-lg hover:bg-black dark:bg-white dark:text-gray-900" : "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-gray-800 dark:text-brand-200 dark:hover:bg-gray-700"
          }`}
        >
          Start {plan.trialDays}-day free trial
        </button>
        <button
          type="button"
          disabled={!sold}
          onClick={() => onPick(plan, "BUY")}
          className="w-full rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          Buy now
        </button>
      </div>
    </Reveal>
  );
}

/** Everything about one plan, in a dialog. Escape closes; Tab stays inside. */
function PlanDetails({ plan, plans, cycle, onClose, onPick }) {
  const panelRef = useRef(null);
  useEffect(() => {
    if (!plan) return;
    const prev = document.activeElement;
    const focusables = () => [...(panelRef.current?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])') ?? [])].filter((el) => !el.disabled);
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [plan, onClose]);

  if (!plan) return null;
  const saving = yearlySaving(plan);
  const have = new Set(plan.modules.map((m) => m.key));
  const all = [];
  for (const p of plans) for (const m of p.modules) if (!all.some((x) => x.key === m.key)) all.push(m);
  const missing = all.filter((m) => !have.has(m.key));
  // The cheapest other plan that includes a missing module
  const upgradeFor = (key) =>
    plans
      .filter((p) => p.id !== plan.id && p.modules.some((m) => m.key === key))
      .sort((a, b) => (a.priceMonthly || Infinity) - (b.priceMonthly || Infinity))[0];
  const sold = (cycle === "YEARLY" ? plan.priceYearly : plan.priceMonthly) > 0;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-gray-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-details-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-gray-900 sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 bg-brand-50 px-5 py-4 dark:border-gray-800 dark:bg-gray-800 sm:gap-4 sm:px-8 sm:py-5">
          <div className="flex items-start gap-3">
            <img src="/dheenex-one/dheenex-one-mark.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 dark:hidden" />
            <img src="/dheenex-one/dheenex-one-mark-white.png" alt="" width={44} height={44} className="hidden h-11 w-11 shrink-0 dark:block" />
            <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-200">Plan details</p>
            <h3 id="plan-details-title" className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
            {(plan.tagline || plan.description) && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{plan.tagline || plan.description}</p>}
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close plan details" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:text-gray-900 dark:bg-gray-900 dark:text-gray-300">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Monthly</p>
              <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{plan.priceMonthly > 0 ? formatPrice(plan.priceMonthly, plan.currency) : "Not sold monthly"}<span className="text-sm font-normal text-gray-500"> {plan.priceMonthly > 0 ? "/ month" : ""}</span></p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Yearly</p>
              <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{plan.priceYearly > 0 ? formatPrice(plan.priceYearly, plan.currency) : "Not sold yearly"}<span className="text-sm font-normal text-gray-500"> {plan.priceYearly > 0 ? "/ year" : ""}</span></p>
              {saving > 0 && <p className="mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">Save {saving}% compared with monthly</p>}
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Prices exclude GST.</p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-3 text-sm">
            <li className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2.5 text-gray-800 dark:bg-gray-800 dark:text-gray-200"><Clock className="h-4 w-4 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {plan.trialDays}-day free trial</li>
            <li className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2.5 text-gray-800 dark:bg-gray-800 dark:text-gray-200"><Users className="h-4 w-4 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {usersText(plan.limits?.maxUsers)}</li>
            <li className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2.5 text-gray-800 dark:bg-gray-800 dark:text-gray-200"><HardDrive className="h-4 w-4 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {storageText(plan.limits?.storageMb)}</li>
          </ul>

          <div className="mt-6 flex gap-3 rounded-2xl bg-lemon-soft p-4 dark:bg-amber-500/10">
            <Target className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" />
            <p className="text-sm text-amber-900 dark:text-amber-100"><span className="font-semibold">Best for: </span>{bestFor(plan)}</p>
          </div>

          <h4 className="mt-7 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"><Layers className="h-4 w-4" aria-hidden="true" /> What&apos;s included</h4>
          <ul className="mt-3 space-y-3">
            {plan.modules.map((m) => (
              <li key={m.key} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-200" aria-hidden="true" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{m.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{moduleHelp(m)}</p>
                </div>
              </li>
            ))}
            {plan.features.filter((f) => f.included).map((f) => (
              <li key={f.text} className="flex gap-3 text-gray-800 dark:text-gray-200"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /> {f.text}</li>
            ))}
          </ul>

          {(missing.length > 0 || plan.features.some((f) => !f.included)) && (
            <>
              <h4 className="mt-7 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Not included</h4>
              <ul className="mt-3 space-y-2.5">
                {missing.map((m) => {
                  const up = upgradeFor(m.key);
                  return (
                    <li key={m.key} className="flex gap-3">
                      <MinusCircle className="mt-0.5 h-5 w-5 shrink-0 text-gray-300 dark:text-gray-600" aria-hidden="true" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-800 dark:text-gray-200">{m.name}</span>
                        {up && <span> — upgrade to {up.name} to get it.</span>}
                      </p>
                    </li>
                  );
                })}
                {plan.features.filter((f) => !f.included).map((f) => (
                  <li key={f.text} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400"><MinusCircle className="mt-0.5 h-5 w-5 shrink-0 text-gray-300" aria-hidden="true" /> {f.text}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-gray-100 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-gray-800 sm:flex-row sm:justify-end sm:gap-3 sm:px-8 sm:py-4">
          <button type="button" disabled={!sold} onClick={() => onPick(plan, "BUY")} className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
            Buy now
          </button>
          <button type="button" onClick={() => onPick(plan, "SIGNUP")} className="rounded-full bg-gray-900 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-black dark:bg-white dark:text-gray-900">
            Start {plan.trialDays}-day free trial
          </button>
        </div>
      </div>
    </div>
  );
}

/** One collapsible group of rows in the compare table. */
function Group({ title, open, onToggle, colSpan, children }) {
  return (
    <tbody>
      <tr className="bg-gray-50 dark:bg-gray-800/60">
        <th colSpan={colSpan} scope="colgroup" className="p-0 text-left">
          <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-300">
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`} aria-hidden="true" /> {title}
          </button>
        </th>
      </tr>
      {open && children}
    </tbody>
  );
}

function CompareSection({ plans, cycle, popularId, onPick, onDetails }) {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState({ limits: true, modules: true, extras: true });
  const [explain, setExplain] = useState(null);
  const [mobilePlan, setMobilePlan] = useState(popularId);
  const reduce = useReducedMotion();
  const yearly = cycle === "YEARLY";

  const modules = [];
  for (const p of plans) for (const m of p.modules) if (!modules.some((x) => x.key === m.key)) modules.push(m);
  const extras = [];
  for (const p of plans) for (const f of p.features) if (!extras.includes(f.text)) extras.push(f.text);
  const hasExtra = (p, text) => p.features.some((f) => f.text === text && f.included);
  const toggle = (k) => setGroups((g) => ({ ...g, [k]: !g[k] }));
  const colSpan = plans.length + 1;
  const stickyCol = "sticky left-0 z-10 bg-white dark:bg-gray-900";
  const popCol = (p) => (p.id === popularId ? "bg-brand-50/70 dark:bg-brand-500/10" : "");
  const limitRows = [
    { icon: Users, label: "Users", value: (p) => (p.limits?.maxUsers == null ? "Unlimited" : p.limits.maxUsers.toLocaleString("en-IN")) },
    { icon: HardDrive, label: "Storage", value: (p) => storageText(p.limits?.storageMb).replace(" storage", "") },
    { icon: Clock, label: "Free trial", value: (p) => `${p.trialDays} days` },
  ];
  const mp = plans.find((p) => p.id === mobilePlan) ?? plans[0];

  return (
    <div className="mt-12 md:mt-16">
      <div className="text-center">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="compare-plans"
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          {open ? "Hide plan comparison" : "Compare all plans"}
          <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Prices exclude GST.</p>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="compare-plans"
            key="compare"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            {/* Phones: pick one plan and read its list */}
            <div className="mt-8 md:hidden">
              <label htmlFor="compare-plan-pick" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Show plan</label>
              <select id="compare-plan-pick" value={mp.id} onChange={(e) => setMobilePlan(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <div className="mt-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <PriceBlock plan={mp} cycle={cycle} big={false} />
                <ul className="mt-4 space-y-2 text-sm">
                  {limitRows.map((r) => (
                    <li key={r.label} className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2 dark:border-gray-800">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><r.icon className="h-4 w-4 text-brand-600 dark:text-brand-200" aria-hidden="true" />{r.label}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{r.value(mp)}</span>
                    </li>
                  ))}
                  {modules.map((m) => {
                    const inc = mp.modules.some((x) => x.key === m.key);
                    return (
                      <li key={m.key} className="flex items-start justify-between gap-3 border-b border-gray-100 pb-2 last:border-0 dark:border-gray-800">
                        <span className={inc ? "text-gray-800 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}>
                          {m.name}
                          <span className="block text-xs text-gray-500 dark:text-gray-400">{moduleHelp(m)}</span>
                        </span>
                        {inc ? <Yes label={m.name} /> : <No label={m.name} />}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-5 flex flex-col gap-2">
                  <button type="button" onClick={() => onPick(mp, "SIGNUP")} className="rounded-full bg-gray-900 px-6 py-3 font-semibold text-white dark:bg-white dark:text-gray-900">Start {mp.trialDays}-day free trial</button>
                  <button type="button" onClick={() => onDetails(mp)} className="rounded-full px-6 py-2 text-sm font-semibold text-brand-600 dark:text-brand-200">View full details</button>
                </div>
              </div>
            </div>

            {/* Tablets and computers: full table */}
            <div className="mt-8 hidden md:block overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-900">
              <table className="w-full min-w-[820px] border-collapse text-sm">
                <caption className="sr-only">Compare DheeneX One plans</caption>
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th scope="col" className={`${stickyCol} w-56 px-4 py-5 text-left align-bottom text-base font-semibold text-gray-900 dark:text-white`}>Plans</th>
                    {plans.map((p) => {
                      const price = yearly ? p.priceYearly : p.priceMonthly;
                      return (
                        <th key={p.id} scope="col" className={`px-3 py-5 text-center align-top ${popCol(p)}`}>
                          {p.id === popularId && <span className="mb-2 inline-block rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">Most popular</span>}
                          <span className="block font-semibold text-gray-900 dark:text-white">{p.name}</span>
                          <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{price > 0 ? `${formatPrice(price, p.currency)} / ${yearly ? "yr" : "mo"}` : "—"}</span>
                          <button type="button" onClick={() => onPick(p, "SIGNUP")} className="mt-3 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black dark:bg-white dark:text-gray-900">Start trial</button>
                          <button type="button" onClick={() => onDetails(p)} className="mt-1.5 block w-full text-xs font-medium text-brand-600 hover:underline dark:text-brand-200">View full details</button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <Group title="Limits" open={groups.limits} onToggle={() => toggle("limits")} colSpan={colSpan}>
                  {limitRows.map((r, i) => (
                    <tr key={r.label} className={`border-t border-gray-100 dark:border-gray-800 ${i % 2 ? "bg-gray-50/40 dark:bg-gray-800/20" : ""}`}>
                      <th scope="row" className={`${stickyCol} px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300`}>
                        <span className="flex items-center gap-2"><r.icon className="h-4 w-4 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {r.label}</span>
                      </th>
                      {plans.map((p) => (
                        <td key={p.id} className={`px-3 py-3 text-center text-gray-800 dark:text-gray-200 ${popCol(p)}`}>{r.value(p)}</td>
                      ))}
                    </tr>
                  ))}
                </Group>

                <Group title="Modules" open={groups.modules} onToggle={() => toggle("modules")} colSpan={colSpan}>
                  {modules.map((m, i) => {
                    const shown = explain === m.key;
                    return [
                      <tr key={m.key} className={`border-t border-gray-100 dark:border-gray-800 ${i % 2 ? "bg-gray-50/40 dark:bg-gray-800/20" : ""}`}>
                        <th scope="row" className={`${stickyCol} px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300`}>
                          <button type="button" onClick={() => setExplain(shown ? null : m.key)} aria-expanded={shown} className="flex items-center gap-2 text-left hover:text-gray-900 dark:hover:text-white">
                            <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${shown ? "" : "-rotate-90"}`} aria-hidden="true" />
                            {m.name}
                          </button>
                        </th>
                        {plans.map((p) => (
                          <td key={p.id} className={`px-3 py-3 text-center ${popCol(p)}`}>{p.modules.some((x) => x.key === m.key) ? <Yes label={m.name} /> : <No label={m.name} />}</td>
                        ))}
                      </tr>,
                      shown && (
                        <tr key={`${m.key}-help`} className="bg-brand-50/60 dark:bg-gray-800/40">
                          <td colSpan={colSpan} className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300">
                            <span className="flex items-start gap-2"><Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-200" aria-hidden="true" /> {moduleHelp(m)}</span>
                          </td>
                        </tr>
                      ),
                    ];
                  })}
                </Group>

                {extras.length > 0 && (
                  <Group title="Support & extras" open={groups.extras} onToggle={() => toggle("extras")} colSpan={colSpan}>
                    {extras.map((text, i) => (
                      <tr key={text} className={`border-t border-gray-100 dark:border-gray-800 ${i % 2 ? "bg-gray-50/40 dark:bg-gray-800/20" : ""}`}>
                        <th scope="row" className={`${stickyCol} px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300`}>{text}</th>
                        {plans.map((p) => (
                          <td key={p.id} className={`px-3 py-3 text-center ${popCol(p)}`}>{hasExtra(p, text) ? <Yes label={text} /> : <No label={text} />}</td>
                        ))}
                      </tr>
                    ))}
                  </Group>
                )}
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FAQ = [
  { q: "Do I need a card for the free trial?", a: "No. Start your free trial with just your email. You only pay if you decide to continue after the trial." },
  { q: "Can I cancel anytime?", a: "Yes. Turn off automatic renewal from Billing whenever you like. Your plan stays active until the end of the period you paid for." },
  { q: "Can I upgrade or change my plan later?", a: "Yes. Move to a bigger plan at any time from Billing. Upgrades start straight away and you only pay the difference for the days left." },
  { q: "Is my data safe?", a: "Each organization's data is kept separate from every other and travels over encrypted connections. It is not deleted when a trial or plan ends." },
];

/** Public pricing: live plans from GET /public/plans, monthly or yearly, with trial and buy buttons. */
export default function DheenexOnePricing() {
  const [plans, setPlans] = useState(null);
  const [failed, setFailed] = useState(false);
  const [cycle, setCycle] = useState("MONTHLY");
  const [choice, setChoice] = useState(null);
  const [details, setDetails] = useState(null);

  const load = useCallback(async () => {
    setFailed(false);
    setPlans(null);
    try {
      const res = await fetch(`${API_URL}/public/plans`, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("bad response");
      setPlans(data);
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const bestSaving = useMemo(() => Math.max(0, ...(plans ?? []).map(yearlySaving)), [plans]);
  const popularId = useMemo(() => {
    if (!plans?.length) return null;
    return (plans.find((p) => p.highlighted) ?? plans[Math.floor((plans.length - 1) / 2)]).id;
  }, [plans]);
  const closeModal = useCallback(() => setChoice(null), []);
  const closeDetails = useCallback(() => setDetails(null), []);
  const pick = useCallback((plan, kind) => {
    setDetails(null);
    setChoice({ plan, kind, cycle });
  }, [cycle]);

  return (
    <section id="pricing" className="scroll-mt-20 md:scroll-mt-24 bg-white py-14 dark:bg-gray-900 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Pricing" title="Simple plans for every organization" intro="Start with a free trial, no card needed. Upgrade, change or cancel whenever you like." />

        <div className="-mt-2 md:-mt-6 mb-10 md:mb-12 text-center">
          <div className="inline-flex items-center rounded-full bg-brand-50 p-1 dark:bg-gray-800" role="group" aria-label="Billing cycle">
            {[
              { id: "MONTHLY", label: "Monthly" },
              { id: "YEARLY", label: "Yearly" },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cycle === c.id}
                onClick={() => setCycle(c.id)}
                className={`rounded-full px-5 py-2.5 sm:py-2 text-sm font-semibold transition ${
                  cycle === c.id ? "bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {c.label}
                {c.id === "YEARLY" && bestSaving > 0 && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${cycle === c.id ? "bg-white/20 text-white dark:bg-gray-900/10 dark:text-gray-900" : "bg-mint-soft text-emerald-800"}`}>Save up to {bestSaving}%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {failed ? (
          <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-gray-50 p-10 text-center dark:border-gray-800 dark:bg-gray-800/50" role="alert">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">We couldn&apos;t load our plans right now</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Please check your connection and try again in a moment.</p>
            <button type="button" onClick={load} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-black">
              <RefreshCw className="h-4 w-4" aria-hidden="true" /> Try again
            </button>
          </div>
        ) : !plans ? (
          <Skeleton />
        ) : plans.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Plans will be listed here soon. Please contact us for pricing.</p>
        ) : (
          <>
            {/* Phones: swipe between plans (next plan peeks in). Tablets and up: the grid. */}
            <Swipe
              pages={plans.length}
              start={Math.max(0, plans.findIndex((p) => p.id === popularId))}
              label="Plans"
              className="-mx-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 pb-4 pt-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 md:pt-3 lg:grid-cols-3"
            >
              {plans.map((p) => (
                <PlanCard key={p.id} plan={p} cycle={cycle} popular={p.id === popularId} onPick={pick} onDetails={setDetails} />
              ))}
            </Swipe>
            <CompareSection plans={plans} cycle={cycle} popularId={popularId} onPick={pick} onDetails={setDetails} />
          </>
        )}

        <div className="mx-auto mt-14 md:mt-20 max-w-3xl">
          <h3 className="mb-6 md:mb-8 text-center text-2xl font-semibold text-gray-900 dark:text-white">Pricing questions</h3>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-gray-200/80 bg-white px-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-gray-900 dark:text-white">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="-mt-1 pb-4 text-sm text-gray-600 dark:text-gray-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <PlanDetails plan={details} plans={plans ?? []} cycle={cycle} onClose={closeDetails} onPick={pick} />
      <PricingSignupModal choice={choice} onClose={closeModal} formatPrice={formatPrice} />
    </section>
  );
}
