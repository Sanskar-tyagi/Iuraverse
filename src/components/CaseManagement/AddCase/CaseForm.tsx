import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRemoveMedia } from "@/hooks/useRemoveMedia";
import { useUploadImage } from "@/hooks/useUploadMedia";
import { UserStore } from "@/pages/HomeLayout/UserStore";
import { Loader, Trash, Upload } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";

const CaseForm = ({
  total,
  data,
  setData,
}: {
  total: any;
  data: { [key: string]: any };
  setData: Dispatch<SetStateAction<{ [key: string]: any }>>;
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleInput = (
    e:
      | string[]
      | React.ChangeEvent<HTMLInputElement>
      | string
      | React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    if (typeof e === "string") {
      setData((prev) => ({ ...prev, [name]: e }));
    }
    if (Array.isArray(e)) {
      setData((prevData) => ({
        ...prevData,
        [name]: e,
      }));
    } else if (typeof e === "object") {
      setData((prevData) => ({
        ...prevData,
        [name]: e.target.value,
      }));
    }
  };
  const User = UserStore((state) => state.user);
  const [removingFile, setRemovingFile] = useState<string | null>(null);
  const [_isUploadingMedia, setIsUploadingMedia] = useState(false);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setIsUploadingMedia(true);
    if (files && files.length > 0) {
      const file = files[0];
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB >= 6) {
        return alert("File size should be less than 6 MB");
      } else {
        useUploadImage(file);
        const prev = data["CaseFiles"] || [];
        const newFiles = [
          ...prev,
          {
            attachment: file.name,
          },
        ];
        handleInput(newFiles, "CaseFiles");
      }
    }
    setIsUploadingMedia(false);
  };
  const handleRemoveFile = (file: string) => {
    setRemovingFile(file);
    useRemoveMedia(file);
    const newFiles = data["CaseFiles"].filter(
      (f: any) => f.attachment !== file
    );
    handleInput(newFiles, "CaseFiles");
    setRemovingFile(null);
  };

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-8 gap-4 text-sm">
        <div className="col-span-2">
          <Label htmlFor="case-id">Case ID</Label>
          <Input
            disabled
            type="text"
            id="case-id"
            value={`CASE${parseInt(total) + 1}`}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="case-type">Case Type</Label>
          <Select
            onValueChange={(v) => {
              handleInput(v, "CaseType");
            }}
            value={data["CaseType"]}
          >
            <SelectTrigger id="case-type">
              <SelectValue placeholder="Select"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Legal Consultation">
                  Legal Consultation
                </SelectItem>
                <SelectItem value="Legal Notice">Legal Notice</SelectItem>
                <SelectItem value="Agreement Drafting">
                  Agreement Drafting
                </SelectItem>
                <SelectItem value="Dispute Resolution">
                  Dispute Resolution
                </SelectItem>
                <SelectItem value="Trademark">Trademark</SelectItem>
                <SelectItem value="Copyrights">Copyrights</SelectItem>
                <SelectItem value="Litigation">Litigation</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-4">
          <Label htmlFor="case-title">Case Title</Label>
          <Input
            onChange={(e) => {
              handleInput(e, "CaseTitle");
            }}
            value={data["CaseTitle"]}
            type="text"
            id="case-title"
          />
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4 text-sm">
        <div className="col-span-2">
          <Label htmlFor="client-id">Client ID</Label>
          <Input
            onChange={(e) => {
              handleInput(e, "ClientId");
            }}
            value={data["ClientId"]}
            type="number"
            id="client-id"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="client-name">Client Name</Label>
          <Input
            onChange={(e) => {
              handleInput(e, "ClientName");
            }}
            type="text"
            id="client-name"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="assign-lawyer">
            Assign lawyer/ legal coordinator{" "}
          </Label>
          <Select
            onValueChange={(v) => {
              handleInput(v, "Lawyer");
            }}
            value={data["Lawyer"]}
          >
            <SelectTrigger id="assign-lawyer">
              <SelectValue placeholder="Select"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="John doe">John Doe</SelectItem>
                <SelectItem value="Jane doe">Jane Doe</SelectItem>
                <SelectItem value="Joe doe">Joe Doe</SelectItem>
                <SelectItem value="Jane smith">Jane Smith</SelectItem>
                <SelectItem value="Joe smith">Joe Smith</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor="priority">Priority Level </Label>
          <Select
            onValueChange={(v) => {
              handleInput(v, "Priority");
            }}
            value={data["Priority"]}
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="High">High </SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4 text-sm">
        <div className="col-span-2">
          <Label htmlFor="created-on">Created On</Label>
          <DatePicker
            value={User?.userRole === "ADMIN" ? data["CreatedOn"] : Date.now()}
            disabled={User?.userRole === "ADMIN" ? false : true}
            onChange={(date) => {
              handleInput(`${date}`, "CreatedOn");
            }}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="EED">Estimated End Date</Label>
          <DatePicker
            onChange={(date) => {
              handleInput(`${date}`, "EstimatedEndDate");
            }}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="caseStatus">Case Status</Label>
          <Select
            onValueChange={(v) => {
              handleInput(v, "CaseStatus");
            }}
            value={data["CaseStatus"]}
          >
            <SelectTrigger id="caseStatus">
              <SelectValue placeholder="Select"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Open">Open </SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="On Hold">on Hold</SelectItem>
                <SelectItem value="Closed">Closed </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor="reminder">Reminder Date </Label>
          <DatePicker
            onChange={(date) => {
              handleInput(`${date}`, "ReminderDate");
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4 text-sm">
        <div className="col-span-4">
          <Label htmlFor="case-description">Case Description</Label>
          <Textarea
            id="case-description"
            placeholder="Enter here"
            className="h-24 p-2"
            onChange={(e) => {
              handleInput(e, "CaseDescription");
            }}
          />
        </div>
        <div className="col-span-4">
          <Label htmlFor="case-notes">Case Notes</Label>
          <Textarea
            id="case-notes"
            placeholder="Enter here"
            className="h-24 p-2"
            onChange={(e) => {
              handleInput(e, "CaseNotes");
            }}
          />
        </div>
      </div>
      <div className="flex  gap-6 text-sm">
        <div className="flex flex-col w-72 items-start">
          <label
            htmlFor="image-upload-input"
            className="cursor-pointer w-full h-full flex  items-center justify-between px-2"
          >
            <p className="text-sm">Supporting Documents</p>
          </label>
          <div className="h-12 gap-4 flex justify-center items-center w-full p-2 rounded-sm border-primary border-dashed border-[1px]">
            <Input
              className="cursor-pointer"
              type="file"
              accept=".png, .pdf, .jpeg, .jpg"
              ref={hiddenFileInput}
              id="case-files"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <Upload className="h-4 w-4 ml-2" />
          </div>
          <p className="text-sm tracking-tight text-center mt-1 text-gray-400">
            PDF, PNG, JPEG | File size limit is 10 MB
          </p>
        </div>
        {
          <div className="col-span-6 flex items-center justify-start">
            <div className="flex justify-center gap-4">
              {data["CaseFiles"] && (
                <>
                  {data["CaseFiles"]
                    .slice(0, 3)
                    .map((file: { attachment: string }, index: number) =>
                      removingFile !== file.attachment ? (
                        <div
                          key={index}
                          className="min-w-52 flex h-10 items-center justify-between w-full text-sm px-2 bg-neutral-100 shadow-sm"
                        >
                          <p className="text-sm">{file?.attachment}</p>
                          <button
                            onClick={() => {
                              handleRemoveFile(file.attachment);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="min-w-52 flex h-10 items-center justify-between w-full text-sm px-2 bg-neutral-100 shadow-sm"
                        >
                          <Loader className="h-4 w-4" />
                        </div>
                      )
                    )}
                  {data["CaseFiles"].length > 3 && (
                    <div className="h-10 text-center  w-full text-sm p-2 bg-neutral-100 shadow-sm">
                      {data["CaseFiles"].length - 2} +
                    </div>
                  )}{" "}
                </>
              )}
            </div>
          </div>
        }
      </div>
      <div className="grid grid-cols-8 gap-4 text-sm">
        <div className="col-span-2">
          <Label htmlFor="consultation-date">Consultation Date</Label>
          <DatePicker
            onChange={(date) => {
              handleInput(`${date}`, "ConsultationDate");
            }}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="consultation-time">Consultation Time </Label>
          <Input
            type="time"
            id="consultation-time"
            onChange={(e) => {
              handleInput(e, "ConsultationTime");
            }}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="consultation-type">Consultation Type</Label>
          <Select
            onValueChange={(v) => {
              handleInput(v, "ConsultationType");
            }}
            value={data["ConsultationType"]}
          >
            <SelectTrigger id="consultation-type">
              <SelectValue placeholder="Select"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Virtual">Virtual </SelectItem>
                <SelectItem value="Physical">Physical</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor="consultation-duration">Consultation Duration</Label>
          <Select
            onValueChange={(v) => {
              handleInput(v, "ConsultationDuration");
            }}
            value={data["ConsultationDuration"]}
          >
            <SelectTrigger id="consultationDuration">
              <SelectValue placeholder="Select"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="45 mins">45 mins </SelectItem>
                <SelectItem value="1 hour">1 hour</SelectItem>
                <SelectItem value="2 hour">2 hour</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4 text-sm">
        <div className="col-span-4">
          <Label htmlFor="Agenda">Agenda</Label>
          <Input
            onChange={(e) => {
              handleInput(e, "ConsultationAgenda");
            }}
            id="Agenda"
            placeholder="Enter here"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="fees">Fees</Label>
          <Input
            id="fees"
            onChange={(e) => {
              handleInput(e, "Fees");
            }}
            placeholder="Enter here"
          />
        </div>
      </div>
    </div>
  );
};

export default CaseForm;
