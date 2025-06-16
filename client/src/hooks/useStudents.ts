import { api, ApiResponse, ApiResponseAnalytics } from "@/api/studentApi";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const STUDENTS_QUERY_KEY = "studentsData";
const STUDENT_ANALYTICS_QUERY_KEY = "studentAnalyticsData";
export const useGetStudent = (page: number, limit: number) => {
  return useQuery<ApiResponse>({
    queryKey: [STUDENTS_QUERY_KEY, page, limit],
    queryFn: () => api.getStudent(page, limit),
    placeholderData: keepPreviousData,
  });
};
export const useGetStudentAnalytics = (id: string) => {
  return useQuery<ApiResponseAnalytics>({
    queryKey: [STUDENT_ANALYTICS_QUERY_KEY, id],
    queryFn: () => api.getStudentAnalytics(id),
  });
};
export const useCreateStudent = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STUDENTS_QUERY_KEY, page, limit],
      });
    },
    onError: (error) => {
      console.error("Error creating student:", error);
    },
  });
};

export const useUpdateStudent = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STUDENTS_QUERY_KEY, page, limit],
      });
    },
    onError: (error) => {
      console.error("Error updating student:", error);
    },
  });
};

export const useDeleteStudent = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STUDENTS_QUERY_KEY, page, limit],
      });
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
    },
  });
};
