"use client";
import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import type { Student } from "@/types/index"; // Import type
import CPAnalyticsModal from "../analytics/AnayticsLayout";
import EditStudentPopup from "./edit-student-popup";
import usePagination from "@/hooks/usePagination";
import { StudentPagination } from "./studentPagination";
import { StudentTableHeaders } from "./student-table-header";
import { StudentTableRows } from "./student-table-rows";

interface StudentsDataTableProps {
  students: Student[];
  pagination: ReturnType<typeof usePagination>;
  onUpdateStudent: (id: string, student: Partial<Student>) => void;
  onDeleteStudent: (id: string) => void;
}

export const StudentsDataTable: React.FC<StudentsDataTableProps> = ({
  students,
  pagination,
  onDeleteStudent,
  onUpdateStudent,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [openAnalyticsModal, setOpenAnalyticsModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleEditModal = () => setOpenEditModal((prev) => !prev);
  const toggleAnalyticsModal = () => setOpenAnalyticsModal((prev) => !prev);
  return (
    <>
      {openEditModal && selectedStudent !== null && (
        <EditStudentPopup
          student={selectedStudent}
          setOpen={setOpenEditModal}
          open={openEditModal}
          handleUpdate={onUpdateStudent}
        ></EditStudentPopup>
      )}
      <div className="w-full py-6">
        <div className="relative">
          {selectedStudent && (
            <CPAnalyticsModal
              selectedStudentId={selectedStudent._id}
              isOpen={openAnalyticsModal}
              toggle={toggleAnalyticsModal}
            ></CPAnalyticsModal>
          )}
          <div className="rounded-xl overflow-hidden shadow-sm bg-white mb-4">
            <Table>
              <StudentTableHeaders></StudentTableHeaders>
              <TableBody>
                {students.map((student) => (
                  <StudentTableRows
                    key={student._id}
                    setOpenAnalyticsModal={toggleAnalyticsModal}
                    onDeleteStudent={onDeleteStudent}
                    setOpenEdit={toggleEditModal}
                    setSelectedStudent={setSelectedStudent}
                    student={student}
                    handleUpdate={onUpdateStudent}
                  ></StudentTableRows>
                ))}
              </TableBody>
            </Table>
          </div>
          <StudentPagination pagination={pagination}></StudentPagination>
        </div>
      </div>
    </>
  );
};
