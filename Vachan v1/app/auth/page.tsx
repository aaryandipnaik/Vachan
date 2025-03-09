// Create a new auth page that redirects to main if already signed in
"use client"

import { useEffect, useState } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AuthPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        router.push("/main")
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSuccess = () => {
    router.push("/main")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <AuthForm onSuccess={handleSuccess} />
    </div>
  )
}

