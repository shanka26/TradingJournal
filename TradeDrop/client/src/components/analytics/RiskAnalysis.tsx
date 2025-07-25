import { Shield, AlertTriangle, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface RiskAnalysisProps {
  analytics: any
}

export function RiskAnalysis({ analytics }: RiskAnalysisProps) {
  if (!analytics) return null

  const riskLevel = analytics.riskMetrics.volatility > 25 ? 'High' : analytics.riskMetrics.volatility > 15 ? 'Medium' : 'Low'
  const riskColor = riskLevel === 'High' ? 'text-red-600 dark:text-red-400' : riskLevel === 'Medium' ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          Risk Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-3xl font-bold ${riskColor} mb-2`}>
            {riskLevel} Risk
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Based on your trading patterns and volatility
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Portfolio Volatility
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {analytics.riskMetrics.volatility}%
              </span>
            </div>
            <Progress value={analytics.riskMetrics.volatility} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Max Drawdown
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {analytics.riskMetrics.maxDrawdown}%
              </span>
            </div>
            <Progress value={Math.abs(analytics.riskMetrics.maxDrawdown)} className="h-2" />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="font-medium text-slate-900 dark:text-slate-100">Risk Recommendations</span>
            </div>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Consider reducing position sizes during high volatility periods</li>
              <li>• Implement stop-loss orders to limit downside risk</li>
              <li>• Diversify across different sectors and asset classes</li>
              <li>• Review and adjust risk tolerance regularly</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}