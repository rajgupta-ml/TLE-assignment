import {
  Code,
  Mail,
  Phone,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import { TableHead, TableHeader, TableRow } from "../ui/table";

export const StudentTableHeaders = () => {
  return (
    <TableHeader>
      <TableRow className="bg-[oklch(0.9718_0.0147_294.47)] hover:bg-[oklch(0.9718_0.0147_294.47)]">
        <TableHead className="font-semibold text-gray-800 py-4 px-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Name
          </div>
        </TableHead>
        <TableHead className="font-semibold text-gray-800 py-4 px-6">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </div>
        </TableHead>
        <TableHead className="font-semibold text-gray-800 py-4 px-6">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number
          </div>
        </TableHead>
        <TableHead className="font-semibold text-gray-800 py-4 px-6">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Codeforces Handle
          </div>
        </TableHead>
        <TableHead className="font-semibold text-gray-800 py-4 px-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Current Rating
          </div>
        </TableHead>
        <TableHead className="font-semibold text-gray-800 py-4 px-6">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Max Rating
          </div>
        </TableHead>
        <TableHead className="font-semibold text-gray-800 py-4 px-6 text-center">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
