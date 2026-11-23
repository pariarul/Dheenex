"use client";

import DheenexOneNavbar from "@/components/dheenex-one/DheenexOneNavbar";
import DheenexOneFooter from "@/components/dheenex-one/DheenexOneFooter";
import { Search, Book, Users, Laptop, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { icon: Users, title: "Workforce Management", desc: "Guides on adding employees, roles, and tracking daily tasks.", count: "24 articles" },
  { icon: GraduationCap, title: "LMS & Training", desc: "How to create courses, manage students, and evaluate tests.", count: "18 articles" },
  { icon: Briefcase, title: "Project Operations", desc: "Setting up projects, client locations, and team assignments.", count: "15 articles" },
  { icon: Laptop, title: "Internship Programs", desc: "Managing college batches and structured internship journeys.", count: "12 articles" },
  { icon: Book, title: "Developer Integrations", desc: "Connecting GitHub/GitLab and tracking developer activity.", count: "9 articles" }
];

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DheenexOneNavbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 border border-blue-700 text-blue-200 text-sm font-semibold tracking-wide mb-6">
            DHEENEX ONE SUPPORT
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-10">
            Search our knowledge base for guides, API documentation, and troubleshooting tips.
          </p>
          
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Search for articles, guides, or topics..." 
              className="w-full pl-14 pr-32 py-5 rounded-2xl text-gray-900 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all bg-white/95 backdrop-blur-sm"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">Browse by Topic</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link key={idx} href="#" className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 transition-all group">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <cat.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{cat.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 h-10">{cat.desc}</p>
              <div className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 font-semibold border-t border-gray-100 dark:border-gray-700 pt-4">
                <span>{cat.count}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white dark:bg-gray-800 py-16 text-center border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still need help?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">Our support team is always ready to help you with any technical or billing issues.</p>
        <Link href="/dheenex-one/support" className="inline-flex bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
          Contact Support
        </Link>
      </section>
      
      <style dangerouslySetInnerHTML={{ __html: `footer:not(.dheenex-footer) { display: none !important; }` }} />
      <DheenexOneFooter />
    </main>
  );
}
