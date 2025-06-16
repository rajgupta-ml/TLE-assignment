import { OmiitedStudents } from "@/api/studentApi";
import {
  useCreateStudent,
  useDeleteStudent,
  useUpdateStudent,
} from "./useStudents";
import { useState } from "react";
import { Student } from "@/types";

export const useStudentManagement = (page: number, limit: number) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const createStudentMutation = useCreateStudent(page, limit);
  const updateStudentMutation = useUpdateStudent(page, limit);
  const deleteStudentMutation = useDeleteStudent(page, limit);
  const handleAddStudent = (student: OmiitedStudents) => {
    createStudentMutation.mutate(student, {
      onSuccess: () => {
        setIsAddModalOpen(false);
      },
    });
  };

  const handleSetModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };
  const handleUpdateStudent = (id: string, student: Partial<Student>) => {
    updateStudentMutation.mutate({ id, student });
  };

  const handleDeleteStudent = (id: string) => {
    deleteStudentMutation.mutate(id);
  };

  return {
    // State
    isAddModalOpen,

    // Mutations
    createStudentMutation,
    updateStudentMutation,
    deleteStudentMutation,

    // Handlers
    handleSetModal,
    handleAddStudent,
    handleUpdateStudent,
    handleDeleteStudent,
  };
};
