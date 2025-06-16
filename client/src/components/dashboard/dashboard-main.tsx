"use client";
import React, { useEffect, useState } from "react";
import { DashboardOverviewCards } from "./dashboard-overview-cards";
import { StudentsDataTable } from "./student-data-table";
import AddStudentPopup from "./add-student-popup";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { useGetStudent } from "@/hooks/useStudents";
import { useStudentManagement } from "@/hooks/useStudentManagement";
import { DashboardHeader } from "./dashboardHeader";

export const DashboardMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: student,
    isLoading,
    error,
  } = useGetStudent(currentPage, itemsPerPage);
  const students = student?.data || [];
  const totalPages = student?.pages || 0;

  const {
    isAddModalOpen,
    handleSetModal,
    handleAddStudent,
    handleUpdateStudent,
    handleDeleteStudent,
  } = useStudentManagement(currentPage, itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  <Loading isLoading={isLoading} error={error}></Loading>;
  <Error error={error}></Error>;

  if (students) {
    return (
      <div className="flex flex-1 max-w-[3840px] mx-auto">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          <DashboardHeader onClose={handleSetModal}></DashboardHeader>
          <DashboardOverviewCards />
          <div className="flex flex-1 gap-2">
            <StudentsDataTable
              students={students}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
              totalPage={totalPages}
            />
          </div>
        </div>
        <AddStudentPopup
          onAddStudent={handleAddStudent}
          open={isAddModalOpen}
          setOpen={handleSetModal}
        />
        ;
      </div>
    );
  }
};
