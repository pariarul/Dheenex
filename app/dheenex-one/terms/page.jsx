"use client";

import DheenexOneNavbar from "@/components/dheenex-one/DheenexOneNavbar";
import DheenexOneFooter from "@/components/dheenex-one/DheenexOneFooter";
import { Scale, Users, CreditCard, TriangleAlert, Building, Code2 } from "lucide-react";

export default function DheenexOneTermsConditions() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DheenexOneNavbar />
      
      {/* Hero Section */}
      <section className="bg-blue-600 dark:bg-blue-900 text-white py-12 md:py-16 px-4 text-center border-b border-blue-700 dark:border-blue-800">
        <h1 className="text-[2rem] leading-tight sm:text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Terms of Service for using the DHEENEX ONE SaaS Platform.
        </p>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-20 px-4 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 sm:p-8 md:p-12">
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 pb-6 border-b border-gray-100 dark:border-gray-700">
            Effective Date: January 07, 2026
          </p>

          <div className="space-y-12">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-blue-600" />
                1. Acceptance of SaaS Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                These terms specifically govern your organization's use of the <strong>DHEENEX ONE</strong> SaaS platform. By subscribing to or using DHEENEX ONE, you agree to be bound by these terms. If you are accepting on behalf of an organization (e.g., a software company, college, or training institute), you represent that you have the authority to bind that organization.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                2. Subscriptions and Billing
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                DHEENEX ONE is offered under various subscription tiers (e.g., Starter, Business, Enterprise).
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Subscriptions are billed in advance on a monthly or annual cycle.</li>
                <li>Failure to pay may result in temporary suspension of your tenant environment.</li>
                <li>We do not offer refunds for partial months of service or for months unused with an open account.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Building className="w-6 h-6 text-blue-600" />
                3. Organizational Responsibilities
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                As a tenant on our platform, you are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Managing your own Role-Based Access Control (RBAC). We are not liable for data breaches resulting from misconfigured permissions by your Organization Admins.</li>
                <li>Ensuring you have the legal right to import and process your employees' and interns' data on our platform.</li>
                <li>Securing the credentials and API keys associated with your developer tracking integrations (e.g., GitHub, GitLab).</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-blue-600" />
                4. Acceptable Use of Code Infrastructure
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                DHEENEX ONE provides isolated code execution sandboxes for learning and assessment. You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Execute malicious code designed to escape the sandbox or harm our infrastructure.</li>
                <li>Use the execution environment for cryptocurrency mining, network scanning, or sustained intensive computing outside of normal assessment parameters.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                Violations will result in immediate termination of your organization's account.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TriangleAlert className="w-6 h-6 text-blue-600" />
                5. Service Level Agreement (SLA)
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Enterprise subscribers are subject to a customized SLA guaranteeing 99.9% uptime. For Starter and Business tiers, DHEENEX ONE is provided on a commercially reasonable efforts basis. We reserve the right to perform scheduled maintenance, which we will announce at least 48 hours in advance.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                6. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                For legal inquiries regarding these SaaS terms, please contact:
              </p>
              <div className="bg-blue-50 dark:bg-gray-900 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mt-4">
                <p className="font-bold text-gray-900 dark:text-white">DHEENEX ONE Legal Team</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Email: legal@dheenex.com</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `footer:not(.dheenex-footer) { display: none !important; }` }} />
      <DheenexOneFooter />
    </main>
  );
}
