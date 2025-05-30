
// import { z } from "zod";

// export const pathwayAssignmentSchema = z.object({
//   studentId: z.string().nonempty("Student is required"),
//   pathwayId: z.number().min(1, "Pathway is required"),
//   startDate: z.string().nonempty("Start date is required"),
//   endDate: z.string().nonempty("End date is required"),
// });

// export type PathwayAssignmentFormData = z.infer<typeof pathwayAssignmentSchema>;



// src/Schemas/pathwaySchema.ts
import { z } from "zod";

export const pathwayAssignmentSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  // pathwayId can be 0 if it represents a "Please Select" option
  pathwayId: z.number().int().min(0, "Pathway is required"), // Changed to min(0) to allow 0
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().optional().or(z.literal("")),
}).refine((data) => {
    // Custom validation: End Date cannot be before Start Date if both are provided
    if (data.startDate && data.endDate) {
        if (data.endDate !== "") { // Only compare if endDate is not empty
            const start = new Date(data.startDate);
            const end = new Date(data.endDate);
            return end >= start;
        }
    }
    return true; // No error if endDate is empty or not provided
}, {
    message: "End Date cannot be before Start Date",
    path: ["endDate"],
});