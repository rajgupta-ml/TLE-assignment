"use client";
import { Student } from "@/types";
import { TableCell, TableRow } from "../ui/table";
import { getRatingColor } from "@/lib/helpers/dashboard-helpers";
import { Button } from "../ui/button";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
interface IProps {
  student: Student;
  setSelectedStudent: (args: Student) => void;
  onDeleteStudent: (id: string) => void;
  setOpenEdit: () => void;
  setOpenAnalyticsModal: () => void;
}
export const StudentTableRows = ({
  student,
  setSelectedStudent,
  onDeleteStudent,
  setOpenEdit,
  setOpenAnalyticsModal,
}: IProps) => {
  return (
    <TableRow
      key={student._id}
      className="relative transition-all duration-200 hover:bg-[var(--acet-blue)] hover:shadow-lg hover:scale-[1.02] "
    >
      <TableCell className="font-medium text-gray-900 py-4 px-6">
        {student.name}
      </TableCell>
      <TableCell className="text-gray-700 py-4 px-6">{student.email}</TableCell>
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
                onClick={() => {
                  setSelectedStudent(student);
                  setOpenAnalyticsModal();
                }}
                className="h-8 w-8 p-0 cursor-pointer"
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
                className="h-8 w-8 p-0 cursor-pointer"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setSelectedStudent(student);
                  setOpenEdit();
                }}
              >
                <Edit className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteStudent(student._id)}
                className="flex items-center gap-2 text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};
