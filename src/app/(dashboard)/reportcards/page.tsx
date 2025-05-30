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



// "use client";

// import { useRef, useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { createRoot } from "react-dom/client";

// interface Student {
//   studentId: string;
//   firstName: string;
//   lastName: string;
//   admissionNumber: string;
//   className: string;
//   stream: string;
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

// function ReportCardContent({ reportCard }: { reportCard: ReportCard }) {
//   return (
//     <Card className="bg-white text-gray-900 p-10 w-[794px] shadow-md border">
//       <CardContent className="space-y-6 text-sm bg-white">
//         <div className="text-center space-y-1 border-b pb-4">
//           <h1 className="text-2xl font-bold uppercase text-blue-700">Demo School - Main Campus (CBC)</h1>
//           <p>P.O. BOX 11377 Nairobi</p>
//           <p>254733895871 | info@africacloudspace.com</p>
//           <p className="text-lg font-semibold uppercase mt-2">Opener Exams</p>
//           <h2 className="text-xl font-bold underline">Academic Report Card</h2>
//         </div>

//         <div className="text-center space-y-1">
//           <p><strong>Learner's Name:</strong> {reportCard.student.firstName} {reportCard.student.lastName}</p>
//           <p><strong>Class Name:</strong> {reportCard.student.className}</p>
//           <p><strong>Stream:</strong> {reportCard.student.stream}</p>
//           <p><strong>ADM No:</strong> {reportCard.student.admissionNumber}</p>
//         </div>

//         <div className="text-center space-y-1 border-t pt-4">
//           <p><strong>Overall Score:</strong> {reportCard.totalScore}</p>
//           <p><strong>Percentage:</strong> {reportCard.meanScore}</p>
//           <p><strong>Grade:</strong> {reportCard.grade}</p>
//           <div className="mt-2">
//             <h3 className="font-semibold underline">Marks Range Grade</h3>
//             <div className="flex justify-center space-x-6 text-sm mt-1">
//               <p>0 - 30: <strong>BE</strong></p>
//               <p>31 - 49: <strong>AE</strong></p>
//               <p>50 - 75: <strong>ME</strong></p>
//               <p>76 - 100: <strong>EE</strong></p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold border-b mb-2">Learner's Performance</h3>
//           <table className="w-full border table-auto text-left text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-2 py-1">Subject</th>
//                 <th className="border px-2 py-1">Marks</th>
//                 <th className="border px-2 py-1">Points</th>
//                 <th className="border px-2 py-1">Grade</th>
//                 <th className="border px-2 py-1">Comment</th>
//               </tr>
//             </thead>
//             <tbody>
//               {["CRE", "Creative Activities", "Kiswahili", "Mathematics"].map((subject, i) => (
//                 <tr key={i}>
//                   <td className="border px-2 py-1">{subject}</td>
//                   <td className="border px-2 py-1">{Math.floor(Math.random() * 30 + 70)}</td>
//                   <td className="border px-2 py-1">4</td>
//                   <td className="border px-2 py-1">EE</td>
//                   <td className="border px-2 py-1">Exceeding Expectations</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div>
//           <h3 className="font-semibold text-lg border-b mb-2">Pathway</h3>
//           <p><strong>Suggested Pathway:</strong> Science and Technology</p>
//           <p><strong>Strength:</strong> Logical reasoning, numerical aptitude</p>
//           <p><strong>Support Needs:</strong> Foster innovation via project-based learning</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 border-t pt-4">
//           <div>
//             <h4 className="font-semibold">Class Teacher Remarks</h4>
//             <p>Name: _______________________</p>
//           </div>
//           <div>
//             <h4 className="font-semibold">Principal/Headteacher Remarks</h4>
//             <p>Name: _______________________</p>
//           </div>
//         </div>

//         <p className="mt-4 text-sm text-gray-600 text-center">
//           Closing Date: ______________________ | Next term re-opens on: ______________________
//         </p>
//       </CardContent>
//     </Card>
//   );
// }

// export default function ReportCardsPage() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [term, setTerm] = useState("1");
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedStream, setSelectedStream] = useState("");

//   useEffect(() => {
//     setStudents([
//       { studentId: "1", firstName: "Alice", lastName: "Johnson", admissionNumber: "ADM001", className: "Grade 1", stream: "A" },
//       { studentId: "2", firstName: "Bob", lastName: "Smith", admissionNumber: "ADM002", className: "Grade 1", stream: "A" },
//       { studentId: "3", firstName: "Charlie", lastName: "Brown", admissionNumber: "ADM003", className: "Grade 1", stream: "B" },
//     ]);
//   }, []);

//   const filteredStudents = students.filter((s) => {
//     return (
//       (!selectedClass || s.className === selectedClass) &&
//       (!selectedStream || s.stream === selectedStream)
//     );
//   });

//   const generateBatchReports = async () => {
//     const container = document.createElement("div");
//     container.style.position = "absolute";
//     container.style.top = "-9999px";
//     document.body.appendChild(container);

