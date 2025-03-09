"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Minimize2, Maximize2, Send, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { AriaFactbotAvatar } from "@/components/aria-factbot-avatar"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Enhance the processMessage function to better handle different content types:
const processMessage = (content: string) => {
  // Check if the message contains a URL or link
  const hasLinks = /https?:\/\/[^\s]+/.test(content)

  // Check if the message is likely a summary
  const isSummary =
    content.toLowerCase().includes("summary") ||
    content.toLowerCase().includes("to summarize") ||
    (content.length > 200 && content.split("\n").length > 3)

  // Check if the message is likely an analysis
  const isAnalysis =
    content.toLowerCase().includes("analysis") ||
    content.toLowerCase().includes("key points") ||
    (content.includes("1.") && content.includes("2.") && content.length > 200)

  // Check if the message is likely an educational explanation
  const isExplanation =
    (content.toLowerCase().includes("is a") ||
      content.toLowerCase().includes("refers to") ||
      content.toLowerCase().includes("defined as")) &&
    content.length > 100

  // Add appropriate styling based on message type
  let messageClasses = "px-3 py-2 rounded-lg max-w-[220px] sm:max-w-[280px] md:max-w-[320px]"

  if (hasLinks) {
    messageClasses += " space-y-2"
  }

  if (isSummary) {
    messageClasses += " bg-[#0077b6]/10"
  }

  if (isAnalysis) {
    messageClasses += " space-y-1"
  }

  if (isExplanation) {
    messageClasses += " font-medium"
  }

  return {
    content,
    messageClasses,
    hasLinks,
    isSummary,
    isAnalysis,
    isExplanation,
  }
}

