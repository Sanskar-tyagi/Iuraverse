import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertManager from "@/components/AlertManager";
import { Check, X } from "lucide-react";
import LaywerSelector from "../LaywerSelector";
import PrioritySelector from "../PrioritySelector";
import { useUpdateCase } from "@/hooks/useUpdateCase";
import { useState } from "react";

export const Column = ({ refetch }: { refetch: () => void }) => {
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
      id: "actions",
      header: () => <div className="text-center ml-24 ">Actions</div>,
      enableHiding: false,
      cell: ({ row }) => {
        const [selectedLawyer, setSelectedLawyer] = useState();
        const [priority, setPriority] = useState();
        const [RejectReason, setRejectReason] = useState<string>();
        const [otherReason, setOtherReason] = useState<string>();
        return (
          <div className="flex justify-end gap-10">
            <div className="flex gap-4">
              <AlertManager
                handleConfrim={() => {
                  useUpdateCase({
                    id: row.getValue("_id"),
                    body: {
                      isAccepted: false,
                      RejectReason:
                        RejectReason !== "Others" ? RejectReason : otherReason,
                    },
                  }).then(() => {
                    refetch();
                  });
                }}
                trigger={
                  <Button variant="outline" className="rounded-md">
                    Reject
                  </Button>
                }
                title={
                  <div className="flex justify-start pb-2 items-center border-b">
                    <div className="bg-red-500 rounded-full p-1">
                      <X className="h-5 text-white w-5" />
                    </div>
                    <h1 className="ml-2 font-semibold text-xl">Reject Case</h1>
                  </div>
                }
                description="Please select reason for rejection"
                body={
                  <>
                    <RadioGroup
                      onValueChange={(value) => {
                        setRejectReason(value);
                      }}
                      defaultValue="option-one"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Out of scope of work"
                          id="option-one"
                        />
                        <Label htmlFor="option-one">Out of scope of work</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Not included in subscription plan"
                          id="option-two"
                        />
                        <Label htmlFor="option-two">
                          {" "}
                          Not included in subscription plan
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Lawyer not available"
                          id="option-three"
                        />
                        <Label htmlFor="option-three">
                          Lawyer not available
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Others" id="option-four" />
                        <Label htmlFor="option-four">Others</Label>
                      </div>
                      <Textarea
                        className={`${
                          RejectReason === "Others" ? "block" : "hidden"
                        }`}
                        onChange={(e) => {
                          setOtherReason(e.target.value);
                        }}
                        placeholder="Type your reason here"
                      />
                    </RadioGroup>
                  </>
                }
                cancel="Cancel"
                confirm="Submit"
              />
              <AlertManager
                handleConfrim={() => {
                  useUpdateCase({
                    id: row.getValue("_id"),
                    body: {
                      isAccepted: true,
                      Lawyer: selectedLawyer,
                      Priority: priority,
                    },
                  }).then(() => {
                    refetch();
                  });
                }}
                trigger="Accept"
                title={
                  <div className="flex justify-start pb-2 items-center border-b">
                    <div className="bg-green-500 rounded-full p-1">
                      <Check className="h-5 text-white w-5" />
                    </div>
                    <h1 className="ml-2 font-semibold text-xl">Accept Case</h1>
                  </div>
                }
                description={
                  <>
                    Are you sure you want to accept the case ‘Litigation’?
                    <br />
                    Select the following option to proceed:
                  </>
                }
                body={
                  <>
                    <div className="flex justify-between items-center gap-2">
                      <LaywerSelector
                        selectedLawyer={selectedLawyer}
                        setSelectedLaywers={setSelectedLawyer}
                      />
                      <PrioritySelector
                        setPriority={(value: any) => {
                          setPriority(value);
                        }}
                        priority={priority}
                      />
                    </div>
                  </>
                }
                cancel="Cancel"
                confirm="Submit"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  return columns;
};
