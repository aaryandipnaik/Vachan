"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { VachanLogo } from "@/components/vachan-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MoonIcon, SunIcon, Send, User, ArrowLeft } from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { AriaFactbotAvatar } from "@/components/aria-factbot-avatar"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm Aria Factbot, your advanced AI assistant. I can answer questions, analyze articles, summarize content, and provide real-time information on any topic. Just paste text or ask me anything!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const { toast } = useToast()

  // Suggested responses for common questions
  const suggestedResponses = [
    "What's happening in world news today?",
    "Analyze this article for me...",
    "Summarize this content...",
    "Explain quantum computing simply",
  ]

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Set typing indicator when user is typing
  useEffect(() => {
    if (input.length > 0) {
      setIsTyping(true)
    } else {
      setIsTyping(false)
    }
  }, [input])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call the API with retry logic
      const fetchWithRetry = async (retries = 3, delay = 1000) => {
        try {
          const response = await fetch("/api/enhanced-chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: [...messages, userMessage].map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
            }),
          })

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
          }

          return await response.json()
        } catch (error) {
          if (retries <= 0) throw error
          await new Promise((resolve) => setTimeout(resolve, delay))
          return fetchWithRetry(retries - 1, delay * 1.5)
        }
      }

      const data = await fetchWithRetry()

      // Add assistant message
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response || "I'm sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)

      // Add a fallback response if the API fails
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or ask me about general fact-checking principles which I can answer without additional data.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, fallbackMessage])

      toast({
        title: "Connection issue",
        description: "Having trouble reaching the AI service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className={`min-h-screen ${
        resolvedTheme === "dark"
          ? "bg-gradient-to-br from-[#001a2c] via-background to-[#001a2c]"
          : "bg-gradient-to-br from-[#e6f4ff] via-background to-[#e6f4ff]"
      }`}
    >
      <header className="glass fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-background/70">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center text-[#0077b6] hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <VachanLogo />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
            {resolvedTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 pb-24">
        <Card
          className="max-w-3xl mx-auto glass border border-[#0077b6]/20"
          style={{
            background: "linear-gradient(to bottom right, rgba(0, 119, 182, 0.05), rgba(0, 0, 0, 0))",
          }}
        >
          <div className="p-4 border-b flex items-center gap-3 bg-gradient-to-r from-[#0077b6] to-[#00a8e8] text-white">
            <AriaFactbotAvatar size="sm" />
            <div>
              <h2 className="text-xl font-semibold">Aria Factbot</h2>
              <p className="text-sm text-white/80">
                Ask questions about news, fact-checking, or get help understanding articles
              </p>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-280px)] p-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`flex items-start gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {message.role === "user" ? (
                      <Avatar className="h-8 w-8 bg-primary">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <AriaFactbotAvatar size="sm" withGradient />
                    )}
                    <div className="flex flex-col">
                      <motion.div
                        className={`px-4 py-2 rounded-lg max-w-[80%] ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-[#0077b6] to-[#00a8e8] text-white rounded-tr-none"
                            : "bg-secondary rounded-tl-none"
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        {message.content}
                      </motion.div>
                      <span className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                className="mb-4 text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-2">
                  <AriaFactbotAvatar size="sm" withGradient />
                  <div className="flex flex-col">
                    <div className="px-4 py-2 rounded-lg bg-secondary rounded-tl-none">
                      <div className="flex justify-center">
                        <div className="v-shape-loader">
                          <div className="v-line-left"></div>
                          <div className="v-line-right"></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}

            {isTyping && !isLoading && (
              <div className="flex justify-end mb-2">
                <span className="text-xs text-muted-foreground italic">You are typing...</span>
              </div>
            )}

            {messages.length === 1 && !isLoading && (
              <div className="mt-4 mb-2">
                <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedResponses.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs bg-[#0077b6]/10 hover:bg-[#0077b6]/20 border-[#0077b6]/20"
                      onClick={() => setInput(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </ScrollArea>
        </Card>
      </main>

      <div className="glass fixed bottom-0 left-0 right-0 border-t backdrop-blur-md bg-background/70">
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
            <Input
              placeholder="Ask about news, facts, or articles..."
              value={input}
              onChange={handleInputChange}
              className="flex-1 border-[#0077b6]/30 focus-visible:ring-[#0077b6]/50"
              disabled={isLoading}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-[#0077b6] to-[#00a8e8] hover:from-[#006da8] hover:to-[#0095d0]"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  )
}

