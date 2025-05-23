// "use client";

// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// interface Student {
//   studentId: string;
//   firstName: string;
//   lastName: string;
//   admissionNumber: string;
// }

// interface ReportCard {
//   totalScore: number;
//   meanScore: number;
//   grade: string;
//   student: Student;
//   behavioralAttribute: {
//     discipline: string;
//     participation: string;
//     teamwork: string;
//     creativity: string;
//     comments: string;
//   } | null;
//   teacherComment: {
//     comment: string;
//   } | null;
//   principalComment: {
//     comment: string;
//   } | null;
// }

// export default function ReportCardsPage() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [studentId, setStudentId] = useState("");
//   const [term, setTerm] = useState("1");
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [reportCard, setReportCard] = useState<ReportCard | null>(null);
//   const reportRef = useRef<HTMLDivElement>(null);

//   const baseURL = "https://localhost:44331/api";

//   useEffect(() => {
//     axios.get(`${baseURL}/Students`).then((res) => {
//       setStudents(res.data);
//     });
//   }, []);

//   const fetchReportCard = async () => {
//     if (!studentId) {
//       toast.error("Please select a student.");
//       return;
//     }

//     try {
//       const res = await axios.get(`${baseURL}/ReportCards/generate`, {
//         params: {
//           studentId,
//           term,
//           year,
//         },
//       });

//       setReportCard(res.data);
//     } catch (error) {
//       console.error("Error fetching report card:", error);
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data || "Failed to generate report card.");
//       } else {
//         toast.error("Unexpected error occurred.");
//       }
//       setReportCard(null);
//     }
//   };

//   const downloadPDF = async () => {
//     if (!reportRef.current) return;

//     const canvas = await html2canvas(reportRef.current);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`report-card-${term}-${year}.pdf`);
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold">Generate Report Card</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <Label>Student</Label>
//           <select
//             className="w-full border rounded px-2 py-1"
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//           >
//             <option value="">Select student</option>
//             {students.map((s) => (
//               <option key={s.studentId} value={s.studentId}>
//                 {s.firstName} {s.lastName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <Label>Term</Label>
//           <select
//             className="w-full border rounded px-2 py-1"
//             value={term}
//             onChange={(e) => setTerm(e.target.value)}
//           >
//             <option value="1">Term 1</option>
//             <option value="2">Term 2</option>
//             <option value="3">Term 3</option>
//           </select>
//         </div>

//         <div>
//           <Label>Year</Label>
//           <Input
//             type="number"
//             value={year}
//             onChange={(e) => setYear(Number(e.target.value))}
//           />
//         </div>
//       </div>

//       <div className="flex gap-4 mt-4">
//         <Button onClick={fetchReportCard}>Generate</Button>
//         {reportCard && <Button onClick={downloadPDF}>Download as PDF</Button>}
//       </div>

//       {reportCard && (
//         <Card ref={reportRef} className="bg-white text-gray-800 mt-6 shadow-lg border border-gray-300">
//           <CardContent className="p-8 space-y-6">
//             {/* Header */}
//             <div className="text-center border-b pb-4">
//               <h1 className="text-3xl font-extrabold text-blue-700 uppercase tracking-wider">Greenfield School</h1>
//               <p className="text-sm text-gray-600">Official Term Report Card</p>
//             </div>

//             {/* Student Info */}
//             <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
//               <p><strong>Name:</strong> {reportCard.student.firstName} {reportCard.student.lastName}</p>
//               <p><strong>Admission No:</strong> {reportCard.student.admissionNumber || "-"}</p>
//               <p><strong>Term:</strong> {term}</p>
//               <p><strong>Year:</strong> {year}</p>
//             </div>

//             {/* Academic Summary */}
//             <div className="bg-gray-50 p-4 rounded shadow border">
//               <h3 className="text-lg font-semibold text-blue-700 mb-2">Academic Performance</h3>
//               <div className="grid grid-cols-3 gap-4 text-sm">
//                 <p><strong>Total Score:</strong> {reportCard.totalScore}</p>
//                 <p><strong>Mean Score:</strong> {reportCard.meanScore}</p>
//                 <p><strong>Grade:</strong> <span className="text-xl font-bold text-green-600">{reportCard.grade}</span></p>
//               </div>
//             </div>

