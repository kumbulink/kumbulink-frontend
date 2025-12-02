import * as React from "react"
import CalendarIcon from "./calendar.svg?react";

import { Button } from "@/shared/ui/shadcn/button"
import { Calendar } from "@/shared/ui/shadcn/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/shadcn/popover"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export const Datepicker = ({ setSelectedDate } : { setSelectedDate: (date: Date | null) => void }) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2000-01-02")
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full rounded-md border border-gray-300 p-2 text-gray-600 placeholder:text-gray-400 !bg-white">
        <input
          id="date"
          value={value}
          placeholder="01/01/2000"
          className="w-full border-0 focus:outline-none focus:ring-0 !bg-white !text-base !pl-2 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm pl-10 pr-10 rounded-lg"
          onChange={(e) => {
            const date = e.target.value
            const rawDate = date.replace(/\D/g, '')
            let formattedDate = date
            let parsedDate: Date | undefined = undefined;
            
            if (rawDate.length === 8) {
              const dd = rawDate.slice(0, 2);
              const mm = rawDate.slice(2, 4);
              const yyyy = rawDate.slice(4, 8);

              formattedDate = formatDate(new Date(`${yyyy}/${mm}/${dd}`))
              parsedDate = new Date(`${yyyy}/${mm}/${dd}`)
            }

            setValue(formattedDate)

            if (isValidDate(parsedDate)) {
              setDate(parsedDate)
              setMonth(parsedDate)
              setSelectedDate(parsedDate ? parsedDate : null)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setSelectedDate(date ? date : null)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
