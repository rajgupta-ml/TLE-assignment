import React from "react";
import { DashboardOverviewCards } from "./dashboard-overview-cards";
import { StudentsDataTable } from "./student-data-table";
import AddStudentPopup from "./add-student-popup";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { useGetStudent } from "@/hooks/useStudents";
import { useStudentManagement } from "@/hooks/useStudentManagement";
import { DashboardHeader } from "./dashboardHeader";
import usePagination from "@/hooks/usePagination";

export const DashboardMain = () => {
  const pagination = usePagination();
  const { currentPage, itemsPerPage, totalPages } = pagination;
  const {
    data: student,
    isLoading,
    error,
  } = useGetStudent(currentPage, itemsPerPage);
  const students = student?.data || [];
  totalPages.current = student?.total || 0;
  const {
    isAddModalOpen,
    handleSetModal,
    handleAddStudent,
    handleUpdateStudent,
    handleDeleteStudent,
  } = useStudentManagement(currentPage, itemsPerPage);

  <Loading isLoading={isLoading} error={error}></Loading>;
  <Error error={error}></Error>;

  if (students) {
    return (
      <div className="flex flex-1 max-w-[3840px] mx-auto bg-background">
        <div className="flex h-full w-full flex-1 flex-col gap-2  border-border dark:bg-card">
          <DashboardHeader onClose={handleSetModal}></DashboardHeader>
          <div className="p-4">
            <div className="p-4 border rounded-xl">
              <DashboardOverviewCards />
              <div className="flex flex-1 gap-2">
                <StudentsDataTable
                  students={students}
                  pagination={pagination}
                  onUpdateStudent={handleUpdateStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
              </div>
            </div>
          </div>
        </div>
        <AddStudentPopup
          onAddStudent={handleAddStudent}
          open={isAddModalOpen}
          setOpen={handleSetModal}
        />
      </div>
    );
  }
};
