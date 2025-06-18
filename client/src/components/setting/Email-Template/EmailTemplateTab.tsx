import { EmailTemplatePreviewDialog } from "./EmailTemplatePreview";
import { TabsContent } from "@/components/ui/tabs";
import { EmailTemplateBuilder } from "./EmailTemplateBuilder";
import { EmailTemplateList } from "./EmailTemplateList";
import { EmailTemplateEditDialog } from "./EmailTemplateEditDialog";
import { useEmailTemplateManagement } from "@/hooks/useEmailTemplateManagement";

export const EmailTemplateTab = () => {
  const {
    previewTemplate,
    addEmailTemplate,
    copyTemplateId,
    deleteEmailTemplate,
    editingTemplate,
    handleTemplateContentChange,
    htmlError,
    newEmailTemplate,
    sanitizeHtml,
    saveEditedTemplate,
    setEditingTemplate,
    setNewEmailTemplate,
    setPreviewTemplate,
    startEditingTemplate,
    fetchedEmailTemplates,
  } = useEmailTemplateManagement();

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
            emailTemplates={fetchedEmailTemplates}
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
