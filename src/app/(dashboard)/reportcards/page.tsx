// "use client";

// import { useState, useEffect } from "react";
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
//   // Added dummy data for pathway relevant scores/indicators
//   mathScore: number;
//   scienceScore: number;
//   artsScore: number;
//   socialStudiesScore: number;
// }

// interface PathwayAssignment {
//   suggestedPathway: string;
//   strength: string;
//   supportNeeds: string;
//   rationale: string;
// }

// interface PathwayReport {
//   student: Student;
//   pathwayAssignment: PathwayAssignment;
// }

// // Function to determine the pathway based on dummy scores
// const determinePathway = (student: Student): PathwayAssignment => {
//   let suggestedPathway = "Social Sciences"; // Default pathway

//   // Simple dummy logic for pathway assignment
//   if (student.mathScore >= 70 && student.scienceScore >= 70) {
//     suggestedPathway = "Science, Technology, Engineering, and Mathematics (STEM)";
//   } else if (student.artsScore >= 70) {
//     suggestedPathway = "Arts and Sports Science";
//   }

//   let strength = "";
//   let supportNeeds = "";
//   let rationale = "";

//   switch (suggestedPathway) {
//     case "Science, Technology, Engineering, and Mathematics (STEM)":
//       strength = "Strong logical reasoning and problem-solving skills, with high aptitude in scientific concepts.";
//       supportNeeds = "Encourage participation in STEM clubs and advanced project-based learning.";
//       rationale = "Consistent high performance in Mathematics and Science indicates a strong inclination towards analytical and technical fields, aligning well with the STEM pathway.";
//       break;
//     case "Arts and Sports Science":
//       strength = "Exceptional creativity, artistic expression, and/or athletic prowess.";
//       supportNeeds = "Provide opportunities for specialized training, artistic workshops, and sports development programs.";
//       rationale = "Demonstrated outstanding ability in creative subjects and/or physical education, suggesting a natural fit for artistic or sports-related careers.";
//       break;
//     case "Social Sciences":
//       strength = "Excellent communication, critical thinking, and understanding of societal issues.";
//       supportNeeds = "Foster research skills and engagement in debates or community service activities.";
//       rationale = "Evident proficiency in humanities and language subjects, indicating potential for careers in law, business, or public service.";
//       break;
//   }

//   return { suggestedPathway, strength, supportNeeds, rationale };
// };

// function PathwayReportContent({ pathwayReport }: { pathwayReport: PathwayReport }) {
//   return (
//     <Card className="bg-white text-gray-900 p-10 w-[794px] shadow-md border">
//       <CardContent className="space-y-6 text-sm bg-white">
//         <div className="text-center space-y-1 border-b pb-4">
//           <h1 className="text-2xl font-bold uppercase text-blue-700">Demo School - Main Campus (CBC)</h1>
//           <p>P.O. BOX 11377 Nairobi</p>
//           <p>254733895871 | info@africacloudspace.com</p>
//           <p className="text-lg font-semibold uppercase mt-2">Senior Secondary School Pathway Assignment</p>
//           <h2 className="text-xl font-bold underline">Learner Pathway Report</h2>
//         </div>

//         <div className="text-center space-y-1">
//           <p><strong>Learner's Name:</strong> {pathwayReport.student.firstName} {pathwayReport.student.lastName}</p>
//           <p><strong>Current Class:</strong> {pathwayReport.student.className}</p>
//           <p><strong>Stream:</strong> {pathwayReport.student.stream}</p>
//           <p><strong>Admission Number:</strong> {pathwayReport.student.admissionNumber}</p>
//         </div>

