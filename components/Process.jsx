"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, ShieldCheck, Rocket } from "lucide-react";

const steps = [
  {
    title: "Discovery & Planning",
    description: "We dive deep into your requirements and business goals to chart the perfect course.",
    icon: Search,
    color: "bg-blue-600",
  },
  {
    title: "UI/UX Design",
    description: "Our designers craft intuitive, pixel-perfect interfaces tailored for your brand.",
    icon: PenTool,
    color: "bg-indigo-600",
  },
  {
    title: "Development",
    description: "We build scalable, high-performance web and mobile applications using modern tech.",
    icon: Code2,
    color: "bg-purple-600",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing across all platforms to ensure your product is bug-free and smooth.",
    icon: ShieldCheck,
    color: "bg-cyan-600",
  },
  {
    title: "Launch & Support",
    description: "We handle deployment and provide ongoing maintenance to keep you growing.",
    icon: Rocket,
    color: "bg-teal-600",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-14 md:py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">Our Process</h2>
          <h3 className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 md:mb-6">
            How We Bring Your Ideas to Life
          </h3>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400">
            A structured approach to development ensures we deliver high-quality solutions on time, every time.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Timeline line (phones) */}
          <div className="md:hidden absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-teal-200" aria-hidden="true" />

          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-0 right-0 h-0.5 bg-gray-100 dark:bg-white/10 -z-0" />

          <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-12 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 text-left md:text-center group"
              >
                {/* Step Circle */}
                <div className={`shrink-0 w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg md:shadow-xl md:mb-8 group-hover:scale-110 transition-transform duration-300 relative`}>
                  <step.icon className="w-6 h-6 md:w-8 md:h-8" />
                  
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white dark:bg-black text-gray-900 dark:text-white border-2 border-gray-100 dark:border-white/10 flex items-center justify-center text-xs md:text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>

                <div className="pt-0.5 md:pt-0">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-4">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed md:max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
