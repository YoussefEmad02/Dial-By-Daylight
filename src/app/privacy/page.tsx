"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              Dial By Daylight ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our website or use
              our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us, including:</p>
            <ul>
              <li>Name and contact information (email, phone number)</li>
              <li>Company information and job title</li>
              <li>Service preferences and requirements</li>
              <li>Communication history with our team</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain information, including:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
              <li>Device information and cookies</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information for various purposes:</p>
            <ul>
              <li>Providing and maintaining our services</li>
              <li>Communicating with you about our services</li>
              <li>Improving our website and user experience</li>
              <li>Processing payments and transactions</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except in the following circumstances:
            </p>
            <ul>
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and safety</li>
              <li>With trusted service providers who assist in our operations</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method of transmission over the internet is
              100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with relevant authorities</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience and analyze website
              traffic. You can control cookie settings through your browser preferences.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices
              of these external sites. We encourage you to review their privacy policies.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@dialbydaylight.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Business Street, Cairo, Egypt</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
