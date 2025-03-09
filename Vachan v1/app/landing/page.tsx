"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VachanLogo } from "@/components/vachan-logo"
import { MoonIcon, SunIcon, ArrowRight, Shield, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AriaFactbotAvatar } from "@/components/aria-factbot-avatar"

// Sample data for line chart
const lineData = [
  { name: "Jan", verified: 65, false: 28, misleading: 15 },
  { name: "Feb", verified: 59, false: 48, misleading: 20 },
  { name: "Mar", verified: 80, false: 40, misleading: 25 },
  { name: "Apr", verified: 81, false: 47, misleading: 18 },
  { name: "May", verified: 56, false: 65, misleading: 30 },
  { name: "Jun", verified: 55, false: 58, misleading: 12 },
  { name: "Jul", verified: 40, false: 44, misleading: 35 },
]

// Enhanced cursor tracking with trail effect
const CursorTrackingEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([])
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)

      // Add current position to trail
      setTrailPositions((prev) => {
        const newTrail = [...prev, newPosition]
        // Keep only the last 5 positions for the trail
        if (newTrail.length > 5) {
          return newTrail.slice(newTrail.length - 5)
        }
        return newTrail
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main cursor blob */}
      <motion.div
        className={`absolute rounded-full blur-3xl ${resolvedTheme === "dark" ? "bg-[#0077b6]/20" : "bg-[#0077b6]/30"}`}
        style={{
          width: 180,
          height: 180,
          left: mousePosition.x - 90,
          top: mousePosition.y - 90,
          transition: "left 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />

      {/* Trail effect */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${
            resolvedTheme === "dark" ? "bg-[#0077b6]/10" : "bg-[#0077b6]/20"
          }`}
          style={{
            width: 120 - index * 20,
            height: 120 - index * 20,
            left: pos.x - (60 - index * 10),
            top: pos.y - (60 - index * 10),
            opacity: 0.8 - index * 0.15,
          }}
        />
      ))}

      {/* Background animated elements */}
      <motion.div
        className={`absolute w-64 h-64 rounded-full blur-3xl ${
          resolvedTheme === "dark" ? "bg-[#0077b6]/10" : "bg-[#0077b6]/15"
        }`}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          left: `${mousePosition.x / 8}px`,
          top: `${mousePosition.y / 8}px`,
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />
      <motion.div
        className={`absolute w-80 h-80 rounded-full blur-3xl ${
          resolvedTheme === "dark" ? "bg-[#0077b6]/10" : "bg-[#0077b6]/15"
        }`}
        animate={{
          x: [0, -70, 70, 0],
          y: [0, 70, -70, 0],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          right: `${(window.innerWidth - mousePosition.x) / 10}px`,
          bottom: `${(window.innerHeight - mousePosition.y) / 10}px`,
          transition: "right 0.4s ease-out, bottom 0.4s ease-out",
        }}
      />
    </div>
  )
}

// 3D Text Effect Component
const AnimatedText = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate mouse position relative to the element
    const mouseX = (e.clientX - rect.left) / width - 0.5
    const mouseY = (e.clientY - rect.top) / height - 0.5

    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
        <div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#0077b6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "translateZ(-10px)" }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function LandingPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`min-h-screen overflow-hidden ${
        resolvedTheme === "dark"
          ? "bg-gradient-to-br from-[#001a2c] via-background to-[#001a2c]"
          : "bg-gradient-to-br from-[#e6f4ff] via-background to-[#e6f4ff]"
      }`}
    >
      <CursorTrackingEffect />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <VachanLogo />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="transition-transform hover:scale-110 duration-200"
            >
              {resolvedTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            <Link href="/auth">
              <Button className="bg-[#0077b6] hover:bg-[#005f8d] transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="mb-8 flex justify-center"
          >
            <div className="scale-[1.8]">
              <VachanLogo />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <AnimatedText className="group">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transform transition-transform duration-300 hover:scale-[1.02]">
                Verify News with Confidence
              </h1>
            </AnimatedText>
            <p className="text-xl text-muted-foreground mb-2">
              Your trusted platform for fact-checking news and social media content
            </p>
            <p className="text-sm text-[#0077b6] mb-8 font-medium">Verify now with Aria Factbot</p>
            <div className="flex justify-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="gap-2 bg-[#0077b6] hover:bg-[#005f8d] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:translate-y-[-3px]"
                >
                  Start Fact-Checking Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedText>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-4 transform transition-transform duration-300 hover:scale-[1.05]"
              >
                Key Features
              </motion.h2>
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-[#0077b6]" />}
              title="Advanced Fact-Checking"
              description="AI-powered analysis to identify misinformation and verify facts from multiple sources."
            />
            <FeatureCard
              icon={<AriaFactbotAvatar size="sm" />}
              title="Aria Factbot"
              description="Chat with our intelligent assistant to verify information or learn about fact-checking."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-[#0077b6]" />}
              title="Multilingual Support"
              description="Translate and fact-check content in 8+ Indian languages."
            />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedText>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12 transform transition-transform duration-300 hover:scale-[1.05]"
            >
              Fact-Checking Analytics
            </motion.h2>
          </AnimatedText>

          <Card className="p-6 relative overflow-hidden bg-card/50 backdrop-blur-sm border border-[#0077b6]/20 hover:border-[#0077b6]/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0077b6]/5 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-6 text-center">Monthly Fact-Check Results</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "none",
                        borderRadius: "4px",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="verified"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                    />
                    <Line
                      type="monotone"
                      dataKey="false"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                      animationBegin={300}
                    />
                    <Line
                      type="monotone"
                      dataKey="misleading"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                      animationBegin={600}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                  <span className="text-sm">Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <span className="text-sm">False</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                  <span className="text-sm">Misleading</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <AnimatedText>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6 transform transition-transform duration-300 hover:scale-[1.05]"
            >
              Ready to Fight Misinformation?
            </motion.h2>
          </AnimatedText>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of users who rely on Vachan to verify information and make informed decisions.
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              className="gap-2 bg-[#0077b6] hover:bg-[#005f8d] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:translate-y-[-3px]"
            >
              Start Fact-Checking Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedText>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-4 text-center transform transition-transform duration-300 hover:scale-[1.05]"
              >
                About Vachan
              </motion.h2>
            </AnimatedText>
            <p className="text-center mb-6">
              Vachan is a cutting-edge fact-checking platform designed to combat misinformation in the digital age. Our
              mission is to empower users with the tools and knowledge to verify information and make informed
              decisions.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              This project was created for the Hakoona Matata Hackathon hosted by IIIT Kottayam.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4">
              <VachanLogo />
              <span className="text-sm text-muted-foreground">© 2025 Vachan</span>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/main" className="text-muted-foreground hover:text-[#0077b6] transition-colors duration-200">
                Home
              </Link>
              <Link href="/chat" className="text-muted-foreground hover:text-[#0077b6] transition-colors duration-200">
                Aria Factbot
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-[#0077b6] transition-colors duration-200"
              >
                Contact
              </Link>
              <a
                href="mailto:vxchxn@gmail.com"
                className="text-muted-foreground hover:text-[#0077b6] transition-colors duration-200"
                aria-label="Email us"
              >
                vxchxn@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 bg-card/50 backdrop-blur-sm border border-[#0077b6]/20 hover:border-[#0077b6]/40">
        <CardContent className="p-6 text-center">
          <div className="mb-4 flex justify-center transition-transform duration-300 hover:scale-110">{icon}</div>
          <AnimatedText>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
          </AnimatedText>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

