"use client";
import { useState, useEffect } from "react";

export default function AddExamResult() {
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [marks, setMarks] = useState("");
  const [term, setTerm] = useState("Term 1");
  const [year, setYear] = useState(new Date().getFullYear());
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44331/api/Students").then((res) => res.json()).then(setStudents);
    fetch("https://localhost:44331/api/Subjects").then((res) => res.json()).then(setSubjects);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultData = { studentId: Number(studentId), subjectId: Number(subjectId), marks: Number(marks), term, year };

    try {
      const response = await fetch("https://localhost:44331/api/ExamResults", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultData),
      });

      if (response.ok) {
        alert("Exam result added successfully!");
      } else {
        alert("Failed to add result");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add Exam Result</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Dropdowns and input fields go here */}
      </form>
    </div>
  );
}
