import { Target, TrendingUp, AlertTriangle, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface TradingMetricsProps {
  analytics: any
}

export function TradingMetrics({ analytics }: TradingMetricsProps) {
  if (!analytics) return null

  const metrics = [
    {
      title: "Win Rate",
      value: `${analytics.winRate}%`,
      progress: analytics.winRate,
      icon: Target,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Sharpe Ratio",
      value: analytics.riskMetrics.sharpeRatio.toFixed(2),
      progress: Math.min(analytics.riskMetrics.sharpeRatio * 50, 100),
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Max Drawdown",
      value: `${analytics.riskMetrics.maxDrawdown}%`,
      progress: Math.abs(analytics.riskMetrics.maxDrawdown),
      icon: AlertTriangle,
      color: "from-red-500 to-orange-600"
    },
    {
      title: "Volatility",
      value: `${analytics.riskMetrics.volatility}%`,
      progress: analytics.riskMetrics.volatility,
      icon: Calendar,
      color: "from-purple-500 to-violet-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <div className={`p-2 bg-gradient-to-r ${metric.color} rounded-lg flex-shrink-0`}>
                <metric.icon className="h-4 w-4 text-white" />
              </div>
              <span className="truncate">{metric.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                {metric.value}
              </p>
              <Progress value={metric.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}