export interface Student {
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

export interface PathwayAssignment {
  suggestedPathway: string;
  strength: string;
  supportNeeds: string;
  rationale: string;
}

export interface PathwayReport {
  student: Student;
  pathwayAssignment: PathwayAssignment;
}
