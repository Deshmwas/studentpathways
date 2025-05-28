'use client';

import { useState, useEffect } from 'react';

type PathwayDeterminationMode = 'YEAR_AVERAGE' | 'ALL_TIME_AVERAGE' | 'SPECIFIC_EXAM';

interface PathwaySettings {
  mode: PathwayDeterminationMode;
  selectedYear?: number;
  selectedExamId?: string;
}

interface Exam {
  id: string;
  name: string;
  term: string;
  year: number;
}

export default function SettingsPage() {
  const [mode, setMode] = useState<PathwayDeterminationMode>('YEAR_AVERAGE');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [exams, setExams] = useState<Exam[]>([]);

  // Load dummy exams on mount
  useEffect(() => {
    const dummyExams: Exam[] = [
      { id: 'exam_001', name: 'Opening Term Exam', term: 'Term 1', year: 2024 },
      { id: 'exam_002', name: 'Mid Term Exam', term: 'Term 2', year: 2024 },
      { id: 'exam_003', name: 'End Term Exam', term: 'Term 3', year: 2024 },
      { id: 'exam_004', name: 'Final Exam', term: 'Term 3', year: 2023 },
    ];
    setExams(dummyExams);
    setSelectedExamId(dummyExams[0].id); // Default to first exam
  }, []);

  const handleSave = () => {
    const settings: PathwaySettings = {
      mode,
      ...(mode === 'YEAR_AVERAGE' && { selectedYear }),
      ...(mode === 'SPECIFIC_EXAM' && { selectedExamId }),
    };

    console.log('📝 Saving Pathway Settings:', settings);
    alert('Settings saved successfully (simulated)');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pathway Settings</h1>

      <div className="space-y-4">
        <label className="block font-medium">Determine Pathway By:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as PathwayDeterminationMode)}
          className="border p-2 rounded w-full"
        >
          <option value="YEAR_AVERAGE">Year Average</option>
          <option value="ALL_TIME_AVERAGE">All-Time Average</option>
          <option value="SPECIFIC_EXAM">Specific Exam</option>
        </select>

        {mode === 'YEAR_AVERAGE' && (
          <div>
            <label className="block mt-2">Select Year:</label>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border p-2 rounded w-full"
              placeholder="Enter year (e.g. 2024)"
            />
          </div>
        )}

        {mode === 'SPECIFIC_EXAM' && (
          <div>
            <label className="block mt-2">Select Exam:</label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="border p-2 rounded w-full"
            >
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name} ({exam.term}, {exam.year})
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