//         <div className="space-y-4 border-t pt-4">
//           <h3 className="text-lg font-semibold border-b mb-2">Assigned CBC Pathway</h3>
//           <p><strong>Suggested Pathway:</strong> {pathwayReport.pathwayAssignment.suggestedPathway}</p>
//           <p><strong>Rationale for Assignment:</strong> {pathwayReport.pathwayAssignment.rationale}</p>
//           <p><strong>Key Strengths:</strong> {pathwayReport.pathwayAssignment.strength}</p>
//           <p><strong>Areas for Support & Development:</strong> {pathwayReport.pathwayAssignment.supportNeeds}</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 border-t pt-4">
//           <div>
//             <h4 className="font-semibold">Guidance Counselor Remarks</h4>
//             <p>Name: _______________________</p>
//           </div>
//           <div>
//             <h4 className="font-semibold">Principal/Headteacher Approval</h4>
//             <p>Name: _______________________</p>
//           </div>
//           <div className="col-span-2">
//           <p className="font-semibold">
//               Closing Date: ______________________ | Next term re-opens on: ______________________</p>
//             </div>
//         </div>

//         <p className="mt-4 text-sm text-gray-600 text-center">
//           Date of Report: {new Date().toLocaleDateString('en-KE')}
//         </p>
//       </CardContent>
//     </Card>
//   );
// }

// export default function PathwayReportsPage() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedStream, setSelectedStream] = useState("");

//   useEffect(() => {
//     // Dummy student data with simulated performance indicators for pathway assignment
//     setStudents([
//       { studentId: "1", firstName: "Alice", lastName: "Johnson", admissionNumber: "ADM001", className: "Grade 9", stream: "A", mathScore: 85, scienceScore: 90, artsScore: 60, socialStudiesScore: 75 },
//       { studentId: "2", firstName: "Bob", lastName: "Smith", admissionNumber: "ADM002", className: "Grade 9", stream: "A", mathScore: 65, scienceScore: 60, artsScore: 88, socialStudiesScore: 70 },
//       { studentId: "3", firstName: "Charlie", lastName: "Brown", admissionNumber: "ADM003", className: "Grade 9", stream: "B", mathScore: 70, scienceScore: 72, artsScore: 65, socialStudiesScore: 80 },
//       { studentId: "4", firstName: "Diana", lastName: "Miller", admissionNumber: "ADM004", className: "Grade 9", stream: "B", mathScore: 50, scienceScore: 55, artsScore: 75, socialStudiesScore: 85 },
//       { studentId: "5", firstName: "Eve", lastName: "Davis", admissionNumber: "ADM005", className: "Grade 9", stream: "A", mathScore: 92, scienceScore: 88, artsScore: 40, socialStudiesScore: 65 },
//     ]);
//   }, []);

//   const filteredStudents = students.filter((s) => {
//     return (
//       (!selectedClass || s.className === selectedClass) &&
//       (!selectedStream || s.stream === selectedStream)
//     );
//   });

//   const generateBatchPathwayReports = async () => {
//     const container = document.createElement("div");
//     container.style.position = "absolute";
//     container.style.top = "-9999px";
//     document.body.appendChild(container);

//     for (const student of filteredStudents) {
//       const pathwayAssignment = determinePathway(student);
//       const pathwayReport: PathwayReport = {
//         student,
//         pathwayAssignment,
//       };

//       const tempDiv = document.createElement("div");
//       container.appendChild(tempDiv);
//       const root = createRoot(tempDiv);
//       root.render(<PathwayReportContent pathwayReport={pathwayReport} />);
//       await new Promise((resolve) => setTimeout(resolve, 500)); // Give it a moment to render

//       const canvas = await html2canvas(tempDiv, { backgroundColor: "#ffffff" });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`pathway-report-${student.firstName}-${student.lastName}.pdf`);

//       root.unmount();
//       tempDiv.remove();
//     }

//     container.remove();
//     toast.success("Batch pathway reports generated.");
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold">CBC Learner Pathway Report Generator</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
//             <option value="Grade 9">Grade 9 (Junior Secondary)</option>
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

//       <Button onClick={generateBatchPathwayReports}>Download All Pathway Reports</Button>

//       <div className="space-y-8 mt-8">
//         {filteredStudents.map((student) => {
//           const pathwayAssignment = determinePathway(student);
//           const pathwayReport: PathwayReport = {
//             student,
//             pathwayAssignment,
//           };
//           return <PathwayReportContent key={student.studentId} pathwayReport={pathwayReport} />;
//         })}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import PathwayReportContent from "@/app/(dashboard)/reportcards/PathwayReportContent";
// import { generateBatchPathwayReports, determinePathway } from "@/lib/pdf/generatePathwayReport";
// interface Student {
//   studentId: string;
//   firstName: string;
//   lastName: string;
//   admissionNumber: string;
//   className: string;
//   stream: string;
//   mathScore: number;
//   scienceScore: number;
//   artsScore: number;
//   socialStudiesScore: number;
// }

// interface PathwayAssignment {
//   suggestedPathway: string;
//   strength: string;
//   supportNeeds: string;
//   rationale: string;
// }

// interface PathwayReport {
//   student: Student;
//   pathwayAssignment: PathwayAssignment;
// }

// export default function PathwayReportsPage() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedStream, setSelectedStream] = useState("");

//   useEffect(() => {
//     setStudents([
//       { studentId: "1", firstName: "Alice", lastName: "Johnson", admissionNumber: "ADM001", className: "Grade 9", stream: "A", mathScore: 85, scienceScore: 90, artsScore: 60, socialStudiesScore: 75 },
//       { studentId: "2", firstName: "Bob", lastName: "Smith", admissionNumber: "ADM002", className: "Grade 9", stream: "A", mathScore: 65, scienceScore: 60, artsScore: 88, socialStudiesScore: 70 },
//       { studentId: "3", firstName: "Charlie", lastName: "Brown", admissionNumber: "ADM003", className: "Grade 9", stream: "B", mathScore: 70, scienceScore: 72, artsScore: 65, socialStudiesScore: 80 },
//       { studentId: "4", firstName: "Diana", lastName: "Miller", admissionNumber: "ADM004", className: "Grade 9", stream: "B", mathScore: 50, scienceScore: 55, artsScore: 75, socialStudiesScore: 85 },
//       { studentId: "5", firstName: "Eve", lastName: "Davis", admissionNumber: "ADM005", className: "Grade 9", stream: "A", mathScore: 92, scienceScore: 88, artsScore: 40, socialStudiesScore: 65 },
//     ]);
//   }, []);

//   const filteredStudents = students.filter((s) => {
//     return (
//       (!selectedClass || s.className === selectedClass) &&
//       (!selectedStream || s.stream === selectedStream)
//     );
//   });

//   const handleBatchDownload = async () => {
//     await generateBatchPathwayReports(filteredStudents);
//     toast.success("Batch pathway reports generated.");
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold">CBC Learner Pathway Report Generator</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
//             <option value="Grade 9">Grade 9 (Junior Secondary)</option>
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

//       <Button onClick={handleBatchDownload}>Download All Pathway Reports</Button>

//       <div className="space-y-8 mt-8">
//         {filteredStudents.map((student) => {
//           const pathwayAssignment = determinePathway(student);
//           const pathwayReport: PathwayReport = {
//             student,
//             pathwayAssignment,
//           };
//           return <PathwayReportContent key={student.studentId} pathwayReport={pathwayReport} />;
//         })}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { generateBatchPathwayReports, determinePathway } from "@/lib/pdf/generatePathwayReport";
import PathwayReportContent from "@/app/(dashboard)/reportcards/PathwayReportContent";

interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  className: string;
  stream: string;
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

export default function PathwayReportsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");

  useEffect(() => {
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

  const handleBatchDownload = async () => {
    try {
      await generateBatchPathwayReports(filteredStudents);
      toast.success("Batch pathway reports downloaded successfully.");
    } catch (err) {
      toast.error("Failed to generate reports. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 relative">
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

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleBatchDownload}
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
          title="Download All Pathway Reports"
        >
          <Download className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}