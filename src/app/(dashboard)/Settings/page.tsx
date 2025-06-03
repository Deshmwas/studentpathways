// 'use client';

// import { useState, useEffect } from 'react';

// type PathwayDeterminationMode = 'YEAR_AVERAGE' | 'ALL_TIME_AVERAGE' | 'SPECIFIC_EXAM';

// interface PathwaySettings {
//   mode: PathwayDeterminationMode;
//   selectedYear?: number;
//   selectedExamId?: string;
// }

// interface Exam {
//   id: string;
//   name: string;
//   term: string;
//   year: number;
// }

// export default function SettingsPage() {
//   const [mode, setMode] = useState<PathwayDeterminationMode>('YEAR_AVERAGE');
//   const [selectedYear, setSelectedYear] = useState<number>(2024);
//   const [selectedExamId, setSelectedExamId] = useState<string>('');
//   const [exams, setExams] = useState<Exam[]>([]);

//   useEffect(() => {
//     const dummyExams: Exam[] = [
//       { id: 'exam_001', name: 'Opening Term Exam', term: 'Term 1', year: 2025 },
//       { id: 'exam_002', name: 'Mid Term Exam', term: 'Term 2', year: 2025 },
//       { id: 'exam_003', name: 'End Term Exam', term: 'Term 3', year: 2025 },
//       { id: 'exam_004', name: 'Final Exam', term: 'Term 3', year: 2025 },
//     ];
//     setExams(dummyExams);
//     setSelectedExamId(dummyExams[0].id);
//   }, []);

//   const handleSave = () => {
//     const settings: PathwaySettings = {
//       mode,
//       ...(mode === 'YEAR_AVERAGE' && { selectedYear }),
//       ...(mode === 'SPECIFIC_EXAM' && { selectedExamId }),
//     };

//     console.log('📝 Saving Pathway Settings:', settings);
//     alert('Settings saved successfully (simulated)');
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
//       <h1 className="text-3xl font-bold mb-6">Pathway Settings</h1>

//       <div className="space-y-6">
//         <div>
//           <label className="block font-semibold mb-2">Determine Pathway By:</label>
//           <div className="flex flex-col space-y-2">
//             <label className="inline-flex items-center space-x-2">
//               <input
//                 type="radio"
//                 value="YEAR_AVERAGE"
//                 checked={mode === 'YEAR_AVERAGE'}
//                 onChange={() => setMode('YEAR_AVERAGE')}
//                 className="accent-black"
//               />
//               <span>Year Average</span>
//             </label>
//             <label className="inline-flex items-center space-x-2">
//               <input
//                 type="radio"
//                 value="ALL_TIME_AVERAGE"
//                 checked={mode === 'ALL_TIME_AVERAGE'}
//                 onChange={() => setMode('ALL_TIME_AVERAGE')}
//                 className="accent-black"
//               />
//               <span>All-Time Average</span>
//             </label>
//             <label className="inline-flex items-center space-x-2">
//               <input
//                 type="radio"
//                 value="SPECIFIC_EXAM"
//                 checked={mode === 'SPECIFIC_EXAM'}
//                 onChange={() => setMode('SPECIFIC_EXAM')}
//                 className="accent-black"
//               />
//               <span>Specific Exam</span>
//             </label>
//           </div>
//         </div>

//         {mode === 'YEAR_AVERAGE' && (
//           <div>
//             <label className="block font-medium mb-1">Select Year:</label>
//             <input
//               type="number"
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(Number(e.target.value))}
//               className="border p-2 rounded w-full"
//               placeholder="Enter year (e.g. 2025)"
//             />
//           </div>
//         )}

//         {mode === 'SPECIFIC_EXAM' && (
//           <div>
//             <label className="block font-medium mb-1">Select Exam:</label>
//             <select
//               value={selectedExamId}
//               onChange={(e) => setSelectedExamId(e.target.value)}
//               className="border p-2 rounded w-full"
//             >
//               {exams.map((exam) => (
//                 <option key={exam.id} value={exam.id}>
//                   {exam.name} ({exam.term}, {exam.year})
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <button
//           onClick={handleSave}
//           className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition-all"
//         >
//           Save Settings
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';

type PathwayDeterminationMode = 'YEAR_AVERAGE' | 'ALL_TIME_AVERAGE' | 'SPECIFIC_EXAM';

export interface PathwaySettings {
  mode: PathwayDeterminationMode;
  selectedYear?: number;
  selectedExamId?: string;
}

export interface Exam {
  id: string;
  name: string;
  term: string;
  year: number;
}

export default function SettingsPage() {
  const [mode, setMode] = useState<PathwayDeterminationMode>('YEAR_AVERAGE');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const dummyExams: Exam[] = [
      { id: 'exam_001', name: 'Opening Term Exam', term: 'Term 1', year: 2025 },
      { id: 'exam_002', name: 'Mid Term Exam', term: 'Term 2', year: 2025 },
      { id: 'exam_003', name: 'End Term Exam', term: 'Term 3', year: 2025 },
    ];
    setExams(dummyExams);
    setSelectedExamId(dummyExams[0].id);
  }, []);

  const handleSave = () => {
    const mockSettings: PathwaySettings = {
      mode,
      ...(mode === 'YEAR_AVERAGE' && { selectedYear }),
      ...(mode === 'SPECIFIC_EXAM' && { selectedExamId }),
    };
    console.log('Mock Settings Saved:', mockSettings);
    alert('✅ Pathway settings saved (mock)');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">Pathway Settings</h1>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Determine Pathway By:</label>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                value="YEAR_AVERAGE"
                checked={mode === 'YEAR_AVERAGE'}
                onChange={() => setMode('YEAR_AVERAGE')}
                className="accent-black"
              />
              <span>Year Average</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                value="ALL_TIME_AVERAGE"
                checked={mode === 'ALL_TIME_AVERAGE'}
                onChange={() => setMode('ALL_TIME_AVERAGE')}
                className="accent-black"
              />
              <span>All-Time Average</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                value="SPECIFIC_EXAM"
                checked={mode === 'SPECIFIC_EXAM'}
                onChange={() => setMode('SPECIFIC_EXAM')}
                className="accent-black"
              />
              <span>Specific Exam</span>
            </label>
          </div>
        </div>

        {mode === 'YEAR_AVERAGE' && (
          <div>
            <label className="block font-medium mb-1">Select Year:</label>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border p-2 rounded w-full"
              placeholder="Enter year (e.g. 2025)"
            />
          </div>
        )}

        {mode === 'SPECIFIC_EXAM' && (
          <div>
            <label className="block font-medium mb-1">Select Exam:</label>
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
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition-all"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}