"use client"

import { useState, useEffect } from "react"
import { VachanLogo } from "@/components/vachan-logo"
import { Button } from "@/components/ui/button"
import { NewsCard } from "@/components/news-card"
import { MoonIcon, SunIcon, ArrowLeft, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SavedArticlesPage() {
  const [savedArticles, setSavedArticles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()
  const { toast } = useToast()

  // Initialize database tables
  useEffect(() => {
    const initDb = async () => {
      try {
        await fetch("/api/db-setup")
      } catch (error) {
        console.error("Error initializing database:", error)
      }
    }

    initDb()
  }, [])

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          // Redirect to home if not logged in
          router.push("/")
          return
        }

        // Fetch saved articles from Supabase
        const { data, error } = await supabase.from("saved_articles").select("*").eq("user_id", user.id)

        // Handle table not existing error
        if (error && error.code === "42P01") {
          toast({
            title: "Database setup required",
            description: "Please run the SQL setup script in the Supabase dashboard.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        if (error && error.code !== "42P01") {
          console.error("Error fetching saved articles:", error)
          toast({
            title: "Error",
            description: "Failed to load saved articles. Please try again.",
            variant: "destructive",
          })
          throw error
        }

        // If we have data, set it to state
        if (data && data.length > 0) {
          // Make sure we're extracting the article data correctly
          const articles = data
            .map((item) => {
              // Check if article_data is a string that needs parsing
              if (typeof item.article_data === "string") {
                try {
                  return JSON.parse(item.article_data)
                } catch (e) {
                  console.error("Error parsing article data:", e)
                  return null
                }
              }
              // Otherwise, it's already an object
              return item.article_data
            })
            .filter(Boolean) // Remove any null values

          setSavedArticles(articles)
        } else {
          setSavedArticles([])
        }
      } catch (error) {
        console.error("Error fetching saved articles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedArticles()
  }, [router, toast])

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <VachanLogo />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold mt-4">Saved Articles</h1>
          <p className="text-muted-foreground mt-1">Articles you've saved for later reading</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Card className="w-full max-w-md p-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-center">Loading Saved Articles</CardTitle>
                <CardDescription className="text-center">
                  Please wait while we fetch your saved articles
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </CardContent>
            </Card>
          </div>
        ) : savedArticles.length > 0 ? (
          <div className="space-y-6">
            {savedArticles.map((article, index) => (
              <NewsCard key={`saved-${index}`} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <Card className="w-full max-w-md mx-auto p-6">
              <CardHeader className="pb-2">
                <CardTitle>No Saved Articles</CardTitle>
                <CardDescription>You haven't saved any articles yet.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button onClick={() => router.push("/")}>Browse Articles</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2025 Vachan. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="/privacy" className="text-muted-foreground hover:text-primary text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-primary text-sm">
                Terms of Service
              </a>
              <a href="/contact" className="text-muted-foreground hover:text-primary text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

