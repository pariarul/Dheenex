"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, Cpu, Megaphone } from "lucide-react";

const services = [
  {
    title: "Business Operations Support",
    description:
      "Streamlining daily operations to reduce workload, improve efficiency, and ensure smooth business functioning.",
    icon: Briefcase,
  },
  {
    title: "Team & Workforce Support",
    description:
      "Helping manage teams, coordination, and productivity with structured workforce support solutions.",
    icon: Users,
  },
  {
    title: "IT & Technical Assistance",
    description:
      "Reliable technical support, system management, and IT solutions to keep your business running without interruptions.",
    icon: Cpu,
  },
  {
    title: "Marketing & Administrative Services",
    description:
      "End-to-end marketing, documentation, and administrative support to boost visibility and save time.",
    icon: Megaphone,
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide text-sm mb-2">
            What We Do
          </h2>

          <h3 className="text-[1.75rem] leading-tight sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            End-to-end business support services
          </h3>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400">
            We provide complete business support services that reduce workload,
            improve efficiency, and help you achieve long-term success.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="flex gap-4 sm:block p-4 sm:p-6 rounded-2xl sm:rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition-all"
            >
              <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 sm:mb-4 rounded-xl sm:rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <service.icon size={22} />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {service.title}
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}