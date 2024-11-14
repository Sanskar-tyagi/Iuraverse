interface ISideCardProps {
  userName: string;
  Heading: string;
  total: string;
  isSelected: boolean;
}
const SideCard = ({ userName, Heading, total, isSelected }: ISideCardProps) => {
  return (
    <div
      className={`p-4 flex justify-start cursor-pointer gap-4 ${
        isSelected && "border shadow-lg bg-[#F7D3FF]/10"
      }`}
    >
      <div className="flex items-center justify-center text-base bg-[#F7D3FF] text-black h-11 w-11 rounded-full">
        {userName}
      </div>
      <div className="flex text-base flex-col">
        <div className="flex justify-between items-center gap-10">
          {" "}
          <p className="text-neutral-800 font-medium"> {Heading}</p>
          <p className="text-sm text-neutral-400">12:34</p>
        </div>
        <p className="text-sm text-neutral-600">{total} threads</p>
      </div>
    </div>
  );
};

export default SideCard;
