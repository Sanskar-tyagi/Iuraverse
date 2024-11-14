import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const PrioritySelector = ({
  setPriority,
  priority,
  cls,
}: {
  setPriority: any;
  priority: any;
  cls?: string;
}) => {
  return (
    <Select
      value={priority}
      onValueChange={(value) => {
        setPriority(value);
      }}
    >
      <SelectTrigger
        className={`w-[150px]  border${
          priority === "High"
            ? "-red-300 "
            : priority === "Medium"
            ? "-yellow-300 "
            : priority === "Low"
            ? "-green-300 "
            : priority === "Urgent"
            ? "-pink-300 "
            : ""
        }  min-h-10 ${cls} `}
      >
        <SelectValue placeholder="Select Priority"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="High">
          <div className="flex justify-start items-center gap-2">
            <div className="bg-red-400 h-2 w-2 rounded-full"></div> High
          </div>
        </SelectItem>
        <SelectItem value="Medium">
          <div className="flex justify-start items-center gap-2">
            <div className="bg-yellow-400 h-2 w-2 rounded-full"></div> Medium
          </div>
        </SelectItem>
        <SelectItem value="Low">
          <div className="flex justify-start items-center gap-2">
            <div className="bg-green-400 h-2 w-2 rounded-full"></div> Low
          </div>
        </SelectItem>
        <SelectItem value="Urgent">
          <div className="flex justify-start items-center gap-2">
            <div className="bg-pink-400 h-2 w-2 rounded-full"></div>
            Urgent
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default PrioritySelector;
