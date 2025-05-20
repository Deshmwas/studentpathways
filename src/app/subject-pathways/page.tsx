"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function SubjectPathwaysPage() {
  const [pathways, setPathways] = useState([]);
  const [newPathway, setNewPathway] = useState({ pathwayName: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchPathways();
  }, []);

  async function fetchPathways() {
    const res = await fetch("https://localhost:44331/api/SubjectPathways");
    const data = await res.json();
    setPathways(data);
  }

  async function addPathway() {
    await fetch("https://localhost:44331/api/SubjectPathways", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPathway),
    });
    setNewPathway({ pathwayName: "", description: "" });
    setIsOpen(false);
    fetchPathways();
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Subject Pathways</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Pathway</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Subject Pathway</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Pathway Name"
              value={newPathway.pathwayName}
              onChange={(e) => setNewPathway({ ...newPathway, pathwayName: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newPathway.description}
              onChange={(e) => setNewPathway({ ...newPathway, description: e.target.value })}
            />
            <DialogFooter>
              <Button onClick={addPathway}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded shadow-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pathways.map((p: any) => (
              <TableRow key={p.pathwayId}>
                <TableCell>{p.pathwayName}</TableCell>
                <TableCell>{p.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
