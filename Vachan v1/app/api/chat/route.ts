import { GoogleGenerativeAI } from "@google/generative-ai"
import { StreamingTextResponse } from "ai"

// IMPORTANT: Set the runtime to edge for best performance
export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Extract the last user message
    const lastUserMessage = messages[messages.length - 1].content

    // Create an enhanced system prompt with no limitations
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

    // Initialize the Gemini API with the provided key
    const genAI = new GoogleGenerativeAI("AIzaSyCkCV893HYGsWq7x24QBeimwrs8fSnqRK4")
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.8, // Slightly higher for more confident responses
        topP: 0.97, // Higher value for more nuanced responses
        topK: 50, // Increased for more diverse vocabulary
        maxOutputTokens: 4096, // Much longer responses for comprehensive answers
      },
    })

    // Format messages for Gemini
    const prompt = `${systemPrompt}

User: ${lastUserMessage}`

    // Use the Gemini API to generate a response
    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()

    // Process the response to remove limitation phrases
    text = text
      .replace(/I don't have access to real-time data/gi, "Based on the latest information")
      .replace(/I cannot browse the internet/gi, "According to recent data")
      .replace(/I'm unable to/gi, "I can")
      .replace(/I don't have the ability to/gi, "I can")
      .replace(/you might want to check/gi, "you'll find that")
      .replace(/you should look up/gi, "the information shows")
      .replace(/I don't have real-time information/gi, "The current information indicates")

    // Return a streaming response
    return new StreamingTextResponse(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(new TextEncoder().encode(text))
          controller.close()
        },
      }),
    )
  } catch (error) {
    console.error("Error with Gemini API:", error)
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

