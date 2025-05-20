'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Subject = {
  subjectId: number;
  subjectName: string;
  classId: number;
  pathwayId: number;
  pathway?: { pathwayName: string };
  class?: { className: string };
};

type SubjectPathway = {
  pathwayId: number;
  pathwayName: string;
};

type ClassItem = {
  classId: number;
  className: string;
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [pathwayId, setPathwayId] = useState<number>();
  const [pathways, setPathways] = useState<SubjectPathway[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('All');
  const [showForm, setShowForm] = useState(false);
  const [editSubjectId, setEditSubjectId] = useState<number | null>(null);
  const [classId, setClassId] = useState<number>();

  useEffect(() => {
    fetchSubjects();
    fetchPathways();
    fetchClasses();
  }, []);

  const fetchSubjects = async () => {
    const res = await axios.get('https://localhost:44331/api/Subjects');
    setSubjects(res.data);
  };

  const fetchPathways = async () => {
    const res = await axios.get('https://localhost:44331/api/SubjectPathways');
    setPathways(res.data);
  };

  const fetchClasses = async () => {
    const res = await axios.get('https://localhost:44331/api/Classes');
    setClasses(res.data);
  };

  const handleAddSubject = async () => {
    if (!subjectName || !pathwayId || !selectedClassId) return alert('Fill all fields');

    if (selectedClassId === 'All') {
      const promises = classes.map((cls) =>
        axios.post('https://localhost:44331/api/Subjects', {
          subjectName,
          pathwayId,
          classId: cls.classId,
        })
      );
      await Promise.all(promises);
    } else {
      await axios.post('https://localhost:44331/api/Subjects', {
        subjectName,
        pathwayId,
        classId: parseInt(selectedClassId),
      });
    }

    resetForm();
    fetchSubjects();
  };

  const handleUpdateSubject = async () => {
    if (!editSubjectId || !subjectName || !pathwayId || !classId) return alert('Fill all fields');
    await axios.put(`https://localhost:44331/api/Subjects/${editSubjectId}`, {
      subjectId: editSubjectId,
      subjectName,
      pathwayId,
      classId,
    });
    resetForm();
    fetchSubjects();
  };

  const handleDeleteSubject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return;
    await axios.delete(`https://localhost:44331/api/Subjects/${id}`);
    fetchSubjects();
  };

  const handleEditClick = (subject: Subject) => {
    setSubjectName(subject.subjectName);
    setPathwayId(subject.pathwayId);
    setClassId(subject.classId);
    setEditSubjectId(subject.subjectId);
    setShowForm(true);
  };

  const resetForm = () => {
    setSubjectName('');
    setPathwayId(undefined);
    setClassId(undefined);
    setSelectedClassId('All');
    setEditSubjectId(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Subjects Management</h1>

      <div className="mb-6">
        <button
          onClick={() => {
            if (showForm && !editSubjectId) return resetForm();
            setShowForm(true);
            setEditSubjectId(null);
            setSubjectName('');
            setPathwayId(undefined);
            setClassId(undefined);
            setSelectedClassId('All');
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm && !editSubjectId ? 'Cancel' : 'Add Subject'}
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
            <h2 className="text-xl font-semibold mb-4">
              {editSubjectId ? 'Update Subject' : 'New Subject Details'}
            </h2>

            <input
              type="text"
              placeholder="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="border p-2 w-full rounded mb-3"
            />

            <select
              value={pathwayId ?? ''}
              onChange={(e) => setPathwayId(parseInt(e.target.value))}
              className="border p-2 w-full rounded mb-3"
            >
              <option value="">Select Pathway</option>
              {pathways.map((p) => (
                <option key={p.pathwayId} value={p.pathwayId}>
                  {p.pathwayName}
                </option>
              ))}
            </select>

            {!editSubjectId ? (
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="border p-2 w-full rounded mb-3"
              >
                <option value="All">All Classes</option>
                {classes.map((c) => (
                  <option key={c.classId} value={c.classId}>
                    {c.className}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={classId ?? ''}
                onChange={(e) => setClassId(parseInt(e.target.value))}
                className="border p-2 w-full rounded mb-3"
              >
                <option value="">Select Class</option>
                {classes.map((c) => (
                  <option key={c.classId} value={c.classId}>
                    {c.className}
                  </option>
                ))}
              </select>
            )}

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={editSubjectId ? handleUpdateSubject : handleAddSubject}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editSubjectId ? 'Update Subject' : 'Save Subject'}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBJECTS TABLE */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Subjects List</h2>
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Subject Name</th>
              <th className="border p-2">Pathway</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, index) => (
              <tr key={s.subjectId}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{s.subjectName}</td>
                <td className="border p-2">
                  {pathways.find((p) => p.pathwayId === s.pathwayId)?.pathwayName ?? 'N/A'}
                </td>
                <td className="border p-2">
                  {classes.find((c) => c.classId === s.classId)?.className ?? 'N/A'}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEditClick(s)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSubject(s.subjectId)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}