import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
export function DatePicker({
  onChange,
  disabled,
  value,
}: {
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
  value?: Date;
}) {
  const [date, setDate] = useState<Date | undefined>(value);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant={"outline"}
            className={cn(
              "w-[240px] justify-between text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "PPP") : <span>DD/MM/YYYY</span>}
            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              onChange(date);
              if (date) {
                setDate(date);
              }
            }}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
