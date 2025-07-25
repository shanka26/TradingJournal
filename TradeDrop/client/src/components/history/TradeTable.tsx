import { useState } from "react"
import { ArrowUpDown, ArrowUpRight, ArrowDownRight, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TradeTableProps {
  trades: any[]
  loading: boolean
}

export function TradeTable({ trades, loading }: TradeTableProps) {
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedTrades = [...trades].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === 'date') {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

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

  const isOption = (trade: any) => {
    return trade.contractType === 'option' || ['call', 'put'].includes(trade.type)
  }

  const formatStrikeExp = (trade: any) => {
    if (!isOption(trade)) return '-'
    const strike = trade.strikePrice ? `$${trade.strikePrice.toFixed(2)}` : 'N/A'
    const exp = trade.expirationDate ? new Date(trade.expirationDate).toLocaleDateString() : 'N/A'
    return `${strike} / ${exp}`
  }

  if (loading) {
    return (
      <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <ScrollArea className="w-full">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort('symbol')} className="h-auto p-0 font-semibold">
                      Symbol <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[80px]">Type</TableHead>
                  <TableHead className="min-w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort('quantity')} className="h-auto p-0 font-semibold">
                      Quantity <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort('price')} className="h-auto p-0 font-semibold">
                      Price <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[120px]">Strike/Exp</TableHead>
                  <TableHead className="min-w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort('pnl')} className="h-auto p-0 font-semibold">
                      P&L <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort('date')} className="h-auto p-0 font-semibold">
                      Date <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTrades.map((trade) => (
                  <TableRow key={trade._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{trade.symbol}</span>
                        {isOption(trade) && (
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            OPT
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTradeTypeVariant(trade)} className="text-xs">
                        {getTradeTypeLabel(trade)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{trade.quantity}</div>
                        <div className="text-xs text-slate-500">
                          {isOption(trade) ? 'contracts' : 'shares'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>${trade.price.toFixed(2)}</div>
                        {isOption(trade) && <div className="text-xs text-slate-500">/contract</div>}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="truncate">{formatStrikeExp(trade)}</div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 ${
                        trade.pnl > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {trade.pnl > 0 ? (
                          <ArrowUpRight className="h-4 w-4 flex-shrink-0" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 flex-shrink-0" />
                        )}
                        <span className="truncate">
                          {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm truncate">
                        {new Date(trade.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}