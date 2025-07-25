import { Brain, TrendingUp, AlertTriangle, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PatternAnalysisProps {
  analytics: any
}

export function PatternAnalysis({ analytics }: PatternAnalysisProps) {
  if (!analytics) return null

  const getPatternIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Brain className="h-4 w-4 text-blue-500" />
    }
  }

  const getPatternColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'negative':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      case 'warning':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    }
  }

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          AI Pattern Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analytics.patterns.map((pattern: any, index: number) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getPatternColor(pattern.impact)}`}
            >
              <div className="flex items-start gap-3">
                {getPatternIcon(pattern.impact)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {pattern.pattern}
                    </h4>
                    <Badge variant={pattern.impact === 'positive' ? 'default' : pattern.impact === 'negative' ? 'destructive' : 'secondary'}>
                      {pattern.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {pattern.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}