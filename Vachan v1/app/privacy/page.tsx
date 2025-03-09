import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
              <CardTitle className="text-2xl">Privacy Policy</CardTitle>
              <CardDescription>Last updated: March 8, 2025</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                At Vachan, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
                use, and safeguard your information when you use our website.
              </p>

              <h3>Information We Collect</h3>
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Personal Information:</strong> Name, email address, and phone number when you contact us.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our website, including pages visited and
                  time spent.
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, IP address, and device type.
                </li>
              </ul>

              <h3>How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our service</li>
                <li>Improve and personalize your experience</li>
                <li>Respond to your inquiries and provide support</li>
                <li>Monitor usage patterns and analyze trends</li>
              </ul>

              <h3>Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent.
              </p>

              <h3>Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of
                transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
                security.
              </p>

              <h3>Third-Party Services</h3>
              <p>
                We may use third-party services that collect, monitor, and analyze data to improve our service. These
                third parties have their own privacy policies addressing how they use such information.
              </p>

              <h3>Your Rights</h3>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to restrict or object to processing</li>
              </ul>

              <h3>Changes to This Privacy Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h3>Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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

