"use client"

import { CalendarIcon } from "lucide-react"
import {
  Button,
  DatePicker,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components"

import { Calendar } from "@/components/ui/calendar-rac"
import { DateInput } from "@/components/ui/datefield-rac"
import { DateValue, parseDate } from "@internationalized/date";
import { useState } from "react"

interface DateSelectionProps {
  defaultDate?: string;
  onDateChange?: (date: string) => void;
}

export default function DateSelection({ defaultDate, onDateChange }: DateSelectionProps) {

  const initialDate = defaultDate ? parseDate(defaultDate) : null;
  const [date, setDate] = useState<DateValue | null>(initialDate);

  const handleChange = (newDate: DateValue | null) => {
    setDate(newDate);
    if (newDate && onDateChange) {
      onDateChange(newDate.toString());
    }
  };


  return (
    <DatePicker className="*:not-first:mt-2 !z-[70]"
      value={date}
      onChange={handleChange}>
      <div className="flex">
        <Group className="w-full">
          <DateInput className="pe-9" />
        </Group>
        <Button className="text-muted-foreground/80 hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 !z-[70] -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]">
          <CalendarIcon size={16} />
        </Button>
      </div>
      <Popover
        className="bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2  !z-[70] rounded-lg border shadow-lg outline-hidden"
        offset={4}
      >
        <Dialog className="!z-[70] max-h-[inherit] overflow-auto p-2">
          <Calendar />
        </Dialog>
      </Popover>
    </DatePicker>
  )
}
