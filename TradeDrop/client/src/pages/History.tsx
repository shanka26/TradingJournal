import { useState, useEffect } from "react"
import { TradeTable } from "@/components/history/TradeTable"
import { TradeFilters } from "@/components/history/TradeFilters"
import { TradeCalendar } from "@/components/history/TradeCalendar"
import { getTrades } from "@/api/trades"
import { useToast } from "@/hooks/useToast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function History() {
  const [trades, setTrades] = useState([])
  const [filteredTrades, setFilteredTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadTrades()
  }, [])

  const loadTrades = async () => {
    try {
      console.log("Loading trade history")
      const response = await getTrades()
      setTrades(response.trades)
      setFilteredTrades(response.trades)
    } catch (error) {
      console.error("Error loading trades:", error)
      toast({
        title: "Error",
        description: "Failed to load trade history",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters: any) => {
    console.log("Applying filters:", filters)
    let filtered = [...trades]

    if (filters.symbol) {
      filtered = filtered.filter(trade => 
        trade.symbol.toLowerCase().includes(filters.symbol.toLowerCase())
      )
    }

    if (filters.dateRange?.from) {
      filtered = filtered.filter(trade => 
        new Date(trade.date) >= filters.dateRange.from
      )
    }

    if (filters.dateRange?.to) {
      filtered = filtered.filter(trade => 
        new Date(trade.date) <= filters.dateRange.to
      )
    }

    if (filters.profitLoss !== 'all') {
      filtered = filtered.filter(trade => 
        filters.profitLoss === 'profit' ? trade.pnl > 0 : trade.pnl < 0
      )
    }

    setFilteredTrades(filtered)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          Trading History
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          View and analyze your complete trading history
        </p>
      </div>

      <TradeFilters onFilterChange={handleFilterChange} />

      <Tabs defaultValue="table" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table">
          <TradeTable trades={filteredTrades} loading={loading} />
        </TabsContent>
        
        <TabsContent value="calendar">
          <TradeCalendar trades={filteredTrades} />
        </TabsContent>
      </Tabs>
    </div>
  )
}