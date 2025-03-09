"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AuthForm } from "@/components/auth/auth-form"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const handleSuccess = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <AuthForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}

