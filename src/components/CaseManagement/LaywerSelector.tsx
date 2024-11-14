import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const LaywerSelector = ({
  selectedLawyer,
  setSelectedLaywers,
}: {
  selectedLawyer: any;
  setSelectedLaywers: any;
}) => {
  const laywersList = [
    { label: "John Doe", value: "John Doe" },
    { label: "Jane Doe", value: "Jane Doe" },
    { label: "John Smith", value: "John Smith" },
    { label: "Jane Smith", value: "Jane Smith" },
    { label: "John White", value: "John White" },
    { label: "Jane White", value: "Jane White" },
    { label: "John Black", value: "John Black" },
    { label: "Jane Orange", value: "Jane Orange" },
  ];
  return (
    // <MultiSelect
    //   options={laywersList}
    //   onValueChange={setSelectedLaywers}
    //   defaultValue={selectedLawyer}
    //   placeholder="Select Lawyers"
    //   variant="inverted"
    //   className="min-w-[280px]"
    //   maxCount={1}
    // />
    <Select
      value={selectedLawyer}
      onValueChange={(value) => {
        setSelectedLaywers(value);
      }}
    >
      <SelectTrigger className={`w-[180px]  border min-h-10`}>
        <SelectValue
          placeholder={
            <div className={`flex justify-start items-center gap-2`}>
              Lawyer
            </div>
          }
        ></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {laywersList.map((lawyer) => (
          <SelectItem value={lawyer.value}>
            <div className="flex justify-start items-center gap-2">
              {lawyer.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LaywerSelector;