export function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  // Update the welcome message to reflect the enhanced capabilities:
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content:
        "Hello! I'm Aria Factbot, your advanced AI assistant. I can answer questions, analyze articles, summarize content, and provide real-time information on any topic. Just paste text or ask me anything!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  // Update the suggested responses to showcase the enhanced capabilities:
  const [suggestedResponses, setSuggestedResponses] = useState([
    "What's happening in world news today?",
    "Analyze this article for me...",
    "Summarize this content...",
    "Explain quantum computing simply",
  ])

  // Enhance the generateSuggestions function to be more versatile:
  const generateSuggestions = (lastMessage: string) => {
    // Check if the message appears to be a summary or analysis
    if (lastMessage.length > 300 || lastMessage.split("\n").length > 3) {
      return [
        "Can you explain this further?",
        "What are the key takeaways?",
        "Is there any bias in this content?",
        "How reliable is this information?",
      ]
    }
    // Check for news or current events queries
    else if (
      lastMessage.toLowerCase().includes("news") ||
      lastMessage.toLowerCase().includes("latest") ||
      lastMessage.toLowerCase().includes("recent") ||
      lastMessage.toLowerCase().includes("current")
    ) {
      return [
        "What are the implications of this?",
        "How might this develop further?",
        "What's the background context?",
        "Are there opposing viewpoints?",
      ]
    }
    // Check for educational queries
    else if (
      lastMessage.toLowerCase().includes("explain") ||
      lastMessage.toLowerCase().includes("what is") ||
      lastMessage.toLowerCase().includes("how does")
    ) {
      return [
        "Can you give me a real-world example?",
        "How does this impact everyday life?",
        "What are common misconceptions about this?",
        "How has this evolved over time?",
      ]
    }
    // Default suggestions that showcase capabilities
    return [
      "What's happening in world news today?",
      "Analyze this article for me...",
      "Summarize this content...",
      "Explain quantum computing simply",
    ]
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  // Set typing indicator when user is typing
  useEffect(() => {
    if (input.length > 0) {
      setIsTyping(true)
      setLastInteraction(new Date())
    } else {
      setIsTyping(false)
    }
  }, [input])

  // Reminder to ask a question if idle for too long
  useEffect(() => {
    if (!lastInteraction || messages.length <= 1 || isLoading) return

    const idleTimeout = setTimeout(() => {
      const now = new Date()
      const timeSinceLastInteraction = now.getTime() - lastInteraction.getTime()

      // If idle for more than 2 minutes and not already showing a reminder
      if (
        timeSinceLastInteraction > 120000 &&
        messages[messages.length - 1].role !== "assistant" &&
        messages[messages.length - 1].content !== "Do you have any questions about fact-checking or news verification?"
      ) {
        setMessages((prev) => [
          ...prev,
          {
            id: `reminder-${Date.now()}`,
            role: "assistant",
            content: "Do you have any questions about fact-checking or news verification?",
            timestamp: new Date(),
          },
        ])
      }
    }, 120000) // 2 minutes

    return () => clearTimeout(idleTimeout)
  }, [lastInteraction, messages, isLoading])

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(!isOpen)
    }
    setLastInteraction(new Date())
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const maximizeChat = () => {
    setIsMinimized(false)
  }

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
    setLastInteraction(new Date())

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

      // Generate new contextual suggestions based on the conversation
      const newSuggestions = generateSuggestions(assistantMessage.content)
      setSuggestedResponses(newSuggestions)
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

  if (!isOpen) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="fixed bottom-4 right-4 z-50">
              <Button
                onClick={toggleChat}
                className="rounded-full w-14 h-14 p-0 shadow-lg bg-[#0077b6] hover:bg-[#0088cc] transition-colors duration-300"
                aria-label="Open chat"
                style={{
                  background: "linear-gradient(135deg, #0077b6 0%, #00a8e8 100%)",
                  boxShadow: "0 4px 20px rgba(0, 119, 182, 0.3)",
                }}
              >
                <AriaFactbotAvatar size="sm" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Chat with Aria Factbot</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Card
      className={`fixed bottom-4 right-4 shadow-lg transition-all duration-300 z-50 ${
        isMinimized ? "w-64 h-12" : "w-80 sm:w-96 h-[500px]"
      }`}
      style={{
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderColor: "rgba(0, 119, 182, 0.3)",
      }}
    >
      <CardHeader className="p-3 border-b flex flex-row items-center justify-between bg-gradient-to-r from-[#0077b6] to-[#00a8e8] text-white">
        <CardTitle className="text-sm font-medium flex items-center gap-3">
          <AriaFactbotAvatar size="sm" />
          <span>Aria Factbot</span>
          {messages.length > 1 && (
            <Badge variant="secondary" className="text-xs ml-1">
              {messages.length - 1} messages
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center gap-2">
          {isMinimized ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:text-white/80 hover:bg-[#0077b6]/80"
              onClick={maximizeChat}
              aria-label="Maximize"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:text-white/80 hover:bg-[#0077b6]/80"
              onClick={minimizeChat}
              aria-label="Minimize"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white hover:text-white/80 hover:bg-[#0077b6]/80"
            onClick={toggleChat}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="p-0">
            <ScrollArea className="h-[380px] p-4">
              <AnimatePresence>
                {messages.map((message) => {
                  const processed = processMessage(message.content)
                  return (
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
                            className={`${processed.messageClasses} ${
                              message.role === "user"
                                ? "bg-gradient-to-r from-[#0077b6] to-[#00a8e8] text-white rounded-tr-none"
                                : "bg-secondary rounded-tl-none"
                            }`}
                            whileHover={{ scale: 1.01 }}
                          >
                            {processed.hasLinks ? (
                              <div className="space-y-2">
                                {message.content.split("\n").map((line, i) => (
                                  <p key={i}>{line}</p>
                                ))}
                              </div>
                            ) : (
                              message.content
                            )}
                          </motion.div>
                          <span className="text-xs text-muted-foreground mt-1 ml-1">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
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
                      <div className="px-3 py-2 rounded-lg bg-secondary rounded-tl-none">
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
                <div className="flex justify-start mb-2">
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
                        onClick={() => {
                          setInput(suggestion)
                          // Automatically submit the form after a short delay
                          setTimeout(() => {
                            const event = new Event("submit", { bubbles: true, cancelable: true })
                            document.querySelector("form")?.dispatchEvent(event)
                          }, 100)
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                ref={inputRef}
                placeholder="Ask about news, facts, or articles..."
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                className="flex-1 border-[#0077b6]/30 focus-visible:ring-[#0077b6]/50"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-[#0077b6] to-[#00a8e8] hover:from-[#006da8] hover:to-[#0095d0]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

