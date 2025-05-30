
// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { pathwayAssignmentSchema } from "@/Schemas/pathwaySchema";
// import { useEffect } from "react";

// type PathwayFormValues = z.infer<typeof pathwayAssignmentSchema>;

// type Props = {
//   isOpen: boolean;
//   setIsOpen: (val: boolean) => void;
//   onSubmit: (data: PathwayFormValues) => void;
//   editingData?: PathwayFormValues | null;
//   students: { studentId: string; firstName: string; lastName: string }[];
//   pathways: { pathwayId: number; pathwayName: string }[];
// };

// export default function PathwayFormDialog({
//   isOpen,
//   setIsOpen,
//   onSubmit,
//   editingData,
//   students,
//   pathways,
// }: Props) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<PathwayFormValues>({
//     resolver: zodResolver(pathwayAssignmentSchema),
//     defaultValues: {
//       studentId: "",
//       pathwayId: 0,
//       startDate: "",
//       endDate: "",
//     },
//   });

//   useEffect(() => {
//     if (editingData) {
//       reset(editingData);
//     }
//   }, [editingData, reset]);

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             {editingData ? "Edit Pathway Assignment" : "Add Pathway Assignment"}
//           </DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <Label>Student</Label>
//             <Select
//               value={watch("studentId")}
//               onValueChange={(val: string) => setValue("studentId", val)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select student" />
//               </SelectTrigger>
//               <SelectContent>
//                 {students.map((s) => (
//                   <SelectItem key={s.studentId} value={s.studentId}>
//                     {s.firstName} {s.lastName}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {errors.studentId && (
//               <p className="text-sm text-red-500">{errors.studentId.message}</p>
//             )}
//           </div>

//           <div>
//             <Label>Pathway</Label>
//             <Select
//               value={watch("pathwayId").toString()}
//               onValueChange={(val: string) =>
//                 setValue("pathwayId", parseInt(val))
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select pathway" />
//               </SelectTrigger>
//               <SelectContent>
//                 {pathways.map((p) => (
//                   <SelectItem key={p.pathwayId} value={p.pathwayId.toString()}>
//                     {p.pathwayName}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {errors.pathwayId && (
//               <p className="text-sm text-red-500">{errors.pathwayId.message}</p>
//             )}
//           </div>

//           <div>
//             <Label>Start Date</Label>
//             <Input type="date" {...register("startDate")} />
//             {errors.startDate && (
//               <p className="text-sm text-red-500">{errors.startDate.message}</p>
//             )}
//           </div>

//           <div>
//             <Label>End Date</Label>
//             <Input type="date" {...register("endDate")} />
//             {errors.endDate && (
//               <p className="text-sm text-red-500">{errors.endDate.message}</p>
//             )}
//           </div>

//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
//               Cancel
//             </Button>
//             <Button type="submit">{editingData ? "Update" : "Add"}</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }



// src/components/PathwayFormDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { pathwayAssignmentSchema } from "@/Schemas/pathwaySchema";
import { useEffect } from "react";

type PathwayFormValues = z.infer<typeof pathwayAssignmentSchema>;

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onSubmit: (data: PathwayFormValues) => void;
  editingData?: PathwayFormValues | null;
  students: { studentId: string; firstName: string; lastName: string }[];
  pathways: { pathwayId: number; pathwayName: string }[];
};

export default function PathwayFormDialog({
  isOpen,
  setIsOpen,
  onSubmit,
  editingData,
  students,
  pathways,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PathwayFormValues>({
    resolver: zodResolver(pathwayAssignmentSchema),
    defaultValues: {
      studentId: "",
      pathwayId: 0, // Default to 0, which will match our "Select pathway" item
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
    },
  });

  useEffect(() => {
    if (editingData) {
      reset({
        ...editingData,
        endDate: editingData.endDate || '',
      });
    } else {
      reset({
        studentId: "",
        pathwayId: 0, // Ensure reset also uses 0 for new assignments
        startDate: new Date().toISOString().split('T')[0],
        endDate: "",
      });
    }
  }, [editingData, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingData ? "Edit Pathway Assignment" : "Add Pathway Assignment"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="studentId">Student</Label>
            <Select
              value={watch("studentId")}
              onValueChange={(val: string) => setValue("studentId", val, { shouldValidate: true })}
            >
              <SelectTrigger id="studentId">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {/* No 'empty' item needed here if studentId is always selected via data,
                    but if it could be empty initially, add: <SelectItem value="">Select Student</SelectItem> */}
                {students.map((s) => (
                  <SelectItem key={s.studentId} value={s.studentId}>
                    {s.firstName} {s.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.studentId && (
              <p className="text-sm text-red-500 mt-1">{errors.studentId.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="pathwayId">Pathway</Label>
            <Select
              value={watch("pathwayId").toString()} // Convert number to string for Select component
              onValueChange={(val: string) =>
                setValue("pathwayId", parseInt(val), { shouldValidate: true })
              }
            >
              <SelectTrigger id="pathwayId">
                <SelectValue placeholder="Select pathway" />
              </SelectTrigger>
              <SelectContent>
                {/* IMPORTANT: Add an item for the default value 0 */}
                <SelectItem value="0">Select pathway</SelectItem>
                {pathways.map((p) => (
                  <SelectItem key={p.pathwayId} value={p.pathwayId.toString()}>
                    {p.pathwayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.pathwayId && (
              <p className="text-sm text-red-500 mt-1">{errors.pathwayId.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input type="date" id="startDate" {...register("startDate")} />
            {errors.startDate && (
              <p className="text-sm text-red-500 mt-1">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input type="date" id="endDate" {...register("endDate")} />
            {errors.endDate && (
              <p className="text-sm text-red-500 mt-1">{errors.endDate.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editingData ? "Update" : "Add"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}