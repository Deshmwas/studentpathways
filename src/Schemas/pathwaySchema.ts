// src/schemas/pathwaySchema.ts
import { z } from "zod";

export const pathwayAssignmentSchema = z.object({
  studentId: z.string().nonempty("Student is required"),
  pathwayId: z.number().min(1, "Pathway is required"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
});

export type PathwayAssignmentFormData = z.infer<typeof pathwayAssignmentSchema>;
