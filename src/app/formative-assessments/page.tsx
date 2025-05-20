'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '@/lib/axios';

interface Assessment {
  id: number;
  studentId: string;
  subjectId: number;
  score: number;
  assessmentDate: string;
}

interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
}

interface Subject {
  subjectId: number;
  subjectName: string;
}

export default function FormativeAssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [aRes, sRes, subRes] = await Promise.all([
        api.get('/FormativeAssessments'),
        api.get('/Students'),
        api.get('/Subjects'),
      ]);
      setAssessments(aRes.data);
      setStudents(sRes.data);
      setSubjects(subRes.data);
    } catch (err) {
      toast.error('Failed to load data.');
    }
  };

  const handleSave = async () => {
    if (!editingAssessment || !editingAssessment.studentId || !editingAssessment.subjectId || !editingAssessment.score || !editingAssessment.assessmentDate) {
      toast.error('All fields are required.');
      return;
    }

    try {
      if (editingAssessment.id && editingAssessment.id !== 0) {
        await api.put(`/FormativeAssessments/${editingAssessment.id}`, editingAssessment);
        toast.success('Assessment updated');
      } else {
        await api.post('/FormativeAssessments', editingAssessment);
        toast.success('Assessment added');
      }

      setDialogOpen(false);
      setEditingAssessment(null);
      fetchData();
    } catch (err) {
      toast.error('Error saving assessment.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/FormativeAssessments/${id}`);
      toast.success('Assessment deleted');
      fetchData();
    } catch (err) {
      toast.error('Error deleting assessment');
    }
  };

  const openAddDialog = () => {
    setEditingAssessment({
      id: 0,
      studentId: '',
      subjectId: 0,
      score: 0,
      assessmentDate: '',
    });
    setDialogOpen(true);
  };

  const openEditDialog = (assessment: Assessment) => {
    setEditingAssessment({ ...assessment });
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Formative Assessments</h1>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Assessment
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Student</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Score</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assessments.length > 0 ? (
              assessments.map((a) => (
                <tr key={a.id}>
                  <td className="border px-4 py-2">
                    {
                      students.find((s) => s.studentId === a.studentId)
                        ? `${students.find((s) => s.studentId === a.studentId)?.firstName} ${students.find((s) => s.studentId === a.studentId)?.lastName}`
                        : 'Unknown'
                    }
                  </td>
                  <td className="border px-4 py-2">
                    {subjects.find((s) => s.subjectId === a.subjectId)?.subjectName || 'Unknown'}
                  </td>
                  <td className="border px-4 py-2">{a.score}</td>
                  <td className="border px-4 py-2">{a.assessmentDate}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(a)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(a.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">No assessments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAssessment?.id ? 'Edit Assessment' : 'Add New Assessment'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <select
              className="w-full border rounded p-2"
              value={editingAssessment?.studentId || ''}
              onChange={(e) =>
                setEditingAssessment((prev) => prev && { ...prev, studentId: e.target.value })
              }
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  {s.firstName} {s.lastName}
                </option>
              ))}
            </select>

            <select
              className="w-full border rounded p-2"
              value={editingAssessment?.subjectId || 0}
              onChange={(e) =>
                setEditingAssessment((prev) => prev && { ...prev, subjectId: parseInt(e.target.value) })
              }
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.subjectId} value={s.subjectId}>
                  {s.subjectName}
                </option>
              ))}
            </select>

            <Input
              type="number"
              placeholder="Score"
              value={editingAssessment?.score || ''}
              onChange={(e) =>
                setEditingAssessment((prev) => prev && { ...prev, score: parseFloat(e.target.value) })
              }
            />

            <Input
              type="date"
              value={editingAssessment?.assessmentDate || ''}
              onChange={(e) =>
                setEditingAssessment((prev) => prev && { ...prev, assessmentDate: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>
                {editingAssessment?.id ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
