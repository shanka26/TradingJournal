import { useState } from "react"
import { TrendingUp, TrendingDown, Clock, DollarSign, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { closeOpenTrade } from "@/api/trades"
import { useToast } from "@/hooks/useToast"

interface OpenTradesProps {
  openTrades: any[]
  loading: boolean
  onTradesClosed?: () => void
}

export function OpenTrades({ openTrades, loading, onTradesClosed }: OpenTradesProps) {
  const [closingTrade, setClosingTrade] = useState<string | null>(null)
  const [closePrice, setClosePrice] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTrade, setSelectedTrade] = useState<any>(null)
  const { toast } = useToast()

  const handleCloseTrade = async () => {
    if (!selectedTrade || !closePrice) return

    setClosingTrade(selectedTrade._id)
    try {
      await closeOpenTrade(selectedTrade._id, parseFloat(closePrice))
      toast({
        title: "Trade Closed",
        description: `${selectedTrade.symbol} position closed successfully`,
      })
      setDialogOpen(false)
      setClosePrice("")
      setSelectedTrade(null)
      if (onTradesClosed) {
        onTradesClosed()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setClosingTrade(null)
    }
  }

  const openCloseDialog = (trade: any) => {
    setSelectedTrade(trade)
    setClosePrice(trade.currentPrice.toFixed(2))
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Open Positions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (openTrades.length === 0) {
    return (
      <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Open Positions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-600 dark:text-slate-400">No open positions</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getTradeIcon = (trade: any) => {
    if (trade.type === 'call') return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
    if (trade.type === 'put') return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
    return trade.unrealizedPnl > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
    )
  }

  const getTradeTypeLabel = (trade: any) => {
    switch (trade.type) {
      case 'call': return 'CALL'
      case 'put': return 'PUT'
      case 'buy': return 'LONG'
      case 'sell': return 'SHORT'
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
      return `${trade.quantity} contracts | Strike: $${trade.strikePrice?.toFixed(2) || 'N/A'} | Exp: ${expiry}`
    }

    return `${trade.quantity} shares`
  }

  const totalUnrealizedPnl = openTrades.reduce((sum, trade) => sum + trade.unrealizedPnl, 0)

  return (
    <>
      <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Open Positions
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-slate-500" />
              <span className={`font-semibold ${
                totalUnrealizedPnl > 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {totalUnrealizedPnl > 0 ? '+' : ''}${totalUnrealizedPnl.toFixed(2)}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {openTrades.map((trade) => (
                <div
                  key={trade._id}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      trade.unrealizedPnl > 0
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
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span>Entry: ${trade.entryPrice.toFixed(2)}</span>
                        <span>Current: ${trade.currentPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`font-semibold ${
                        trade.unrealizedPnl > 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {trade.unrealizedPnl > 0 ? '+' : ''}${trade.unrealizedPnl.toFixed(2)}
                      </p>
                      <p className={`text-sm ${
                        trade.percentChange > 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {trade.percentChange > 0 ? '+' : ''}{trade.percentChange.toFixed(2)}%
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(trade.entryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openCloseDialog(trade)}
                      disabled={closingTrade === trade._id}
                      className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:hover:bg-red-900/20"
                    >
                      {closingTrade === trade._id ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <X className="h-5 w-5 text-red-500" />
              Close Position: {selectedTrade?.symbol}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedTrade && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Position:</span>
                    <p className="font-semibold">{getTradeTypeLabel(selectedTrade)} {selectedTrade.quantity} {selectedTrade.contractType === 'option' ? 'contracts' : 'shares'}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Entry Price:</span>
                    <p className="font-semibold">${selectedTrade.entryPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Current Price:</span>
                    <p className="font-semibold">${selectedTrade.currentPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Unrealized P&L:</span>
                    <p className={`font-semibold ${
                      selectedTrade.unrealizedPnl > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedTrade.unrealizedPnl > 0 ? '+' : ''}${selectedTrade.unrealizedPnl.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="closePrice">Close Price</Label>
              <Input
                id="closePrice"
                type="number"
                step="0.01"
                value={closePrice}
                onChange={(e) => setClosePrice(e.target.value)}
                placeholder="Enter close price"
                className="mt-1"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCloseTrade}
                disabled={!closePrice || closingTrade === selectedTrade?._id}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {closingTrade === selectedTrade?._id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Closing...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Close Position
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={closingTrade === selectedTrade?._id}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}