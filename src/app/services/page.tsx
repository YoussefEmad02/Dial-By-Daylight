"use client"

import { Phone, Headphones, Calendar, User, CheckCircle, Star, Users, Target, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Phone,
      title: "Cold Calling",
      description: "Professional outbound calling services to generate qualified leads and expand your customer base with targeted prospecting strategies.",
      features: [
        "Lead Generation & Qualification",
        "Market Research & Analysis",
        "Appointment Setting",
        "CRM Integration",
        "Performance Analytics",
        "Script Development",
      ],
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "24/7 comprehensive customer support services to enhance customer satisfaction and build lasting relationships with your clients.",
      features: [
        "Multi-channel Support",
        "Live Chat Integration",
        "Ticket Management",
        "Knowledge Base Creation",
        "Customer Feedback Analysis",
        "Quality Assurance",
      ],
      color: "green",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Calendar,
      title: "Appointment Setting",
      description: "Efficient appointment scheduling and management services to optimize your sales process and maximize conversion opportunities.",
      features: [
        "Calendar Management",
        "Automated Scheduling",
        "Reminder Systems",
        "Follow-up Coordination",
        "Meeting Preparation",
        "Conversion Tracking",
      ],
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: User,
      title: "Virtual Assisting",
      description: "Comprehensive virtual assistant services to handle administrative tasks and support your business operations efficiently.",
      features: [
        "Administrative Support",
        "Email Management",
        "Data Entry & Research",
        "Social Media Management",
        "Document Preparation",
        "Project Coordination",
      ],
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
    },
  ]

  const benefits = [
    {
      icon: Users,
      title: "Professional Team",
      description: "Experienced professionals dedicated to delivering exceptional results.",
    },
    {
      icon: Target,
      title: "Custom Solutions",
      description: "Tailored services designed to meet your specific business needs.",
    },
    {
      icon: Star,
      title: "Proven Results",
      description: "Track record of success with measurable outcomes and satisfied clients.",
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "Competitive pricing with excellent return on investment.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Professional Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Comprehensive business solutions designed to accelerate your growth and success</p>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed">
              We offer a complete range of professional services to help your business thrive in today's competitive market. Our expert team delivers customized solutions that drive results and exceed expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      Professional Service
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3">{service.title}</CardTitle>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Get Quote</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of partnering with our professional service team
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Let our expert team help you achieve your business goals with our comprehensive professional services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Request Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Successful Projects</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
