'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'react-toastify'

interface Student {
  studentId: string
  firstName: string
  lastName: string
}

interface PrincipalComment {
  commentId?: number
  studentId: string
  term: string
  year: number
  comment: string
}

export default function PrincipalCommentsPage() {
  const [comments, setComments] = useState<PrincipalComment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [form, setForm] = useState<PrincipalComment>({
    studentId: '',
    term: '',
    year: new Date().getFullYear(),
    comment: '',
  })
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const api = 'https://localhost:44331/api/PrincipalComments'
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
    if (!form.studentId || !form.term || !form.year || !form.comment) {
      toast.error('All fields are required.')
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
    } catch (err) {
      toast.error('Something went wrong.')
    }
  }

  const handleEdit = (item: PrincipalComment) => {
    setForm(item)
    setEditingId(item.commentId ?? null)
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
        <h2 className="text-xl font-bold">Principal Comments</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setForm({
                  studentId: '',
                  term: '',
                  year: new Date().getFullYear(),
                  comment: '',
                })
                setEditingId(null)
              }}
            >
              Add Principal Comment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit' : 'Add'} Principal Comment</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <select
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">Select Student</option>
                {students.map((s) => (
                  <option key={s.studentId} value={s.studentId}>
                    {s.firstName} {s.lastName}
                  </option>
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
              <Input
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                placeholder="Year"
              />
              <Input
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Principal Comment"
              />
              <Button onClick={handleSubmit}>
                {editingId ? 'Update' : 'Submit'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <table className="min-w-full border border-gray-300 mt-4">
  <thead>
    <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
      <th className="px-4 py-2 border">Student</th>
      <th className="px-4 py-2 border">Term</th>
      <th className="px-4 py-2 border">Year</th>
      <th className="px-4 py-2 border">Principal Comment</th>
      <th className="px-4 py-2 border text-center">Actions</th>
    </tr>
  </thead>
  <tbody className="text-sm text-gray-800">
    {comments.map((c, i) => {
      const student = students.find((s) => s.studentId === c.studentId)
      return (
        <tr key={i} className="border-t hover:bg-gray-50">
          <td className="px-4 py-2 border">
            {student ? `${student.firstName} ${student.lastName}` : 'N/A'}
          </td>
          <td className="px-4 py-2 border">{c.term}</td>
          <td className="px-4 py-2 border">{c.year}</td>
          <td className="px-4 py-2 border">{c.comment}</td>
          <td className="px-4 py-2 border text-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(c)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(c.commentId!)}
            >
              Delete
            </Button>
          </td>
        </tr>
      )
    })}
  </tbody>
</table>

    </div>
  )
}