//             {/* Behavior */}
//             <div className="border-t pt-4">
//               <h3 className="font-semibold text-blue-700">Behavioral Attributes</h3>
//               {reportCard.behavioralAttribute ? (
//                 <ul className="list-disc list-inside ml-4 text-sm space-y-1 mt-2">
//                   <li><strong>Discipline:</strong> {reportCard.behavioralAttribute.discipline}</li>
//                   <li><strong>Participation:</strong> {reportCard.behavioralAttribute.participation}</li>
//                   <li><strong>Teamwork:</strong> {reportCard.behavioralAttribute.teamwork}</li>
//                   <li><strong>Creativity:</strong> {reportCard.behavioralAttribute.creativity}</li>
//                   <li><strong>Comments:</strong> {reportCard.behavioralAttribute.comments}</li>
//                 </ul>
//               ) : (
//                 <p className="text-sm text-gray-500">No behavioral data available.</p>
//               )}
//             </div>

//             {/* Comments */}
//             <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm">
//               <div>
//                 <h4 className="font-semibold text-blue-700">Class Teacher's Comment</h4>
//                 <p>{reportCard.teacherComment?.comment || <span className="text-gray-500">No comment available.</span>}</p>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-blue-700">Principal's Comment</h4>
//                 <p>{reportCard.principalComment?.comment || <span className="text-gray-500">No comment available.</span>}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }


"use client";

import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
}

interface ReportCard {
  totalScore: number;
  meanScore: number;
  grade: string;
  student: Student;
  behavioralAttribute: {
    discipline: string;
    participation: string;
    teamwork: string;
    creativity: string;
    comments: string;
  } | null;
  teacherComment: {
    comment: string;
  } | null;
  principalComment: {
    comment: string;
  } | null;
}

