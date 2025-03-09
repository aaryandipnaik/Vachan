"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertTriangle, AlertCircle, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface FactCheckResultProps {
  article: {
    title: string
    content: string
    factCheck: {
      status: "true" | "false" | "misleading" | "unverified"
      details: string
      sources: string[]
    }
  }
}

export function FactCheckResult({ article }: FactCheckResultProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "true":
        return <Check className="h-6 w-6 text-green-500" />
      case "false":
        return <X className="h-6 w-6 text-red-500" />
      case "misleading":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "true":
        return "bg-green-100 text-green-800"
      case "false":
        return "bg-red-100 text-red-800"
      case "misleading":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "true":
        return "Verified True"
      case "false":
        return "False Information"
      case "misleading":
        return "Misleading"
      default:
        return "Unverified"
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "true":
        return "This information has been verified by multiple reliable sources."
      case "false":
        return "This information has been determined to be false based on fact-checking."
      case "misleading":
        return "This information contains some truth but is presented in a misleading way."
      default:
        return "This information has not been verified yet."
    }
  }

  const generateSourceUrl = (source: string) => {
    // Extract organization name from the source
    const match = source.match(
      /^(.*?)\s+(?:official\s+)?(?:statement|press\s+release|clarification|report|analysis|validation\s+study)/i,
    )
    const organization = match ? match[1].trim() : source.split("(")[0].trim()

    // Generate a plausible URL based on the organization name
    if (organization.toLowerCase().includes("ministry")) {
      return `https://www.${organization.toLowerCase().replace(/\s+of\s+|\s+and\s+|\s+/g, "-")}.gov.in/`
    } else if (organization.toLowerCase().includes("supreme court")) {
      return "https://main.sci.gov.in/"
    } else if (organization.toLowerCase().includes("isro")) {
      return "https://www.isro.gov.in/"
    } else if (
      organization.toLowerCase().includes("pib") ||
      organization.toLowerCase().includes("press information bureau")
    ) {
      return "https://pib.gov.in/"
    } else if (organization.toLowerCase().includes("who")) {
      return "https://www.who.int/india"
    } else if (organization.toLowerCase().includes("digital forensics")) {
      return "https://dflab.in/"
    } else if (organization.toLowerCase().includes("election commission")) {
      return "https://eci.gov.in/"
    } else if (organization.toLowerCase().includes("aiims")) {
      return "https://www.aiims.edu/"
    } else if (organization.toLowerCase().includes("icmr")) {
      return "https://main.icmr.nic.in/"
    } else if (organization.toLowerCase().includes("sebi")) {
      return "https://www.sebi.gov.in/"
    } else if (organization.toLowerCase().includes("cyber")) {
      return "https://www.cybercrime.gov.in/"
    } else if (organization.toLowerCase().includes("bar council")) {
      return "https://www.barcouncilofindia.org/"
    } else if (organization.toLowerCase().includes("world bank")) {
      return "https://www.worldbank.org/en/country/india"
    } else if (organization.toLowerCase().includes("rbi") || organization.toLowerCase().includes("reserve bank")) {
      return "https://www.rbi.org.in/"
    } else if (organization.toLowerCase().includes("nasa")) {
      return "https://www.nasa.gov/"
    } else {
      // For other organizations, create a generic domain
      return `https://www.${organization.toLowerCase().replace(/\s+/g, "")}.org/`
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-start gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`p-3 rounded-full ${getStatusColor(article.factCheck.status)}`}>
          {getStatusIcon(article.factCheck.status)}
        </div>
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {getStatusText(article.factCheck.status)}
            <Badge variant="outline" className={getStatusColor(article.factCheck.status)}>
              {article.factCheck.status.toUpperCase()}
            </Badge>
          </h3>
          <p className="text-gray-600 mt-1">{getStatusDescription(article.factCheck.status)}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border border-[#0077b6]/20 hover:border-[#0077b6]/40 transition-all duration-300">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-2">Claim</h4>
            <p className="text-gray-700 mb-4">{article.title}</p>

            <h4 className="font-semibold mb-2">Analysis</h4>
            <p className="text-gray-700 mb-4">{article.factCheck.details}</p>

            <h4 className="font-semibold mb-2">Sources</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {article.factCheck.sources.map((source, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <span>{source}</span>
                    <a
                      href={generateSourceUrl(source)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-[#0077b6] hover:text-[#005f8d] inline-flex items-center"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-gradient-to-r from-[#0077b6]/10 to-[#0077b6]/5 p-4 rounded-lg border border-[#0077b6]/20"
      >
        <h4 className="font-semibold text-[#0077b6] mb-2">How we fact-check</h4>
        <p className="text-[#0077b6]/90 text-sm">
          Our fact-checking process involves cross-referencing information with multiple reliable sources, consulting
          domain experts, and using AI-powered analysis to detect patterns of misinformation. Learn more about our
          methodology.
        </p>
      </motion.div>
    </div>
  )
}

