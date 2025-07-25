import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TradeCalendarProps {
  trades: any[]
}

export function TradeCalendar({ trades }: TradeCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getTradesForDate = (date: Date) => {
    return trades.filter(trade => {
      const tradeDate = new Date(trade.date)
      return tradeDate.toDateString() === date.toDateString()
    })
  }

  const getDayPnL = (date: Date) => {
    const dayTrades = getTradesForDate(date)
    return dayTrades.reduce((sum, trade) => sum + trade.pnl, 0)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Trading Calendar</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold min-w-[150px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-semibold text-slate-600 dark:text-slate-400">
              {day}
            </div>
          ))}

          {emptyDays.map(day => (
            <div key={`empty-${day}`} className="p-2 h-20"></div>
          ))}

          {days.map(day => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const dayTrades = getTradesForDate(date)
            const dayPnL = getDayPnL(date)
            const hasTrades = dayTrades.length > 0

            return (
              <div
                key={day}
                className={`p-2 h-20 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  hasTrades
                    ? dayPnL > 0
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {day}
                </div>
                {hasTrades && (
                  <div className="mt-1">
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      {dayTrades.length} trade{dayTrades.length > 1 ? 's' : ''}
                    </div>
                    <div className={`text-xs font-semibold ${
                      dayPnL > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {dayPnL > 0 ? '+' : ''}${dayPnL.toFixed(0)}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}