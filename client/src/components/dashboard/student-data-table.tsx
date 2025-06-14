// src/components/dashboard/students-data-table.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { studentsData } from "@/data/dashboard-data"; // Import data
import { getRatingColor } from "@/lib/helpers/dashboard-helpers"; // Import helper
import { Student } from "@/types"; // Import type
import AnalyticsLayout from "../analytics/AnayticsLayout";
import CPAnalyticsModal from "../analytics/AnayticsLayout";

export function StudentsDataTable() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="w-full py-6">
        <div className="relative">
          <CPAnalyticsModal isOpen={open} onClose={setOpen}></CPAnalyticsModal>
          <div className="rounded-xl overflow-hidden shadow-sm bg-white">
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
                {studentsData.map((student) => (
                  <TableRow
                    onClick={() => setOpen(true)}
                    key={student.id}
                    className="relative transition-all duration-200 hover:bg-[var(--acet-blue)] hover:shadow-lg hover:scale-[1.02] hover:z-10 cursor-pointer"
                    onMouseEnter={() => setHoveredRow(student.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell className="font-medium text-gray-900 py-4 px-6">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4 px-6">
                      {student.email}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4 px-6">
                      {student.phone}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4 px-6">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {student.codeforcesHandle}
                      </code>
                    </TableCell>
                    <TableCell
                      className={`font-semibold py-4 px-6 ${getRatingColor(student.currentRating)}`}
                    >
                      {student.currentRating}
                    </TableCell>
                    <TableCell
                      className={`font-semibold py-4 px-6 ${getRatingColor(student.maxRating)}`}
                    >
                      {student.maxRating}
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
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                Codeforces Progress - {student.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">
                                    Contests
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">
                                    {student.progress.contests}
                                  </div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">
                                    Problems Solved
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">
                                    {student.progress.problems}
                                  </div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">
                                    Current Rank
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-lg font-semibold text-purple-600">
                                    {student.progress.rank}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                            <div className="mt-6 space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  Current Rating:
                                </span>
                                <span
                                  className={`font-bold ${getRatingColor(student.currentRating)}`}
                                >
                                  {student.currentRating}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Max Rating:</span>
                                <span
                                  className={`font-bold ${getRatingColor(student.maxRating)}`}
                                >
                                  {student.maxRating}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  Rating Change:
                                </span>
                                <span
                                  className={
                                    student.currentRating >= student.maxRating
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {student.currentRating - student.maxRating > 0
                                    ? "+"
                                    : ""}
                                  {student.currentRating - student.maxRating}
                                </span>
                              </div>
                            </div>
                          </DialogContent>
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
        </div>
      </div>
    </>
  );
}
