import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const columns: ColumnDef<any>[] = [
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
    accessorKey: "ReminderDate",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reminder Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          <div className="text-center font-medium">
            {(row.getValue("ReminderDate") as string).split(" ")[1]}
            {"  "}
            {(row.getValue("ReminderDate") as string).split(" ")[2]}
            {"  "}
            {(row.getValue("ReminderDate") as string).split(" ")[3]}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "EstimatedEndDate",
    header: ({ column }) => (
      <div className="flex ">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">
        <div className="text-center font-medium">
          {(row.getValue("EstimatedEndDate") as string).split(" ")[1]}
          {"  "}
          {(row.getValue("EstimatedEndDate") as string).split(" ")[2]}
          {"  "}
          {(row.getValue("EstimatedEndDate") as string).split(" ")[3]}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "Alert",
    header: ({ column }) => (
      <div className="flex ">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alert
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: () => {
      return (
        <div className="flex text-center justify-center items-center">
          Lawyer
        </div>
      );
    },
  },
  {
    accessorKey: "CaseStatus",
    header: ({ column }) => (
      <div className="flex ">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={row.getValue("CaseStatus")}></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="inprogress">In progress</SelectItem>
              <SelectItem value="onhold">On hold</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex justify-end gap-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
