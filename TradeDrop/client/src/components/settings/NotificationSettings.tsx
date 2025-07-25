import { useState } from "react"
import { Bell, Mail, Smartphone, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/useToast"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    tradeAlerts: true,
    weeklyReports: true,
    marketNews: false,
    performanceAlerts: true
  })
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Settings Updated",
        description: "Your notification preferences have been saved",
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update notification settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const notificationOptions = [
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: Mail
    },
    {
      key: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Receive push notifications on your device',
      icon: Smartphone
    },
    {
      key: 'tradeAlerts',
      title: 'Trade Alerts',
      description: 'Get notified when trades are executed',
      icon: TrendingUp
    },
    {
      key: 'weeklyReports',
      title: 'Weekly Reports',
      description: 'Receive weekly performance summaries',
      icon: Bell
    },
    {
      key: 'marketNews',
      title: 'Market News',
      description: 'Get updates on market conditions',
      icon: Bell
    },
    {
      key: 'performanceAlerts',
      title: 'Performance Alerts',
      description: 'Alerts for significant P&L changes',
      icon: TrendingUp
    }
  ]

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-500" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {notificationOptions.map((option) => (
            <div key={option.key} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <option.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Label htmlFor={option.key} className="font-medium cursor-pointer">
                    {option.title}
                  </Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {option.description}
                  </p>
                </div>
              </div>
              <Switch
                id={option.key}
                checked={settings[option.key]}
                onCheckedChange={() => handleToggle(option.key)}
              />
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            'Save Preferences'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}