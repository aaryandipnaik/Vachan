"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import { LogOut, UserIcon, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [updating, setUpdating] = useState(false)
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
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        setUser(data.user)

        if (data.user) {
          try {
            // First, ensure the table exists by calling our setup endpoint
            await fetch("/api/db-setup")

            // Then try to get the profile
            const { data: profile, error } = await supabase
              .from("profiles")
              .select("display_name, phone_number")
              .eq("id", data.user.id)
              .single()

            if (profile) {
              setDisplayName(profile.display_name || "")
              setPhoneNumber(profile.phone_number || "")
            } else if (error) {
              // Check if the error is because the table doesn't exist
              if (error.code === "42P01") {
                console.error("Profiles table doesn't exist. Creating it now...")

                // Try to create the table using our SQL setup
                try {
                  const response = await fetch("/api/run-setup-sql", {
                    method: "POST",
                  })

                  if (response.ok) {
                    toast({
                      title: "Database setup complete",
                      description: "The profiles table has been created successfully.",
                    })

                    // Try to create a profile for the user
                    const { error: insertError } = await supabase.from("profiles").upsert({
                      id: data.user.id,
                      display_name: "",
                      phone_number: "",
                      updated_at: new Date().toISOString(),
                    })

                    if (!insertError) {
                      toast({
                        title: "Profile created",
                        description: "Your profile has been created successfully.",
                      })
                    }
                  } else {
                    toast({
                      title: "Database setup failed",
                      description: "Please contact support for assistance.",
                      variant: "destructive",
                    })
                  }
                } catch (setupError) {
                  console.error("Error setting up database:", setupError)
                  toast({
                    title: "Database setup failed",
                    description: "Please run the SQL setup script in the Supabase dashboard.",
                    variant: "destructive",
                  })
                }
              } else if (error.code !== "PGRST116") {
                // PGRST116 is "no rows returned" error, which is expected if user has no profile yet
                console.error("Error fetching profile:", error)
              }
            }
          } catch (error) {
            console.error("Error fetching profile:", error)
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [toast])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const updateProfile = async () => {
    if (!user) return

    setUpdating(true)
    try {
      // First, ensure the table exists by calling our setup endpoint
      await fetch("/api/db-setup")

      // Then try to upsert the profile
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        display_name: displayName,
        phone_number: phoneNumber,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
      setShowSettings(false)
    }
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Loading...
      </Button>
    )
  }

  if (!user) {
    return null
  }

  const initials = displayName
    ? displayName.substring(0, 2).toUpperCase()
    : user.email
      ? user.email.substring(0, 2).toUpperCase()
      : "U"

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowSettings(true)}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/chat")}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Aria Factbot</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
            <DialogDescription>Update your profile information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                type="tel"
              />
              <p className="text-xs text-muted-foreground">
                Your phone number will be used for account recovery and notifications
              </p>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email || ""} disabled />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={updateProfile} disabled={updating}>
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

