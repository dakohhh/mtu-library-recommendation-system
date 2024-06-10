import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

interface DataTableSearchProps<TData> {
  table: Table<TData>;
}

export default function DataTableSearch<TData>({
  table,
}: DataTableSearchProps<TData>) {
  return (
    <Input
      placeholder="Search Book Title"
      value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("title")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
}
