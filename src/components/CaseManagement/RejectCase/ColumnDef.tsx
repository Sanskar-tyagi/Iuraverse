import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const Column = () => {
  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "_id",
      header: () => {
        return <div className="hidden"></div>;
      },
      cell: () => {
        <div className="hidden"></div>;
      },
    },
    {
      accessorKey: "CaseID",
      header: ({ column }) => {
        return (
          <div className="flex">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Case ID
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize ml-5">
          CASE{row.getValue("CaseID") as string}
        </div>
      ),
    },
    {
      accessorKey: "CaseType",
      header: ({ column }) => {
        return (
          <div className="flex justify-start">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Case Type
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-start ml-4">
          {row.getValue("CaseType")}
        </div>
      ),
    },
    {
      accessorKey: "ClientName",
      header: ({ column }) => {
        return (
          <div className="flex ">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Client
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-start ml-4">
          {row.getValue("ClientName")}
        </div>
      ),
    },
    {
      accessorKey: "CreatedOn",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Creation Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {(row.getValue("CreatedOn") as string).split(" ")[1]}
            {"-"}
            {(row.getValue("CreatedOn") as string).split(" ")[2]}
            {"-"}
            {(row.getValue("CreatedOn") as string).split(" ")[3]}
          </div>
        );
      },
    },
    {
      accessorKey: "RejectReason",
      header: "Reason",
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("RejectReason")}
          </div>
        );
      },
    },
  ];
  return columns;
};
