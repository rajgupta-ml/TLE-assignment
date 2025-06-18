import { GetApiResponse, MUTATIONS, QURIES } from "@/api/CronApi";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const CRON_QUERY = "GET_CRON_DATA";
export const useGetCronData = () => {
  return useQuery<GetApiResponse>({
    queryKey: [CRON_QUERY],
    queryFn: () => QURIES.getCron(),
    placeholderData: keepPreviousData,
  });
};

export const useCreateCron = (
  emailTemplateId: string,
  cronSchedule: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MUTATIONS.createCron,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CRON_QUERY],
      });
    },
    onError: (error) => {
      console.error("Error creating student:", error);
    },
  });
};

export const useUpdateCron = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MUTATIONS.editCron,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CRON_QUERY],
      });
    },
    onError: (error) => {
      console.error("Error updating student:", error);
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MUTATIONS.deleteCron,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CRON_QUERY],
      });
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
    },
  });
};
