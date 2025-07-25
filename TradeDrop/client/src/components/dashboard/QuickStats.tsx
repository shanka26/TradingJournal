import { TrendingUp, TrendingDown, Target, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total P&L",
    value: "$12,847",
    change: "+15.2%",
    trend: "up",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Win Rate",
    value: "68.5%",
    change: "+2.1%",
    trend: "up",
    icon: Target,
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Total Trades",
    value: "127",
    change: "+8",
    trend: "up",
    icon: Calendar,
    color: "from-purple-500 to-violet-600"
  },
  {
    title: "Avg Trade",
    value: "$245",
    change: "-5.3%",
    trend: "down",
    icon: TrendingDown,
    color: "from-orange-500 to-red-600"
  }
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {stat.value}
                </p>
                <p className={`text-sm mt-1 flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="h-3 w-3 flex-shrink-0" />
                  )}
                  <span className="truncate">{stat.change}</span>
                </p>
              </div>
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg flex-shrink-0`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}