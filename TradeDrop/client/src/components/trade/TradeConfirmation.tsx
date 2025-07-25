import { useState } from "react"
import { Check, X, Edit3, Tag, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { addTrade } from "@/api/trades"
import { useToast } from "@/hooks/useToast"

interface TradeConfirmationProps {
  extractedData: any
  image: File | null
  onConfirm: () => void
  onReject: () => void
}

export function TradeConfirmation({ extractedData, image, onConfirm, onReject }: TradeConfirmationProps) {
  const [tradeData, setTradeData] = useState(extractedData)
  const [notes, setNotes] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const isOption = tradeData.contractType === 'option' || ['call', 'put'].includes(tradeData.type)

  const handleSave = async () => {
    setSaving(true)
    try {
      console.log("Saving trade:", tradeData)
      await addTrade({
        ...tradeData,
        notes,
        tags,
        images: image ? [image] : [],
        contractType: isOption ? 'option' : 'stock'
      })
      toast({
        title: "Trade Saved",
        description: "Your trade has been added to the journal",
      })
      onConfirm()
    } catch (error) {
      console.error("Error saving trade:", error)
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit3 className="h-5 w-5 text-blue-500" />
          Confirm Trade Details
          {isOption && (
            <Badge variant="secondary" className="ml-2">
              Options
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              value={tradeData.symbol}
              onChange={(e) => setTradeData({...tradeData, symbol: e.target.value})}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={tradeData.type}
              onChange={(e) => {
                const newType = e.target.value;
                const newIsOption = ['call', 'put'].includes(newType);
                setTradeData({
                  ...tradeData, 
                  type: newType,
                  contractType: newIsOption ? 'option' : 'stock'
                });
              }}
              className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
            >
              <optgroup label="Stock">
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </optgroup>
              <optgroup label="Options">
                <option value="call">Call Option</option>
                <option value="put">Put Option</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantity">
              {isOption ? 'Contracts' : 'Quantity'}
            </Label>
            <Input
              id="quantity"
              type="number"
              value={tradeData.quantity}
              onChange={(e) => setTradeData({...tradeData, quantity: parseInt(e.target.value)})}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="price">
              {isOption ? 'Premium per Contract' : 'Price per Share'}
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={tradeData.price}
              onChange={(e) => setTradeData({...tradeData, price: parseFloat(e.target.value)})}
              className="mt-1"
            />
          </div>
        </div>

        {isOption && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div>
              <Label htmlFor="strikePrice" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Strike Price
              </Label>
              <Input
                id="strikePrice"
                type="number"
                step="0.01"
                value={tradeData.strikePrice || ''}
                onChange={(e) => setTradeData({...tradeData, strikePrice: parseFloat(e.target.value)})}
                className="mt-1"
                placeholder="Strike price"
              />
            </div>
            <div>
              <Label htmlFor="expirationDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Expiration Date
              </Label>
              <Input
                id="expirationDate"
                type="date"
                value={tradeData.expirationDate || ''}
                onChange={(e) => setTradeData({...tradeData, expirationDate: e.target.value})}
                className="mt-1"
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="date">Trade Date</Label>
          <Input
            id="date"
            type="datetime-local"
            value={tradeData.date ? new Date(tradeData.date).toISOString().slice(0, 16) : ''}
            onChange={(e) => setTradeData({...tradeData, date: e.target.value})}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add your trading notes, strategy, or market conditions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex gap-2 mt-2 mb-2 flex-wrap">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
            />
            <Button onClick={addTag} variant="outline" size="sm">
              Add
            </Button>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Save Trade
              </>
            )}
          </Button>
          <Button onClick={onReject} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}