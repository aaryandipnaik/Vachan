"use client"

import { useState, useEffect, useCallback } from "react"
import { NewsCard } from "@/components/news-card"
import { NewsFilters } from "@/components/news-filters"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getRandomArticles,
  fetchNewsFromAPI,
  fetchIndianNewsFromAPI,
  getArticlesByFactCheckStatus,
  filterArticles,
} from "@/lib/news-data"
import { MoonIcon, SunIcon, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { ReadabilitySettings } from "@/components/readability-settings"
import { EnhancedChatbot } from "@/components/enhanced-chatbot"
import { AuthButton } from "@/components/auth/auth-button"
import { VachanLogo } from "@/components/vachan-logo"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { motion } from "framer-motion"
import { ReaderModeToggle } from "@/components/reader-mode-toggle"

// Cursor tracking component for main page
const MainPageCursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className={`absolute rounded-full blur-3xl ${resolvedTheme === "dark" ? "bg-[#0077b6]/10" : "bg-[#0077b6]/20"}`}
        style={{
          width: 150,
          height: 150,
          left: mousePosition.x - 75,
          top: mousePosition.y - 75,
          transition: "left 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />
    </div>
  )
}

export default function MainPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [apiArticles, setApiArticles] = useState<any[]>([])
  const [indianArticles, setIndianArticles] = useState<any[]>([])
  const [verifiedArticles, setVerifiedArticles] = useState<any[]>([])
  const [falseArticles, setFalseArticles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { resolvedTheme, setTheme } = useTheme()
  const [readabilityOpen, setReadabilityOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    sources: [] as string[],
    factCheckStatus: [] as string[],
    date: undefined as Date | undefined,
  })
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Show a notification about database setup
    toast({
      title: "Database Setup",
      description: "If you encounter database errors, please run the SQL setup script in the Supabase dashboard.",
      duration: 6000,
    })

    // Get random articles from our dataset
    setArticles(getRandomArticles(10))

    // Get verified articles
    setVerifiedArticles(getArticlesByFactCheckStatus("true"))

    // Get false articles
    setFalseArticles(getArticlesByFactCheckStatus("false"))

    // Fetch articles from News API (World)
    fetchWorldNews()

    // Fetch articles from Indian News API
    fetchIndianNews()
  }, [toast])

  // Add these functions for fetching news
  const fetchWorldNews = useCallback(async () => {
    setIsLoading(true)
    try {
      // In a real app, you would use your API key
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=5d1f2dfa7c574aab81580d0c72892a8e",
      )
      const data = await response.json()

      if (data.status === "ok" && data.articles) {
        // Transform the data to match our expected format
        const formattedArticles = data.articles.map((article) => ({
          title: article.title || "Untitled",
          content: article.description || article.content || "No content available",
          source: article.source?.name || "Unknown Source",
          sourceUrl: article.url,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          author: article.author,
          // Add default factCheck for API articles
          factCheck: {
            status: "unverified",
            details: "This article has been sourced from a news API and has not been fact-checked by our system yet.",
            sources: [article.source?.name || "Unknown Source"],
          },
        }))

        setApiArticles(formattedArticles)
      } else {
        // If API fails, fall back to mock data
        const newsData = await fetchNewsFromAPI()
        setApiArticles(newsData)
      }
    } catch (error) {
      console.error("Error fetching world news:", error)
      // Fall back to mock data
      const newsData = await fetchNewsFromAPI()
      setApiArticles(newsData)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchIndianNews = useCallback(async () => {
    setIsLoading(true)
    try {
      // In a real app, you would use your API key
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=5d1f2dfa7c574aab81580d0c72892a8e",
      )
      const data = await response.json()

      if (data.status === "ok" && data.articles) {
        // Transform the data to match our expected format
        const formattedArticles = data.articles.map((article) => ({
          title: article.title || "Untitled",
          content: article.description || article.content || "No content available",
          source: article.source?.name || "Unknown Source",
          sourceUrl: article.url,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          author: article.author,
          // Add default factCheck for API articles
          factCheck: {
            status: "unverified",
            details: "This article has been sourced from a news API and has not been fact-checked by our system yet.",
            sources: [article.source?.name || "Unknown Source"],
          },
        }))

        setIndianArticles(formattedArticles)
      } else {
        // If API fails, fall back to mock data
        const newsData = await fetchIndianNewsFromAPI()
        setIndianArticles(newsData)
      }
    } catch (error) {
      console.error("Error fetching Indian news:", error)
      // Fall back to mock data
      const newsData = await fetchIndianNewsFromAPI()
      setIndianArticles(newsData)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Handle filter changes
  const handleFilterChange = (filters: {
    sources: string[]
    factCheckStatus: string[]
    date: Date | undefined
  }) => {
    console.log("Applying filters:", filters)
    setActiveFilters(filters)
  }

  // Open translation extension page
  const openTranslationExtension = () => {
    window.open(
      "https://chromewebstore.google.com/detail/immersive-translate-trans/bpoadfkcbjbfhfodiogcnhhhpibjhbnh?hl=en",
      "_blank",
    )
  }

  return (
    <div
      className={`min-h-screen ${
        resolvedTheme === "dark"
          ? "bg-gradient-to-br from-[#001a2c] via-background to-[#001a2c]"
          : "bg-gradient-to-br from-[#e6f4ff] via-background to-[#e6f4ff]"
      }`}
    >
      <MainPageCursorEffect />

      <header className="glass border-b border-border sticky top-0 z-10 backdrop-blur-md bg-background/70">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative overflow-hidden">
          <Link href="/landing">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <VachanLogo />
            </motion.div>
          </Link>
          <div className="flex items-center gap-4">
            <AuthButton />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="transition-transform duration-200"
              >
                {resolvedTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            </motion.div>
            <ReaderModeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReadabilityOpen(true)}
                className="transition-all duration-200 hover:bg-background/10 hover:shadow-sm border-[#0077b6]/30 hover:border-[#0077b6]/60"
              >
                Readability
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={openTranslationExtension}
                className="transition-all duration-200 hover:bg-background/10 hover:shadow-sm border-[#0077b6]/30 hover:border-[#0077b6]/60"
              >
                <Globe className="mr-1 h-4 w-4" /> Translate
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/chat")}
                className="transition-all duration-200 hover:bg-background/10 hover:shadow-sm border-[#0077b6]/30 hover:border-[#0077b6]/60"
              >
                Aria Factbot
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Tabs defaultValue="trending">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <TabsList className="bg-[#0077b6]/10 p-1 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0077b6]/5 to-transparent"
                  animate={{
                    x: [0, 100, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                {["trending", "latest", "verified", "false", "indian", "world"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg-[#0077b6] data-[state=active]:text-white transition-all duration-200 relative group z-10"
                  >
                    {tab === "trending" && (
                      <motion.span
                        className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-70"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                    <span className="capitalize">{tab}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <NewsFilters onFilterChange={handleFilterChange} activeFilters={activeFilters} />
            </div>

            <TabsContent value="trending" className="space-y-6 transition-all duration-300 animate-in fade-in-50">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077b6]"></div>
                </div>
              ) : filterArticles(articles, activeFilters).length > 0 ? (
                filterArticles(articles, activeFilters).map((article, index) => (
                  <motion.div
                    key={`trending-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No articles match your filters. Try adjusting your criteria.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="latest" className="space-y-6 transition-all duration-300 animate-in fade-in-50">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077b6]"></div>
                </div>
              ) : (
                <>
                  {filterArticles(
                    [...articles].sort((a, b) => {
                      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
                      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
                      return dateB - dateA // Sort in descending order (newest first)
                    }),
                    activeFilters,
                  ).length > 0 ? (
                    filterArticles(
                      [...articles].sort((a, b) => {
                        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
                        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
                        return dateB - dateA // Sort in descending order (newest first)
                      }),
                      activeFilters,
                    ).map((article, index) => (
                      <motion.div
                        key={`latest-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <NewsCard article={article} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">
                        No articles match your filters. Try adjusting your criteria.
                      </p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="verified" className="space-y-6 transition-all duration-300 animate-in fade-in-50">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077b6]"></div>
                </div>
              ) : filterArticles(verifiedArticles, activeFilters).length > 0 ? (
                filterArticles(verifiedArticles, activeFilters).map((article, index) => (
                  <motion.div
                    key={`verified-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    No verified articles match your filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="false" className="space-y-6 transition-all duration-300 animate-in fade-in-50">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077b6]"></div>
                </div>
              ) : filterArticles(falseArticles, activeFilters).length > 0 ? (
                filterArticles(falseArticles, activeFilters).map((article, index) => (
                  <motion.div
                    key={`false-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    No false information articles match your filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="indian" className="space-y-6 transition-all duration-300 animate-in fade-in-50">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077b6]"></div>
                </div>
              ) : filterArticles(indianArticles, activeFilters).length > 0 ? (
                filterArticles(indianArticles, activeFilters).map((article, index) => (
                  <motion.div
                    key={`indian-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <NewsCard article={article} isApiArticle />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    No Indian news articles match your filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="world" className="space-y-6 transition-all duration-300 animate-in fade-in-50">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077b6]"></div>
                </div>
              ) : filterArticles(apiArticles, activeFilters).length > 0 ? (
                filterArticles(apiArticles, activeFilters).map((article, index) => (
                  <motion.div
                    key={`world-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <NewsCard article={article} isApiArticle />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    No world news articles match your filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2025 Vachan. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="/privacy"
                className="text-muted-foreground hover:text-[#0077b6] transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-[#0077b6] transition-colors duration-200 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="text-muted-foreground hover:text-[#0077b6] transition-colors duration-200 text-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>About Vachan</p>
            <p className="mt-1">
              Vachan is a cutting-edge fact-checking platform designed to combat misinformation in the digital age.
              Project created for Hakoona Matata Hackathon hosted by IIIT Kottayam.
            </p>
          </div>
        </div>
      </footer>

      <ReadabilitySettings open={readabilityOpen} onOpenChange={setReadabilityOpen} />
      <EnhancedChatbot />
    </div>
  )
}

