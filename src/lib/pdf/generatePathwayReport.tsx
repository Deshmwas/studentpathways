"use client";

import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PathwayReportContent from "../../app/(dashboard)/reportcards/PathwayReportContent";
import type { PathwayReport, Student } from "@/app/(dashboard)/reportcards/types";

// Determine pathway based on student scores
export const determinePathway = (student: Student) => {
  let suggestedPathway = "Social Sciences";

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

export const generateSingleReportPDF = async (pathwayReport: PathwayReport, filename?: string) => {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-9999px";
  document.body.appendChild(container);

  const tempDiv = document.createElement("div");
  container.appendChild(tempDiv);
  const root = createRoot(tempDiv);
  root.render(<PathwayReportContent pathwayReport={pathwayReport} />);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const canvas = await html2canvas(tempDiv, { backgroundColor: "#ffffff" });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename || "pathway-report.pdf");

  root.unmount();
  container.remove();
};

export const generateBatchPathwayReports = async (students: Student[]) => {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-9999px";
  document.body.appendChild(container);

  for (const student of students) {
    const pathwayAssignment = determinePathway(student);
    const pathwayReport: PathwayReport = { student, pathwayAssignment };
    const tempDiv = document.createElement("div");
    container.appendChild(tempDiv);
    const root = createRoot(tempDiv);
    root.render(<PathwayReportContent pathwayReport={pathwayReport} />);
    await new Promise((resolve) => setTimeout(resolve, 500));
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
};
