import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vachan - News Fact-Checker",
  description: "Verify trending news and social media content with fact-checking and translation features",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-vwYCY26Bdjp7R12TQWiL5j9sWlVw6h.png",
        sizes: "any",
      },
    ],
    apple: {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-vwYCY26Bdjp7R12TQWiL5j9sWlVw6h.png",
      type: "image/png",
    },
  },
  openGraph: {
    title: "Vachan - News Fact-Checker",
    description: "Verify trending news and social media content with fact-checking and translation features",
    url: "https://vachan.vercel.app",
    siteName: "Vachan",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-tIiKF3iqT2NGumpKF8SKIDnTExKf3Q.png",
        width: 1200,
        height: 2000,
        alt: "Vachan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'