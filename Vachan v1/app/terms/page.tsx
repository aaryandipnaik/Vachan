import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Terms of Service</CardTitle>
              <CardDescription>Last updated: March 8, 2025</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>Welcome to Vachan. These Terms of Service govern your use of our website and services.</p>

              <h3>Project Information</h3>
              <p>This project was created for the Hakoona Matata Hackathon hosted by IIIT Kottayam.</p>

              <h3>Use of Service</h3>
              <p>
                Our service provides fact-checking and translation features for news articles. The information provided
                is for educational purposes only and should not be considered as professional advice.
              </p>

              <h3>Content Accuracy</h3>
              <p>
                While we strive to ensure the accuracy of our fact-checking, we cannot guarantee that all information is
                100% accurate. Users should verify information from multiple sources before making decisions based on
                the content.
              </p>

              <h3>User Responsibilities</h3>
              <p>
                Users are responsible for their use of our service and must comply with all applicable laws and
                regulations. Users must not use our service for any illegal or unauthorized purpose.
              </p>

              <h3>Intellectual Property</h3>
              <p>
                All content on this website, including text, graphics, logos, and software, is the property of Vachan or
                its content suppliers and is protected by intellectual property laws.
              </p>

              <h3>Third-Party Links</h3>
              <p>
                Our service may contain links to third-party websites. We are not responsible for the content or
                practices of these websites and encourage users to review their terms and privacy policies.
              </p>

              <h3>Limitation of Liability</h3>
              <p>
                Vachan shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from your use of or inability to use the service.
              </p>

              <h3>Changes to Terms</h3>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the service after changes
                constitutes acceptance of the new terms.
              </p>

              <h3>Contact Information</h3>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <ul>
                <li>Phone: 9773934134, 8148822706</li>
                <li>
                  Email:{" "}
                  <a href="mailto:vxchxn@gmail.com" className="text-primary hover:underline">
                    vxchxn@gmail.com
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

