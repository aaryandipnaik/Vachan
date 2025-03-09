"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReadabilitySettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReadabilitySettings({ open, onOpenChange }: ReadabilitySettingsProps) {
  // Add a reader mode to the readability settings

  // First, add a new state for reader mode
  const [readerMode, setReaderMode] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [fontFamily, setFontFamily] = useState("system-ui")
  const [highContrast, setHighContrast] = useState(false)
  const [dyslexicFont, setDyslexicFont] = useState(false)

  // Apply settings to the document
  // Then add the reader mode effect to the useEffect that applies settings
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--user-font-size", `${fontSize}px`)
      document.documentElement.style.setProperty("--user-line-height", `${lineHeight}`)
      document.documentElement.style.setProperty("--user-font-family", fontFamily)

      if (highContrast) {
        document.documentElement.classList.add("high-contrast")
      } else {
        document.documentElement.classList.remove("high-contrast")
      }

      if (dyslexicFont) {
        document.documentElement.classList.add("dyslexic-font")
        // Load OpenDyslexic font if not already loaded
        const fontLink = document.getElementById("dyslexic-font")
        if (!fontLink) {
          const link = document.createElement("link")
          link.id = "dyslexic-font"
          link.rel = "stylesheet"
          link.href = "https://fonts.cdnfonts.com/css/opendyslexic"
          document.head.appendChild(link)
        }
      } else {
        document.documentElement.classList.remove("dyslexic-font")
      }

      // Apply reader mode
      if (readerMode) {
        document.documentElement.classList.add("reader-mode")

        // Add reader mode styles if not already added
        if (!document.getElementById("reader-mode-styles")) {
          const style = document.createElement("style")
          style.id = "reader-mode-styles"
          style.textContent = `
            .reader-mode .card-content {
              max-width: 680px !important;
              margin: 0 auto !important;
            }
            .reader-mode .card-header {
              max-width: 680px !important;
              margin: 0 auto !important;
            }
            .reader-mode aside,
            .reader-mode nav:not(.main-nav),
            .reader-mode .sidebar,
            .reader-mode .ads,
            .reader-mode .comments,
            .reader-mode .related-content,
            .reader-mode footer {
              display: none !important;
            }
            .reader-mode main {
              padding: 2rem 1rem !important;
              background: var(--background) !important;
            }
            .reader-mode .card {
              box-shadow: none !important;
              border: none !important;
              background: transparent !important;
            }
            .reader-mode p {
              font-size: calc(var(--user-font-size) * 1.1) !important;
            }
            .reader-mode .container {
              max-width: 768px !important;
            }
          `
          document.head.appendChild(style)
        }
      } else {
        document.documentElement.classList.remove("reader-mode")
      }
    }
  }, [fontSize, lineHeight, fontFamily, highContrast, dyslexicFont, readerMode])

  // Save settings to localStorage
  // Update the localStorage save to include reader mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "readability-settings",
        JSON.stringify({
          fontSize,
          lineHeight,
          fontFamily,
          highContrast,
          dyslexicFont,
          readerMode,
        }),
      )
    }
  }, [fontSize, lineHeight, fontFamily, highContrast, dyslexicFont, readerMode])

  // Load settings from localStorage
  // Update the localStorage load to include reader mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("readability-settings")
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setFontSize(settings.fontSize || 16)
        setLineHeight(settings.lineHeight || 1.5)
        setFontFamily(settings.fontFamily || "system-ui")
        setHighContrast(settings.highContrast || false)
        setDyslexicFont(settings.dyslexicFont || false)
        setReaderMode(settings.readerMode || false)
      }
    }
  }, [])

  // Update the reset function to include reader mode
  const resetSettings = () => {
    setFontSize(16)
    setLineHeight(1.5)
    setFontFamily("system-ui")
    setHighContrast(false)
    setDyslexicFont(false)
    setReaderMode(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Readability Settings</DialogTitle>
          <DialogDescription>Customize how content appears to improve readability</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="line-height">Line Height: {lineHeight}</Label>
            <Slider
              id="line-height"
              min={1}
              max={2}
              step={0.1}
              value={[lineHeight]}
              onValueChange={(value) => setLineHeight(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-family">Font Family</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger id="font-family">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system-ui">System Default</SelectItem>
                <SelectItem value="'Segoe UI', sans-serif">Segoe UI</SelectItem>
                <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                <SelectItem value="'Georgia', serif">Georgia</SelectItem>
                <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast">High Contrast Mode</Label>
            <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="dyslexic-font">Dyslexia-friendly Font</Label>
            <Switch id="dyslexic-font" checked={dyslexicFont} onCheckedChange={setDyslexicFont} />
          </div>

          {/* Add the reader mode toggle to the UI */}
          {/* Add this after the dyslexic font toggle: */}
          <div className="flex items-center justify-between">
            <Label htmlFor="reader-mode">Reader Mode (Immersive)</Label>
            <Switch id="reader-mode" checked={readerMode} onCheckedChange={setReaderMode} />
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={resetSettings}>
              Reset to Default
            </Button>
            <Button onClick={() => onOpenChange(false)}>Save Settings</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

