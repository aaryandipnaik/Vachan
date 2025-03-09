import Image from "next/image"

export function VachanLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vachan_logo-removebg-preview-PFNmb7D72iV4nuLVjLj4X4Opwdpc50.png"
        alt="Vachan Logo"
        width={120}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </div>
  )
}

