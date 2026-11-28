"use client";

import DheenexOneNavbar from "@/components/dheenex-one/DheenexOneNavbar";
import DheenexOneFooter from "@/components/dheenex-one/DheenexOneFooter";
import { Shield, Lock, FileText, Server, Eye, Database } from "lucide-react";

export default function DheenexOnePrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DheenexOneNavbar />
      
      {/* Hero Section */}
      <section className="bg-blue-600 dark:bg-blue-900 text-white py-12 md:py-16 px-4 text-center border-b border-blue-700 dark:border-blue-800">
        <h1 className="text-[2rem] leading-tight sm:text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-blue-100 max-w-2xl mx-auto">
          How DHEENEX ONE collects, uses, and protects your organizational data.
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
                <Shield className="w-6 h-6 text-blue-600" />
                1. Introduction to DHEENEX ONE Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                DHEENEX ONE is a unified SaaS platform developed by DHEENEX TECHNOLOGIES. Because our platform manages sensitive workforce, internship, and learning data, we take data privacy and tenant isolation extremely seriously. This Privacy Policy explains what data we collect when you use the DHEENEX ONE platform and how we protect it.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-600" />
                2. Data We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                As a SaaS platform, we act as a Data Processor for the organizations (Data Controllers) that use our services. We collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Organizational Data:</strong> Company details, billing information, and client portfolios.</li>
                <li><strong>Workforce & Intern Data:</strong> Names, emails, roles, attendance logs, and performance metrics imported by the organization.</li>
                <li><strong>Learning & Assessment Data:</strong> Course progress, MCQ scores, and submitted code snippets for evaluation.</li>
                <li><strong>Developer Integration Data:</strong> Metadata from synchronized GitHub/GitLab repositories (commits, PRs) if the feature is authorized.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-blue-600" />
                3. Tenant Data Isolation
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                DHEENEX ONE is built on a multi-tenant architecture with strict logical isolation. Your organization's data (including employee records, projects, and assessments) is completely isolated from other customers. We utilize Role-Based Access Control (RBAC) to ensure that only authorized users within your organization can access this data.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Server className="w-6 h-6 text-blue-600" />
                4. Code Sandbox Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                When employees or interns submit code for assessment on our coding platform, the code is executed in isolated, temporary Docker sandboxes. We do not use your submitted code to train AI models, nor do we expose it outside of your organization's environment.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                5. Data Retention
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We retain your organizational data for as long as your subscription is active. If you choose to terminate your DHEENEX ONE subscription, you have the right to request a full data export. After termination, we will securely delete your tenant data within 30 days, unless legally required to retain it.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600" />
                6. Contact the Privacy Team
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                If you have questions regarding this Privacy Policy or how your organization's data is handled on DHEENEX ONE, please contact our Data Protection Officer at:
              </p>
              <div className="bg-blue-50 dark:bg-gray-900 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mt-4">
                <p className="font-bold text-gray-900 dark:text-white">DHEENEX ONE Privacy Team</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Email: privacy@dheenex.com</p>
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
