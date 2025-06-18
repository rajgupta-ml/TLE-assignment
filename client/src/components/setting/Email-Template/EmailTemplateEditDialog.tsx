import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IEmailTemplate } from "@/api/emailTemplateApi";

interface EmailTemplateEditDialogProps {
  editingTemplate: IEmailTemplate | null;
  setEditingTemplate: React.Dispatch<
    React.SetStateAction<IEmailTemplate | null>
  >;
  handleTemplateContentChange: (body: string, isEditing: boolean) => void;
  htmlError: string;
  saveEditedTemplate: (id: string) => void;
  sanitizeHtml: (html: string) => string;
}

export const EmailTemplateEditDialog: React.FC<
  EmailTemplateEditDialogProps
> = ({
  editingTemplate,
  setEditingTemplate,
  handleTemplateContentChange,
  htmlError,
  saveEditedTemplate,
  sanitizeHtml,
}) => {
  return (
    <Dialog
      open={!!editingTemplate}
      onOpenChange={() => setEditingTemplate(null)}
    >
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Email Template</DialogTitle>
          <DialogDescription>
            Modify your email template content
          </DialogDescription>
        </DialogHeader>
        {editingTemplate && (
          <div className="space-y-4 flex-1 overflow-hidden">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Template Name</Label>
                <Input
                  value={editingTemplate.name}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Subject Line</Label>
                <Input
                  value={editingTemplate.subject}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      subject: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="space-y-2">
                <Label>HTML Content</Label>
                <Textarea
                  className="h-64 resize-none font-mono text-sm"
                  value={editingTemplate.body}
                  onChange={(e) =>
                    handleTemplateContentChange(e.target.value, true)
                  }
                />
                {htmlError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{htmlError}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label>Live Preview</Label>
                <iframe
                  srcDoc={sanitizeHtml(editingTemplate.body)}
                  className="w-full h-64 border rounded"
                  title="Live preview"
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingTemplate(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => saveEditedTemplate(editingTemplate._id)}
                disabled={!!htmlError}
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