//     for (const student of filteredStudents) {
//       const reportCard: ReportCard = {
//         totalScore: 420,
//         meanScore: 84,
//         grade: "A",
//         student,
//         behavioralAttribute: {
//           discipline: "Excellent",
//           participation: "Active",
//           teamwork: "Cooperative",
//           creativity: "Very Creative",
//           comments: "Shows great enthusiasm and leadership."
//         },
//         teacherComment: {
//           comment: "Keep up the great work!"
//         },
//         principalComment: {
//           comment: "An outstanding performance this term."
//         }
//       };

//       const tempDiv = document.createElement("div");
//       container.appendChild(tempDiv);
//       const root = createRoot(tempDiv);
//       root.render(<ReportCardContent reportCard={reportCard} />);
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       const canvas = await html2canvas(tempDiv, { backgroundColor: "#ffffff" });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`report-card-${student.firstName}-${student.lastName}.pdf`);

//       root.unmount();
//       tempDiv.remove();
//     }

//     container.remove();
//     toast.success("Batch reports generated.");
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold">Report Card Generator</h2>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
//         <div>
//           <Label>Class</Label>
//           <select
//             className="w-full border rounded px-2 py-1"
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//           >
//             <option value="">All</option>
//             <option value="Grade 1">Grade 1</option>
//           </select>
//         </div>
//         <div>
//           <Label>Stream</Label>
//           <select
//             className="w-full border rounded px-2 py-1"
//             value={selectedStream}
//             onChange={(e) => setSelectedStream(e.target.value)}
//           >
//             <option value="">All</option>
//             <option value="A">A</option>
//             <option value="B">B</option>
//           </select>
//         </div>
//       </div>

//       <Button onClick={generateBatchReports}>Download All PDF Reports</Button>

//       <div className="space-y-8 mt-8">
//         {filteredStudents.map((student) => {
//           const reportCard: ReportCard = {
//             totalScore: 420,
//             meanScore: 84,
//             grade: "A",
//             student,
//             behavioralAttribute: {
//               discipline: "Excellent",
//               participation: "Active",
//               teamwork: "Cooperative",
//               creativity: "Very Creative",
//               comments: "Shows great enthusiasm and leadership."
//             },
//             teacherComment: {
//               comment: "Keep up the great work!"
//             },
//             principalComment: {
//               comment: "An outstanding performance this term."
//             }
//           };

//           return <ReportCardContent key={student.studentId} reportCard={reportCard} />;
//         })}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";

interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  className: string;
  stream: string;
  // Added dummy data for pathway relevant scores/indicators
  mathScore: number;
  scienceScore: number;
  artsScore: number;
  socialStudiesScore: number;
}

interface PathwayAssignment {
  suggestedPathway: string;
  strength: string;
  supportNeeds: string;
  rationale: string;
}

interface PathwayReport {
  student: Student;
  pathwayAssignment: PathwayAssignment;
}

// Function to determine the pathway based on dummy scores
const determinePathway = (student: Student): PathwayAssignment => {
  let suggestedPathway = "Social Sciences"; // Default pathway

  // Simple dummy logic for pathway assignment
  if (student.mathScore >= 70 && student.scienceScore >= 70) {
    suggestedPathway = "Science, Technology, Engineering, and Mathematics (STEM)";
  } else if (student.artsScore >= 70) {
    suggestedPathway = "Arts and Sports Science";
  }

  let strength = "";
  let supportNeeds = "";
  let rationale = "";

  switch (suggestedPathway) {
    case "Science, Technology, Engineering, and Mathematics (STEM)":
      strength = "Strong logical reasoning and problem-solving skills, with high aptitude in scientific concepts.";
      supportNeeds = "Encourage participation in STEM clubs and advanced project-based learning.";
      rationale = "Consistent high performance in Mathematics and Science indicates a strong inclination towards analytical and technical fields, aligning well with the STEM pathway.";
      break;
    case "Arts and Sports Science":
      strength = "Exceptional creativity, artistic expression, and/or athletic prowess.";
      supportNeeds = "Provide opportunities for specialized training, artistic workshops, and sports development programs.";
      rationale = "Demonstrated outstanding ability in creative subjects and/or physical education, suggesting a natural fit for artistic or sports-related careers.";
      break;
    case "Social Sciences":
      strength = "Excellent communication, critical thinking, and understanding of societal issues.";
      supportNeeds = "Foster research skills and engagement in debates or community service activities.";
      rationale = "Evident proficiency in humanities and language subjects, indicating potential for careers in law, business, or public service.";
      break;
  }

  return { suggestedPathway, strength, supportNeeds, rationale };
};

