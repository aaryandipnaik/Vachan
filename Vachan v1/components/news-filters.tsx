"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface NewsFiltersProps {
  onFilterChange: (filters: {
    sources: string[]
    factCheckStatus: string[]
    date: Date | undefined
  }) => void
  activeFilters: {
    sources: string[]
    factCheckStatus: string[]
    date: Date | undefined
  }
}

export function NewsFilters({ onFilterChange, activeFilters }: NewsFiltersProps) {
  const [date, setDate] = useState<Date | undefined>(activeFilters.date)
  const [sources, setSources] = useState<string[]>(activeFilters.sources)
  const [factCheckStatus, setFactCheckStatus] = useState<string[]>(activeFilters.factCheckStatus)
  const [isFiltersApplied, setIsFiltersApplied] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Update filters when they change
  useEffect(() => {
    const hasFilters = sources.length > 0 || factCheckStatus.length > 0 || date !== undefined
    setIsFiltersApplied(hasFilters)
  }, [sources, factCheckStatus, date])

  // Update local state when activeFilters change (from parent)
  useEffect(() => {
    setSources(activeFilters.sources)
    setFactCheckStatus(activeFilters.factCheckStatus)
    setDate(activeFilters.date)
  }, [activeFilters])

  const handleSourceChange = (source: string, checked: boolean) => {
    let newSources = [...sources]
    if (checked) {
      newSources.push(source)
    } else {
      newSources = newSources.filter((s) => s !== source)
    }
    setSources(newSources)

    // Apply filters immediately
    onFilterChange({
      sources: newSources,
      factCheckStatus,
      date,
    })
  }

  const handleStatusChange = (status: string, checked: boolean) => {
    let newStatus = [...factCheckStatus]
    if (checked) {
      newStatus.push(status)
    } else {
      newStatus = newStatus.filter((s) => s !== status)
    }
    setFactCheckStatus(newStatus)

    // Apply filters immediately
    onFilterChange({
      sources,
      factCheckStatus: newStatus,
      date,
    })
  }

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)

    // Apply filters immediately
    onFilterChange({
      sources,
      factCheckStatus,
      date: newDate,
    })

    if (newDate) {
      setIsCalendarOpen(false)
    }
  }

  const applyFilters = () => {
    onFilterChange({
      sources,
      factCheckStatus,
      date,
    })
  }

  const clearFilters = () => {
    setSources([])
    setFactCheckStatus([])
    setDate(undefined)
    onFilterChange({
      sources: [],
      factCheckStatus: [],
      date: undefined,
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <CalendarIcon className="h-3.5 w-3.5" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
            formatters={{
              formatDay: (date) => date.getDate().toString().padStart(2, "0"),
            }}
          />
          <div className="flex justify-end p-2 border-t">
            <Button
              size="sm"
              onClick={() => {
                handleDateChange(undefined)
              }}
            >
              Clear
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={isFiltersApplied ? "default" : "outline"} size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            Filters {isFiltersApplied && `(${sources.length + factCheckStatus.length + (date ? 1 : 0)})`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">Sources</DropdownMenuLabel>
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="px-2 py-1.5 w-full flex items-center gap-2">
                <Checkbox
                  id="twitter"
                  checked={sources.includes("Twitter")}
                  onCheckedChange={(checked) => handleSourceChange("Twitter", checked as boolean)}
                />
                <label htmlFor="twitter" className="text-sm cursor-pointer flex-1">
                  Twitter
                </label>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="px-2 py-1.5 w-full flex items-center gap-2">
                <Checkbox
                  id="facebook"
                  checked={sources.includes("Facebook")}
                  onCheckedChange={(checked) => handleSourceChange("Facebook", checked as boolean)}
                />
                <label htmlFor="facebook" className="text-sm cursor-pointer flex-1">
                  Facebook
                </label>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="px-2 py-1.5 w-full flex items-center gap-2">
                <Checkbox
                  id="whatsapp"
                  checked={sources.includes("WhatsApp")}
                  onCheckedChange={(checked) => handleSourceChange("WhatsApp", checked as boolean)}
                />
                <label htmlFor="whatsapp" className="text-sm cursor-pointer flex-1">
                  WhatsApp
                </label>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
              Fact Check Status
            </DropdownMenuLabel>
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="px-2 py-1.5 w-full flex items-center gap-2">
                <Checkbox
                  id="true"
                  checked={factCheckStatus.includes("true")}
                  onCheckedChange={(checked) => handleStatusChange("true", checked as boolean)}
                />
                <label htmlFor="true" className="text-sm cursor-pointer flex-1">
                  Verified True
                </label>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="px-2 py-1.5 w-full flex items-center gap-2">
                <Checkbox
                  id="false"
                  checked={factCheckStatus.includes("false")}
                  onCheckedChange={(checked) => handleStatusChange("false", checked as boolean)}
                />
                <label htmlFor="false" className="text-sm cursor-pointer flex-1">
                  False Information
                </label>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="px-2 py-1.5 w-full flex items-center gap-2">
                <Checkbox
                  id="misleading"
                  checked={factCheckStatus.includes("misleading")}
                  onCheckedChange={(checked) => handleStatusChange("misleading", checked as boolean)}
                />
                <label htmlFor="misleading" className="text-sm cursor-pointer flex-1">
                  Misleading
                </label>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="px-2 py-1.5 w-full flex items-center gap-2">
                <Checkbox
                  id="unverified"
                  checked={factCheckStatus.includes("unverified")}
                  onCheckedChange={(checked) => handleStatusChange("unverified", checked as boolean)}
                />
                <label htmlFor="unverified" className="text-sm cursor-pointer flex-1">
                  Unverified
                </label>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <div className="px-2 py-1.5 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={clearFilters}>
              Clear All
            </Button>
            <Button size="sm" className="flex-1" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {isFiltersApplied && (
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={clearFilters}>
          <X className="h-3.5 w-3.5 mr-1" />
          Clear All
        </Button>
      )}

      {isFiltersApplied && (
        <div className="hidden md:flex flex-wrap gap-1 items-center">
          {sources.map((source) => (
            <Badge key={source} variant="outline" className="text-xs">
              {source}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => {
                  handleSourceChange(source, false)
                }}
              />
            </Badge>
          ))}
          {factCheckStatus.map((status) => (
            <Badge key={status} variant="outline" className="text-xs">
              {status === "true"
                ? "Verified"
                : status === "false"
                  ? "False"
                  : status === "misleading"
                    ? "Misleading"
                    : "Unverified"}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => {
                  handleStatusChange(status, false)
                }}
              />
            </Badge>
          ))}
          {date && (
            <Badge variant="outline" className="text-xs">
              {format(date, "dd/MM/yyyy")}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => {
                  handleDateChange(undefined)
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

