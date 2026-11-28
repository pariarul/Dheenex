import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const COLS = [
  {
    title: "Product",
    links: [
      { href: "/dheenex-one#tour", label: "Product tour" },
      { href: "/dheenex-one#roles", label: "Benefits" },
      { href: "/dheenex-one#who", label: "Who it's for" },
      { href: "/dheenex-one#pricing", label: "Pricing" },
      { href: "/dheenex-one#faq", label: "FAQ" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/dheenex-one/help", label: "Help center" },
      { href: "/dheenex-one/docs", label: "Docs" },
      { href: "/dheenex-one/support", label: "Support" },
      { href: "/", label: "DheeneX main website" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/dheenex-one/privacy", label: "Privacy policy" },
      { href: "/dheenex-one/terms", label: "Terms of service" },
    ],
  },
];

export default function DheenexOneFooter() {
  return (
    <footer className="dheenex-footer border-t border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-brand-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pb-10 md:pt-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/dheenex-one" aria-label="DheeneX One home" className="inline-block">
              <Image src="/dheenex-one/dheenex-one-logo.png" alt="DheeneX One" width={1016} height={508} className="h-20 w-auto dark:hidden" />
              <Image src="/dheenex-one/dheenex-one-logo-white.png" alt="DheeneX One" width={1016} height={508} className="hidden h-20 w-auto dark:block" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              One app for people, attendance, payroll, projects, clients, invoices, your website and college work.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
              <li><a href="mailto:contact@dheenex.com" className="inline-flex items-center gap-2 py-1.5 md:py-0 hover:text-brand-600 dark:hover:text-brand-200"><Mail className="h-4 w-4" aria-hidden="true" /> contact@dheenex.com</a></li>
              <li><a href="tel:+919361430865" className="inline-flex items-center gap-2 py-1.5 md:py-0 hover:text-brand-600 dark:hover:text-brand-200"><Phone className="h-4 w-4" aria-hidden="true" /> +91 93614 30865</a></li>
              <li className="inline-flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> 1/291, Anna Nagar, Ogalur, Perambalur 621108</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLS.map((c) => (
              <div key={c.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white">{c.title}</h3>
                <ul className="mt-4 md:mt-5 space-y-1 md:space-y-3 text-sm">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="inline-block py-1.5 md:py-0 text-gray-600 transition hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-200">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-14 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:flex-row">
          <p>© {new Date().getFullYear()} DheeneX One. All rights reserved.</p>
          <p>Made by DheeneX Technologies</p>
        </div>
      </div>
    </footer>
  );
}
