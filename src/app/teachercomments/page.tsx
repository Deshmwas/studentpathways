'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'react-toastify'

interface Student {
  studentId: string
  firstName: string
  lastName: string
}

interface TeacherComment {
  commentId?: number
  studentId: string
  term: string
  year: number
  comment: string
}

export default function TeacherCommentsPage() {
  const [comments, setComments] = useState<TeacherComment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [form, setForm] = useState<TeacherComment>({
    studentId: '',
    term: '',
    year: new Date().getFullYear(),
    comment: ''
  })
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const api = 'https://localhost:44331/api/TeacherComments'
  const studentApi = 'https://localhost:44331/api/Students'

  useEffect(() => {
    fetchData()
    axios.get(studentApi).then(res => setStudents(res.data))
  }, [])

  const fetchData = async () => {
    const res = await axios.get(api)
    setComments(res.data)
  }

  const handleSubmit = async () => {
    if (!form.studentId || !form.term || !form.year) {
      toast.error('Student, Term, and Year are required.')
      return
    }

    try {
      if (editingId) {
        await axios.put(`${api}/${editingId}`, { commentId: editingId, ...form })
        toast.success('Updated successfully')
      } else {
        await axios.post(api, form)
        toast.success('Created successfully')
      }

      setForm({ studentId: '', term: '', year: new Date().getFullYear(), comment: '' })
      setIsOpen(false)
      setEditingId(null)
      fetchData()
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleEdit = (item: TeacherComment) => {
    setForm(item)
    setEditingId(item.commentId!)
    setIsOpen(true)
  }

  const handleDelete = async (id: number) => {
    await axios.delete(`${api}/${id}`)
    toast.success('Deleted successfully')
    fetchData()
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Teacher Comments</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm({ studentId: '', term: '', year: new Date().getFullYear(), comment: '' }); setEditingId(null) }}>
              Add Comment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit' : 'Add'} Teacher Comment</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <select
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">Select Student</option>
                {students.map(s => (
                  <option key={s.studentId} value={s.studentId}>{s.firstName} {s.lastName}</option>
                ))}
              </select>
              <select
                value={form.term}
                onChange={(e) => setForm({ ...form, term: e.target.value })}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">Select Term</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
              <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })} placeholder="Year" />
              <Input value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Comment" />
              <Button onClick={handleSubmit}>{editingId ? 'Update' : 'Submit'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <table className="w-full border border-gray-300 text-left">
  <thead>
    <tr className="bg-gray-100 border-b border-gray-300">
      <th className="p-2 font-semibold">Student</th>
      <th className="p-2 font-semibold">Term</th>
      <th className="p-2 font-semibold">Year</th>
      <th className="p-2 font-semibold">Comment</th>
      <th className="p-2 font-semibold">Actions</th>
    </tr>
  </thead>
  <tbody>
    {comments.map((c, i) => {
      const student = students.find(s => s.studentId === c.studentId)
      return (
        <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
          <td className="p-2">{student ? `${student.firstName} ${student.lastName}` : 'N/A'}</td>
          <td className="p-2">{c.term}</td>
          <td className="p-2">{c.year}</td>
          <td className="p-2">{c.comment}</td>
          <td className="p-2 space-x-2">
            <Button variant="outline" onClick={() => handleEdit(c)}>Edit</Button>
            <Button variant="destructive" onClick={() => handleDelete(c.commentId!)}>Delete</Button>
          </td>
        </tr>
      )
    })}
  </tbody>
</table>

    </div>
  )
}
