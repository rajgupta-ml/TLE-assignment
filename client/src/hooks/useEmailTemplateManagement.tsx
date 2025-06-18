import { useState } from "react";
import {
  useCreateEmailTemplate,
  useDeleteEmailTemplate,
  useGetEmailTemplateData,
  useUpdateEmailTemplate,
} from "./useEmailtemplate";
import { IEmailTemplate } from "@/api/emailTemplateApi";

export const useEmailTemplateManagement = () => {
  const [editingTemplate, setEditingTemplate] = useState<IEmailTemplate | null>(
    null,
  );
  const [htmlError, setHtmlError] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<IEmailTemplate | null>(
    null,
  );

  const [newEmailTemplate, setNewEmailTemplate] = useState({
    name: "",
    subject: "",
    body: "",
  });

  // --- Integrate react-query mutations ---
  const createMutation = useCreateEmailTemplate();
  const updateMutation = useUpdateEmailTemplate();
  const deleteMutation = useDeleteEmailTemplate();

  const { data: fetchedEmailTemplates, isLoading } = useGetEmailTemplateData();

  const startEditingTemplate = (template: IEmailTemplate) => {
    setEditingTemplate({ ...template });
    setHtmlError(validateHtmlContent(template.body));
  };

  const validateHtmlContent = (content: string) => {
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (scriptRegex.test(content)) {
      return "Script tags are not allowed in email content";
    }
    return "";
  };

  const sanitizeHtml = (html: string) => {
    console.log(html);
    return html.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      "",
    );
  };

  const handleTemplateContentChange = (content: string, isEditing = false) => {
    const error = validateHtmlContent(content);
    setHtmlError(error);

    if (isEditing && editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        body: content,
      });
    } else {
      setNewEmailTemplate({
        ...newEmailTemplate,
        body: content,
      });
    }
  };

  const saveEditedTemplate = (id: string) => {
    if (editingTemplate && !htmlError) {
      updateMutation.mutate({
        id: id,
        name: editingTemplate.name,
        body: editingTemplate.body, // Map 'content' to 'description' for your API
        subject: editingTemplate.subject,
      });
      setEditingTemplate(null);
      // The react-query onSuccess will invalidate and refetch,
      // so you might not need the local setEmailTemplates update if `emailTemplates`
      // is ultimately sourced from the query.
    }
  };

  const addEmailTemplate = () => {
    if (
      newEmailTemplate.name &&
      newEmailTemplate.subject &&
      newEmailTemplate.body &&
      !htmlError
    ) {
      // Call the create mutation
      createMutation.mutate({
        name: newEmailTemplate.name,
        body: newEmailTemplate.body, // Map 'content' to 'description'
        subject: newEmailTemplate.subject,
      });
      setNewEmailTemplate({ name: "", subject: "", body: "" });
      setHtmlError("");
      // Again, local setEmailTemplates update might not be needed if react-query is the source.
    }
  };

  const deleteEmailTemplate = (id: string) => {
    // Call the delete mutation
    deleteMutation.mutate(id);
    // Local update likely not needed
  };

  const copyTemplateId = async (templateId: string) => {
    try {
      await navigator.clipboard.writeText(templateId);
    } catch (err) {
      console.error("Failed to copy template ID:", err);
    }
  };

  return {
    fetchedEmailTemplates,
    isLoading,
    htmlError,
    editingTemplate,
    setEditingTemplate,
    previewTemplate,
    setPreviewTemplate,
    newEmailTemplate,
    setNewEmailTemplate,

    startEditingTemplate,
    sanitizeHtml,
    handleTemplateContentChange,
    saveEditedTemplate,
    addEmailTemplate,
    deleteEmailTemplate,
    copyTemplateId,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};
