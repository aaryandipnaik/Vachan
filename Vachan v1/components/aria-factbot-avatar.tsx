"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AriaFactbotAvatarProps {
  size?: "sm" | "md" | "lg" | "xl"
  withGradient?: boolean
  className?: string
}

export function AriaFactbotAvatar({ size = "md", withGradient = false, className }: AriaFactbotAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-24 w-24",
    xl: "h-64 w-64 md:h-80 md:w-80",
  }

  return (
    <div className={cn("relative rounded-full overflow-hidden", sizeClasses[size], className)}>
      {withGradient && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0077b6] to-[#00a8e8] rounded-full"
          initial={{ opacity: 0.8 }}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      )}
      <div className={cn("relative z-10", withGradient ? "p-1" : "")}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34znOeyMZrqmyM7rJXw6glPj-image-maker-8YVVXSm6Wn1VCyPi7JYk0l81GAHldl.png"
          alt="Aria Factbot"
          width={size === "xl" ? 320 : size === "lg" ? 96 : size === "md" ? 48 : 32}
          height={size === "xl" ? 320 : size === "lg" ? 96 : size === "md" ? 48 : 32}
          className="rounded-full"
          priority
        />
      </div>
    </div>
  )
}

