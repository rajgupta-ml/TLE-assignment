"use client";
import { Student } from "@/types";
import { TableCell, TableRow } from "../ui/table";
import { getRatingColor } from "@/lib/helpers/dashboard-helpers";
import { Button } from "../ui/button";
import { Edit, Eye, Mail, MoreHorizontal, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
interface IProps {
  student: Student;
  setSelectedStudent: (args: Student) => void;
  onDeleteStudent: (id: string) => void;
  setOpenEdit: () => void;
  setOpenAnalyticsModal: () => void;
  handleUpdate: (id: string, student: Partial<Student>) => void;
}
export const StudentTableRows = ({
  student,
  setSelectedStudent,
  onDeleteStudent,
  setOpenEdit,
  setOpenAnalyticsModal,
  handleUpdate,
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
            <DropdownMenuContent align="end" className="w-48">
              {/* Email Status Info - Non-clickable */}
              <div className="px-2 py-1.5 text-sm text-gray-500 border-b">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Emails Sent: {student.numberOfEmailSent || 0}</span>
                </div>
              </div>

              {/* Email Toggle */}
              <DropdownMenuItem
                className={`flex items-center gap-2 cursor-pointer ${
                  student.isSendEmailActive
                    ? "text-green-600 bg-green-50 hover:bg-green-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() =>
                  handleUpdate(student._id, {
                    ...student,
                    isSendEmailActive: !student.isSendEmailActive,
                  })
                }
              >
                <div
                  className={`w-2 h-2 rounded-full ${student.numberOfEmailSent ? "bg-green-500" : "bg-gray-400"}`}
                />
                {student.isSendEmailActive
                  ? "Deactivate Email"
                  : "Activate Email"}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Edit */}
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

              {/* Delete */}
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
