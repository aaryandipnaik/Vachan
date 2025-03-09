"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Book } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function ReaderModeToggle() {
  const [isReaderMode, setIsReaderMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if reader mode is enabled in localStorage
    const savedSettings = localStorage.getItem("readability-settings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setIsReaderMode(settings.readerMode || false)
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isReaderMode) {
        document.documentElement.classList.add("reader-mode")
      } else {
        document.documentElement.classList.remove("reader-mode")
      }
    }
  }, [isReaderMode])

  const toggleReaderMode = () => {
    const newMode = !isReaderMode
    setIsReaderMode(newMode)

    // Update localStorage
    const savedSettings = localStorage.getItem("readability-settings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      settings.readerMode = newMode
      localStorage.setItem("readability-settings", JSON.stringify(settings))
    } else {
      localStorage.setItem(
        "readability-settings",
        JSON.stringify({
          fontSize: 16,
          lineHeight: 1.5,
          fontFamily: "system-ui",
          highContrast: false,
          dyslexicFont: false,
          readerMode: newMode,
        }),
      )
    }

    // Show toast notification
    toast({
      title: newMode ? "Reader Mode Enabled" : "Reader Mode Disabled",
      description: newMode ? "Content is now displayed in a distraction-free layout" : "Returned to standard layout",
      duration: 3000,
    })
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={isReaderMode ? "default" : "outline"}
        size="sm"
        onClick={toggleReaderMode}
        className={`transition-all duration-200 ${
          isReaderMode
            ? "bg-[#0077b6] hover:bg-[#0088cc]"
            : "hover:bg-background/10 hover:shadow-sm border-[#0077b6]/30 hover:border-[#0077b6]/60"
        }`}
      >
        <Book className="mr-1 h-4 w-4" />
        {isReaderMode ? "Exit Reader Mode" : "Reader Mode"}
      </Button>
    </motion.div>
  )
}

