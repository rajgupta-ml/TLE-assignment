import { IEmailTemplate, MUTATIONS, QUERIES } from "@/api/emailTemplateApi";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const EMAIL_TEMPLATE_QUERY = "GET_EMAIL_TEMPLATE_DATA";
export const useGetEmailTemplateData = () => {
  return useQuery<IEmailTemplate[]>({
    queryKey: [EMAIL_TEMPLATE_QUERY],
    queryFn: () => QUERIES.getEmailTemplates(),
    placeholderData: keepPreviousData,
  });
};

export const useCreateEmailTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MUTATIONS.createEmailTemplates,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EMAIL_TEMPLATE_QUERY],
      });
    },
    onError: (error) => {
      console.error("Error creating student:", error);
    },
  });
};

export const useUpdateEmailTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MUTATIONS.editEmailTemplates,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EMAIL_TEMPLATE_QUERY],
      });
    },
    onError: (error) => {
      console.error("Error updating student:", error);
    },
  });
};

export const useDeleteEmailTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MUTATIONS.deleteEmailTemplates,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EMAIL_TEMPLATE_QUERY],
      });
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
    },
  });
};
