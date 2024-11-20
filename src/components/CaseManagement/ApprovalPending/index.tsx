import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Column } from "@/components/ColumnDef";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ApprovalPending = ({
  cases,
  refetch,
}: {
  cases: any;
  refetch: () => void;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setAcceptedCases] = useState(
    cases?.filter((item: any) => item.CaseStatus === "Approval Pending")
  );
  console.log(cases);
  useEffect(() => {
    setAcceptedCases(
      cases?.filter((item: any) => item.CaseStatus === "Approval Pending")
    );
  }, [cases]);
  const columns = Column({
    refetch,
    columnDef: [
      {
        accessorKey: "CaseID",
        header: "Case ID",
      },
      {
        accessorKey: "CaseType",
        header: "Case Type",
      },
      {
        accessorKey: "CreatedOn",
        header: "Creation Date",
        cell: ({ row }: { row: any }) => {
          return (
            <div className="text-center font-medium">
              {(row.getValue("CreatedOn") as string)?.split(" ")[1]}
              {"  "}
              {(row.getValue("CreatedOn") as string)?.split(" ")[2]}
              {"  "}
              {(row.getValue("CreatedOn") as string)?.split(" ")[3]}
            </div>
          );
        },
      },
      {
        accessorKey: "ReminderDate",
        header: "Reminder Date",
        cell: ({ row }: { row: any }) => {
          return (
            <div className="text-center font-medium">
              {(row.getValue("ReminderDate") as string)?.split(" ")[1]}
              {"  "}
              {(row.getValue("ReminderDate") as string)?.split(" ")[2]}
              {"  "}
              {(row.getValue("ReminderDate") as string)?.split(" ")[3]}
            </div>
          );
        },
      },
      {
        accessorKey: "Lawyer",
        header: "Assigned To",
        cell: ({ row }: { row: any }) => (
          <div className="capitalize text-start ml-4">
            Adv. {row.getValue("Lawyer")}
          </div>
        ),
      },
      {
        accessorKey: "Priority",
        header: "Priority",
        cell: ({ row }: { row: any }) => (
          <div className="text-center">
            <Button
              variant={"outline"}
              className={`w-[150px]  border${
                row.getValue("Priority") === "High"
                  ? "-red-300 "
                  : row.getValue("Priority") === "Medium"
                  ? "-yellow-300 "
                  : row.getValue("Priority") === "Low"
                  ? "-green-300 "
                  : row.getValue("Priority") === "Urgent"
                  ? "-pink-300 "
                  : ""
              }  min-h-10`}
            >
              <div
                className={`bg${
                  row.getValue("Priority") === "High"
                    ? "-red-400 "
                    : row.getValue("Priority") === "Medium"
                    ? "-yellow-400 "
                    : row.getValue("Priority") === "Low"
                    ? "-green-400 "
                    : row.getValue("Priority") === "Urgent"
                    ? "-pink-400 "
                    : ""
                }h-2 w-2 mr-3 rounded-full`}
              ></div>
              {row.getValue("Priority")}
            </Button>
          </div>
        ),
      },
      {
        accessorKey: "CaseStatus",
        header: "Status",
        cell: ({ row }: { row: any }) => (
          <div className="text-center">
            <Button
              variant={"outline"}
              className={`w-[150px]  border${
                row.getValue("CaseStatus") === "Closed"
                  ? "-red-300 "
                  : row.getValue("CaseStatus") === "on Hold"
                  ? "-yellow-300 "
                  : row.getValue("CaseStatus") === "In Progress"
                  ? "-green-300 "
                  : row.getValue("CaseStatus") === "Urgent"
                  ? "-pink-300 "
                  : ""
              }  min-h-10`}
            >
              {row.getValue("CaseStatus")}
            </Button>
          </div>
        ),
      },
    ],
  });
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full bg-white">
      <div className="rounded-md border-t p-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <>
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    </>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center px-2 justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ApprovalPending;
