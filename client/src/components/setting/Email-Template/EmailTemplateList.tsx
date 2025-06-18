import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmailTemplate } from "../setting-page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Edit, Eye, Mail, MoreVertical, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmailTemplateListProps {
  emailTemplates: EmailTemplate[];
  setPreviewTemplate: React.Dispatch<
    React.SetStateAction<EmailTemplate | null>
  >;
  startEditingTemplate: (template: EmailTemplate) => void;
  copyTemplateId: (templateId: string) => Promise<void>;
  deleteEmailTemplate: (id: string) => void;
  sanitizeHtml: (html: string) => string;
}

export const EmailTemplateList: React.FC<EmailTemplateListProps> = ({
  emailTemplates,
  setPreviewTemplate,
  startEditingTemplate,
  copyTemplateId,
  deleteEmailTemplate,
  sanitizeHtml,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Library</CardTitle>
        <CardDescription>Manage your email templates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          {emailTemplates.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No templates created</p>
              <p className="text-sm text-muted-foreground">
                Create your first email template
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {emailTemplates.map((template) => (
                <Card key={template.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {template.subject}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          ID: {template.id}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              title="Preview Template"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-96 p-0" side="left">
                            <div className="p-3 border-b">
                              <h4 className="font-semibold">Email Preview</h4>
                              <p className="text-sm text-muted-foreground">
                                {template.name}
                              </p>
                            </div>
                            <div className="p-3">
                              <iframe
                                srcDoc={sanitizeHtml(template.content)}
                                className="w-full h-64 border rounded"
                                title={`Preview of ${template.name}`}
                                sandbox="allow-same-origin"
                              />
                            </div>
                          </PopoverContent>
                        </Popover>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setPreviewTemplate(template)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Full Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => startEditingTemplate(template)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Template
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => copyTemplateId(template.id)}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Template ID
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteEmailTemplate(template.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Template
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
