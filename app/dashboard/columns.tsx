"use client";

import { DEPARTMENTS } from "@/lib/enums";
import { Student, Books } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import DeleteStudentAction from "./components/delete-student-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Books>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "language_code",
    header: "Langauge Code",
  },
  {
    accessorKey: "genres",
    header: "Genres",
    cell: ({row}) => {
      const genres = row.getValue("genres") as string[];
      return <div>{JSON.stringify(genres)}</div>

    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      // return <DeleteStudentAction student={student} />;
    },
  },
];
