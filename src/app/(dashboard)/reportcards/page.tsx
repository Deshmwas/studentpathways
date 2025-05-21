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
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-4">
              <h1 className="text-3xl font-extrabold text-blue-700 uppercase tracking-wider">Cloud School</h1>
              <p className="text-sm text-gray-600">Official Term Report Card</p>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
              <p><strong>Name:</strong> {reportCard.student.firstName} {reportCard.student.lastName}</p>
              <p><strong>Admission No:</strong> {reportCard.student.admissionNumber || "-"}</p>
              <p><strong>Term:</strong> {term}</p>
              <p><strong>Year:</strong> {year}</p>
            </div>

            {/* Academic Summary */}
            <div className="bg-gray-50 p-4 rounded shadow border">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Academic Performance</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <p><strong>Total Score:</strong> {reportCard.totalScore}</p>
                <p><strong>Mean Score:</strong> {reportCard.meanScore}</p>
                <p><strong>Grade:</strong> <span className="text-xl font-bold text-green-600">{reportCard.grade}</span></p>
              </div>
            </div>

            {/* Behavior */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-blue-700">Behavioral Attributes</h3>
              {reportCard.behavioralAttribute ? (
                <ul className="list-disc list-inside ml-4 text-sm space-y-1 mt-2">
                  <li><strong>Discipline:</strong> {reportCard.behavioralAttribute.discipline}</li>
                  <li><strong>Participation:</strong> {reportCard.behavioralAttribute.participation}</li>
                  <li><strong>Teamwork:</strong> {reportCard.behavioralAttribute.teamwork}</li>
                  <li><strong>Creativity:</strong> {reportCard.behavioralAttribute.creativity}</li>
                  <li><strong>Comments:</strong> {reportCard.behavioralAttribute.comments}</li>
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No behavioral data available.</p>
              )}
            </div>

            {/* Comments */}
            <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700">Class Teacher's Comment</h4>
                <p>{reportCard.teacherComment?.comment || <span className="text-gray-500">No comment available.</span>}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700">Principal's Comment</h4>
                <p>{reportCard.principalComment?.comment || <span className="text-gray-500">No comment available.</span>}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}