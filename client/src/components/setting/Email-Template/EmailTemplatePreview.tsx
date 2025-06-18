import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { EmailTemplate } from "../setting-page";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// EmailTemplatePreviewDialog.tsx
interface EmailTemplatePreviewDialogProps {
  previewTemplate: EmailTemplate | null;
  setPreviewTemplate: React.Dispatch<
    React.SetStateAction<EmailTemplate | null>
  >;
  sanitizeHtml: (html: string) => string;
}

export const EmailTemplatePreviewDialog: React.FC<
  EmailTemplatePreviewDialogProps
> = ({ previewTemplate, setPreviewTemplate, sanitizeHtml }) => {
  return (
    <Dialog
      open={!!previewTemplate}
      onOpenChange={() => setPreviewTemplate(null)}
    >
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Email Template Preview</DialogTitle>
          <DialogDescription>
            {previewTemplate?.name} - {previewTemplate?.subject}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <iframe
            srcDoc={
              previewTemplate ? sanitizeHtml(previewTemplate.content) : ""
            }
            className="w-full h-96 border rounded"
            title={`Full preview of ${previewTemplate?.name}`}
            sandbox="allow-same-origin"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
