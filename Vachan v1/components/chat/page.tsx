"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const suggestedResponses = [
    "Explain quantum entanglement.",
    "What are the benefits of meditation?",
    "Describe the plot of Hamlet.",
  ]

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setIsLoading(true)
    setResponse("") // Clear previous response

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setResponse(data.text)
    } catch (error: any) {
      console.error("Failed to fetch:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to generate response: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[90%] max-w-2xl p-4 md:p-6 lg:p-8 space-y-4">
        <CardHeader className="space-y-1">
          <Link href="/" className="inline-flex items-center text-[#0077b6] hover:underline group">
            <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }} className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-[#005f8d] transition-colors duration-300" />
              <span className="group-hover:text-[#005f8d] transition-colors duration-300">Back to Home</span>
            </motion.span>
          </Link>
          <CardTitle className="text-2xl font-bold text-center">AI Chat Assistant</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Get instant answers and insights with our AI-powered chat.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col space-y-2">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter your prompt here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mb-2 hover:text-foreground transition-colors duration-300">
              Try asking about:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedResponses.map((suggestion, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-[#0077b6]/10 hover:bg-[#0077b6]/20 border-[#0077b6]/20 transition-all duration-200"
                    onClick={() => {
                      setInput(suggestion)
                      // Automatically submit after a short delay
                      setTimeout(() => {
                        handleSubmit(new Event("submit") as any)
                      }, 100)
                    }}
                  >
                    {suggestion}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
          {response && (
            <div className="rounded-md border bg-muted p-4">
              <p className="text-sm leading-relaxed">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

