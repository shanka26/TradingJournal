import { useState, useEffect } from "react"
import { TradeUpload } from "@/components/trade/TradeUpload"
import { TradeChat } from "@/components/trade/TradeChat"
import { RecentTrades } from "@/components/dashboard/RecentTrades"
import { OpenTrades } from "@/components/dashboard/OpenTrades"
import { getTrades, getOpenTrades } from "@/api/trades"
import { useToast } from "@/hooks/useToast"

export function Dashboard() {
  const [trades, setTrades] = useState([])
  const [openTrades, setOpenTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [openTradesLoading, setOpenTradesLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadTrades()
    loadOpenTrades()
  }, [])

  const loadTrades = async () => {
    try {
      console.log("Loading trades for dashboard")
      const response = await getTrades()
      setTrades(response.trades)
    } catch (error) {
      console.error("Error loading trades:", error)
      toast({
        title: "Error",
        description: "Failed to load trades",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadOpenTrades = async () => {
    try {
      console.log("Loading open trades for dashboard")
      const response = await getOpenTrades()
      setOpenTrades(response.openTrades)
    } catch (error) {
      console.error("Error loading open trades:", error)
      toast({
        title: "Error",
        description: "Failed to load open trades",
        variant: "destructive",
      })
    } finally {
      setOpenTradesLoading(false)
    }
  }

  const handleTradeAdded = () => {
    console.log("Trade added, refreshing dashboard")
    loadTrades()
    loadOpenTrades()
  }

  const handleTradesClosed = () => {
    console.log("Trades closed, refreshing dashboard")
    loadTrades()
    loadOpenTrades()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            Trading Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Drop your trade screenshots to get started
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TradeUpload onTradeAdded={handleTradeAdded} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <OpenTrades openTrades={openTrades} loading={openTradesLoading} onTradesClosed={handleTradesClosed} />
            <RecentTrades trades={trades} loading={loading} />
          </div>
        </div>

        <div className="lg:sticky lg:top-6">
          <TradeChat trades={trades} />
        </div>
      </div>
    </div>
  )
}