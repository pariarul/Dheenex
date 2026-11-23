import DheenexOneNavbar from "@/components/dheenex-one/DheenexOneNavbar";
import DheenexOneHero from "@/components/dheenex-one/DheenexOneHero";
import DheenexOneProblems from "@/components/dheenex-one/DheenexOneProblems";
import DheenexOneTour from "@/components/dheenex-one/DheenexOneTour";
import DheenexOneRoles from "@/components/dheenex-one/DheenexOneRoles";
import { DheenexOneAudience, DheenexOneStart, DheenexOneSecurity } from "@/components/dheenex-one/DheenexOneAudience";
import DheenexOnePricing from "@/components/dheenex-one/DheenexOnePricing";
import DheenexOneCTA, { DheenexOneFAQ } from "@/components/dheenex-one/DheenexOneCTA";
import DheenexOneFooter from "@/components/dheenex-one/DheenexOneFooter";

export const metadata = {
  title: "DheeneX One | Run your whole organization from one place",
  description:
    "DheeneX One brings people, attendance and leave, payroll, projects and tasks, clients and quotations, invoices, your website and college work into one simple app for companies, colleges and institutes. 14-day free trial.",
};

export default function DheenexOnePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <DheenexOneNavbar />
      <DheenexOneHero />
      <DheenexOneProblems />
      <DheenexOneTour />
      <DheenexOneRoles />
      <DheenexOneAudience />
      <DheenexOneStart />
      <DheenexOneSecurity />
      <DheenexOnePricing />
      <DheenexOneFAQ />
      <DheenexOneCTA />

      {/* Hide the global footer visually and show this one */}
      <style dangerouslySetInnerHTML={{ __html: `footer:not(.dheenex-footer) { display: none !important; }` }} />
      <DheenexOneFooter />
    </main>
  );
}
