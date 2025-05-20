'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'react-hot-toast'

type SummativeAssessment = {
  summativeId?: number
  studentId: string
  subjectId: number
  term: string
  year: number
  score: number
  grade?: string
}

type Student = {
  studentId: string
  firstName: string
  lastName: string
}

type Subject = {
  subjectId: number
  subjectName: string
}

export default function SummativeAssessmentsPage() {
  const [assessments, setAssessments] = useState<SummativeAssessment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [formData, setFormData] = useState<SummativeAssessment>({
    studentId: '',
    subjectId: 0,
    term: '',
    year: new Date().getFullYear(),
    score: 0,
    grade: '',
  })
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    const [aRes, sRes, subRes] = await Promise.all([
      fetch('https://localhost:44331/api/SummativeAssessments'),
      fetch('https://localhost:44331/api/Students'),
      fetch('https://localhost:44331/api/Subjects'),
    ])
    setAssessments(await aRes.json())
    setStudents(await sRes.json())
    setSubjects(await subRes.json())
  }

  async function saveAssessment() {
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId
      ? `https://localhost:44331/api/SummativeAssessments/${editingId}`
      : 'https://localhost:44331/api/SummativeAssessments'

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      toast.success(editingId ? 'Updated successfully' : 'Saved successfully')
      fetchAll()
      setIsOpen(false)
      setEditingId(null)
      resetForm()
    } else {
      toast.error('Failed to save')
    }
  }

  function resetForm() {
    setFormData({
      studentId: '',
      subjectId: 0,
      term: '',
      year: new Date().getFullYear(),
      score: 0,
      grade: '',
    })
  }

  function startEdit(assessment: SummativeAssessment) {
    setFormData(assessment)
    setEditingId(assessment.summativeId || null)
    setIsOpen(true)
  }

  async function deleteAssessment(id: number) {
    if (!confirm('Are you sure you want to delete this?')) return
    const res = await fetch(`https://localhost:44331/api/SummativeAssessments/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Deleted successfully')
      fetchAll()
    } else {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Summative Assessments</h1>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setEditingId(null) }}>
          <DialogTrigger asChild>
            <Button>{editingId ? 'Edit Assessment' : 'Add Assessment'}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Summative Assessment' : 'Add Summative Assessment'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Label>Student</Label>
              <Select
                value={formData.studentId}
                onValueChange={(val) => setFormData({ ...formData, studentId: val })}
              >
                <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                <SelectContent>
                  {students.map(s => (
                    <SelectItem key={s.studentId} value={s.studentId}>
                      {s.firstName} {s.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Subject</Label>
              <Select
                value={formData.subjectId.toString()}
                onValueChange={(val) => setFormData({ ...formData, subjectId: parseInt(val) })}
              >
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map(sub => (
                    <SelectItem key={sub.subjectId} value={sub.subjectId.toString()}>
                      {sub.subjectName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Term</Label>
              <Input value={formData.term} onChange={(e) => setFormData({ ...formData, term: e.target.value })} />

              <Label>Year</Label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              />

              <Label>Score</Label>
              <Input
                type="number"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: parseFloat(e.target.value) })}
              />

              <Label>Grade</Label>
              <Input value={formData.grade || ''} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} />
            </div>

            <DialogFooter>
              <Button onClick={saveAssessment}>{editingId ? 'Update' : 'Save'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded shadow p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((a, index) => {
              const student = students.find(s => s.studentId === a.studentId)
              const subject = subjects.find(sub => sub.subjectId === a.subjectId)

              return (
                <TableRow key={a.summativeId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student ? `${student.firstName} ${student.lastName}` : 'Unknown'}</TableCell>
                  <TableCell>{subject?.subjectName || 'Unknown'}</TableCell>
                  <TableCell>{a.term}</TableCell>
                  <TableCell>{a.year}</TableCell>
                  <TableCell>{a.score}</TableCell>
                  <TableCell>{a.grade || '-'}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => startEdit(a)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteAssessment(a.summativeId!)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
