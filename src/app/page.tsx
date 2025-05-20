
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Card, CardContent } from '@/components/ui/card';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// import { Button } from '@/components/ui/button';
// import { Download, LayoutDashboard, Users, BookOpen, FileText } from 'lucide-react';
// import { motion } from 'framer-motion';

// type Student = {
//   gender: string;
// };

// type PathwayEntry = {
//   pathway: {
//     pathwayId: number;
//     pathwayName: string;
//   };
// };

// type ClassEntry = {
//   name: string;
//   averageScore: number;
// };

// const fetchData = async (endpoint: string) => {
//   const response = await fetch(endpoint);
//   const data = await response.json();
//   return data;
// };

// const Dashboard = () => {
//   const [studentCounts, setStudentCounts] = useState({ total: 0, male: 0, female: 0 });
//   const [pathwayData, setPathwayData] = useState<{ pathway: string; studentCount: number }[]>([]);
//   const [topClasses, setTopClasses] = useState<ClassEntry[]>([]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const pathname = usePathname();

//   useEffect(() => {
//     const getCounts = async () => {
//       const students: Student[] = await fetchData('https://localhost:44331/api/students');
//       const male = students.filter((s) => s.gender.toLowerCase() === 'male').length;
//       const female = students.filter((s) => s.gender.toLowerCase() === 'female').length;
//       setStudentCounts({ total: students.length, male, female });
//     };

//     const getPathwayData = async () => {
//       const entries: PathwayEntry[] = await fetchData('https://localhost:44331/api/studentpathways');

//       const countMap: Record<string, number> = {};
//       entries.forEach((entry) => {
//         const name = entry.pathway?.pathwayName || `Pathway ${entry.pathway?.pathwayId}`;
//         countMap[name] = (countMap[name] || 0) + 1;
//       });

//       const chartData = Object.entries(countMap).map(([pathway, count]) => ({
//         pathway,
//         studentCount: count,
//       }));

//       setPathwayData(chartData);
//     };

//     const getTopClasses = async () => {
//       const classes: ClassEntry[] = await fetchData('https://localhost:44331/api/classes');
//       const sorted = classes
//         .filter((cls) => typeof cls.averageScore === 'number')
//         .sort((a, b) => b.averageScore - a.averageScore)
//         .slice(0, 5);
//       setTopClasses(sorted);
//     };

//     getCounts();
//     getPathwayData();
//     getTopClasses();
//   }, []);

//   const exportChart = () => {
//     const svg = document.querySelector('svg');
//     if (!svg) return;
//     const svgData = new XMLSerializer().serializeToString(svg);
//     const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
//     const url = URL.createObjectURL(svgBlob);

//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'chart.svg';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const navLinks = [
//     { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
//     { label: 'Students', href: '/students', icon: <Users className="w-5 h-5" /> },
//     { label: 'StudentPathways', href: '/student-pathways', icon: <BookOpen className="w-5 h-5" /> },
//     { label: 'Reportcards', href: '/reportcards', icon: <FileText className="w-5 h-5" /> },
//   ];

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <motion.aside
//         animate={{ width: sidebarOpen ? 240 : 60 }}
//         className="bg-gray-900 text-white p-4 overflow-hidden transition-all duration-300"
//       >
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="text-sm mb-4 bg-gray-700 p-2 rounded hover:bg-gray-600 transition w-full"
//         >
//           {sidebarOpen ? 'Collapse ◀' : '▶'}
//         </button>

//         <ul className="space-y-3 text-base">
//           {navLinks.map(({ label, href, icon }) => (
//             <li key={label}>
//               <Link
//                 href={href}
//                 className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors hover:bg-gray-700 ${
//                   pathname === href ? 'bg-gray-800 text-indigo-400' : ''
//                 }`}
//               >
//                 {icon}
//                 {sidebarOpen && <span>{label}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </motion.aside>

//       {/* Main content */}
//       <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
//         <h1 className="text-3xl font-bold mb-6">📈 Students Pathways</h1>

