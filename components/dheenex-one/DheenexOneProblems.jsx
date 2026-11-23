"use client";

import { FileSpreadsheet, MessageCircle, ListX, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading, Reveal, IconBubble, card } from "@/components/dheenex-one/ui";

const ITEMS = [
  {
    icon: FileSpreadsheet,
    tone: "lemon",
    problem: "Staff details live in many spreadsheets",
    fix: "One profile per person with documents, salary details and history.",
  },
  {
    icon: MessageCircle,
    tone: "blush",
    problem: "Leave is asked on WhatsApp and forgotten",
    fix: "Leave requests go to the approver, and balances update by themselves.",
  },
  {
    icon: ListX,
    tone: "lavender",
    problem: "Tasks and deadlines get lost",
    fix: "Projects, task boards and due dates everyone can see.",
  },
  {
    icon: Layers,
    tone: "sky",
    problem: "A different tool for every job",
    fix: "HR, payroll, projects, clients, invoices and website in one login.",
  },
];

export default function DheenexOneProblems() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why DheeneX One"
        title="Stop juggling tools. Start running things."
        intro="Most teams lose hours every week to scattered files and chats. DheeneX One fixes the everyday problems."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it, i) => (
          <Reveal key={it.problem} delay={i * 0.06} className={`${card} p-6 flex flex-col`}>
            <IconBubble icon={it.icon} tone={it.tone} />
            <p className="mt-5 text-sm font-medium text-gray-500 line-through decoration-gray-300 dark:text-gray-400 dark:decoration-gray-600">{it.problem}</p>
            <ArrowRight className="my-3 h-4 w-4 text-brand-600 dark:text-brand-200" aria-hidden="true" />
            <p className="flex gap-2 text-base font-medium text-gray-900 dark:text-white">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-200" aria-hidden="true" />
              {it.fix}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
