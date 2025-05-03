
import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

interface DateRangePickerProps {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [checkInDate, setCheckInDate] = React.useState<string>('');
  const [checkOutDate, setCheckOutDate] = React.useState<string>('');

  // Update static inputs when value changes from parent
  React.useEffect(() => {
    if (value?.from) {
      setCheckInDate(format(value.from, 'yyyy-MM-dd'));
    }
    if (value?.to) {
      setCheckOutDate(format(value.to, 'yyyy-MM-dd'));
    }
  }, [value]);

  // Handle date input changes
  const handleDateChange = (date: string, isCheckIn: boolean) => {
    if (isCheckIn) {
      setCheckInDate(date);
      const from = date ? new Date(date) : undefined;
      onChange({ from, to: value?.to });
    } else {
      setCheckOutDate(date);
      const to = date ? new Date(date) : undefined;
      onChange({ from: value?.from, to });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="w-full border-0 pl-10 pr-4 py-3 rounded-md text-booking-gray-600 bg-white hover:bg-white focus:outline-none transition-all duration-200 hover:shadow-sm relative flex">
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-booking-gray-500 transition-all duration-200" size={20} />
        <div className="flex w-full justify-between">
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => handleDateChange(e.target.value, true)}
            className="border-0 flex-1 focus:outline-none"
            placeholder="Check-in"
          />
          <span className="mx-2 self-center text-booking-gray-500">—</span>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => handleDateChange(e.target.value, false)}
            className="border-0 flex-1 focus:outline-none"
            placeholder="Check-out"
            min={checkInDate} // Ensure check-out date is after check-in
          />
        </div>
      </div>
    </div>
  )
}
