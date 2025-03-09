"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const ContactPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create mailto URL with pre-filled fields
      const subject = encodeURIComponent(`Vachan Contact Form: ${name}`)
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
      const mailtoUrl = `mailto:vxchxn@gmail.com?subject=${subject}&body=${body}`

      // Open the user's email client
      window.open(mailtoUrl, "_blank")

      // Show success message
      toast({
        title: "Email client opened",
        description: "Please send the email from your email client to complete your message submission.",
      })

      // Clear form
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at vxchxn@gmail.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4">
        We'd love to hear from you! Please feel free to reach out with any questions, feedback, or inquiries.
      </p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <a href="mailto:vxchxn@gmail.com" className="text-primary hover:underline">
            vxchxn@gmail.com
          </a>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border border-border max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background"
              placeholder="Your Message"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={isSubmitting} className="bg-[#0077b6] hover:bg-[#005f8d]">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactPage

