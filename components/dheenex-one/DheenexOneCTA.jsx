"use client";

import { ArrowRight, ChevronDown, PlayCircle } from "lucide-react";
import { Section, SectionHeading, Reveal, btn } from "@/components/dheenex-one/ui";

const FAQ = [
  { q: "What is DheeneX One?", a: "One online app to run your organization: people, attendance and leave, payroll, projects and tasks, clients and quotations, invoices, your website and college work." },
  { q: "Do my staff need to install anything?", a: "No. DheeneX One works in any browser on a computer or phone. Employees and clients can also use the mobile app." },
  { q: "Can I use only some modules?", a: "Yes. Each plan includes a set of modules, and inside your organization you choose which roles can open which modules." },
  { q: "Who can see our data?", a: "Only people you add to your organization, and only the modules their role allows. Each organization's data is kept separate." },
  { q: "Can you help us set up?", a: "Yes. Our team can help you add departments, people and your first projects during the trial." },
];

/** Product questions (pricing questions live in the pricing section). */
export function DheenexOneFAQ() {
  return (
    <Section id="faq" tone="soft">
      <SectionHeading eyebrow="FAQ" title="Questions people ask" />
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.04}>
            <details className="group rounded-2xl border border-gray-200/80 bg-white px-5 py-4 shadow-sm open:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-gray-900 dark:text-white">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default function DheenexOneCTA() {
  return (
    <section className="bg-white px-4 py-20 dark:bg-gray-900 sm:px-6 md:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-brand-600 px-6 py-14 text-center text-white shadow-2xl shadow-brand-600/20 sm:px-12 md:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-200/20 blur-2xl" aria-hidden="true" />
        <h2 className="relative text-3xl font-semibold tracking-tight md:text-5xl">Bring your whole team into one place</h2>
        <p className="relative mx-auto mt-5 max-w-2xl text-lg text-brand-100">Try DheeneX One free for 14 days. No card needed. Cancel any time.</p>
        <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#pricing" className={`${btn.primary} bg-white text-gray-900 hover:bg-gray-100 dark:bg-white dark:text-gray-900`}>
            Start 14-day free trial <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a href="#tour" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10">
            <PlayCircle className="h-5 w-5" aria-hidden="true" /> See how it works
          </a>
        </div>
      </Reveal>
    </section>
  );
}
