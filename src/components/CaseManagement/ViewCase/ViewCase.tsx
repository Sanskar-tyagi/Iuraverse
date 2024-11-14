import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SelectValue,
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useUpdateCase } from "@/hooks/useUpdateCase";
import { DownloadFile } from "@/hooks/useUploadMedia";
import { ArrowDownToLine, ChevronLeft } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export const ViewCase = ({
  Case,
  setSelectedCase,
}: {
  Case: any;
  setSelectedCase: Dispatch<SetStateAction<any>>;
}) => {
  const [status, setStatus] = useState(Case.CaseStatus);
  return (
    <Card>
      <CardTitle>
        <div className=" my-4 mb-4">
          <div
            onClick={() => {
              setSelectedCase(null);
            }}
            className="flex px-2 cursor-pointer justify-start items-start gap-2"
          >
            <ChevronLeft className="h-6 w-6 mt-1 text-neutral-600" />
            <div className="flex flex-col w-full justify-start mb-2 items-start">
              <div className="flex w-full justify-start gap-12 items-start">
                <h2 className="text-xl font-semibold ">{Case.CaseType}</h2>
                <Select
                  value={status}
                  onValueChange={(value) => {
                    setStatus(value);
                    useUpdateCase({
                      id: Case._id,
                      body: {
                        CaseStatus: value,
                      },
                    });
                  }}
                >
                  <SelectTrigger
                    className={`max-w-28 ${
                      status === "Open"
                        ? "bg-green-300 border-none"
                        : status === "In Progress"
                        ? "bg-purple-300"
                        : status === "On Hold"
                        ? "bg-yellow-300"
                        : "bg-red-300"
                    } `}
                  >
                    <SelectValue
                      className="text-xs"
                      placeholder={Case.CaseStatus}
                    ></SelectValue>
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
              </div>
              <p className=" text-neutral-600 font-light text-sm">
                CASE{Case.CaseID}
              </p>
            </div>
          </div>
          <Separator className="mt-4" />
        </div>
      </CardTitle>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col gap-5 w-full">
            <div className="grid grid-cols-7 gap-4 col-span-full lg:col-span-3">
              <div className="flex gap-6 col-span-4">
                <p className="text-sm text-neutral-600 w-32">Assigned Lawyer</p>
                <p className="text-sm text-neutral-800 font-medium">
                  Adv. {Case.Lawyer}
                </p>
              </div>
              <div className="flex justify-start gap-32 col-span-2">
                <p className="text-sm text-neutral-600">Priority</p>
                <p className="text-sm flex items-center gap-1 text-neutral-800 font-medium">
                  <div
                    className={`bg-${
                      Case.Priority === "High"
                        ? "red"
                        : Case.Priority === "Medium"
                        ? "yellow"
                        : Case.Priority === "Low"
                        ? "green"
                        : Case.Priority === "Urgent"
                        ? "pink"
                        : ""
                    }-400 h-1.5 w-1.5 rounded-full`}
                  ></div>
                  {Case.Priority}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4 col-span-full lg:col-span-3">
              <div className="flex gap-6 col-span-4">
                <p className="text-sm text-neutral-600 w-32">Creation Date </p>
                <p className="text-sm text-neutral-800 font-medium">
                  {Case.CreatedOn}
                </p>
              </div>
              <div className="flex justify-start gap-32 col-span-2">
                <p className="text-sm text-neutral-600">Client</p>
                <p className="text-sm text-neutral-800 font-medium">
                  {Case.ClientName}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="flex gap-6 col-span-3">
                <p className="text-sm text-neutral-600 w-32">Reminder</p>
                <p className="text-sm text-red-600 font-medium">
                  Sep 23 | 12:00 AM{" "}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="flex  gap-2 col-span-6">
                <p className="text-sm text-neutral-600 min-w-32 w-32">
                  Description
                </p>
                <p className="text-sm text-neutral-800 font-medium px-4">
                  {Case.CaseDescription} Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-5 pb-6">
            <h1 className="text-base font-semibold">Case Documents</h1>
            <div className="grid grid-cols-3 gap-4 col-span-full lg:col-span-3">
              {Case.CaseFiles.map((item: any) => {
                return (
                  <div className="col-span-1 flex justify-between items-start w-full text-sm px-5 py-2 bg-neutral-100 shadow-sm">
                    {item} | 4.2 MB{" "}
                    <ArrowDownToLine
                      onClick={() => {
                        DownloadFile(item);
                      }}
                      className="h-4 w-4 cursor-pointer text-neutral-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-5">
            <h1 className="text-base font-semibold">Task</h1>
            <div className="flex gap-2">
              <Checkbox aria-label="Select all" />
              <p className="text-sm text-neutral-600">
                Identify Legal Strategies: Determine potential legal arguments
                and strategies based on the research.
              </p>
            </div>
            <div className="flex gap-2">
              <Checkbox aria-label="Select all" />
              <p className="text-sm text-neutral-600">
                Status Request Necessary Documents: Contracts, agreements,
                police reports, emails, evidence, etc.
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <Checkbox checked={true} aria-label="Select all" />
              <p className="text-sm text-neutral-800">
                Research Relevant Laws: Identify statutes, case law, and
                regulations applicable to the case.
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <Checkbox aria-label="Select all" />
              <p className="text-sm text-neutral-600">
                Prepare Engagement Letter/Contract: If not already signed, draft
                a letter detailing terms of representation.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
