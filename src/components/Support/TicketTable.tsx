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
import { useState } from "react";
import { UserStore } from "@/pages/HomeLayout/UserStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UpdateTicket } from "@/hooks/useTickets";

const TicketView = ({
  data,
  refetch,
  onSelect,
}: {
  data: any;
  refetch: () => void;
  onSelect: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const columns = Column({
    refetch,
    columnDef: columnDef,
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
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  onClick={() => {
                    onSelect(index);
                  }}
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
export default TicketView;

const columnDef = [
  {
    accessorKey: "TicketID",
    header: "Ticket No.",
    cell: ({ row }: { row: any }) => (
      <div className="text-center">#{row.getValue("TicketID")}</div>
    ),
  },
  {
    accessorKey: "Subject",
    header: "Subject",
  },
  {
    accessorKey: "Description",
    header: "Description",
    cell: ({ row }: { row: any }) => (
      <div className="text-start ml-4 h-10">
        {row.getValue("Description").toString().slice(0, 70)}
        {row.getValue("Description").toString().length > 69 ? "..." : ""}
      </div>
    ),
  },
  {
    accessorKey: "CreatedAt",
    header: "Date",
    cell: ({ row }: { row: any }) => {
      return (
        <div className="text-center font-medium">
          {(row.getValue("CreatedAt") as string)?.split("-")[2].split("T")[0]}
          {"-"}
          {(row.getValue("CreatedAt") as string)?.split("-")[1]}
          {"-"}
          {(row.getValue("CreatedAt") as string)?.split("-")[0]}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }: { row: any }) => {
      return (
        <div className="text-center px-2">{row.getValue("email")[0].email}</div>
      );
    },
  },
  {
    accessorKey: "TicketStatus",
    header: "Status",
    cell: ({ row }: { row: any }) => {
      const userRole = UserStore((state) => state.user?.userRole);
      const [status, setStatus] = useState(
        row.getValue("TicketStatus") ? row.getValue("TicketStatus") : "N/A"
      );
      const [isLoading, setLoading] = useState(false);
      return (
        <div className="flex justify-center">
          {userRole ? (
            <div className="text-center">
              {userRole === "ADMIN" ? (
                <Select
                  value={status}
                  onValueChange={(value) => {
                    setLoading(true);
                    UpdateTicket(row.getValue("_id"), {
                      TicketStatus: value,
                    }).then(() => {
                      setStatus(value);
                      setLoading(false);
                    });
                  }}
                >
                  <SelectTrigger
                    disabled={isLoading}
                    className={`w-[110px]  border${
                      status === "Closed"
                        ? "-red-300 "
                        : status === "Open"
                        ? "-green-300 "
                        : "-yellow-300"
                    }  min-h-10`}
                  >
                    <SelectValue placeholder="Select Priority"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Closed">
                      <div className="flex justify-start items-center gap-2">
                        <div className="bg-red-400 h-2 w-2 rounded-full"></div>{" "}
                        Closed
                      </div>
                    </SelectItem>
                    <SelectItem value="Open">
                      <div className="flex justify-start items-center gap-2">
                        <div className="bg-green-400 h-2 w-2 rounded-full"></div>{" "}
                        Open
                      </div>
                    </SelectItem>
                    <SelectItem className="hidden" value="N/A">
                      <div className="flex justify-start items-center gap-2">
                        <div className="bg-yellow-400 h-2 w-2 rounded-full"></div>{" "}
                        N/A
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Button
                  variant={"outline"}
                  className={`w-[130px]  border${
                    row.getValue("TicketStatus") === "Closed"
                      ? "-red-300 "
                      : row.getValue("TicketStatus") === "Open"
                      ? "-green-300 "
                      : "-yellow-300"
                  }  min-h-10`}
                >
                  {row.getValue("TicketStatus")
                    ? row.getValue("TicketStatus")
                    : "Pending Approval"}
                </Button>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    },
  },
];
