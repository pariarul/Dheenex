"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  X,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  User,
  Mail,
  Phone,
  School,
  Building2,
  PenLine,
  ArrowRight,
  Loader2,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const TYPES = [
  { value: "Student", title: "I'm a student", text: "Courses & internships", icon: GraduationCap },
  { value: "Client", title: "I'm a business", text: "Websites, apps & support", icon: Briefcase },
];

const SERVICES = ["App Development", "Website Development", "Web Maintenance", "Cloud Maintenance", "Other"];

const inputCls =
  "w-full pl-11 pr-4 py-3.5 text-base bg-gray-50 border border-gray-200 rounded-2xl outline-none text-gray-900 placeholder:text-gray-400 transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

/** Label + input with an icon on the left. */
function Field({ label, icon: Icon, optional, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {optional && <span className="text-gray-400 font-normal"> (optional)</span>}
      </span>
      <span className="relative block">
        <Icon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
        {children}
      </span>
    </label>
  );
}

export default function EnquiryModal({ isOpen, onClose }) {
  const [type, setType] = useState("Student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    collegeName: "",
    companyDetail: "",
    serviceType: "App Development",
    otherService: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const drag = useDragControls();

  // Page behind does not scroll while the form is open; Escape closes it
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2500);
      } else {
        const data = await res.json().catch(() => null);
        setError((Array.isArray(data?.message) ? data.message[0] : data?.message) || "Could not send. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("No internet connection. Please try again.");
    }
    setLoading(false);
  };

  const firstName = formData.name.trim().split(/\s+/)[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            drag="y"
            dragListener={false}
            dragControls={drag}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => (info.offset.y > 120 || info.velocity.y > 600) && onClose()}
            className="relative w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl flex flex-col max-h-[94dvh] sm:max-h-[90dvh] overflow-hidden"
          >
            {/* Header: drag handle on phones, soft colour band, title */}
            <div
              onPointerDown={(e) => drag.start(e)}
              className="relative shrink-0 bg-gradient-to-br from-blue-50 via-white to-amber-50 px-5 sm:px-7 pt-3 sm:pt-6 pb-5 touch-none"
            >
              <div className="sm:hidden mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" aria-hidden="true" />
              <button
                type="button"
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/80 shadow-sm text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 pr-10">
                <span className="w-12 h-12 shrink-0 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <Sparkles className="w-6 h-6" />
                </span>
                <div>
                  <h2 id="enquiry-title" className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    Let&apos;s get started
                  </h2>
                  <p className="text-sm text-gray-600">Tell us a little about you. We reply within 24 hours.</p>
                </div>
              </div>
            </div>

            {success ? (
              <div className="flex flex-col items-center justify-center text-center px-6 py-14">
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900">{firstName ? `Thank you, ${firstName}!` : "Thank you!"}</h3>
                <p className="text-gray-600 mt-2">Your request is sent. Our team will call or email you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7 pt-5 pb-4 space-y-5">
                  {/* Who are you: two big choice cards */}
                  <div role="radiogroup" aria-label="I am" className="grid grid-cols-2 gap-3">
                    {TYPES.map(({ value, title, text, icon: Icon }) => {
                      const on = type === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => {
                            setType(value);
                            setError("");
                          }}
                          className={`relative text-left rounded-2xl border-2 p-3.5 transition active:scale-[0.98] ${
                            on ? "border-blue-600 bg-blue-50/70 shadow-md shadow-blue-600/10" : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          {on && (
                            <CheckCircle2 className="w-5 h-5 text-blue-600 absolute top-2.5 right-2.5" aria-hidden="true" />
                          )}
                          <span
                            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 ${
                              on ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </span>
                          <span className="block font-semibold text-gray-900 text-[15px] leading-tight">{title}</span>
                          <span className="block text-xs text-gray-500 mt-0.5">{text}</span>
                        </button>
                      );
                    })}
                  </div>

                  <Field label="Your name" icon={User}>
                    <input required type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} className={inputCls} placeholder="Enter your name" />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-5 sm:gap-4">
                    <Field label="Email" icon={Mail}>
                      <input required type="email" name="email" autoComplete="email" inputMode="email" value={formData.email} onChange={handleChange} className={inputCls} placeholder="Enter your email" />
                    </Field>
                    <Field label="Mobile" icon={Phone}>
                      <input required type="tel" name="mobile" autoComplete="tel" inputMode="tel" value={formData.mobile} onChange={handleChange} className={inputCls} placeholder="Enter your mobile number" />
                    </Field>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    {type === "Student" ? (
                      <motion.div key="student" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                        <Field label="College name" icon={School}>
                          <input required type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} className={inputCls} placeholder="Enter your college name" />
                        </Field>
                      </motion.div>
                    ) : (
                      <motion.div key="client" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="space-y-5">
                        <Field label="Company" icon={Building2}>
                          <input required type="text" name="companyDetail" autoComplete="organization" value={formData.companyDetail} onChange={handleChange} className={inputCls} placeholder="Enter your company name" />
                        </Field>
                        <div>
                          <span className="block text-sm font-medium text-gray-700 mb-2">What do you need?</span>
                          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Service type">
                            {SERVICES.map((s) => {
                              const on = formData.serviceType === s;
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  role="radio"
                                  aria-checked={on}
                                  onClick={() => setFormData({ ...formData, serviceType: s })}
                                  className={`px-3.5 py-2 min-h-[40px] rounded-full text-sm font-medium border transition active:scale-95 ${
                                    on ? "bg-blue-600 border-blue-600 text-white shadow-sm" : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                                  }`}
                                >
                                  {s.replace(" Development", "").replace(" Maintenance", " care")}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        {formData.serviceType === "Other" && (
                          <Field label="Tell us what you need" icon={PenLine}>
                            <input required type="text" name="otherService" value={formData.otherService} onChange={handleChange} className={inputCls} placeholder="Enter what you need" />
                          </Field>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
                      {error}
                    </p>
                  )}
                </div>

                {/* Submit stays visible at the bottom of the sheet */}
                <div className="shrink-0 border-t border-gray-100 bg-white px-5 sm:px-7 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 inline-flex items-center justify-center gap-2 text-white text-base font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl transition shadow-lg shadow-blue-600/25 active:scale-[0.99] disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        {type === "Student" ? "Send my details" : "Get a free quote"} <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="mt-2.5 flex items-center justify-center gap-4 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Reply in 24 hours
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> No spam
                    </span>
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
