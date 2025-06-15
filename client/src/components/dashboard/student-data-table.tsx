"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  Phone,
  Code,
  TrendingUp,
  TrendingDown,
  Eye,
  MoreHorizontal,
  Edit,
  Trash2,
  User,
} from "lucide-react";
import { getRatingColor } from "@/lib/helpers/dashboard-helpers"; // Import helper
import type { Student } from "@/types/index"; // Import type
import CPAnalyticsModal from "../analytics/AnayticsLayout";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface StudentsDataTableProps {
  students: Student[];
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export const StudentsDataTable: React.FC<StudentsDataTableProps> = ({
  students,
  currentPage,
  totalPage,
  onPageChange,
}) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const getPaginatedPages = () => {
    const page = [];
    const maxPagesToShow = 10;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPage, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      page.push(1);
      if (startPage > 2) {
        page.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      page.push(i);
    }
    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        page.push("...");
      }
      page.push(totalPage);
    }
    return page;
  };

  return (
    <>
      <div className="w-full py-6">
        <div className="relative">
          <CPAnalyticsModal isOpen={open} onClose={setOpen}></CPAnalyticsModal>
          <div className="rounded-xl overflow-hidden shadow-sm bg-white mb-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-[oklch(0.9718_0.0147_294.47)] hover:bg-[oklch(0.9718_0.0147_294.47)]">
                  <TableHead className="font-semibold text-gray-800 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Codeforces Handle
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Current Rating
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4" />
                      Max Rating
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 py-4 px-6 text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow
                    onClick={() => setOpen(true)}
                    key={student._id}
                    className="relative transition-all duration-200 hover:bg-[var(--acet-blue)] hover:shadow-lg hover:scale-[1.02] hover:z-10 cursor-pointer"
                    onMouseEnter={() => setHoveredRow(student._id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell className="font-medium text-gray-900 py-4 px-6">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4 px-6">
                      {student.email}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4 px-6">
                      {student.phone_number}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4 px-6">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {student.codeforceHandle}
                      </code>
                    </TableCell>
                    <TableCell
                      className={`font-semibold py-4 px-6 ${getRatingColor(student.userMetrics.currentRating)}`}
                    >
                      {student.userMetrics.currentRating}
                    </TableCell>
                    <TableCell
                      className={`font-semibold py-4 px-6 ${getRatingColor(student.userMetrics.maxRating)}`}
                    >
                      {student.userMetrics.maxRating}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedStudent(student)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPage > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) onPageChange(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {getPaginatedPages().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "..." ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(Number(page));
                        }}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPage)
                        onPageChange(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
};
