"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { PathwayReport } from "./types";

export default function PathwayReportContent({ pathwayReport }: { pathwayReport: PathwayReport }) {
  return (
    <Card className="bg-white text-gray-900 p-10 w-[794px] shadow-md border">
      <CardContent className="space-y-6 text-sm bg-white">
        {/* Header */}
        <div className="text-center space-y-1 border-b pb-4">
          <h1 className="text-2xl font-bold uppercase text-blue-700">Demo School - Main Campus (CBC)</h1>
          <p>P.O. BOX 11377 Nairobi</p>
          <p>254733895871 | info@africacloudspace.com</p>
          <p className="text-lg font-semibold uppercase mt-2">Senior Secondary School Pathway Assignment</p>
          <h2 className="text-xl font-bold underline">Learner Pathway Report</h2>
        </div>

        {/* Learner Info */}
        <div className="text-center space-y-1">
          <p><strong>Learner's Name:</strong> {pathwayReport.student.firstName} {pathwayReport.student.lastName}</p>
          <p><strong>Current Class:</strong> {pathwayReport.student.className}</p>
          <p><strong>Stream:</strong> {pathwayReport.student.stream}</p>
          <p><strong>Admission Number:</strong> {pathwayReport.student.admissionNumber}</p>
        </div>

        {/* Pathway Details */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold border-b mb-2">Assigned CBC Pathway</h3>
          <p><strong>Suggested Pathway:</strong> {pathwayReport.pathwayAssignment.suggestedPathway}</p>
          <p><strong>Rationale for Assignment:</strong> {pathwayReport.pathwayAssignment.rationale}</p>
          <p><strong>Key Strengths:</strong> {pathwayReport.pathwayAssignment.strength}</p>
          <p><strong>Areas for Support & Development:</strong> {pathwayReport.pathwayAssignment.supportNeeds}</p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <h4 className="font-semibold">Guidance Counselor Remarks</h4>
            <p>Name: _______________________</p>
          </div>
          <div>
            <h4 className="font-semibold">Principal/Headteacher Approval</h4>
            <p>Name: _______________________</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Closing Date: ______________________ | Next term re-opens on: ______________________</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Date of Report: {new Date().toLocaleDateString("en-KE")}
        </p>
      </CardContent>
    </Card>
  );
}
