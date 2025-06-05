
'use client';

import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash, BarChart2, FileSpreadsheet } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

import type { Student, Pathway, StudentPathway } from '@/types';

interface Props {
  students: Student[];
  pathways: Pathway[];
  paginatedPathways: StudentPathway[];
  currentPage: number;
  itemsPerPage: number;
  filteredPathwaysLength: number;
  setCurrentPage: (page: number) => void;
  exportToExcel: () => void;
  onEdit: (sp: StudentPathway) => void;
  onDelete: (id: number | string) => void;
  onViewSummary: (studentId: number | string) => void;
}

export const PathwayTable: React.FC<Props> = ({
  students,
  pathways,
  paginatedPathways,
  currentPage,
  itemsPerPage,
  filteredPathwaysLength,
  setCurrentPage,
  exportToExcel,
  onEdit,
  onDelete,
  onViewSummary,
}) => {
  return (
    <div className="bg-white rounded shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Student Pathways</h2>
        <button
          onClick={exportToExcel}
          title="Export to Excel"
          className="text-green-600 hover:text-green-800 transition-colors"
        >
          <FileSpreadsheet className="w-5 h-5" />
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Pathway</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Automatic</TableHead>
            <TableHead>Overridden</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPathways.map((sp, index) => {
            const student = students.find((s) => s.studentId === sp.studentId);
            const studentName = student ? `${student.firstName} ${student.lastName}` : 'Unknown';
            const studentClass = student?.class || 'Unknown';
            const pathway = pathways.find((p) => p.pathwayId === sp.pathwayId)?.pathwayName || 'Unknown';

            return (
              <TableRow key={sp.studentPathwayId ?? `${sp.studentId}-${sp.pathwayId}`}>
                <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{studentName}</TableCell>
                <TableCell>{studentClass}</TableCell>
                <TableCell>{pathway}</TableCell>
                <TableCell>{sp.startDate ? format(new Date(sp.startDate), 'dd MMM yyyy') : '-'}</TableCell>
                <TableCell>{sp.endDate ? format(new Date(sp.endDate), 'dd MMM yyyy') : '-'}</TableCell>
                <TableCell>
                  {sp.isAutomatic ? (
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-green-200 text-green-800">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-red-200 text-gray-600">
                      No
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {sp.isOverride ? (
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-200 text-yellow-800">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-red-200 text-gray-600">
                      No
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(sp)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      {sp.studentPathwayId !== undefined && (
                        <DropdownMenuItem
                          onClick={() => {
                            if (confirm('Delete this record?')) {
                              onDelete(sp.studentPathwayId as number);
                            }
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onViewSummary(sp.studentId)}>
                        <BarChart2 className="mr-2 h-4 w-4" /> View Summary
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(currentPage - 1, 1));
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(currentPage - 1);
                }}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {currentPage < Math.ceil(filteredPathwaysLength / itemsPerPage) && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(currentPage + 1);
                }}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage + 1 < Math.ceil(filteredPathwaysLength / itemsPerPage) && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(
                  Math.min(currentPage + 1, Math.ceil(filteredPathwaysLength / itemsPerPage))
                );
              }}
              className={
                currentPage === Math.ceil(filteredPathwaysLength / itemsPerPage)
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
