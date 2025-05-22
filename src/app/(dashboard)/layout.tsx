'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Shield,
  Briefcase,
  Users,
  Stethoscope,
  ClipboardList,
  PiggyBank,
  Gavel,
  Grid3x3,
} from 'lucide-react';
import Image from 'next/image';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const [selectedCampus, setSelectedCampus] = useState('Main Campus (CBC)');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showModules, setShowModules] = useState(false);

  const campusRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        campusRef.current && !campusRef.current.contains(event.target as Node) &&
        yearRef.current && !yearRef.current.contains(event.target as Node) &&
        modulesRef.current && !modulesRef.current.contains(event.target as Node)
      ) {
        setShowCampusDropdown(false);
        setShowYearDropdown(false);
        setShowModules(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const campuses = [
    'Main Campus (CBC)',
    'ACE Christian Campus',
    'College Campus',
    'High School Campus',
    'Cambridge',
  ];
  const years = ['2025', '2024', '2023'];

  const navLinks = [
    { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Pathways', href: '/student-pathways', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Reports', href: '/reportcards', icon: <FileText className="w-5 h-5" /> },
  ];

  const moduleLinks = [
    { label: 'Access Control', icon: <Shield className="w-5 h-5" /> },
    { label: 'HR', icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Visitors', icon: <Users className="w-5 h-5" /> },
    { label: 'Lesson Plans (Beta)', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Disciplinary', icon: <Gavel className="w-5 h-5" /> },
    { label: 'Pocket Money', icon: <PiggyBank className="w-5 h-5" /> },
    { label: 'Nursing', icon: <Stethoscope className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
      <header className="w-full bg-black text-white flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-6">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-md object-cover" />

          {/* Modules */}
          <div className="relative" ref={modulesRef}>
            <button
              onClick={() => {
                setShowModules(!showModules);
                setShowCampusDropdown(false);
                setShowYearDropdown(false);
              }}
              className="text-sm bg-gray-800 px-3 py-2 rounded hover:bg-gray-700 flex items-center gap-2"
            >
              <Grid3x3 className="w-4 h-4" />
              <span>Modules</span>
            </button>

            {showModules && (
              <div className="absolute z-10 mt-2 bg-white text-black p-4 rounded shadow-lg grid grid-cols-2 gap-4 w-80">
                <h4 className="col-span-2 text-sm font-semibold text-gray-700">Add-on Modules</h4>
                {moduleLinks.map(({ label, icon }) => (
                  <div key={label} className="flex items-center gap-2 text-sm hover:text-indigo-600 cursor-pointer">
                    {icon}
                    <span>{label}</span>
                  </div>
                ))}
                <div className="col-span-2 pt-2 text-center text-indigo-600 text-sm cursor-pointer hover:underline">
                  Back to Cloud School
                </div>
              </div>
            )}
          </div>

          {/* Campus Dropdown */}
          <div className="relative" ref={campusRef}>
            <button
              onClick={() => {
                setShowCampusDropdown(!showCampusDropdown);
                setShowModules(false);
                setShowYearDropdown(false);
              }}
              className="text-sm font-medium flex items-center gap-1 hover:underline"
            >
              DEMO SCHOOL - {selectedCampus}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCampusDropdown && (
              <div className="absolute left-0 mt-2 w-72 bg-white text-black rounded shadow-md py-2 z-20">
                {campuses.map((campus) => (
                  <div
                    key={campus}
                    onClick={() => {
                      setSelectedCampus(campus);
                      setShowCampusDropdown(false);
                    }}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    DEMO SCHOOL - {campus}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className="relative" ref={yearRef}>
            <button
              onClick={() => {
                setShowYearDropdown(!showYearDropdown);
                setShowModules(false);
                setShowCampusDropdown(false);
              }}
              className="text-sm flex items-center gap-1 font-medium hover:underline"
            >
              Year {selectedYear}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showYearDropdown && (
              <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-md py-2 z-20">
                {years.map((year) => (
                  <div
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setShowYearDropdown(false);
                    }}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Year {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <div className="font-semibold">Mr User Demo</div>
            <div className="text-gray-400 text-xs">Director/Head of School</div>
          </div>
          <Image
            src="/man.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border object-cover"
          />
        </div>
      </header>

      {/* Layout Body */}
      <div className="flex flex-1 min-h-0 min-h-screen">
        <motion.aside
          animate={{ width: sidebarOpen ? 240 : 60 }}
          className="bg-gray-900 text-white p-4 overflow-hidden transition-all duration-300 min-h-screen"
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

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
