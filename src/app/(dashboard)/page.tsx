// "use client";

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent } from '@/components/ui/card';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from 'recharts';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { LayoutDashboard, Users, BookOpen, FileText } from 'lucide-react';

// export default function DashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const pathname = usePathname();
//   const [studentCount, setStudentCount] = useState(0);
//   const [maleCount, setMaleCount] = useState(0);
//   const [femaleCount, setFemaleCount] = useState(0);
//   const [pathwayData, setPathwayData] = useState<{ pathway: string; studentCount: number }[]>([]);
//   const [averageScores, setAverageScores] = useState<{ name: string; averageScore: number }[]>([]);

//   useEffect(() => {
//     // Dummy data
//     const students = [
//       { id: 1, gender: 'Male' },
//       { id: 2, gender: 'Female' },
//       { id: 3, gender: 'Male' },
//       { id: 4, gender: 'Female' },
//       { id: 5, gender: 'Male' },
//       { id: 6, gender: 'Female' },
//       { id: 7, gender: 'Male' },
//     ];
//     const pathways = [
//       { pathwayName: 'STEM' },
//       { pathwayName: 'STEM' },
//       { pathwayName: 'Arts' },
//       { pathwayName: 'Sports' },
//       { pathwayName: 'STEM' },
//       { pathwayName: 'Arts' },
//     ];
//     const assessments = [
//       { subjectName: 'Math', score: 80 },
//       { subjectName: 'Math', score: 70 },
//       { subjectName: 'Science', score: 65 },
//       { subjectName: 'Science', score: 75 },
//       { subjectName: 'English', score: 85 },
//       { subjectName: 'English', score: 90 },
//     ];

//     // Populate student counts
//     setStudentCount(students.length);
//     setMaleCount(students.filter((s) => s.gender === 'Male').length);
//     setFemaleCount(students.filter((s) => s.gender === 'Female').length);

//     // Populate pathway data
//     const grouped = pathways.reduce((acc: Record<string, number>, curr) => {
//       acc[curr.pathwayName] = (acc[curr.pathwayName] || 0) + 1;
//       return acc;
//     }, {});
//     const pathwayResults = Object.entries(grouped).map(([pathway, count]) => ({
//       pathway,
//       studentCount: count,
//     }));
//     setPathwayData(pathwayResults);

//     // Populate average scores
//     const scores: Record<string, number[]> = {};
//     assessments.forEach((a) => {
//       if (!scores[a.subjectName]) scores[a.subjectName] = [];
//       scores[a.subjectName].push(a.score);
//     });

//     const avgScores = Object.entries(scores).map(([name, scoreList]) => ({
//       name,
//       averageScore: parseFloat((scoreList.reduce((a, b) => a + b, 0) / scoreList.length).toFixed(2)),
//     }));
//     setAverageScores(avgScores);
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
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

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//           {/* Pathway Distribution Bar Chart */}
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-bold mb-4">Pathway Distribution</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={pathwayData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
//                 <XAxis dataKey="pathway" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="studentCount" fill="#6366F1" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Average Scores Pie Chart */}
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-bold mb-4">Average Scores by Subject</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={averageScores}
//                   dataKey="averageScore"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#10B981"
//                   label
//                 >
//                   {averageScores.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={['#10B981', '#3B82F6', '#F59E0B'][index % 3]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DonutChart,
  BarChart,
} from "@/components/ui/chart";

export default function DashboardPage() {
  const [studentCount, setStudentCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [pathwayData, setPathwayData] = useState<{ pathway: string; studentCount: number }[]>([]);
  const [averageScores, setAverageScores] = useState<{ name: string; averageScore: number }[]>([]);
  const [topStudents, setTopStudents] = useState<{ name: string; pathway: string }[]>([]);

  useEffect(() => {
    const students = [
      { id: 1, gender: "Male" },
      { id: 2, gender: "Female" },
      { id: 3, gender: "Male" },
      { id: 4, gender: "Female" },
      { id: 5, gender: "Male" },
      { id: 6, gender: "Female" },
      { id: 7, gender: "Male" },
    ];

    const pathways = [
      { pathwayName: "STEM" },
      { pathwayName: "STEM" },
      { pathwayName: "Arts" },
      { pathwayName: "Sports" },
      { pathwayName: "STEM" },
      { pathwayName: "Arts" },
    ];

    const assessments = [
      { subjectName: "Math", score: 80 },
      { subjectName: "Math", score: 70 },
      { subjectName: "Science", score: 65 },
      { subjectName: "Science", score: 75 },
      { subjectName: "English", score: 85 },
      { subjectName: "English", score: 90 },
    ];

    const topStudentsMock = [
      { name: "Alice Johnson", pathway: "STEM" },
      { name: "Bob Smith", pathway: "Arts" },
      { name: "Chloe Daniels", pathway: "STEM" },
      { name: "David Kim", pathway: "Sports" },
      { name: "Ella White", pathway: "Arts" },
    ];

    setStudentCount(students.length);
    setMaleCount(students.filter((s) => s.gender === "Male").length);
    setFemaleCount(students.filter((s) => s.gender === "Female").length);

    const grouped = pathways.reduce((acc: Record<string, number>, curr) => {
      acc[curr.pathwayName] = (acc[curr.pathwayName] || 0) + 1;
      return acc;
    }, {});
    const pathwayResults = Object.entries(grouped).map(([pathway, count]) => ({
      pathway,
      studentCount: count,
    }));
    setPathwayData(pathwayResults);

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

    setTopStudents(topStudentsMock);
  }, []);

  const donutData = averageScores.map((item) => ({
    name: item.name,
    value: item.averageScore,
  }));

  const barData = pathwayData.map((item) => ({
    name: item.pathway,
    value: item.studentCount,
  }));

  const donutConfig = {
    Math: { label: "Math", color: "#6366f1" },
    Science: { label: "Science", color: "#10b981" },
    English: { label: "English", color: "#f59e0b" },
  };

  const barConfig = {
    STEM: { label: "STEM", color: "#4f46e5" },
    Arts: { label: "Arts", color: "#ec4899" },
    Sports: { label: "Sports", color: "#10b981" },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        {/* Summary Cards */}
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

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Pathway Distribution</CardTitle>
              <CardDescription>This Term</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <BarChart data={barData} config={barConfig} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total students per pathway
              </div>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Average Scores by Subject</CardTitle>
              <CardDescription>This Term</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <DonutChart data={donutData} config={donutConfig} />
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 3.8% <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Based on latest assessments
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Top 5 Students */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Top 5 Students and Their Pathways</h2>
          <ul className="divide-y divide-gray-200">
            {topStudents.map((student, idx) => (
              <li key={`${student.name}-${idx}`} className="py-2 flex justify-between">
                <span className="font-medium">{student.name}</span>
                <span className="text-sm text-gray-600">{student.pathway}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}