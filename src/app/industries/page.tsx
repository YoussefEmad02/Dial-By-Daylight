"use client"

import { useState } from "react"
import { Building, Users, Target, TrendingUp, CheckCircle, ArrowRight, Star, Globe, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function IndustriesPage() {
  const [activeIndustry, setActiveIndustry] = useState("real-estate")

  const industries = [
    {
      id: "real-estate",
      title: "Real Estate",
      description: "Comprehensive outbound solutions for real estate professionals and agencies.",
      icon: Building,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      features: [
        "Lead Generation for Property Sales",
        "Appointment Setting for Showings",
        "Follow-up Campaigns",
        "Market Research & Analysis",
        "CRM Integration",
        "Performance Tracking",
      ],
      stats: {
        clients: "50+",
        appointments: "500+",
        conversion: "15%",
      },
    },
    {
      id: "high-ticket-services",
      title: "High-Ticket Services",
      description: "Premium appointment setting and lead generation for high-value service providers.",
      icon: Star,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      features: [
        "Qualified Lead Generation",
        "High-Value Appointment Setting",
        "Consultation Booking",
        "Client Qualification",
        "Sales Pipeline Support",
        "ROI Tracking",
      ],
      stats: {
        clients: "30+",
        appointments: "200+",
        conversion: "25%",
      },
    },
    {
      id: "b2b-lead-generation",
      title: "B2B Lead Generation",
      description: "Strategic B2B outbound solutions to expand your business network and client base.",
      icon: Target,
      color: "green",
      gradient: "from-green-500 to-green-600",
      features: [
        "B2B Prospecting",
        "Decision Maker Outreach",
        "Meeting Scheduling",
        "Lead Qualification",
        "Account Research",
        "Pipeline Development",
      ],
      stats: {
        clients: "40+",
        appointments: "300+",
        conversion: "20%",
      },
    },
  ]

  const benefits = [
    {
      icon: Users,
      title: "Industry Expertise",
      description: "Our team understands the unique challenges and opportunities in each industry we serve.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Track record of success with measurable outcomes and satisfied clients across industries.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access to diverse talent pools and market insights from around the world.",
    },
    {
      icon: Zap,
      title: "Fast Implementation",
      description: "Quick setup and deployment to get your outbound operations running efficiently.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Industries We Serve</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Specialized outbound solutions tailored to the unique needs of different industries
            </p>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed">
              We understand that each industry has its own challenges, opportunities, and requirements. Our specialized
              teams are trained to deliver results that matter for your specific business vertical.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {industries.map((industry) => (
              <Button
                key={industry.id}
                variant={activeIndustry === industry.id ? "default" : "outline"}
                onClick={() => setActiveIndustry(industry.id)}
                className={`px-6 py-3 ${
                  activeIndustry === industry.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <industry.icon className="w-5 h-5 mr-2" />
                {industry.title}
              </Button>
            ))}
          </div>

          {/* Active Industry Content */}
          {industries.map((industry) => (
            <div key={industry.id} className={activeIndustry === industry.id ? "block" : "hidden"}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${industry.gradient} flex items-center justify-center shadow-lg mr-4`}
                    >
                      <industry.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{industry.title}</h2>
                      <p className="text-gray-600">{industry.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{industry.stats.clients}</div>
                      <div className="text-sm text-gray-600">Active Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{industry.stats.appointments}</div>
                      <div className="text-sm text-gray-600">Appointments Set</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{industry.stats.conversion}</div>
                      <div className="text-sm text-gray-600">Avg. Conversion</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Key Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {industry.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link href="/contact">
                      <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                        Get Started <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <Card className="border-0 shadow-xl">
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Success Story</h3>
                        <p className="text-gray-600 text-sm">Real results from our {industry.title} clients</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <span className="text-gray-700">Monthly Appointments</span>
                          <span className="font-semibold text-blue-600">150+</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <span className="text-gray-700">Conversion Rate</span>
                          <span className="font-semibold text-green-600">{industry.stats.conversion}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                          <span className="text-gray-700">ROI Improvement</span>
                          <span className="font-semibold text-purple-600">300%</span>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 italic">
                          "Dial By Daylight transformed our outbound operations. Their specialized approach for our
                          industry has delivered exceptional results."
                        </p>
                        <p className="text-xs text-gray-500 mt-2">- Industry Client</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Industry Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring specialized expertise and proven methodologies to every industry we serve
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Scale Your Industry Operations?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Let our specialized teams help you achieve industry-specific goals with our tailored outbound solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Start Your Project
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 bg-transparent"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
