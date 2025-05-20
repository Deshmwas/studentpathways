'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    // { label: 'Students', href: '/students', icon: <Users className="w-5 h-5" /> },
    { label: 'Pathways', href: '/student-pathways', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Reports', href: '/reportcards', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 60 }}
        className="bg-gray-900 text-white p-4 overflow-hidden transition-all duration-300"
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-sm mb-4 bg-gray-700 p-2 rounded hover:bg-gray-600 transition w-full"
        >
          {sidebarOpen ? 'Collapse ◀' : '▶'}
        </button>

        <ul className="space-y-3 text-base">
          {navLinks.map(({ label, href, icon }) => (
            <li key={label}>
              <Link
                href={href}
                className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors hover:bg-gray-700 ${
                  pathname === href ? 'bg-gray-800 text-indigo-400' : ''
                }`}
              >
                {icon}
                {sidebarOpen && <span>{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </motion.aside>

      {/* Page Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
        {children}
      </main>
    </div>
  );
}
