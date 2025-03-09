"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Globe, Download } from "lucide-react"

interface TranslationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  content: string
}

const LANGUAGES = [
  { value: "hi", label: "Hindi" },
  { value: "bn", label: "Bengali" },
  { value: "te", label: "Telugu" },
  { value: "ta", label: "Tamil" },
  { value: "mr", label: "Marathi" },
  { value: "gu", label: "Gujarati" },
  { value: "kn", label: "Kannada" },
  { value: "ml", label: "Malayalam" },
  { value: "pa", label: "Punjabi" },
  { value: "or", label: "Odia" },
]

export function TranslationDialog({ open, onOpenChange, title, content }: TranslationDialogProps) {
  const [language, setLanguage] = useState("hi")
  const [showExtensionPrompt, setShowExtensionPrompt] = useState(false)
  const [translationCopied, setTranslationCopied] = useState(false)
  const [isExtensionInstalled, setIsExtensionInstalled] = useState(false)

  // Check if the extension is installed
  useEffect(() => {
    // This is a simplified check - in reality, you would need a more robust method
    // to detect if the specific extension is installed
    const checkExtension = () => {
      // For demo purposes, we'll check if a global variable or method exists
      // that might be injected by the extension
      if (typeof window !== "undefined") {
        // This is just a placeholder - in reality, you would check for a specific
        // API or object that the extension adds to the window object
        const extensionDetected =
          !!(window as any).immersiveTranslateExtension ||
          document.querySelector('meta[name="immersive-translate-extension"]')
        setIsExtensionInstalled(extensionDetected)
      }
    }

    checkExtension()
  }, [])

  // Mock translated content
  const getTranslatedText = (text: string, lang: string) => {
    // In a real app, this would call a translation API
    return `${text} (Translated to ${LANGUAGES.find((l) => l.value === lang)?.label})`
  }

  const handleTranslate = () => {
    if (isExtensionInstalled) {
      // If extension is installed, try to use it
      try {
        // This is a placeholder for the actual extension API call
        // In reality, you would use the extension's API to trigger translation
        ;(window as any).immersiveTranslateExtension.translate({
          text: content,
          targetLanguage: language,
        })
        onOpenChange(false) // Close dialog after triggering extension
      } catch (error) {
        console.error("Failed to use extension:", error)
        // Fallback to copy method if extension API fails
        copyTranslationToClipboard()
      }
    } else {
      // If extension is not installed, show the extension prompt
      setShowExtensionPrompt(true)
    }
  }

  const copyTranslationToClipboard = () => {
    const textToCopy = getTranslatedText(content, language)
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setTranslationCopied(true)
        setTimeout(() => setTranslationCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  const handleInstallExtension = () => {
    window.open(
      "https://chromewebstore.google.com/detail/immersive-translate-trans/bpoadfkcbjbfhfodiogcnhhhpibjhbnh?hl=en",
      "_blank",
    )
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" /> Translate Content
          </DialogTitle>
          <DialogDescription>Translate this article to your preferred language</DialogDescription>
        </DialogHeader>

        {showExtensionPrompt ? (
          <div className="space-y-4 py-4">
            <Alert>
              <AlertTitle className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Install Immersive Translate Extension
              </AlertTitle>
              <AlertDescription>
                For the best translation experience, we recommend installing the Immersive Translate extension. This
                powerful tool allows you to translate entire web pages or selected text with high accuracy.
              </AlertDescription>
            </Alert>

            <div className="flex justify-center">
              <Button onClick={handleInstallExtension}>Install Extension</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium">Select Language:</span>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="original" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="original">Original</TabsTrigger>
                <TabsTrigger value="translated">Translated</TabsTrigger>
              </TabsList>

              <TabsContent value="original" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-gray-700">{content}</p>
              </TabsContent>

              <TabsContent value="translated" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold mb-2">{getTranslatedText(title, language)}</h3>
                <p className="text-gray-700">{getTranslatedText(content, language)}</p>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleTranslate}>
                {isExtensionInstalled
                  ? "Translate with Extension"
                  : translationCopied
                    ? "Copied to Clipboard!"
                    : "Copy Translation to Clipboard"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

