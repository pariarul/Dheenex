"use client";

import { useState } from "react";
import DheenexOneNavbar from "@/components/dheenex-one/DheenexOneNavbar";
import DheenexOneFooter from "@/components/dheenex-one/DheenexOneFooter";
import { Code, Terminal, Server, ShieldCheck, Database, GitMerge, FileCode2, Code2, PlaySquare } from "lucide-react";

const sidebarLinks = [
  { title: "Getting Started", items: ["Introduction", "Quick Start", "Authentication"] },
  { title: "Platform Architecture", items: ["Multi-Tenancy", "Role-Based Access", "Background Jobs"] },
  { title: "Core Modules", items: ["Workforce API", "Internship API", "LMS API", "Projects API"] },
  { title: "Developer Integrations", items: ["GitHub Sync", "GitLab Sync", "Code Execution Sandbox"] }
];

const docContents = {
  "Introduction": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <span className="text-blue-600 font-bold tracking-widest text-xs mb-2 block uppercase">Dheenex One Documentation</span>
        <h1 className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Introduction to the Ecosystem</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Welcome to the official developer documentation for <strong>DHEENEX ONE</strong>. This platform is a unified SaaS ecosystem designed to completely manage clients, projects, employees, interns, learning tracks, and developer activity.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="border border-gray-200 dark:border-gray-700 p-5 sm:p-8 rounded-3xl hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all group bg-white dark:bg-gray-800">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">RESTful API Reference</h3>
          <p className="text-gray-600 dark:text-gray-400">Explore the comprehensive REST API endpoints to build custom integrations, automate workforce tasks, and pull organization metrics directly into your own tools.</p>
        </div>
        
        <div className="border border-gray-200 dark:border-gray-700 p-5 sm:p-8 rounded-3xl hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all group bg-white dark:bg-gray-800">
          <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Terminal className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">Code Execution Engine</h3>
          <p className="text-gray-600 dark:text-gray-400">Learn how our isolated, secure Docker sandboxes compile, execute, and evaluate code for Java, JS, Python, and C++ during student assessments.</p>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-5 sm:p-8 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <Database className="text-blue-500" /> Core Technologies
        </h3>
        <ul className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> <strong>Backend:</strong> NestJS (Node.js)</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> <strong>Frontend:</strong> Next.js (React)</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> <strong>Database:</strong> PostgreSQL & Prisma</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> <strong>Queue:</strong> Redis & BullMQ</li>
        </ul>
      </div>
    </div>
  ),
  
  "Quick Start": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white">Quick Start Guide</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">To interact with the DHEENEX ONE API programmatically, you first need to generate a secure API key from your organization's settings dashboard.</p>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-gray-500" /> API Base URL
        </h3>
        <div className="bg-gray-900 rounded-xl p-5 text-white font-mono text-sm border border-gray-700 shadow-inner flex items-center justify-between">
          <span>https://api.dheenexone.com/v1</span>
          <span className="text-gray-500 text-xs uppercase tracking-widest">Production</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <PlaySquare className="w-5 h-5 text-blue-500" /> Making your first request
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Use your API key as a Bearer token to fetch your workforce list.</p>
        <div className="bg-[#0d1117] rounded-xl p-6 text-gray-300 font-mono text-sm border border-gray-800 shadow-2xl overflow-x-auto leading-relaxed">
          <span className="text-pink-400">curl</span> -X GET <span className="text-green-400">"https://api.dheenexone.com/v1/workforce/employees"</span> \<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;-H <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span> \<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;-H <span className="text-green-400">"Content-Type: application/json"</span>
        </div>
      </div>
    </div>
  ),
  
  "Authentication": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white">Authentication & Security</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">DHEENEX ONE utilizes strict JSON Web Token (JWT) based authentication for all API endpoints to ensure tenant data remains secure.</p>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/50 flex gap-4">
        <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
        <div>
          <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-1">Bearer Token Required</h4>
          <p className="text-blue-800 dark:text-blue-200/80 text-sm">All requests must include a valid JWT in the Authorization header. Requests without it will receive a 401 Unauthorized response.</p>
        </div>
      </div>

      <div className="bg-[#0d1117] rounded-xl p-6 text-gray-300 font-mono text-sm border border-gray-800 shadow-lg">
        <span className="text-purple-400">Authorization:</span> Bearer <span className="text-green-400">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Token Lifecycle</h3>
      <ul className="space-y-3">
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold shrink-0">1</span>
          <p className="text-gray-600 dark:text-gray-300"><strong>Access Tokens:</strong> Expire exactly 60 minutes after generation for security.</p>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold shrink-0">2</span>
          <p className="text-gray-600 dark:text-gray-300"><strong>Refresh Tokens:</strong> Expire after 7 days. Use the <code>/auth/refresh</code> endpoint to acquire a new Access Token without prompting the user to log in again.</p>
        </li>
      </ul>
    </div>
  ),

  "Multi-Tenancy": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white">Multi-Tenant Architecture</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        DHEENEX ONE operates on a strict multi-tenant database architecture. Every request is scoped to a specific <code>tenantId</code>, guaranteeing total data isolation.
      </p>
      
      <div className="bg-[#0d1117] rounded-2xl p-5 sm:p-8 font-mono text-sm text-gray-300 border border-gray-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="text-green-400 mb-6">// Logical DB Isolation Example</div>
        <div className="space-y-2">
          <div className="text-white font-bold">DHEENEX ONE Platform</div>
          <div className="pl-4 border-l border-gray-700 ml-2">
            <div className="text-blue-300">├── Tenant A (Software Corp)</div>
            <div className="pl-8 text-gray-400">├── Users & Employees</div>
            <div className="pl-8 text-gray-400">├── Private Projects</div>
            <div className="pl-8 text-gray-400">└── Coding Assessments</div>
          </div>
          <div className="pl-4 border-l border-gray-700 ml-2">
            <div className="text-purple-300">├── Tenant B (Training College)</div>
            <div className="pl-8 text-gray-400">├── Intern Batches</div>
            <div className="pl-8 text-gray-400">├── LMS Courses</div>
            <div className="pl-8 text-gray-400">└── Student Reports</div>
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
        <strong>Note:</strong> Tenant A cannot query, view, or modify Tenant B's data under any circumstances. Prisma middleware enforces the <code>tenantId</code> automatically on every query.
      </p>
    </div>
  ),

  "Role-Based Access": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white">Role-Based Access Control (RBAC)</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Instead of rigid hard-coded roles (like "Admin" or "User"), DHEENEX ONE utilizes a dynamic User → Role → Permissions resolution system.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3 mb-4 flex items-center justify-between">
            System Admin <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">All Access</span>
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">✅ Manage Billing & Subscriptions</li>
            <li className="flex items-center gap-2">✅ Create/Delete Roles</li>
            <li className="flex items-center gap-2">✅ View all platform analytics</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3 mb-4 flex items-center justify-between">
            Project Manager <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Custom</span>
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">✅ Create Projects & Tasks</li>
            <li className="flex items-center gap-2">✅ Assign Employees to tasks</li>
            <li className="flex items-center gap-2 opacity-50">❌ Manage Billing</li>
          </ul>
        </div>
      </div>
    </div>
  ),

  "Background Jobs": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white">Background Jobs (BullMQ)</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        To maintain a blazing fast API response time, heavy operations are offloaded to Redis-backed background workers using BullMQ.
      </p>
      
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <Database className="absolute -right-4 -bottom-4 w-32 h-32 text-gray-700 opacity-20" />
        <h3 className="font-bold text-xl mb-6 text-gray-100 relative z-10">Supported Async Queues:</h3>
        <div className="grid sm:grid-cols-2 gap-4 relative z-10">
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
            <strong className="text-blue-400 block mb-1">Bulk Processing</strong>
            <span className="text-sm text-gray-400">Importing 1000+ students via CSV</span>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
            <strong className="text-purple-400 block mb-1">Git Sync</strong>
            <span className="text-sm text-gray-400">Polling GitHub APIs for commit history</span>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
            <strong className="text-green-400 block mb-1">Code Compilation</strong>
            <span className="text-sm text-gray-400">Evaluating student code in Docker</span>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
            <strong className="text-amber-400 block mb-1">Notifications</strong>
            <span className="text-sm text-gray-400">Dispatching bulk emails/webhooks</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 italic">
        When triggering these via API, you'll receive a HTTP 202 Accepted with a <code>jobId</code> to poll for status.
      </p>
    </div>
  ),

  "Workforce API": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Workforce API</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Manage your organization's employee lifecycle, departments, attendance, and leave management programmatically.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Core Endpoints</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700 font-mono text-sm">
          <div className="flex items-center gap-6 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold px-3 py-1 rounded w-16 text-center shrink-0">GET</span> 
            <span className="text-gray-800 dark:text-gray-200">/api/v1/workforce/employees</span>
            <span className="text-gray-400 ml-auto hidden sm:block">List all active employees</span>
          </div>
          <div className="flex items-center gap-6 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-bold px-3 py-1 rounded w-16 text-center shrink-0">POST</span> 
            <span className="text-gray-800 dark:text-gray-200">/api/v1/workforce/employees</span>
            <span className="text-gray-400 ml-auto hidden sm:block">Onboard new employee</span>
          </div>
          <div className="flex items-center gap-6 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-bold px-3 py-1 rounded w-16 text-center shrink-0">POST</span> 
            <span className="text-gray-800 dark:text-gray-200">/api/v1/workforce/attendance/clock-in</span>
            <span className="text-gray-400 ml-auto hidden sm:block">Record daily attendance</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "Internship API": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Internship API</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Designed specifically for colleges and training institutes to manage student batches, internship tracking, and mentor assignments.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Batch & Intern Endpoints</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700 font-mono text-sm">
          <div className="flex items-center gap-6 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold px-3 py-1 rounded w-16 text-center shrink-0">GET</span> 
            <span className="text-gray-800 dark:text-gray-200">/api/v1/internships/batches</span>
            <span className="text-gray-400 ml-auto hidden sm:block">Fetch college batches</span>
          </div>
          <div className="flex items-center gap-6 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-bold px-3 py-1 rounded w-16 text-center shrink-0">PUT</span> 
            <span className="text-gray-800 dark:text-gray-200">/api/v1/internships/interns/&#123;id&#125;/mentor</span>
            <span className="text-gray-400 ml-auto hidden sm:block">Assign mentor</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "LMS API": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">LMS API</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Integrate our Learning Management System into your custom frontends. Fetch courses, manage student progression, and trigger MCQ assessments.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Learning & Course Endpoints</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700 font-mono text-sm">
          <div className="flex items-center gap-6 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold px-3 py-1 rounded w-16 text-center shrink-0">GET</span> 
            <span className="text-gray-800 dark:text-gray-200">/api/v1/lms/courses</span>
            <span className="text-gray-400 ml-auto hidden sm:block">List published courses</span>
          </div>
          <div className="flex items-center gap-6 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-bold px-3 py-1 rounded w-16 text-center shrink-0">POST</span> 
            <span className="text-gray-800 dark:text-gray-200">/api/v1/lms/assessments/&#123;id&#125;/submit</span>
            <span className="text-gray-400 ml-auto hidden sm:block">Submit test answers</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "Projects API": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Projects API</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Manage client locations, project lifecycles, and granular task assignments for your internal teams.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Project & Task Endpoints</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700 font-mono text-sm">
          <div className="flex items-center gap-6 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold px-3 py-1 rounded w-16 text-center shrink-0">GET</span> 
            <span className="text-gray-800 dark:text-gray-200">/api/v1/projects</span>
            <span className="text-gray-400 ml-auto hidden sm:block">List organization projects</span>
          </div>
          <div className="flex items-center gap-6 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-bold px-3 py-1 rounded w-16 text-center shrink-0">POST</span> 
            <span className="text-gray-800 dark:text-gray-200">/api/v1/projects/&#123;id&#125;/tasks</span>
            <span className="text-gray-400 ml-auto hidden sm:block">Create new sprint task</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "GitHub Sync": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <GitMerge className="w-12 h-12 text-gray-900 dark:text-white" />
        <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white">GitHub Synchronization</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300">Automatically sync and track developer commits, pull requests, and code reviews from connected GitHub repositories directly into the DHEENEX ONE manager dashboard.</p>
      
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full pointer-events-none"></div>
          <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-4">How it works (Webhook)</h4>
          <ol className="space-y-4 text-gray-600 dark:text-gray-400">
            <li className="flex gap-3"><span className="font-bold text-blue-500">1.</span> Organization Admin authorizes the GitHub OAuth App.</li>
            <li className="flex gap-3"><span className="font-bold text-blue-500">2.</span> Our API registers secure webhooks on selected repositories.</li>
            <li className="flex gap-3"><span className="font-bold text-blue-500">3.</span> Real-time events (<code>push</code>, <code>pull_request</code>) are ingested into our BullMQ queue.</li>
            <li className="flex gap-3"><span className="font-bold text-blue-500">4.</span> Commits are mapped to DHEENEX ONE employees via email matching.</li>
          </ol>
        </div>
        
        <div className="bg-gray-900 p-5 sm:p-8 rounded-3xl border border-gray-800 text-white shadow-xl">
          <h4 className="font-bold text-xl mb-4 text-green-400">Security Note</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            DHEENEX ONE only requests <strong>Read-Only</strong> access to repository metadata (commits, authors, timestamps, branches). We never read your proprietary source code files. Webhook payloads are verified using a cryptographically secure HMAC signature.
          </p>
        </div>
      </div>
    </div>
  ),

  "GitLab Sync": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <GitMerge className="w-12 h-12 text-orange-600 dark:text-orange-500" />
        <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white">GitLab Synchronization</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300">Connect self-hosted or cloud GitLab instances to track commits, merge requests, and issue resolutions inside DHEENEX ONE.</p>
      
      <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-200 dark:border-orange-900/30">
        <p className="text-orange-800 dark:text-orange-300 font-semibold mb-2">Architecture Parity</p>
        <p className="text-sm text-orange-700 dark:text-orange-400/80">
          The GitLab integration utilizes the exact same background worker architecture and database schema as our GitHub integration. Self-hosted instances require exposing a webhook endpoint that can reach <code>api.dheenexone.com</code>.
        </p>
      </div>
    </div>
  ),

  "Code Execution Sandbox": (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <FileCode2 className="w-12 h-12 text-red-500" />
        <h1 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-gray-900 dark:text-white">Code Execution Sandbox</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        To facilitate coding assessments and technical interviews, DHEENEX ONE features a secure, ephemeral code evaluation engine. Untrusted student code is <strong>NEVER</strong> executed inside the main NestJS API containers.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-red-50 dark:bg-red-900/10 rounded-3xl p-5 sm:p-8 border border-red-100 dark:border-red-900/30">
          <h4 className="font-bold text-xl text-red-900 dark:text-red-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Strict Limitations
          </h4>
          <ul className="space-y-3 text-red-800 dark:text-red-300/80">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> <strong>No Network Access:</strong> Containers cannot reach the internet.</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> <strong>Read-Only File System:</strong> Cannot modify local files.</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> <strong>Memory Caps:</strong> Hard limit of 256MB RAM per run.</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> <strong>Timeouts:</strong> Killed instantly if execution &gt; 5 seconds.</li>
          </ul>
        </div>
        
        <div className="bg-gray-900 rounded-3xl p-5 sm:p-8 border border-gray-800 shadow-xl text-white">
          <h4 className="font-bold text-xl text-green-400 mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5" /> Supported Runtimes
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <span className="block font-bold text-yellow-400 mb-1">Node.js</span>
              <span className="text-xs text-gray-400">v18.x (JS/TS)</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <span className="block font-bold text-blue-400 mb-1">Python</span>
              <span className="text-xs text-gray-400">v3.10+</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <span className="block font-bold text-orange-400 mb-1">Java</span>
              <span className="text-xs text-gray-400">OpenJDK 17</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default function DocumentationPage() {
  const [activeDoc, setActiveDoc] = useState("Introduction");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <DheenexOneNavbar />
      
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row border-t border-gray-200 dark:border-gray-800">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 border-r border-gray-200 dark:border-gray-800 p-6 hidden md:block overflow-y-auto md:sticky md:top-16 md:h-[calc(100vh-100px)]">
          <div className="mb-8">
            <input type="text" placeholder="Search docs..." className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          
          <nav className="space-y-8">
            {sidebarLinks.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3 uppercase tracking-wider">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <button 
                        onClick={() => setActiveDoc(item)}
                        className={`text-sm text-left w-full transition-colors ${activeDoc === item ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"}`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 px-4 py-6 sm:p-6 md:p-12 lg:p-20 md:overflow-y-auto md:h-[calc(100vh-100px)]">
          
          {/* Mobile Navigation Dropdown */}
          <div className="md:hidden mb-8">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Navigate Documentation</label>
            <div className="relative">
              <select 
                value={activeDoc}
                onChange={(e) => setActiveDoc(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 appearance-none shadow-sm text-base"
              >
                {sidebarLinks.map((section, idx) => (
                  <optgroup key={idx} label={section.title} className="font-bold">
                    {section.items.map((item, i) => (
                      <option key={i} value={item} className="font-normal">{item}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className="max-w-4xl">
            {docContents[activeDoc] || (
              <div className="text-gray-500">Content for {activeDoc} is under construction.</div>
            )}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `footer:not(.dheenex-footer) { display: none !important; }` }} />
      <DheenexOneFooter />
    </main>
  );
}
