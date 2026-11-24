"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Award, Star } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import EnquiryModal from "@/components/EnquiryModal";
import Lazy3D, { LaptopStatic } from "@/components/Lazy3D";
// Disable SSR for Three.js; Lazy3D loads it only on tablets/computers
const Hero3DProduct = dynamic(() => import("@/components/Hero3DProduct"), { ssr: false });

const stats = [];

const BLUE = "#0a3d9aff";
const ACCENT = "#2b6dd7ff";
const YELLOW = "#f59e0b";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative flex flex-col lg:flex-row items-center pt-[calc(var(--announce-h)+var(--nav-h)+1.5rem)] lg:pt-[calc(var(--announce-h)+var(--nav-h))] pb-10 lg:pb-24 overflow-hidden bg-white lg:min-h-screen">

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div
          className="absolute top-0 right-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full blur-[80px] opacity-30"
          style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-[150px] sm:w-[350px] h-[150px] sm:h-[350px] rounded-full blur-[60px] opacity-20"
          style={{ background: `radial-gradient(circle, ${BLUE} 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 w-full items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          {/* TAG + ICON */}
          <div className="relative inline-flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 justify-center lg:justify-start">
            <span
              className="absolute -inset-2 rounded-full blur-md animate-pulse"
              style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)" }}
            />
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg"
                 style={{ backgroundColor: BLUE, boxShadow: `0 10px 30px ${BLUE}55` }}>
              <span className="absolute inset-0 rounded-xl animate-spin-slow" style={{ border: `2px dashed ${YELLOW}` }} />
              <Award className="relative z-10 w-5 h-5 sm:w-6 sm:h-6" style={{ color: YELLOW }} />
            </div>
            <div className="relative px-4 py-1 sm:px-5 sm:py-2 rounded-xl shadow-md bg-yellow-500 text-blue-900">
              <p className="text-xs sm:text-sm font-bold leading-tight">Top-Rated Tech Agency</p>
            </div>
          </div>

          {/* HEADLINE */}
          <h1 className="text-[2rem] sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-[1.15] lg:leading-[1.1]">
            Empowering Businesses Through <br className="hidden lg:block" />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400">
                Technology
              </span>
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-3 sm:mt-4 text-base text-gray-600 max-w-sm sm:max-w-md mx-auto lg:mx-0 leading-relaxed">
            DHEENEX TECHNOLOGIES specializes in modern <span className="font-semibold text-blue-900">web development and mobile app solutions.</span>
            We help companies grow by building innovative digital products across all platforms.
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex w-full sm:w-auto items-center bg-blue-800 justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              
            >
              Get a Quote <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Modal removed from here to avoid z-10 stacking context trap */}

        </motion.div>

        {/* RIGHT CONTENT (3D MOBILE) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[220px] sm:h-[320px] md:h-[500px] lg:h-[600px] flex items-center justify-center mt-6 md:mt-12 lg:mt-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-2xl -z-10" />
          <Lazy3D scene={Hero3DProduct} fallback={<LaptopStatic />} className="w-full h-full" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 sm:top-10 right-0 sm:right-10 bg-white/80 backdrop-blur-md p-2 sm:p-4 rounded-2xl shadow-lg border border-white/50 hidden md:flex"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1 sm:p-2 bg-yellow-100 rounded-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-6 text-yellow-600" fill="currentColor" />
              </div>
              <div>
                <p className="text-[8px] sm:text-xs text-gray-500 font-semibold uppercase">Review</p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">4.5/5.0 Rating</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Render modal outside z-10 context so it overlays the Navbar */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