function PathwayReportContent({ pathwayReport }: { pathwayReport: PathwayReport }) {
  return (
    <Card className="bg-white text-gray-900 p-10 w-[794px] shadow-md border">
      <CardContent className="space-y-6 text-sm bg-white">
        <div className="text-center space-y-1 border-b pb-4">
          <h1 className="text-2xl font-bold uppercase text-blue-700">Demo School - Main Campus (CBC)</h1>
          <p>P.O. BOX 11377 Nairobi</p>
          <p>254733895871 | info@africacloudspace.com</p>
          <p className="text-lg font-semibold uppercase mt-2">Senior Secondary School Pathway Assignment</p>
          <h2 className="text-xl font-bold underline">Learner Pathway Report</h2>
        </div>

        <div className="text-center space-y-1">
          <p><strong>Learner's Name:</strong> {pathwayReport.student.firstName} {pathwayReport.student.lastName}</p>
          <p><strong>Current Class:</strong> {pathwayReport.student.className}</p>
          <p><strong>Stream:</strong> {pathwayReport.student.stream}</p>
          <p><strong>Admission Number:</strong> {pathwayReport.student.admissionNumber}</p>
        </div>

        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold border-b mb-2">Assigned CBC Pathway</h3>
          <p><strong>Suggested Pathway:</strong> {pathwayReport.pathwayAssignment.suggestedPathway}</p>
          <p><strong>Rationale for Assignment:</strong> {pathwayReport.pathwayAssignment.rationale}</p>
          <p><strong>Key Strengths:</strong> {pathwayReport.pathwayAssignment.strength}</p>
          <p><strong>Areas for Support & Development:</strong> {pathwayReport.pathwayAssignment.supportNeeds}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <h4 className="font-semibold">Guidance Counselor Remarks</h4>
            <p>Name: _______________________</p>
          </div>
          <div>
            <h4 className="font-semibold">Principal/Headteacher Approval</h4>
            <p>Name: _______________________</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Date of Report: {new Date().toLocaleDateString('en-KE')}
        </p>
      </CardContent>
    </Card>
  );
}

export default function PathwayReportsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");

  useEffect(() => {
    // Dummy student data with simulated performance indicators for pathway assignment
    setStudents([
      { studentId: "1", firstName: "Alice", lastName: "Johnson", admissionNumber: "ADM001", className: "Grade 9", stream: "A", mathScore: 85, scienceScore: 90, artsScore: 60, socialStudiesScore: 75 },
      { studentId: "2", firstName: "Bob", lastName: "Smith", admissionNumber: "ADM002", className: "Grade 9", stream: "A", mathScore: 65, scienceScore: 60, artsScore: 88, socialStudiesScore: 70 },
      { studentId: "3", firstName: "Charlie", lastName: "Brown", admissionNumber: "ADM003", className: "Grade 9", stream: "B", mathScore: 70, scienceScore: 72, artsScore: 65, socialStudiesScore: 80 },
      { studentId: "4", firstName: "Diana", lastName: "Miller", admissionNumber: "ADM004", className: "Grade 9", stream: "B", mathScore: 50, scienceScore: 55, artsScore: 75, socialStudiesScore: 85 },
      { studentId: "5", firstName: "Eve", lastName: "Davis", admissionNumber: "ADM005", className: "Grade 9", stream: "A", mathScore: 92, scienceScore: 88, artsScore: 40, socialStudiesScore: 65 },
    ]);
  }, []);

  const filteredStudents = students.filter((s) => {
    return (
      (!selectedClass || s.className === selectedClass) &&
      (!selectedStream || s.stream === selectedStream)
    );
  });

  const generateBatchPathwayReports = async () => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "-9999px";
    document.body.appendChild(container);

    for (const student of filteredStudents) {
      const pathwayAssignment = determinePathway(student);
      const pathwayReport: PathwayReport = {
        student,
        pathwayAssignment,
      };

      const tempDiv = document.createElement("div");
      container.appendChild(tempDiv);
      const root = createRoot(tempDiv);
      root.render(<PathwayReportContent pathwayReport={pathwayReport} />);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Give it a moment to render

      const canvas = await html2canvas(tempDiv, { backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`pathway-report-${student.firstName}-${student.lastName}.pdf`);

      root.unmount();
      tempDiv.remove();
    }

    container.remove();
    toast.success("Batch pathway reports generated.");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">CBC Learner Pathway Report Generator</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Year</Label>
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Class</Label>
          <select
            className="w-full border rounded px-2 py-1"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All</option>
            <option value="Grade 9">Grade 9 (Junior Secondary)</option>
          </select>
        </div>
        <div>
          <Label>Stream</Label>
          <select
            className="w-full border rounded px-2 py-1"
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
          >
            <option value="">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
      </div>

      <Button onClick={generateBatchPathwayReports}>Download All Pathway Reports</Button>

      <div className="space-y-8 mt-8">
        {filteredStudents.map((student) => {
          const pathwayAssignment = determinePathway(student);
          const pathwayReport: PathwayReport = {
            student,
            pathwayAssignment,
          };
          return <PathwayReportContent key={student.studentId} pathwayReport={pathwayReport} />;
        })}
      </div>
    </div>
  );
}