"use client";

import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEPARTMENTS } from "@/lib/enums";
import { Student, AbsentStudent, Books } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import cookies, { useCookies } from "react-cookie";

//  API REQUESTS


//  Get Warning Letters
export async function getWarningLetter(id: string, token:string, title_of_service?:string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/attendance/warning_letter?student_id=${id}&title=${title_of_service ? title_of_service : "Chapel Service"}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      toast.error("Something went error. Please try again later");
      throw new Error("Failed to fetch data");
    }
    const blob = await response.blob();
    var file = window.URL.createObjectURL(blob);
    window.location.assign(file);
    toast.success("Warning letter downloaded");

    return;
  } catch (error) {
    toast.error("Something went error. Please try again later");
    console.error("FETCHING ERROR!", error);
    return [];
  }
}

// STUDENT ACTIONS SERVICES
function downloadWarningLetter(id: string , token:string, title_of_service?:string, ) {

  toast("Processing...⏳");
  getWarningLetter(id, token, title_of_service);
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


interface WarningLetterCellProps {
  student: AbsentStudent;
}

const WarningLetterCell: React.FC<WarningLetterCellProps> = ({ student }) => {
  const [cookies] = useCookies(["token"]);
  const bearer_token = cookies.token as string;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => {
          downloadWarningLetter(student.id, bearer_token, student.title_of_service);
        }}>
          Download Warning Letter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};




export const absenteesColumns: ColumnDef<Books>[] = [
  {
    accessorKey: "title",
    header: "Book Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },

  {
    accessorKey: "language_code",
    header: "Language Code",
  },

  {
    accessorKey: "genres",
    header: "Genre",
    cell: ({ row }) => {
      const genre = row.getValue("genres");
      return <div>{JSON.stringify(genre)}</div>;
    },
  },
  
];

