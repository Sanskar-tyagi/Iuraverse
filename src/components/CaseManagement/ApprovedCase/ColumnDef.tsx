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
import PrioritySelector from "../PrioritySelector";
import { useState } from "react";
import { useUpdateCase } from "@/hooks/useUpdateCase";
import { useNavigate } from "react-router-dom";
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
    header: ({}) => {
      return <div className="hidden"></div>;
    },
    cell: ({}) => {
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
          {"  "}
          {(row.getValue("CreatedOn") as string).split(" ")[2]}
          {"  "}
          {(row.getValue("CreatedOn") as string).split(" ")[3]}
        </div>
      );
    },
  },
  {
    accessorKey: "Lawyer",
    header: ({ column }) => (
      <div className="flex ">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assigned to
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const [lawyer, setLawyer] = useState<string>(row.getValue("Lawyer"));
      return (
        <div className="capitalize text-start ml-4">
          <Select
            value={lawyer}
            onValueChange={(value) => {
              setLawyer(value);
              useUpdateCase({
                id: row.getValue("_id"),
                body: {
                  Lawyer: value,
                },
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a lawyer"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Lawyers</SelectLabel>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                <SelectItem value="John Smith">John Smith</SelectItem>
                <SelectItem value="Joe doe">Joe doe</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  {
    accessorKey: "Priority",
    header: ({ column }) => (
      <div className="flex ">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const [priority, setPriority] = useState(row.getValue("Priority"));

      return (
        <PrioritySelector
          setPriority={(value: any) => {
            useUpdateCase({
              id: row.getValue("_id"),
              body: {
                Priority: value,
              },
            }).then(() => {
              setPriority(value);
            });
          }}
          priority={priority}
        />
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
      const [status, setStatus] = useState<string>(row.getValue("CaseStatus"));

      return (
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value);
            useUpdateCase({
              id: row.getValue("_id"),
              body: {
                CaseStatus: value,
              },
            });
          }}
        >
          <SelectTrigger>
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In progress</SelectItem>
              <SelectItem value="On Hold">On hold</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
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
    cell: ({ row }) => {
      const navigate = useNavigate();
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
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/activity-feed?id=${row.getValue("_id")}`);
                }}
              >
                Add Comments
              </DropdownMenuItem>
              <DropdownMenuItem>Set Reminder</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
