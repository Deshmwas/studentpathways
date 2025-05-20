'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface ClassType {
  classId: number;
  className: string;
  level: string;
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [newClass, setNewClass] = useState({ className: '', level: '' });
  const [editingClass, setEditingClass] = useState<ClassType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/Classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleSave = async () => {
    if (!editingClass && (!newClass.className || !newClass.level)) return;
    try {
      if (editingClass) {
        await api.put(`/Classes/${editingClass.classId}`, editingClass);
      } else {
        await api.post('/Classes', newClass);
      }
      setDialogOpen(false);
      setNewClass({ className: '', level: '' });
      setEditingClass(null);
      fetchClasses();
    } catch (error) {
      console.error('Error saving class:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/Classes/${id}`);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const openAddDialog = () => {
    setEditingClass(null);
    setNewClass({ className: '', level: '' });
    setDialogOpen(true);
  };

  const openEditDialog = (c: ClassType) => {
    setEditingClass(c);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Classes</h1>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Class
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Class Name</th>
              <th className="border px-4 py-2">Level</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length > 0 ? (
              classes.map((c) => (
                <tr key={c.classId}>
                  <td className="border px-4 py-2">{c.className}</td>
                  <td className="border px-4 py-2">{c.level}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(c)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(c.classId)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">No classes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingClass ? 'Edit Class' : 'Add New Class'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Class Name"
              value={editingClass ? editingClass.className : newClass.className}
              onChange={(e) =>
                editingClass
                  ? setEditingClass({ ...editingClass, className: e.target.value })
                  : setNewClass({ ...newClass, className: e.target.value })
              }
            />
            <Input
              placeholder="Level"
              value={editingClass ? editingClass.level : newClass.level}
              onChange={(e) =>
                editingClass
                  ? setEditingClass({ ...editingClass, level: e.target.value })
                  : setNewClass({ ...newClass, level: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingClass ? 'Update' : 'Add'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
