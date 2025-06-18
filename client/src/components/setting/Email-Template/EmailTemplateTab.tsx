import { useState } from "react";
import { EmailTemplate } from "../setting-page";
import { EmailTemplatePreviewDialog } from "./EmailTemplatePreview";
import { TabsContent } from "@/components/ui/tabs";
import { EmailTemplateBuilder } from "./EmailTemplateBuilder";
import { EmailTemplateList } from "./EmailTemplateList";
import { EmailTemplateEditDialog } from "./EmailTemplateEditDialog";

interface EmailTemplateTabProps {
  emailTemplates: EmailTemplate[];
  setEmailTemplates: React.Dispatch<React.SetStateAction<EmailTemplate[]>>;
}

export const EmailTemplateTab: React.FC<EmailTemplateTabProps> = ({
  emailTemplates,
  setEmailTemplates,
}) => {
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(
    null,
  );
  const [htmlError, setHtmlError] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(
    null,
  );

  const [newEmailTemplate, setNewEmailTemplate] = useState({
    name: "",
    subject: "",
    content: "",
  });

  const startEditingTemplate = (template: EmailTemplate) => {
    setEditingTemplate({ ...template });
    setHtmlError(validateHtmlContent(template.content));
  };

  const validateHtmlContent = (content: string) => {
    // Check for script tags
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (scriptRegex.test(content)) {
      return "Script tags are not allowed in email content";
    }
    return "";
  };

  const sanitizeHtml = (html: string) => {
    // Remove script tags and their content
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
        content: content,
      });
    } else {
      setNewEmailTemplate({
        ...newEmailTemplate,
        content: content,
      });
    }
  };

  const saveEditedTemplate = () => {
    if (editingTemplate && !htmlError) {
      setEmailTemplates(
        emailTemplates.map((template) =>
          template.id === editingTemplate.id ? editingTemplate : template,
        ),
      );
      setEditingTemplate(null);
    }
  };

  const addEmailTemplate = () => {
    if (
      newEmailTemplate.name &&
      newEmailTemplate.subject &&
      newEmailTemplate.content &&
      !htmlError
    ) {
      setEmailTemplates([
        ...emailTemplates,
        {
          id: Date.now().toString(),
          ...newEmailTemplate,
        },
      ]);
      setNewEmailTemplate({ name: "", subject: "", content: "" });
      setHtmlError("");
    }
  };

  const deleteEmailTemplate = (id: string) => {
    setEmailTemplates(emailTemplates.filter((template) => template.id !== id));
  };

  const copyTemplateId = async (templateId: string) => {
    try {
      await navigator.clipboard.writeText(templateId);
    } catch (err) {
      console.error("Failed to copy template ID:", err);
    }
  };

  return (
    <>
      <EmailTemplatePreviewDialog
        previewTemplate={previewTemplate}
        setPreviewTemplate={setPreviewTemplate}
        sanitizeHtml={sanitizeHtml}
      />

      <TabsContent
        value="email-templates"
        className="flex-1 overflow-hidden px-6"
      >
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmailTemplateBuilder
            newEmailTemplate={newEmailTemplate}
            setNewEmailTemplate={setNewEmailTemplate}
            addEmailTemplate={addEmailTemplate}
            htmlError={htmlError}
            handleTemplateContentChange={handleTemplateContentChange}
          />
          <EmailTemplateList
            emailTemplates={emailTemplates}
            setPreviewTemplate={setPreviewTemplate}
            startEditingTemplate={startEditingTemplate}
            copyTemplateId={copyTemplateId}
            deleteEmailTemplate={deleteEmailTemplate}
            sanitizeHtml={sanitizeHtml}
          />
        </div>
      </TabsContent>

      <EmailTemplateEditDialog
        editingTemplate={editingTemplate}
        setEditingTemplate={setEditingTemplate}
        handleTemplateContentChange={handleTemplateContentChange}
        htmlError={htmlError}
        saveEditedTemplate={saveEditedTemplate}
        sanitizeHtml={sanitizeHtml}
      />
    </>
  );
};

export default EmailTemplateTab;
