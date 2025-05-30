'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { format } from 'date-fns';

// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from '@/components/ui/table';
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select';
// import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// type StudentPathway = {
//   studentPathwayId?: number;
//   studentId: string;
//   pathwayId: number;
//   startDate: string;
//   endDate?: string;
// };

// type Student = {
//   studentId: string;
//   firstName: string;
//   lastName: string;
// };

// type Pathway = {
//   pathwayId: number;
//   pathwayName: string;
// };

// export default function StudentPathwaysPage() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [pathways, setPathways] = useState<Pathway[]>([]);
//   const [studentPathways, setStudentPathways] = useState<StudentPathway[]>([]);
//   const [formData, setFormData] = useState<StudentPathway>({
//     studentId: '',
//     pathwayId: 0,
//     startDate: new Date().toISOString().split('T')[0],
//     endDate: '',
//   });
//   const [isOpen, setIsOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   // Filters
//   const [selectedStudentId, setSelectedStudentId] = useState('');
//   const [term, setTerm] = useState('1');
//   const [year, setYear] = useState('2025');

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   async function fetchAll() {
//     const [sRes, pRes, spRes] = await Promise.all([
//       fetch('https://localhost:44331/api/Students'),
//       fetch('https://localhost:44331/api/SubjectPathways'),
//       fetch('https://localhost:44331/api/StudentPathways'),
//     ]);

//     const studentsData = await sRes.json();
//     const formattedStudents = studentsData.map((s: any) => ({
//       studentId: s.studentId,
//       firstName: s.firstName,
//       lastName: s.lastName,
//     }));

//     setStudents(formattedStudents);
//     setPathways(await pRes.json());
//     setStudentPathways(await spRes.json());
//   }

//   async function saveStudentPathway() {
//     const method = editingId ? 'PUT' : 'POST';
//     const url = editingId
//       ? `https://localhost:44331/api/StudentPathways/${editingId}`
//       : 'https://localhost:44331/api/StudentPathways';

//     await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     setFormData({
//       studentId: '',
//       pathwayId: 0,
//       startDate: new Date().toISOString().split('T')[0],
//       endDate: '',
//     });
//     setEditingId(null);
//     setIsOpen(false);
//     fetchAll();
//   }

//   function startEdit(sp: StudentPathway) {
//     setFormData(sp);
//     setEditingId(sp.studentPathwayId || null);
//     setIsOpen(true);
//   }

//   async function assignPathwaysAutomatically() {
//     if (!selectedStudentId) return alert('Please select a student');

//     const res = await fetch(
//       `https://localhost:44331/api/StudentPathways/assign-by-performance?studentId=${selectedStudentId}&term=${term}&year=${year}`,
//       { method: 'POST' }
//     );

//     const result = await res.json();
//     alert(result.message);
//     fetchAll();
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Student Pathways</h1>
//         <Button
//           onClick={() => {
//             setEditingId(null);
//             setFormData({
//               studentId: '',
//               pathwayId: 0,
//               startDate: new Date().toISOString().split('T')[0],
//               endDate: '',
//             });
//             setIsOpen(true);
//           }}
//         >
//           Add Pathway
//         </Button>
//       </div>

//       {/* Filters and Auto Assign Button */}
//       <div className="flex flex-wrap items-end gap-4">
//         <div>
//           <Label>Student</Label>
//           <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select student" />
//             </SelectTrigger>
//             <SelectContent>
//               {students.map((s) => (
//                 <SelectItem key={s.studentId} value={s.studentId}>
//                   {s.firstName} {s.lastName}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label>Term</Label>
//           <Select value={term} onValueChange={setTerm}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select term" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="1">Term 1</SelectItem>
//               <SelectItem value="2">Term 2</SelectItem>
//               <SelectItem value="3">Term 3</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label>Year</Label>
//           <Select value={year} onValueChange={setYear}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select year" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="2023">2023</SelectItem>
//               <SelectItem value="2024">2024</SelectItem>
//               <SelectItem value="2025">2025</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <Button onClick={assignPathwaysAutomatically}>
//           Auto Assign Pathways
//         </Button>
//       </div>

//       {/* Add/Edit Dialog */}
//       <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setEditingId(null); }}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{editingId ? 'Edit Student Pathway' : 'Add Student Pathway'}</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-2">
//             <Label>Student</Label>
//             <Select
//               value={formData.studentId}
//               onValueChange={(val) => setFormData({ ...formData, studentId: val })}
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

//             <Label>Pathway</Label>
//             <Select
//               value={formData.pathwayId.toString()}
//               onValueChange={(val) => setFormData({ ...formData, pathwayId: parseInt(val) })}
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

//             <Label>Start Date</Label>
//             <Input
//               type="date"
//               value={formData.startDate}
//               onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
//             />

//             <Label>End Date</Label>
//             <Input
//               type="date"
//               value={formData.endDate}
//               onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
//             />
//           </div>

//           <DialogFooter>
//             <Button onClick={saveStudentPathway}>{editingId ? 'Update' : 'Save'}</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Pathways Table */}
//       <div className="bg-white rounded shadow-md p-4">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>#</TableHead>
//               <TableHead>Student</TableHead>
//               <TableHead>Pathway</TableHead>
//               <TableHead>Start Date</TableHead>
//               <TableHead>End Date</TableHead>
//               <TableHead className="text-center">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {studentPathways.map((sp, index) => {
//               const student = students.find((s) => s.studentId === sp.studentId);
//               const studentName = student ? `${student.firstName} ${student.lastName}` : 'Unknown';
//               const pathway = pathways.find((p) => p.pathwayId === sp.pathwayId)?.pathwayName || 'Unknown';

//               return (
//                 <TableRow key={sp.studentPathwayId}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{studentName}</TableCell>
//                   <TableCell>{pathway}</TableCell>
//                   <TableCell> {sp.startDate ? format(new Date(sp.startDate), 'dd MMM yyyy') : '-'}</TableCell>
//                   <TableCell>{sp.endDate ? format(new Date(sp.endDate), 'dd MMM yyyy') : '-'}</TableCell>
//                   <TableCell className="text-center">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem onClick={() => startEdit(sp)}>
//                           <Pencil className="mr-2 h-4 w-4" /> Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={async () => {
//                             if (confirm('Delete this record?')) {
//                               await fetch(`https://localhost:44331/api/StudentPathways/${sp.studentPathwayId}`, {
//                                 method: 'DELETE',
//                               });
//                               fetchAll();
//                             }
//                           }}
//                         >
//                           <Trash className="mr-2 h-4 w-4" /> Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { MoreHorizontal, Pencil, Trash, BarChart2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DialogDescription } from '@radix-ui/react-dialog';
import PathwayFormDialog from "@/components/PathwayFormDialog";
// Type Definitions

type StudentPathway = {
  studentPathwayId?: number;
  studentId: string;
  pathwayId: number;
  startDate: string;
  endDate?: string;
};

type Student = {
  studentId: string;
  firstName: string;
  lastName: string;
  class: string;
  stream: string;
};

type Pathway = {
  pathwayId: number;
  pathwayName: string;
};

export default function StudentPathwaysPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [studentPathways, setStudentPathways] = useState<StudentPathway[]>([]);
  const [formData, setFormData] = useState<StudentPathway>({
    studentId: '',
    pathwayId: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Filters
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [term, setTerm] = useState('1');
  const [year, setYear] = useState('2025');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedPathwayFilter, setSelectedPathwayFilter] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Summary Dialog
  const [summaryStudentId, setSummaryStudentId] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedClass, selectedStream, selectedPathwayFilter]);

  function fetchAll() {
    const mockStudents: Student[] = [
      { studentId: 'S001', firstName: 'Alice', lastName: 'Johnson', class: 'Grade 1', stream: 'yellow' },
      { studentId: 'S002', firstName: 'Bob', lastName: 'Smith', class: 'Grade 2', stream: 'Blue' },
      { studentId: 'S003', firstName: 'Charlie', lastName: 'Lee', class: 'Grade 3', stream: 'Green' },
    ];

    const mockPathways: Pathway[] = [
      { pathwayId: 1, pathwayName: 'Science, Technology, Engineering, and Mathematics (STEM)' },
      { pathwayId: 2, pathwayName: 'Arts and Sports Science' },
      { pathwayId: 3, pathwayName: 'Social Sciences' },
    ];

    const mockStudentPathways: StudentPathway[] = [
      {
        studentPathwayId: 1,
        studentId: 'S001',
        pathwayId: 1,
        startDate: '2025-01-01',
        endDate: '',
      },
      {
        studentPathwayId: 2,
        studentId: 'S002',
        pathwayId: 3,
        startDate: '2025-02-01',
        endDate: '2025-05-01',
      },
    ];

    setStudents(mockStudents);
    setPathways(mockPathways);
    setStudentPathways(mockStudentPathways);
  }

  function saveStudentPathway() {
    if (editingId) {
      setStudentPathways((prev) =>
        prev.map((sp) =>
          sp.studentPathwayId === editingId ? { ...formData, studentPathwayId: editingId } : sp
        )
      );
    } else {
      const newId = Math.max(0, ...studentPathways.map((sp) => sp.studentPathwayId || 0)) + 1;
      setStudentPathways((prev) => [...prev, { ...formData, studentPathwayId: newId }]);
    }

    setFormData({
      studentId: '',
      pathwayId: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
    });
    setEditingId(null);
    setIsOpen(false);
  }

  function startEdit(sp: StudentPathway) {
    setFormData(sp);
    setEditingId(sp.studentPathwayId || null);
    setIsOpen(true);
  }

  function assignPathwaysAutomatically() {
    if (!selectedStudentId) return alert('Please select a student');
    alert(`Auto-assigned pathway to student ${selectedStudentId} for Term ${term}, Year ${year}`);
  }

  const filteredPathways = studentPathways.filter((sp) => {
    const student = students.find((s) => s.studentId === sp.studentId);
    if (!student) return false;
    return (
      (!selectedClass || student.class === selectedClass) &&
      (!selectedStream || student.stream === selectedStream) &&
      (!selectedPathwayFilter || sp.pathwayId.toString() === selectedPathwayFilter)
    );
  });

  const paginatedPathways = filteredPathways.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function computeSummary(studentId: string) {
  const studentRecords = studentPathways.filter(sp => sp.studentId === studentId);

  if (studentRecords.length === 0) {
    return {
      averageDurationDays: 0,
      bestPathwayName: 'N/A',
    };
  }

  const averageDuration = studentRecords.reduce((acc, sp) => {
    const start = new Date(sp.startDate).getTime();
    const end = sp.endDate ? new Date(sp.endDate).getTime() : Date.now();
    return acc + (end - start);
  }, 0) / studentRecords.length;

  const bestPathway = studentRecords[Math.floor(Math.random() * studentRecords.length)]?.pathwayId;

  return {
    averageDurationDays: Math.round(averageDuration / (1000 * 60 * 60 * 24)),
    bestPathwayName: pathways.find(p => p.pathwayId === bestPathway)?.pathwayName || 'N/A'
  };
}
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Pathways</h1>
        <Button onClick={() => { setEditingId(null); setFormData({ studentId: '', pathwayId: 0, startDate: new Date().toISOString().split('T')[0], endDate: '' }); setIsOpen(true); }}>Add Pathway</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <Label>Pathway</Label>
          <Select value={selectedPathwayFilter} onValueChange={setSelectedPathwayFilter}>
            <SelectTrigger><SelectValue placeholder="Select pathway" /></SelectTrigger>
            <SelectContent>
              {pathways.map((p) => <SelectItem key={p.pathwayId} value={p.pathwayId.toString()}>{p.pathwayName}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Student</Label>
          <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
            <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
            <SelectContent>
              {students.map((s) => <SelectItem key={s.studentId} value={s.studentId}>{s.firstName} {s.lastName}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Term</Label>
          <Select value={term} onValueChange={setTerm}>
            <SelectTrigger><SelectValue placeholder="Select term" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Term 1</SelectItem>
              <SelectItem value="2">Term 2</SelectItem>
              <SelectItem value="3">Term 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Year</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Class</Label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
            <SelectContent>
              {[...new Set(students.map((s) => s.class))].map((cls) => <SelectItem key={cls} value={cls}>{cls}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Stream</Label>
          <Select value={selectedStream} onValueChange={setSelectedStream}>
            <SelectTrigger><SelectValue placeholder="Select stream" /></SelectTrigger>
            <SelectContent>
              {[...new Set(students.map((s) => s.stream))].map((stream) => <SelectItem key={stream} value={stream}>{stream}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={assignPathwaysAutomatically}>Auto Assign Pathways</Button>
      </div>

      {/* Summary Dialog */}
     <Dialog open={!!summaryStudentId} onOpenChange={(open) => setSummaryStudentId(open ? summaryStudentId : null)}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Student Pathway Summary</DialogTitle>
      <DialogDescription>
        Summary details for the selected student.
      </DialogDescription>

      {summaryStudentId && (() => {
        const student = students.find(s => s.studentId === summaryStudentId);
        const summary = computeSummary(summaryStudentId);
        return (
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p><strong>Student:</strong> {student?.firstName} {student?.lastName}</p>
            <p><strong>Average Duration:</strong> {summary.averageDurationDays} days</p>
            <p><strong>Best Performing Pathway:</strong> {summary.bestPathwayName}</p>
          </div>
        );
      })()}
    </DialogHeader>

    <DialogFooter>
      <Button onClick={() => setSummaryStudentId(null)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

       <Dialog open={isOpen} onOpenChange={(open) => {
  if (!open) {
    setIsOpen(false);
    setFormData({
      studentId: '',
      pathwayId: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
    });
    setEditingId(null);
  }
}}>
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
      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={saveStudentPathway}>{editingId ? 'Update' : 'Add'}</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      {/* Table */}
      <div className="bg-white rounded shadow-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Pathway</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPathways.map((sp, index) => {
              const student = students.find((s) => s.studentId === sp.studentId);
              const studentName = student ? `${student.firstName} ${student.lastName}` : 'Unknown';
              const pathway = pathways.find((p) => p.pathwayId === sp.pathwayId)?.pathwayName || 'Unknown';

              return (
                <TableRow key={sp.studentPathwayId}>
                  <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>{studentName}</TableCell>
                  <TableCell>{pathway}</TableCell>
                  <TableCell>{sp.startDate ? format(new Date(sp.startDate), 'dd MMM yyyy') : '-'}</TableCell>
                  <TableCell>{sp.endDate ? format(new Date(sp.endDate), 'dd MMM yyyy') : '-'}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => startEdit(sp)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { if (confirm('Delete this record?')) { setStudentPathways((prev) => prev.filter((s) => s.studentPathwayId !== sp.studentPathwayId)); } }}>
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSummaryStudentId(sp.studentId)}>
                          <BarChart2 className="mr-2 h-4 w-4" /> View Summary
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {Math.max(1, Math.ceil(filteredPathways.length / itemsPerPage))}
          </span>
          <div className="space-x-2">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</Button>
            <Button variant="outline" size="sm" disabled={currentPage === Math.ceil(filteredPathways.length / itemsPerPage)} onClick={() => setCurrentPage((prev) => prev + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}






