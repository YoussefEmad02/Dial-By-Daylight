"use client"

import Image from "next/image"
import { Target, Eye, Zap, Globe, Award, Users, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  const processSteps = [
    { step: "01", title: "Voice Screening", icon: "🎤" },
    { step: "02", title: "Interview Process", icon: "💬" },
    { step: "03", title: "Comprehensive Training", icon: "📚" },
    { step: "04", title: "Performance Audition", icon: "🎯" },
  ]

  const companyValues = [
    {
      icon: Zap,
      title: "Lean Operations",
      description: "We move fast and keep operations streamlined for maximum efficiency.",
      color: "blue",
    },
    {
      icon: Globe,
      title: "Global Talent",
      description: "Access to world-class talent with startup speed and agility.",
      color: "green",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Quality-first approach with rigorous training and selection processes.",
      color: "purple",
    },
    {
      icon: Target,
      title: "Results Oriented",
      description: "Focused on real output: qualified appointments and consistent performance.",
      color: "orange",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 text-sm font-medium">
              🇪🇬 Founded in Egypt • Serving Worldwide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Dial By Daylight</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Dial By Daylight is a remote-first BPO founded in Egypt, providing trained, English-fluent cold callers and appointment setters to growing businesses across North America.
            </p>
          </div>
        </div>
      </section>

      {/* Company Image */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=500&width=1200"
              alt="Dial By Daylight Remote Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Remote-First BPO</h3>
              <p className="text-lg opacity-90">Connecting global talent with North American businesses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To empower businesses with cost-effective, high-performance outbound teams — built fast, managed well, and driven by results. We believe the future of outsourcing is lean, global, and quality-first. Our mission is to bring that future to life — one cold call at a time.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become the go-to outbound team for modern businesses — blending global talent with startup speed, operational discipline, and ruthless execution. We envision a world where remote voice agents are more trusted, trained, and effective than in-house teams — and we're building the systems to make that happen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Edge */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Edge</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We move fast. We keep it lean. And we care more about real output — qualified appointments, booked calls, consistent performance — than fancy dashboards or bloated call center fluff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <value.icon className={`w-8 h-8 text-${value.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Every agent goes through a tight funnel to ensure quality delivery under pressure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <div className="text-sm font-bold text-blue-600 mb-2">STEP {step.step}</div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Focus & Operations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Client Focus</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  We currently serve clients in real estate, high-ticket services, and B2B lead generation — with our main delivery partner being SmartSetter, a fast-growing platform in the recruiting space.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Real Estate</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">High-Ticket Services</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">B2B Lead Generation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Operational Excellence</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Our core team runs operations, recruitment, training, payroll, and dialer setup — all in-house. That gives us tight control over quality and speed, without adding layers of bureaucracy.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                    <span className="text-gray-600">Operations Management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                    <span className="text-gray-600">Recruitment & Training</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                    <span className="text-gray-600">Payroll & Dialer Setup</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Promise</h2>
          <p className="text-2xl mb-8 opacity-90 max-w-3xl mx-auto font-medium">If you're looking for offshore talent that feels in-house — that's us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-white/20 text-white border-white/30">
              🚀 Fast Setup
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-white/20 text-white border-white/30">
              🎯 Results-Driven
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-white/20 text-white border-white/30">
              🌍 Global Talent
            </Badge>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">English Fluent Agents</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Operations Coverage</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">3+</div>
              <div className="text-gray-600">Industries Served</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">Fast</div>
              <div className="text-gray-600">Setup & Deployment</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
