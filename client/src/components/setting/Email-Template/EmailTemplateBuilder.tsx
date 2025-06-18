import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Plus } from "lucide-react";

interface EmailTemplateBuilderProps {
  newEmailTemplate: { name: string; subject: string; content: string };
  setNewEmailTemplate: React.Dispatch<
    React.SetStateAction<{ name: string; subject: string; content: string }>
  >;
  addEmailTemplate: () => void;
  htmlError: string;
  handleTemplateContentChange: (content: string, isEditing?: boolean) => void;
}

export const EmailTemplateBuilder: React.FC<EmailTemplateBuilderProps> = ({
  newEmailTemplate,
  setNewEmailTemplate,
  addEmailTemplate,
  htmlError,
  handleTemplateContentChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Template
        </CardTitle>
        <CardDescription>Design reusable email templates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Template Name</Label>
          <Input
            placeholder="Welcome Email"
            value={newEmailTemplate.name}
            onChange={(e) =>
              setNewEmailTemplate({
                ...newEmailTemplate,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Subject Line</Label>
          <Input
            placeholder="Welcome to our platform!"
            value={newEmailTemplate.subject}
            onChange={(e) =>
              setNewEmailTemplate({
                ...newEmailTemplate,
                subject: e.target.value,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Email Content (HTML/CSS)</Label>
          <Textarea
            placeholder={`<!DOCTYPE html>
              <html>
              <head>
              <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              .header { background: #f8f9fa; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .button { background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
              </style>
              </head>
              <body>
              <div class="header">
              <h1>Welcome {{name}}!</h1>
              </div>
              <div class="content">
              <p>Thank you for joining our platform.</p>
              <a href="#" class="button">Get Started</a>
              </div>
              </body>
              </html>`}
            className="min-h-[200px] resize-none font-mono text-sm"
            value={newEmailTemplate.content}
            onChange={(e) => handleTemplateContentChange(e.target.value)}
          />
          {htmlError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{htmlError}</AlertDescription>
            </Alert>
          )}
          <p className="text-xs text-muted-foreground">
            Write HTML with inline CSS. Use {"{{variable}}"} for dynamic
            content. Script tags are not allowed.
          </p>
        </div>
        <Button
          onClick={addEmailTemplate}
          className="w-full"
          disabled={
            !newEmailTemplate.name ||
            !newEmailTemplate.subject ||
            !newEmailTemplate.content ||
            !!htmlError // Disable if there's an HTML error
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </CardContent>
    </Card>
  );
};
