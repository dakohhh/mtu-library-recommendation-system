import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ColumnDef, Table, flexRender } from "@tanstack/react-table";

interface DataTableBodyProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: Table<TData>;
}

export default function DataTableBody<TData, TValue>({
  columns,
  table,
}: DataTableBodyProps<TData, TValue>) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
