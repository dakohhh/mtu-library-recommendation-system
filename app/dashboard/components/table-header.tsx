import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Table, flexRender } from "@tanstack/react-table";

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
}

export default function DataTableHeader<TData>({
  table,
}: DataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
