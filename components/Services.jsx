"use client";

import { Globe, Layout, Database, ShoppingCart, MessageCircle, Store, ArrowRight, Smartphone, Palette, Cloud, Waypoints, Search, Bot, Rocket, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import Swipe from "@/components/Swipe";

const PER_PAGE = 3; // services per swipe page on phones

const services = [
  {
    title: "Custom Website Development",
    description: "Custom websites built with modern technologies.",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Static Website Development",
    description: "High-performance, SEO-friendly applications.",
    icon: Layout,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Dynamic Website Development",
    description: "Node.js, Express, MongoDB solutions.",
    icon: Database,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "E-commerce Development",
    description: "E-Commerce platforms with secure payment gateways.",
    icon: ShoppingCart,
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    title: "product catalog development",
    description: "Custom product catalogs for your business.",
    icon: MessageCircle,
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    title: "CRM Development",
    description: "Custom CRM solutions for businesses.",
    icon: Store,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform apps (Android & iOS).",
    icon: Smartphone,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    title: "UI/UX Strategy & Design",
    description: "User-centric design and intuitive prototyping.",
    icon: Palette,
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  {
    title: "Cloud infrastructure",
    description: "Scalable cloud solutions and DevOps automation.",
    icon: Cloud,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    title: "API & Microservices",
    description: "Secure, reliable, and scalable backend architectures.",
    icon: Waypoints,
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    title: "SEO & Digital Strategy",
    description: "Boost visibility and drive organic traffic.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "AI & Automation Solutions",
    description: "Intelligent automation and AI-driven solutions.",
    icon: Bot,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Cloud & Deployment Services",
    description: "Seamless cloud migration and deployment strategies.",
    icon: Rocket,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Business Management Software",
    description: "Tailored software to streamline your business operations.",
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "IT Training & Internship Programs",
    description: "Hands-on training and internships for aspiring professionals.",
    icon: GraduationCap,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 lg:py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mb-2">
            Featured Services
          </h2>
          <h3 className="text-[1.75rem] leading-tight sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Comprehensive Web & App Solutions
          </h3>
        </div>

        {/* Phones: swipe pages of 3 compact rows (next page peeks in). Tablets and up: the grid. */}
        <Swipe
          pages={Math.ceil(services.length / PER_PAGE)}
          label="Services"
          className="-mx-4 px-4 grid grid-flow-col grid-rows-3 auto-cols-[86%] gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 no-scrollbar md:mx-0 md:px-0 md:pb-0 md:grid-flow-row md:grid-rows-none md:auto-cols-auto md:grid-cols-3 md:gap-8 md:overflow-visible"
        >
          {services.map((service, index) => (
            <Link
              key={index}
              href="#contact"
              className="group snap-start flex items-center gap-4 p-4 md:block md:p-8 bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm md:shadow-none hover:shadow-xl transition-all md:hover:-translate-y-1"
            >
              <div
                className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center md:mb-6`}
              >
                <service.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-3 first-letter:uppercase">{service.title}</h4>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 md:mb-6">{service.description}</p>
                <span className="hidden md:inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"> Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /> </span>
              </div>
              <ArrowRight className="md:hidden shrink-0 w-4 h-4 text-gray-400" aria-hidden="true" />
            </Link>
          ))}
        </Swipe>

      </div>
    </section>
  );
}
