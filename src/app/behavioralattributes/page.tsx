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

interface Attribute {
  behaviorId?: number
  studentId: string
  term: string
  year: number
  discipline?: string
  participation?: string
  teamwork?: string
  creativity?: string
  comments?: string
}

export default function BehavioralAttributesPage() {
  const [attributes, setAttributes] = useState<Attribute[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [form, setForm] = useState<Attribute>({
    studentId: '',
    term: '',
    year: new Date().getFullYear(),
    discipline: '',
    participation: '',
    teamwork: '',
    creativity: '',
    comments: '',
  })
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const api = 'https://localhost:44331/api/BehavioralAttributes'
  const studentApi = 'https://localhost:44331/api/Students'

  useEffect(() => {
    fetchData()
    axios.get(studentApi).then(res => setStudents(res.data))
  }, [])

  const fetchData = async () => {
    const res = await axios.get(api)
    setAttributes(res.data)
  }

  const handleSubmit = async () => {
    try {
      if (!form.studentId || !form.term || !form.year) {
        toast.error('Student, Term, and Year are required.')
        return
      }

      if (editingId) {
        await axios.put(`${api}/${editingId}`, { behaviorId: editingId, ...form })
        toast.success('Updated successfully')
      } else {
        await axios.post(api, form)
        toast.success('Created successfully')
      }

      setForm({
        studentId: '',
        term: '',
        year: new Date().getFullYear(),
        discipline: '',
        participation: '',
        teamwork: '',
        creativity: '',
        comments: '',
      })
      setIsOpen(false)
      setEditingId(null)
      fetchData()
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const handleEdit = (item: Attribute) => {
    setForm(item)
    setEditingId(item.behaviorId || null)
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
        <h2 className="text-xl font-bold">Behavioral Attributes</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm({ studentId: '', term: '', year: new Date().getFullYear(), discipline: '', participation: '', teamwork: '', creativity: '', comments: '' }); setEditingId(null) }}>
              Add Behavioral Attribute
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit' : 'Add'} Behavioral Attribute</DialogTitle>
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
              <Input value={form.discipline || ''} onChange={(e) => setForm({ ...form, discipline: e.target.value })} placeholder="Discipline" />
              <Input value={form.participation || ''} onChange={(e) => setForm({ ...form, participation: e.target.value })} placeholder="Participation" />
              <Input value={form.teamwork || ''} onChange={(e) => setForm({ ...form, teamwork: e.target.value })} placeholder="Teamwork" />
              <Input value={form.creativity || ''} onChange={(e) => setForm({ ...form, creativity: e.target.value })} placeholder="Creativity" />
              <Input value={form.comments || ''} onChange={(e) => setForm({ ...form, comments: e.target.value })} placeholder="Comments" />
              <Button onClick={handleSubmit}>{editingId ? 'Update' : 'Submit'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <table className="w-full table-auto border-collapse mt-4">
  <thead>
    <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
      <th className="px-4 py-2 border">Student</th>
      <th className="px-4 py-2 border">Term</th>
      <th className="px-4 py-2 border">Year</th>
      <th className="px-4 py-2 border">Discipline</th>
      <th className="px-4 py-2 border">Participation</th>
      <th className="px-4 py-2 border">Teamwork</th>
      <th className="px-4 py-2 border">Creativity</th>
      <th className="px-4 py-2 border">Comments</th>
      <th className="px-4 py-2 border text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {attributes.map((a, i) => {
      const student = students.find(s => s.studentId === a.studentId)
      return (
        <tr key={i} className="border-b hover:bg-gray-50 text-sm">
          <td className="px-4 py-2 border">{student ? `${student.firstName} ${student.lastName}` : 'N/A'}</td>
          <td className="px-4 py-2 border">{a.term}</td>
          <td className="px-4 py-2 border">{a.year}</td>
          <td className="px-4 py-2 border">{a.discipline}</td>
          <td className="px-4 py-2 border">{a.participation}</td>
          <td className="px-4 py-2 border">{a.teamwork}</td>
          <td className="px-4 py-2 border">{a.creativity}</td>
          <td className="px-4 py-2 border">{a.comments}</td>
          <td className="px-4 py-2 border text-center">
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(a)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(a.behaviorId!)}>Delete</Button>
            </div>
          </td>
        </tr>
      )
    })}
  </tbody>
</table>

    </div>
  )
}




