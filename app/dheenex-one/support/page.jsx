"use client";

import DheenexOneNavbar from "@/components/dheenex-one/DheenexOneNavbar";
import DheenexOneFooter from "@/components/dheenex-one/DheenexOneFooter";
import { Mail, MessageSquare, Phone, Clock, Send } from "lucide-react";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DheenexOneNavbar />
      
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Contact Support</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Need help with your DHEENEX ONE workspace? Our team is here to assist you with technical issues, billing, and onboarding.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Direct Contact</h3>
              
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Email Support</p>
                  <p className="text-sm text-gray-500 mt-1">support@dheenex.com</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Phone (Enterprise Only)</p>
                  <p className="text-sm text-gray-500 mt-1">+91 (XXX) XXX-XXXX</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Response Time</p>
                  <p className="text-sm text-gray-500 mt-1">Under 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-3xl p-8 text-white text-center shadow-lg">
              <MessageSquare size={32} className="mx-auto mb-4 opacity-80" />
              <h4 className="text-lg font-bold mb-2">Live Chat</h4>
              <p className="text-blue-100 text-sm mb-6">Chat with our support engineers directly inside your dashboard.</p>
              <button className="bg-white text-blue-600 font-bold px-6 py-2 rounded-full text-sm w-full hover:bg-blue-50 transition-colors">
                Go to Dashboard
              </button>
            </div>
          </div>

          {/* Ticket Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Submit a Ticket</h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input type="text" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Work Email</label>
                  <input type="email" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@company.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Type</label>
                  <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-300">
                    <option>Technical Issue</option>
                    <option>Billing & Subscription</option>
                    <option>Onboarding Help</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea rows="5" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Please describe your issue in detail..."></textarea>
                </div>

                <button type="button" className="bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg flex items-center justify-center w-full transition-colors">
                  <Send size={18} className="mr-2" /> Submit Ticket
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{ __html: `footer:not(.dheenex-footer) { display: none !important; }` }} />
      <DheenexOneFooter />
    </main>
  );
}
