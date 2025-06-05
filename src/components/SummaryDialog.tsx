// src/components/SummaryDialog.tsx
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Student } from "@/types";

interface SummaryData {
  averageDurationDays: number;
  bestPathwayName: string;
}

interface SummaryDialogProps {
  summaryStudentId: string;
  students: Student[];
  computeSummary: (studentId: string) => SummaryData;
  onClose: () => void;
}

export default function SummaryDialog({
  summaryStudentId,
  students,
  computeSummary,
  onClose,
}: SummaryDialogProps) {
  const student = students.find((s) => s.studentId === summaryStudentId);
  const summary = computeSummary(summaryStudentId);

  return (
    <Dialog open={!!summaryStudentId} onOpenChange={(open) => open ? null : onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student Pathway Summary</DialogTitle>
          <DialogDescription>Summary details for the selected student.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Student:</strong> {student?.firstName} {student?.lastName}
          </p>
          <p>
            <strong>Average Duration:</strong> {summary.averageDurationDays} days
          </p>
          <p>
            <strong>Best Performing Pathway:</strong> {summary.bestPathwayName}
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}