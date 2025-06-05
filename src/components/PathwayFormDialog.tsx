
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



// components/PathwayFormDialog.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Student, Pathway, StudentPathwayForm } from "../types";


interface Props {
  isOpen: boolean;
  formData: StudentPathwayForm;
  setIsOpen: (value: boolean) => void;
  setFormData: (data: StudentPathwayForm) => void;
  saveStudentPathway: () => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  students: Student[];
  pathways: Pathway[];
}

export default function PathwayFormDialog({
  isOpen,
  formData,
  setIsOpen,
  setFormData,
  saveStudentPathway,
  editingId,
  setEditingId,
  students,
  pathways,
}: Props) {
  const closeDialog = () => {
    setIsOpen(false);
    setFormData({
      studentId: '',
      pathwayId: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
    });
    setEditingId(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => open ? null : closeDialog()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingId ? 'Edit Pathway Assignment' : 'Add Pathway Assignment'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Student</Label>
            <Select value={formData.studentId} onValueChange={(val) => setFormData({ ...formData, studentId: val })}>
              <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
              <SelectContent>
                {students.map((s) => (
                  <SelectItem key={s.studentId} value={s.studentId}>
                    {s.firstName} {s.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Pathway</Label>
            <Select value={formData.pathwayId.toString()} onValueChange={(val) => setFormData({ ...formData, pathwayId: parseInt(val) })}>
              <SelectTrigger><SelectValue placeholder="Select pathway" /></SelectTrigger>
              <SelectContent>
                {pathways.map((p) => (
                  <SelectItem key={p.pathwayId} value={p.pathwayId.toString()}>
                    {p.pathwayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Start Date</Label>
            <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
          </div>
          <div>
            <Label>End Date</Label>
            <Input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>Cancel</Button>
          <Button onClick={saveStudentPathway}>{editingId ? 'Update' : 'Add'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}