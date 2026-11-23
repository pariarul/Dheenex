"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const inputCls =
  "w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400";
const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const emptyForm = { organizationName: "", organizationType: "", adminName: "", email: "", phone: "", password: "", website: "" };

/** First message of a Nest error body ({ message: string | string[] }). */
async function apiMessage(res) {
  try {
    const body = await res.json();
    const m = Array.isArray(body?.message) ? body.message[0] : body?.message;
    return typeof m === "string" ? m : null;
  } catch {
    return null;
  }
}

/**
 * Sign-up form for a plan from the pricing section. POST /public/signup with the plan, cycle and kind
 * (SIGNUP = free trial, BUY = pay after confirming the email). Nothing is created until the email link is opened.
 */
export default function PricingSignupModal({ choice: current, onClose, formatPrice }) {
  const open = !!current;
  // Keep showing the last plan while the dialog animates out
  const lastChoice = useRef(current);
  if (current) lastChoice.current = current;
  const choice = current ?? lastChoice.current;
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Fresh form each time it opens; focus the first field; lock page scroll; Escape closes; Tab stays inside
  useEffect(() => {
    if (!open) return;
    setForm(emptyForm);
    setError("");
    setDone(false);
    setShowPassword(false);
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll('button, [href], input:not([type="hidden"]):not([tabindex="-1"]), select, textarea')].filter(
        (el) => !el.disabled && el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      if (previous && typeof previous.focus === "function") previous.focus();
    };
  }, [open, onClose]);

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const phone = form.phone.trim();
    if (phone && phone.replace(/\D/g, "").length < 10) return setError("Enter a valid phone number with at least 10 digits.");
    if (form.password.length < 8) return setError("Your password needs at least 8 characters.");

    setSending(true);
    try {
      const res = await fetch(`${API_URL}/public/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: form.organizationName.trim(),
          organizationType: form.organizationType,
          adminName: form.adminName.trim(),
          email: form.email.trim(),
          password: form.password,
          website: form.website,
          ...(phone ? { phone } : {}),
          planCode: choice.plan.code,
          billingCycle: choice.cycle,
          kind: choice.kind,
          source: "dheenex-one-pricing",
        }),
      });
      if (res.status === 202 || res.ok) {
        setDone(true);
        return;
      }
      const message = await apiMessage(res);
      if (res.status === 429) setError(message || "Too many attempts. Please try again later.");
      else if (res.status === 403) setError(message || "Sign-up is closed right now. Please contact us.");
      else if (res.status === 400) setError(message || "Please check the form and try again.");
      else setError(message || "Something went wrong. Please try again in a moment.");
    } catch {
      setError("We couldn't reach our server. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const plan = choice?.plan;
  const yearly = choice?.cycle === "YEARLY";
  const price = plan ? (yearly ? plan.priceYearly : plan.priceMonthly) : 0;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-signup-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]"
          >
            <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5 pr-8">
              <img src="/dheenex-one/dheenex-one-mark.png" alt="" width={40} height={40} className="mb-3 h-10 w-10 dark:hidden" />
              <img src="/dheenex-one/dheenex-one-mark-white.png" alt="" width={40} height={40} className="mb-3 hidden h-10 w-10 dark:block" />
              <h2 id="pricing-signup-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                {choice.kind === "BUY" ? "Buy DheeneX One" : `Start your ${plan.trialDays}-day free trial`}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-brand-50 dark:bg-brand-500/15 px-4 py-3 text-sm">
                <span className="font-semibold text-brand-600 dark:text-brand-200">{plan.name}</span>
                <span className="text-gray-500 dark:text-gray-400">·</span>
                <span className="text-gray-700 dark:text-gray-300">{yearly ? "Yearly" : "Monthly"}</span>
                <span className="text-gray-500 dark:text-gray-400">·</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {formatPrice(price, plan.currency)} / {yearly ? "year" : "month"} + GST
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {choice.kind === "BUY"
                  ? "After you confirm your email, you go straight to secure payment."
                  : "No card needed. Pay only if you decide to continue after the trial."}
              </p>
            </div>

            {done ? (
              <div className="flex flex-col items-center justify-center py-8 text-center" role="status">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Almost there!</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Check your email to confirm. The link works for 24 hours.</p>
                <button type="button" onClick={onClose} className="mt-6 px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label htmlFor="ps-org" className={labelCls}>Organization name</label>
                  <input ref={firstFieldRef} id="ps-org" name="organizationName" required minLength={2} maxLength={120} value={form.organizationName} onChange={set} className={inputCls} placeholder="Enter your organization name" />
                </div>
                <div>
                  <label htmlFor="ps-type" className={labelCls}>Organization type</label>
                  <select id="ps-type" name="organizationType" required value={form.organizationType} onChange={set} className={inputCls}>
                    <option value="" disabled>Select organization type</option>
                    <option value="COMPANY">Company</option>
                    <option value="COLLEGE">College</option>
                    <option value="INSTITUTE">Institute</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ps-name" className={labelCls}>Your name</label>
                    <input id="ps-name" name="adminName" required minLength={2} maxLength={120} autoComplete="name" value={form.adminName} onChange={set} className={inputCls} placeholder="Enter your name" />
                  </div>
                  <div>
                    <label htmlFor="ps-phone" className={labelCls}>Phone (optional)</label>
                    <input id="ps-phone" name="phone" type="tel" autoComplete="tel" maxLength={24} value={form.phone} onChange={set} className={inputCls} placeholder="Enter your phone number" />
                  </div>
                </div>
                <div>
                  <label htmlFor="ps-email" className={labelCls}>Work email</label>
                  <input id="ps-email" name="email" type="email" required maxLength={200} autoComplete="email" value={form.email} onChange={set} className={inputCls} placeholder="Enter your work email" />
                </div>
                <div>
                  <label htmlFor="ps-password" className={labelCls}>Password</label>
                  <div className="relative">
                    <input
                      id="ps-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      maxLength={128}
                      autoComplete="new-password"
                      value={form.password}
                      onChange={set}
                      className={`${inputCls} pr-11`}
                      placeholder="Enter a password (at least 8 characters)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {/* Honeypot: hidden from people, bots fill it */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="ps-website">Website</label>
                  <input id="ps-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set} />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-bold transition-all"
                >
                  {sending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {sending ? "Sending..." : choice.kind === "BUY" ? "Continue" : "Start free trial"}
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">We will email you a link to confirm. Your organization is created when you open it.</p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
