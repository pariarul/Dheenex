"use client";

import { motion } from "framer-motion";
import { Rocket, Store, Building2, Users } from "lucide-react";

const audiences = [
  {
    title: "Startups",
    description:
      "Helping startups build a strong foundation with affordable support, scalable systems, and growth-focused strategies.",
    icon: Rocket,
  },
  {
    title: "Small & Medium Businesses",
    description:
      "Supporting SMBs with operations, marketing, and technology to improve efficiency and increase profitability.",
    icon: Store,
  },
  {
    title: "Corporate Offices",
    description:
      "Providing structured business, IT, and administrative support to meet enterprise-level standards and workflows.",
    icon: Building2,
  },
  {
    title: "Freelancers & Agencies",
    description:
      "Enabling freelancers and agencies to focus on core work while we handle backend, technical, and operational support.",
    icon: Users,
  },
];

export default function WhoWeServe() {
  return (
    <section className="py-12 lg:py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide text-sm mb-2">
            Who We Serve
          </h2>

          <h3 className="text-[1.75rem] leading-tight sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            Supporting businesses at every stage
          </h3>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400">
            We work with a wide range of clients, providing tailored support
            services that adapt to different business sizes, industries, and goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {audiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex gap-4 sm:block p-4 sm:p-6 rounded-2xl sm:rounded-xl bg-white dark:bg-neutral-950 border border-gray-100 dark:border-neutral-800 shadow-sm sm:shadow-none hover:shadow-lg transition-all"
            >
              <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 sm:mb-4 rounded-xl sm:rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <item.icon size={22} />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}