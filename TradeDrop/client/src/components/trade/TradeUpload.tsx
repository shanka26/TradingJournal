import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Image, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { processTradeImage } from "@/api/trades"
import { TradeConfirmation } from "./TradeConfirmation"
import { useToast } from "@/hooks/useToast"

interface TradeUploadProps {
  onTradeAdded: () => void
}

export function TradeUpload({ onTradeAdded }: TradeUploadProps) {
  const [processing, setProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState(null)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const { toast } = useToast()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setUploadedImage(file)
        await processImage(file)
      }
    }
  })

  const processImage = async (file: File) => {
    setProcessing(true)
    try {
      console.log("Processing trade image:", file.name)
      const response = await processTradeImage(file)
      setExtractedData(response.extractedData)
      toast({
        title: "Image Processed",
        description: "Trade details extracted successfully",
      })
    } catch (error) {
      console.error("Error processing image:", error)
      toast({
        title: "Processing Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  const handleTradeConfirmed = () => {
    setExtractedData(null)
    setUploadedImage(null)
    onTradeAdded()
  }

  const handleTradeRejected = () => {
    setExtractedData(null)
    setUploadedImage(null)
  }

  if (extractedData) {
    return (
      <TradeConfirmation
        extractedData={extractedData}
        image={uploadedImage}
        onConfirm={handleTradeConfirmed}
        onReject={handleTradeRejected}
      />
    )
  }

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-700">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }
          `}
        >
          <input {...getInputProps()} />
          
          {processing ? (
            <div className="space-y-4">
              <Loader2 className="h-12 w-12 mx-auto text-blue-500 animate-spin" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Processing Image...
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  AI is extracting trade details from your screenshot
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-fit mx-auto">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Drop your trade screenshot here
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Or click to browse files. AI will automatically extract trade details.
                </p>
              </div>
              <Button variant="outline" className="mt-4">
                <Image className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}