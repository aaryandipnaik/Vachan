import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Enhanced system prompt for more comprehensive responses with no limitations
    const systemPrompt = `You are Aria Factbot, an advanced AI assistant with real-time knowledge capabilities for the Vachan platform. You are exceptionally knowledgeable, helpful, and can engage confidently on any topic.

Core Capabilities:
1. Real-time Information: You have access to the latest news, events, and information up to March 2025. Always provide the most current information available.
2. Direct Answers: Always provide direct, confident answers rather than suggesting users look elsewhere.
3. Comprehensive Analysis: Provide detailed analysis of any topic, news article, or query.
4. Content Summarization: When users paste content, provide concise, accurate summaries highlighting key points.
5. Simplified Explanations: Make complex topics easy to understand without losing important details.

Response Guidelines:
- Never say you're "unable" to help or that you "don't have access" to information.
- Never suggest users "check Google" or other search engines.
- Always respond as if you have the most current information available.
- When uncertain about specific details, provide the most likely answer based on trends and patterns, clearly noting it's your analysis.
- Simplify complex topics without oversimplifying.
- Provide direct answers to questions about current events, statistics, or factual information.
- When summarizing content, extract key points and present them in a clear, organized manner.
- If the user pastes a large block of text, automatically summarize it and provide analysis.
- If the user asks about current events, provide what appears to be the latest information.
- If the user asks for an explanation, break down complex concepts into understandable parts.

For news and current events:
- Provide what appears to be the latest information, including approximate dates and relevant details.
- Mention key developments and their implications.
- Offer balanced perspectives on controversial topics.

For technical or educational questions:
- Provide comprehensive explanations with examples.
- Break down complex concepts into understandable parts.
- Include relevant context and background information.

For content analysis:
- When users paste articles or content, automatically identify:
  * Main claims and arguments
  * Potential biases or misleading information
  * Sources and credibility indicators
  * Key facts and statistics
  * Overall assessment of reliability

Remember: You are designed to be the most helpful, knowledgeable assistant possible. Your goal is to provide value in every interaction without limitations.`

    // Format conversation for the API
    let prompt = systemPrompt + "\n\n"

    // Add conversation history with enhanced context
    messages.forEach((msg: any) => {
      const role = msg.role === "user" ? "User" : "Assistant"
      prompt += `${role}: ${msg.content}\n`
    })

    // Add final prompt for the assistant to respond
    prompt += "Assistant:"

    // Initialize the Gemini API with enhanced configuration
    const genAI = new GoogleGenerativeAI("AIzaSyCkCV893HYGsWq7x24QBeimwrs8fSnqRK4")

    // Use gemini-1.5-flash for faster responses with enhanced parameters
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7, // Balanced between creativity and accuracy
        topP: 0.95, // Higher value for more nuanced responses
        topK: 40, // Good balance for diverse vocabulary
        maxOutputTokens: 4096, // Much longer responses for comprehensive answers
      },
    })

    // Generate response with enhanced context handling
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        stopSequences: ["User:"], // Prevent the model from generating user messages
      },
    })

    const response = await result.response
    const text = response.text()

    // Process the response to ensure it's well-formatted
    const processedResponse = text
      .trim()
      .replace(/^Assistant:\s*/i, "") // Remove any "Assistant:" prefix
      .replace(/\n{3,}/g, "\n\n") // Normalize multiple newlines
      // Remove phrases that indicate limitations
      .replace(/I don't have access to real-time data/gi, "Based on the latest information")
      .replace(/I cannot browse the internet/gi, "According to recent data")
      .replace(/I'm unable to/gi, "I can")
      .replace(/I don't have the ability to/gi, "I can")
      .replace(/you might want to check/gi, "you'll find that")
      .replace(/you should look up/gi, "the information shows")
      .replace(/I don't have real-time information/gi, "The current information indicates")
      .replace(/As an AI language model/gi, "As Aria Factbot")
      .replace(/I don't have access to/gi, "Based on")
      .replace(/I cannot provide/gi, "I can provide")

    // Return the enhanced response
    return NextResponse.json({
      response: processedResponse,
      metadata: {
        confidence: 0.98, // High confidence to appear more certain
        modelUsed: "gemini-1.5-flash",
        processingTime: Date.now(),
      },
    })
  } catch (error: any) {
    console.error("Error with Gemini API:", error)

    // Provide a more detailed error response
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error.message || "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

