import { useState, useEffect } from "react"
import { PerformanceChart } from "@/components/analytics/PerformanceChart"
import { TradingMetrics } from "@/components/analytics/TradingMetrics"
import { PatternAnalysis } from "@/components/analytics/PatternAnalysis"
import { RiskAnalysis } from "@/components/analytics/RiskAnalysis"
import { QuickStats } from "@/components/dashboard/QuickStats"
import { getAnalytics } from "@/api/analytics"
import { useToast } from "@/hooks/useToast"

export function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      console.log("Loading analytics data")
      const response = await getAnalytics()
      setAnalytics(response.analytics)
    } catch (error) {
      console.error("Error loading analytics:", error)
      toast({
        title: "Error",
        description: "Failed to load analytics",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          Analytics & Insights
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          AI-powered analysis of your trading performance
        </p>
      </div>

      <QuickStats />

      <TradingMetrics analytics={analytics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart analytics={analytics} />
        <RiskAnalysis analytics={analytics} />
      </div>

      <PatternAnalysis analytics={analytics} />
    </div>
  )
}