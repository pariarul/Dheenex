"use client";

import dynamic from "next/dynamic";
import { MessageCircle, Phone, Mail } from "lucide-react";
import Lazy3D from "@/components/Lazy3D";

// Three.js scene in its own chunk; Lazy3D loads it only on tablets/computers when near the screen
const CallToAction3D = dynamic(() => import("@/components/CallToAction3D"), { ssr: false });

/* ---------- CTA SECTION ---------- */
export default function CallToAction() {
  return (
    <section
      id="contact"
      className="py-12 lg:py-16 bg-gray-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* LEFT: 3D */}
        <div className="w-full hidden md:flex md:h-[420px] lg:h-[520px] items-center justify-center relative">
          <Lazy3D scene={CallToAction3D} className="w-full h-full" />

          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-xl -z-10" />
        </div>

        {/* RIGHT: CTA */}
<div className="text-center lg:text-left">
  {/* Heading */}
  <h2 className="text-blue-600 font-semibold uppercase text-xs sm:text-sm mb-1">
    Contact Us
  </h2>

  <h3 className="text-[1.75rem] leading-tight sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
    Still have questions?
  </h3>

  <p className="text-base text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">
    Our team is happy to help you with course details, pricing, or project requirements.
  </p>

  {/* Buttons */}
  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center lg:justify-start">

    <a
      href="tel:+919361430865"
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3.5 rounded-xl
                 bg-blue-800 text-white font-semibold hover:bg-blue-700 transition"
    >
      <Phone size={18} />
      Call Us
    </a>

    <a
      href="mailto:contact@dheenex.com"
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3.5 rounded-xl
                 border border-gray-300 text-gray-900 font-semibold
                 hover:bg-red-500 hover:text-white transition"
    >
      <Mail size={18} />
      Email Us
    </a>

    <a
      href="https://wa.me/919361430865"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3.5 rounded-xl
                 bg-green-500 text-white font-semibold hover:bg-green-600 transition"
    >
      <MessageCircle size={18} />
      WhatsApp Us
    </a>
  </div>

  {/* Response note */}
  <p className="mt-4 text-xs sm:text-sm text-gray-500">
    ⚡ We usually respond within 24 hours
  </p>
</div>

      </div>
    </section>
  );
}
