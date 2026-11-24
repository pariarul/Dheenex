"use client";

import { motion } from "framer-motion";
import { Smartphone, Rocket, Database, ArrowRight, Briefcase, ShieldCheck, ShoppingCart } from "lucide-react";
import Swipe from "@/components/Swipe";

const projects = [
  {
    title: "High-Performance E-Commerce",
    client: "ExpressShop",
    description: "A fast static e-commerce storefront with dynamic cart and secure checkout integration.",
    icon: ShoppingCart,
    tech: ["Next.js", "Stripe", "Tailwind"],
    type: "Static E-Com Solution",
  },
  {
    title: "Business Insights Dashboard",
    client: "DataInsights",
    description: "A comprehensive admin dashboard with real-time data visualization and user management.",
    icon: Database,
    tech: ["React", "D3.js", "PostgreSQL"],
    type: "Admin Dashboard",
  },
  {
    title: "Enterprise CRM Solution",
    client: "SalesGrowth",
    description: "Custom CRM with multi-tier lead management, automated follow-ups, and sales forecasting.",
    icon: Briefcase,
    tech: ["React", "Express", "PostgreSQL"],
    type: "SaaS Solution",
  },
  {
    title: "Smart Cleaning Workflow",
    client: "Sparkle & Pure",
    description: "Integrated ecosystem with a Mobile App for staff and an Admin Dashboard for central operations.",
    icon: ShieldCheck,
    tech: ["Next.js", "Firebase", "Google Maps"],
    type: "App + Dashboard",
  },
  {
    title: "Custom Logistics Portal",
    client: "LogiTrans",
    description: "A dynamic mobile-first custom application for real-time logistics tracking and fleet management.",
    icon: Smartphone,
    tech: ["React Native", "Node.js", "Socket.io"],
    type: "Custom Dynamic App",
  },
  {
    title: "SwiftServe Delivery",
    client: "SwiftServe",
    description: "On-demand dynamic delivery application with real-time tracking and automated dispatching.",
    icon: Rocket,
    tech: ["React Native", "GraphQL", "AWS"],
    type: "Dynamic Mobile App",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-14 md:py-24 bg-gray-50 dark:bg-neutral-900 overflow-hidden text-gray-900 border-none">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">Client Success Stories</h2>
            <h3 className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 md:mb-6">
              Delivering Excellence at Scale
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              We've partnered with forward-thinking businesses to build products that define industries. From startups to enterprises, we deliver results.
            </p>
          </div>
          <motion.div 
            whileHover={{ x: 5 }}
            className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold cursor-pointer group"
          >
            View All Projects 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>

        {/* Projects: swipe row on phones (next card peeks in), grid from tablets up */}
        <Swipe
          pages={projects.length}
          label="Projects"
          className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 no-scrollbar md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-[85%] shrink-0 snap-start md:w-auto bg-white dark:bg-black rounded-2xl md:rounded-3xl p-5 md:p-8 border border-gray-100 dark:border-white/10 shadow-sm md:shadow-none hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <project.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{project.type}</span>
                    <span className="text-xs font-medium text-gray-400">{project.client}</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 md:mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </Swipe>

        <div className="mt-6 md:hidden">
          <a
            href="#contact"
            className="flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
          >
            Start your project <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}
