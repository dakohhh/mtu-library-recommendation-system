"use client";

import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as React from "react";
import DeleteAllStudents from "./components/delete-all-students";
import DataTableBody from "./components/table-body";
import { DataTableViewOptions } from "./components/table-column-toggle";
import DataTableHeader from "./components/table-header";
import DataTablePagination from "./components/table-pagination";
import DataTableSearch from "./components/table-search";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  footerBtn?: Boolean;
  printTable?: Boolean;
}

export function StudentsDataTable<TData, TValue>({
  columns,
  data,
  footerBtn = false,
  printTable = false,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  function downloadTableAsPDF() {
    const input = document.getElementById("my-table"); // Replace with your table's ID
    if (input)
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("table.pdf");
      });
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <DataTableSearch table={table} />
        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} />
        </Table>
      </div>

      <div className="flex justify-between items-center">
        {footerBtn && <DeleteAllStudents />}
        {printTable && (
          <Button variant={"secondary"} onClick={downloadTableAsPDF}>
            Print Table
          </Button>
        )}

        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
