import { ArrowUpRight, ArrowDownRight, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RecentTradesProps {
  trades: any[]
  loading: boolean
}

export function RecentTrades({ trades, loading }: RecentTradesProps) {
  if (loading) {
    return (
      <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Recent Trades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const recentTrades = trades.slice(0, 5)

  const getTradeIcon = (trade: any) => {
    if (trade.type === 'call') return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
    if (trade.type === 'put') return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
    return trade.pnl > 0 ? (
      <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
    )
  }

  const getTradeTypeLabel = (trade: any) => {
    switch (trade.type) {
      case 'call': return 'CALL'
      case 'put': return 'PUT'
      case 'buy': return 'BUY'
      case 'sell': return 'SELL'
      default: return trade.type.toUpperCase()
    }
  }

  const getTradeTypeVariant = (trade: any) => {
    if (trade.type === 'call') return 'default'
    if (trade.type === 'put') return 'destructive'
    return trade.type === 'buy' ? 'default' : 'secondary'
  }

  const formatTradeDetails = (trade: any) => {
    const isOption = trade.contractType === 'option' || ['call', 'put'].includes(trade.type)
    
    if (isOption) {
      const expiry = trade.expirationDate ? new Date(trade.expirationDate).toLocaleDateString() : 'N/A'
      return `${trade.quantity} contracts @ $${trade.price.toFixed(2)} | Strike: $${trade.strikePrice?.toFixed(2) || 'N/A'} | Exp: ${expiry}`
    }
    
    return `${trade.quantity} shares @ $${trade.price.toFixed(2)}`
  }

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Recent Trades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {recentTrades.map((trade) => (
              <div
                key={trade._id}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    trade.pnl > 0
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    {getTradeIcon(trade)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {trade.symbol}
                      </span>
                      <Badge variant={getTradeTypeVariant(trade)} className="text-xs">
                        {getTradeTypeLabel(trade)}
                      </Badge>
                      {(trade.contractType === 'option' || ['call', 'put'].includes(trade.type)) && (
                        <Badge variant="outline" className="text-xs">
                          OPTIONS
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {formatTradeDetails(trade)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    trade.pnl > 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(trade.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}