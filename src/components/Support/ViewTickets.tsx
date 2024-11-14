import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useState } from "react";
import TicketView from "./TicketTable";
import ViewTicket from "./ViewTicket";
import { ListFilter, Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AlertManager from "../AlertManager";
import LoaderMain from "@/atoms/Loaders/LoaderMain";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { CreateTicket } from "@/hooks/useTickets";
import { UserStore } from "@/pages/HomeLayout/UserStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ViewTicketsProps {
  data: any;
  isLoading: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}

const ViewTickets: React.FC<ViewTicketsProps> = ({
  data,
  isLoading,
  refetch,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<number>();
  const [formData, setData] = useState<any>({});
  const User = UserStore((state) => state.user);
  return selectedTicket !== undefined ? (
    <ViewTicket
      ticket={data.data[selectedTicket]}
      setSelectedTicket={setSelectedTicket}
    />
  ) : (
    <>
      <div className="flex items-center justify-between py-4 bg-white px-2">
        <div className="relative w-[220px]">
          <Search className="absolute left-3 h-5 w-5 text-gray-500 top-1/2 transform -translate-y-1/2 z-10" />
          <Input type="text" placeholder="Search" className="pl-10  " />
        </div>

        <div className="flex gap-6 items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <ListFilter className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Search Filters</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <span>Ticket No.</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Subject</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </Button>
          </div>
          <AlertManager
            trigger={
              <Button
                onClick={() => {}}
                variant="default"
                className="flex gap-2"
                size="default"
              >
                <Plus className="h-5 w-5" />
                Raise Ticket
              </Button>
            }
            title={
              <div className="flex justify-start pb-2 items-center border-b">
                <h1 className="ml-2 font-semibold text-xl">Create Ticket</h1>
              </div>
            }
            description={"Please fill the form to raise your query"}
            body={<TicketForm setData={setData} data={data} />}
            confirm="Create"
            cancel="Cancel"
            handleConfrim={() => {
              CreateTicket({
                ...formData,
                CreatedBy: User?.userId,
                CreatedAt: new Date().toISOString(),
                TicketID: data.page.total + 1,
              });
            }}
          />
        </div>
      </div>

      {data && !isLoading ? (
        <TicketView
          data={data.data}
          refetch={refetch}
          onSelect={setSelectedTicket}
        />
      ) : (
        <div className="flex items-center justify-center h-96">
          <LoaderMain />
        </div>
      )}
    </>
  );
};

export default ViewTickets;

const TicketForm = ({ setData, data }: { setData: any; data: any }) => {
  return (
    <div className="flex flex-col  gap-6  py-2">
      <Select
        onValueChange={(v) => {
          setData((prev: any) => ({ ...prev, Subject: v }));
        }}
        value={data["Subject"]}
      >
        <SelectTrigger className="h-10" id="case-type">
          <SelectValue placeholder="Select Subject"></SelectValue>
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
      <Textarea
        onChange={(e) => {
          setData((prev: any) => ({ ...prev, Description: e.target.value }));
        }}
        placeholder="Description"
        className="w-full border-2 min-h-24"
      />
    </div>
  );
};
