'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface StudentType {
  studentId?: number;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  classId: number;
  enrollmentDate: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<StudentType>({
    admissionNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    classId: 0,
    enrollmentDate: '',
  });

  const [editingStudent, setEditingStudent] = useState<StudentType | null>(null);

  const api = axios.create({
    baseURL: 'https://localhost:44331/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const fetchStudents = async () => {
    const response = await api.get('/students');
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSave = async () => {
    try {
      const payload = { ...form };

      if (!editingStudent) {
        delete payload.studentId;
        await api.post('/students', payload);
      } else {
        await api.put(`/students/${editingStudent.studentId}`, payload);
      }

      setModalOpen(false);
      resetForm();
      fetchStudents();
    } catch (err) {
      console.error('Save student failed', err);
    }
  };

  const resetForm = () => {
    setForm({
      admissionNumber: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      classId: 0,
      enrollmentDate: '',
    });
    setEditingStudent(null);
  };

  const handleEdit = (student: StudentType) => {
    setForm(student);
    setEditingStudent(student);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Students</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Modal Popup */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Admission Number"
                value={form.admissionNumber}
                onChange={(e) => setForm({ ...form, admissionNumber: e.target.value })}
              />
              <Input
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              <Input
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              <DatePicker
                selected={form.dateOfBirth ? new Date(form.dateOfBirth) : null}
                onChange={(date: Date | null) => {
                  if (date) {
                    const formatted = format(date, 'yyyy-MM-dd');
                    setForm({ ...form, dateOfBirth: formatted });
                  }
                }}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border rounded-md"
                placeholderText="Select DOB"
              />
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <Input
                placeholder="Class ID"
                type="number"
                value={form.classId}
                onChange={(e) => setForm({ ...form, classId: parseInt(e.target.value) })}
              />
              <DatePicker
                selected={form.enrollmentDate ? new Date(form.enrollmentDate) : null}
                onChange={(date: Date | null) => {
                  if (date) {
                    const formatted = format(date, 'yyyy-MM-dd');
                    setForm({ ...form, enrollmentDate: formatted });
                  }
                }}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border rounded-md"
                placeholderText="Select Enrollment Date"
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={() => { setModalOpen(false); resetForm(); }} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingStudent ? 'Update' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Student List */}
      <div className="grid gap-4">
        {students.map((student) => (
          <Card key={student.studentId} className="p-4">
            <CardContent className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  Admission: {student.admissionNumber}, Gender: {student.gender}, DOB: {student.dateOfBirth}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => handleEdit(student)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(student.studentId!)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