//         {/* Student counts */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
//           <Card>
//             <CardContent className="py-6">
//               <h2 className="text-lg font-medium text-gray-600">Total Students</h2>
//               <p className="text-3xl font-bold text-gray-800">{studentCounts.total}</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="py-6">
//               <h2 className="text-lg font-medium text-gray-600">Male Students</h2>
//               <p className="text-3xl font-bold text-blue-600">{studentCounts.male}</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="py-6">
//               <h2 className="text-lg font-medium text-gray-600">Female Students</h2>
//               <p className="text-3xl font-bold text-pink-600">{studentCounts.female}</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Pathway chart */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Students by Pathway</h2>
//             <Button onClick={exportChart} variant="outline" className="flex items-center gap-2">
//               <Download className="w-4 h-4" />
//               Export
//             </Button>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={pathwayData}>
//               <XAxis dataKey="pathway" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="studentCount" fill="#6366F1" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Top classes */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">🏆 Top Performing Classes</h2>
//           {topClasses.length === 0 ? (
//             <p className="text-gray-500">No data available</p>
//           ) : (
//             <ul className="list-disc pl-6 space-y-1">
//               {topClasses.map((cls, idx) => (
//                 <li key={idx}>
//                   <span className="font-medium">{cls.name}</span> – Avg Score: {cls.averageScore}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// 'use client'

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent } from '@/components/ui/card';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Users, BookOpen, Activity } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const navLinks = [
//   { label: 'Dashboard', href: '/', icon: <Users size={20} /> },
//   { label: 'Students', href: '/students', icon: <Users size={20} /> },
//   { label: 'Subjects', href: '/subjects', icon: <BookOpen size={20} /> },
//   { label: 'Pathways', href: '/student-pathways', icon: <Activity size={20} /> },
// ];

// export default function DashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const pathname = usePathname();
//   const [studentCount, setStudentCount] = useState(0);
//   const [maleCount, setMaleCount] = useState(0);
//   const [femaleCount, setFemaleCount] = useState(0);
//   const [pathwayData, setPathwayData] = useState<{ pathway: string; studentCount: number }[]>([]);
//   const [averageScores, setAverageScores] = useState<{ name: string; averageScore: number }[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('https://localhost:44331/api/Students');
//       const students = await response.json();
//       setStudentCount(students.length);
//       setMaleCount(students.filter((s: any) => s.gender === 'Male').length);
//       setFemaleCount(students.filter((s: any) => s.gender === 'Female').length);
//     };

//     const fetchPathways = async () => {
//       const response = await fetch('https://localhost:44331/api/StudentPathways');
//       const pathways = await response.json();
//       const grouped = pathways.reduce((acc: Record<string, number>, curr: any) => {
//         acc[curr.pathwayName] = (acc[curr.pathwayName] || 0) + 1;
//         return acc;
//       }, {});
//       const result = Object.entries(grouped).map(([pathway, count]) => ({ pathway, studentCount: Number(count) }));

//     };

//     const fetchAssessments = async () => {
//       const response = await fetch('https://localhost:44331/api/SummativeAssessments');
//       const assessments = await response.json();
//       const scores: Record<string, number[]> = {};

//       assessments.forEach((a: any) => {
//         if (!scores[a.subjectName]) scores[a.subjectName] = [];
//         scores[a.subjectName].push(a.score);
//       });

//       const avgScores = Object.entries(scores).map(([name, scores]) => ({
//         name,
//         averageScore: parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2))
//       }));

//       setAverageScores(avgScores);
//     };

//     fetchData();
//     fetchPathways();
//     fetchAssessments();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <motion.aside
//         animate={{ width: sidebarOpen ? 240 : 60 }}
//         className="bg-gray-900 text-white p-4 overflow-hidden transition-all duration-300"
//       >
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="text-sm mb-4 bg-gray-700 p-2 rounded hover:bg-gray-600 transition w-full"
//         >
//           {sidebarOpen ? 'Collapse ◀' : '▶'}
//         </button>

//         <ul className="space-y-3 text-base">
//           {navLinks.map(({ label, href, icon }) => (
//             <li key={label}>
//               <Link
//                 href={href}
//                 className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors hover:bg-gray-700 ${
//                   pathname === href ? 'bg-gray-800 text-indigo-400' : ''
//                 }`}
//               >
//                 {icon}
//                 {sidebarOpen && <span>{label}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </motion.aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <Card className="shadow-xl border-l-4 border-blue-500">
//             <CardContent className="p-4">
//               <p className="text-gray-500">Total Students</p>
//               <p className="text-2xl font-semibold text-gray-800">{studentCount}</p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-xl border-l-4 border-green-500">
//             <CardContent className="p-4">
//               <p className="text-gray-500">Male Students</p>
//               <p className="text-2xl font-semibold text-gray-800">{maleCount}</p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-xl border-l-4 border-pink-500">
//             <CardContent className="p-4">
//               <p className="text-gray-500">Female Students</p>
//               <p className="text-2xl font-semibold text-gray-800">{femaleCount}</p>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-6 mb-10">
//           <h2 className="text-xl font-bold mb-4">Pathway Distribution</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={pathwayData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
//               <XAxis dataKey="pathway" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="studentCount" fill="#6366F1" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-xl font-bold mb-4">Average Scores by Subject</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={averageScores} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="averageScore" fill="#10B981" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, FileText } from 'lucide-react';

const navLinks = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
  // { label: 'Students', href: '/students', icon: <Users className="w-5 h-5" /> },
  { label: 'Pathways', href: '/student-pathways', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Reports', href: '/reportcards', icon: <FileText className="w-5 h-5" /> },
];
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const [studentCount, setStudentCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [pathwayData, setPathwayData] = useState<{ pathway: string; studentCount: number }[]>([]);
  const [averageScores, setAverageScores] = useState<{ name: string; averageScore: number }[]>([]);

  useEffect(() => {
    // Dummy data
    const students = [
      { id: 1, gender: 'Male' },
      { id: 2, gender: 'Female' },
      { id: 3, gender: 'Male' },
      { id: 4, gender: 'Female' },
      { id: 5, gender: 'Male' },
      { id: 6, gender: 'Female' },
      { id: 7, gender: 'Male' },
    ];
    const pathways = [
      { pathwayName: 'STEM' },
      { pathwayName: 'STEM' },
      { pathwayName: 'Arts' },
      { pathwayName: 'Sports' },
      { pathwayName: 'STEM' },
      { pathwayName: 'Arts' },
    ];
    const assessments = [
      { subjectName: 'Math', score: 80 },
      { subjectName: 'Math', score: 70 },
      { subjectName: 'Science', score: 65 },
      { subjectName: 'Science', score: 75 },
      { subjectName: 'English', score: 85 },
      { subjectName: 'English', score: 90 },
    ];

    // Populate student counts
    setStudentCount(students.length);
    setMaleCount(students.filter((s) => s.gender === 'Male').length);
    setFemaleCount(students.filter((s) => s.gender === 'Female').length);

    // Populate pathway data
    const grouped = pathways.reduce((acc: Record<string, number>, curr) => {
      acc[curr.pathwayName] = (acc[curr.pathwayName] || 0) + 1;
      return acc;
    }, {});
    const pathwayResults = Object.entries(grouped).map(([pathway, count]) => ({
      pathway,
      studentCount: count,
    }));
    setPathwayData(pathwayResults);

    // Populate average scores
    const scores: Record<string, number[]> = {};
    assessments.forEach((a) => {
      if (!scores[a.subjectName]) scores[a.subjectName] = [];
      scores[a.subjectName].push(a.score);
    });

    const avgScores = Object.entries(scores).map(([name, scoreList]) => ({
      name,
      averageScore: parseFloat((scoreList.reduce((a, b) => a + b, 0) / scoreList.length).toFixed(2)),
    }));
    setAverageScores(avgScores);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-xl border-l-4 border-blue-500">
            <CardContent className="p-4">
              <p className="text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold text-gray-800">{studentCount}</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-l-4 border-green-500">
            <CardContent className="p-4">
              <p className="text-gray-500">Male Students</p>
              <p className="text-2xl font-semibold text-gray-800">{maleCount}</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-l-4 border-pink-500">
            <CardContent className="p-4">
              <p className="text-gray-500">Female Students</p>
              <p className="text-2xl font-semibold text-gray-800">{femaleCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Pathway Distribution Bar Chart */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Pathway Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pathwayData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="pathway" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="studentCount" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Average Scores Pie Chart */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Average Scores by Subject</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={averageScores}
                  dataKey="averageScore"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#10B981"
                  label
                >
                  {averageScores.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#10B981', '#3B82F6', '#F59E0B'][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}