export interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  class: string;
}

export interface Pathway {
  pathwayId: number;
  pathwayName: string;
}

export interface StudentPathwayForm {
  studentId: string;
  pathwayId: number;
  startDate: string;
  endDate?: string;
}

export interface StudentPathway {
  studentPathwayId: number;
  studentId: string;
  pathwayId: number;
  startDate: string;
  endDate?: string; // <-- Make this optional
  isAutomatic?: boolean;
  isOverride?: boolean;
}
