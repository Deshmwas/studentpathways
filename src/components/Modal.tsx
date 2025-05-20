"use client";

import { useEffect, useState } from "react";

type Assessment = {
  formativeId: number;
  studentId: string;
  subjectId: number;
  assessmentDate: string;
  score: number;
  remarks: string;
};

type Student = {
  studentId: string;
  firstName: string;
  lastName: string;
};

type Subject = {
  subjectId: number;
  subjectName: string;
};

type ModalProps = {
  onClose: () => void;
  onSave: (data: Assessment) => Promise<void>;
  initialData: Assessment | null;
  students: Student[];
  subjects: Subject[];
};

export default function Modal({
  onClose,
  onSave,
  initialData,
  students,
  subjects,
}: ModalProps) {
  const [formData, setFormData] = useState<Assessment>({
    formativeId: initialData?.formativeId || 0,
    studentId: initialData?.studentId || "",
    subjectId: initialData?.subjectId || 0,
    assessmentDate: initialData?.assessmentDate || "",
    score: initialData?.score || 0,
    remarks: initialData?.remarks || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit" : "Add"} Assessment
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Student:</label>
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full mb-4 border p-2 rounded"
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.studentId} value={s.studentId}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </select>

          <label className="block mb-2">Subject:</label>
          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            className="w-full mb-4 border p-2 rounded"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.subjectId} value={s.subjectId}>
                {s.subjectName}
              </option>
            ))}
          </select>

          <label className="block mb-2">Date:</label>
          <input
            type="date"
            name="assessmentDate"
            value={formData.assessmentDate.split("T")[0]}
            onChange={handleChange}
            className="w-full mb-4 border p-2 rounded"
            required
          />

          <label className="block mb-2">Score:</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            className="w-full mb-4 border p-2 rounded"
            required
          />

          <label className="block mb-2">Remarks:</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full mb-4 border p-2 rounded"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
