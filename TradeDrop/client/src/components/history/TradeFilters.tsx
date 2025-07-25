import { useState } from "react"
import { Search, Filter, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TradeFiltersProps {
  onFilterChange: (filters: any) => void
}

export function TradeFilters({ onFilterChange }: TradeFiltersProps) {
  const [filters, setFilters] = useState({
    symbol: '',
    profitLoss: 'all',
    dateRange: { from: '', to: '' }
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      symbol: '',
      profitLoss: 'all',
      dateRange: { from: '', to: '' }
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* First row - Search and P&L filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-slate-500 flex-shrink-0" />
              <Input
                placeholder="Search symbol..."
                value={filters.symbol}
                onChange={(e) => handleFilterChange('symbol', e.target.value)}
                className="flex-1"
              />
            </div>

            <Select value={filters.profitLoss} onValueChange={(value) => handleFilterChange('profitLoss', value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by P&L" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trades</SelectItem>
                <SelectItem value="profit">Profitable Only</SelectItem>
                <SelectItem value="loss">Losses Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Second row - Date range and clear button */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2 flex-1">
              <Calendar className="h-4 w-4 text-slate-500 flex-shrink-0" />
              <div className="flex flex-col sm:flex-row gap-2 flex-1">
                <Input
                  type="date"
                  value={filters.dateRange.from}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, from: e.target.value })}
                  className="flex-1"
                />
                <span className="text-slate-500 text-center sm:self-center">to</span>
                <Input
                  type="date"
                  value={filters.dateRange.to}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, to: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>

            <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}