export default function ReportCardsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [term, setTerm] = useState("1");
  const [year, setYear] = useState(new Date().getFullYear());
  const [reportCard, setReportCard] = useState<ReportCard | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mockStudents: Student[] = [
      { studentId: "1", firstName: "Alice", lastName: "Johnson", admissionNumber: "ADM001" },
      { studentId: "2", firstName: "Bob", lastName: "Smith", admissionNumber: "ADM002" },
      { studentId: "3", firstName: "Charlie", lastName: "Brown", admissionNumber: "ADM003" },
    ];
    setStudents(mockStudents);
  }, []);

  const fetchReportCard = async () => {
    if (!studentId) {
      toast.error("Please select a student.");
      return;
    }

    const selectedStudent = students.find((s) => s.studentId === studentId);
    if (!selectedStudent) return;

    const mockReportCard: ReportCard = {
      totalScore: 420,
      meanScore: 84,
      grade: "A",
      student: selectedStudent,
      behavioralAttribute: {
        discipline: "Excellent",
        participation: "Active",
        teamwork: "Cooperative",
        creativity: "Very Creative",
        comments: "Shows great enthusiasm and leadership.",
      },
      teacherComment: {
        comment: "Keep up the great work!",
      },
      principalComment: {
        comment: "An outstanding performance this term.",
      },
    };

    setReportCard(mockReportCard);
    toast.success("Mock report generated.");
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`report-card-${term}-${year}.pdf`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Generate Report Card</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Student</Label>
          <select
            className="w-full border rounded px-2 py-1"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s.studentId} value={s.studentId}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Term</Label>
          <select
            className="w-full border rounded px-2 py-1"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="1">Term 1</option>
            <option value="2">Term 2</option>
            <option value="3">Term 3</option>
          </select>
        </div>

        <div>
          <Label>Year</Label>
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button onClick={fetchReportCard}>Generate</Button>
        {reportCard && <Button onClick={downloadPDF}>Download as PDF</Button>}
      </div>

      {reportCard && (
        <Card ref={reportRef} className="bg-white text-gray-800 mt-6 shadow-lg border border-gray-300">
   <CardContent ref={reportRef} className="bg-white text-gray-900 p-10 space-y-6 text-sm shadow-lg border border-gray-300">
  {/* School Header */}
  <div className="text-center space-y-1 border-b pb-4">
    <h1 className="text-2xl font-bold uppercase text-blue-700">Demo School - Main Campus (CBC)</h1>
    <p>P.O. BOX 11377 Nairobi</p>
    <p>254733895871 | info@africacloudspace.com</p>
    <p className="text-lg font-semibold uppercase mt-2">Opener Exams</p>
    <h2 className="text-xl font-bold underline">Academic Report Card</h2>
  </div>

  {/* General Info - centered */}
  <div className="text-center space-y-1">
    <p><strong>Learner's Name:</strong> {reportCard.student.firstName} {reportCard.student.lastName}</p>
    <p><strong>Class Name:</strong> Grade 1 - A</p>
    <p><strong>ADM No:</strong> {reportCard.student.admissionNumber}</p>
    <p><strong>Year - Term:</strong> {year} - Term {term}</p>
  </div>

  {/* Performance Metrics - centered */}
  <div className="text-center space-y-1 border-t pt-4">
    <p><strong>Overall Score:</strong> {reportCard.totalScore}</p>
    <p><strong>Percentage:</strong> {reportCard.meanScore}</p>
    <p><strong>Grade:</strong> {reportCard.grade}</p>
    <div className="mt-2">
      <h3 className="font-semibold underline">Marks Range Grade</h3>
      <div className="flex justify-center space-x-6 text-sm mt-1">
        <p>0 - 30: <strong>BE</strong></p>
        <p>31 - 49: <strong>AE</strong></p>
        <p>50 - 75: <strong>ME</strong></p>
        <p>76 - 100: <strong>EE</strong></p>
      </div>
    </div>
  </div>

  {/* Learner's Performance */}
  <div>
    <h3 className="text-lg font-semibold border-b mb-2">Learner's Performance</h3>
    <table className="w-full border table-auto text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-2 py-1">Subject</th>
          <th className="border px-2 py-1">Marks</th>
          <th className="border px-2 py-1">Points</th>
          <th className="border px-2 py-1">Grade</th>
          <th className="border px-2 py-1">Comment</th>
        </tr>
      </thead>
      <tbody>
        {[
          { subject: "Christian Religious Education", marks: 80 },
          { subject: "Creative Activities", marks: 90 },
          { subject: "Kiswahili", marks: 86 },
          { subject: "Mathematics", marks: 99 },
        ].map(({ subject, marks }, i) => (
          <tr key={i}>
            <td className="border px-2 py-1">{subject}</td>
            <td className="border px-2 py-1">{marks}</td>
            <td className="border px-2 py-1">4</td>
            <td className="border px-2 py-1">EE</td>
            <td className="border px-2 py-1">Exceeding Expectations</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pathway Section */}
  <div>
    <h3 className="font-semibold text-lg border-b mb-2">Pathway</h3>
    <p><strong>Suggested Pathway:</strong> Science and Technology</p>
    <p><strong>Strength:</strong> Logical reasoning, numerical aptitude</p>
    <p><strong>Support Needs:</strong> Foster innovation via project-based learning</p>
  </div>

  {/* Remarks */}
  <div className="grid grid-cols-2 gap-4 border-t pt-4">
    <div>
      <h4 className="font-semibold">Class Teacher Remarks</h4>
      <p>Name: _______________________</p>
    </div>
    <div>
      <h4 className="font-semibold">Principal/Headteacher Remarks</h4>
      <p>Name: _______________________</p>
    </div>
  </div>

  {/* Footer */}
  <p className="mt-4 text-sm text-gray-600 text-center">
    Closing Date: ______________________ | Next term re-opens on: ______________________
  </p>
</CardContent>


        </Card>
      )}
    </div>
  );
}