"use client";

import { useState, useEffect, useRef } from "react";
import {
  Building,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Zap,
  Shield,
  Home,
  Sun,
  Heart,
  Building2,
  Wrench,
  GraduationCap,
  Phone,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function IndustriesPage() {
  const [activeIndustry, setActiveIndustry] = useState("real-estate");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const industries = [
    {
      id: "real-estate",
      title: "Real Estate & Real Estate Recruiting",
      description:
        "Comprehensive support for real estate professionals and recruiting teams.",
      subtitle: "Our core niche",
      badge: "Core Niche",
      icon: Building,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      features: [
        "Broker-to-agent recruiting (SmartSetter-style campaigns)",
        "Buyer/seller lead outreach (Zillow, PPC, FSBO, expireds, etc.)",
        "Database reactivation",
        "ISA-style appointment setting",
      ],
      services: [
        "Broker-to-agent recruiting (SmartSetter-style campaigns)",
        "Buyer/seller lead outreach (Zillow, PPC, FSBO, expireds, etc.)",
        "Database reactivation",
        "ISA-style appointment setting",
      ],
      stats: {
        clients: "50+",
        appointments: "500+",
        conversion: "15%",
      },
    },
    {
      id: "solar",
      title: "Solar",
      description:
        "High-volume outreach and appointment setting for solar companies.",
      subtitle: "Sales teams thrive on volume — we deliver it",
      badge: "High Volume",
      icon: Sun,
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500",
      features: [
        "Cold outreach to homeowners",
        "Pre-qualification based on roof/home criteria",
        "Setting appointments for in-home or virtual consults",
        "Following up with pipeline leads",
      ],
      services: [
        "Cold outreach to homeowners",
        "Pre-qualification based on roof/home criteria",
        "Setting appointments for in-home or virtual consults",
        "Following up with pipeline leads",
      ],
      stats: {
        clients: "25+",
        appointments: "400+",
        conversion: "18%",
      },
    },
    {
      id: "home-warranty",
      title: "Home Warranty & Home Services",
      description:
        "Ongoing support for service-based businesses with recurring revenue models.",
      subtitle: "Perfect for recurring services that require ongoing touchpoints",
      badge: "Recurring",
      icon: Shield,
      color: "green",
      gradient: "from-green-500 to-green-600",
      features: [
        "Cold calling new homeowners or aged leads",
        "Pitching service contracts and renewals",
        "Transferring live calls or setting bookings",
        "Post-sale support & follow-up",
      ],
      services: [
        "Cold calling new homeowners or aged leads",
        "Pitching service contracts and renewals",
        "Transferring live calls or setting bookings",
        "Post-sale support & follow-up",
      ],
      stats: {
        clients: "35+",
        appointments: "300+",
        conversion: "22%",
      },
    },
    {
      id: "healthcare-insurance",
      title: "Healthcare & Insurance",
      description:
        "Lead generation and appointment setting for healthcare and insurance professionals.",
      subtitle: "Licensed agents close. We get them on the phone",
      badge: "Licensed",
      icon: Heart,
      color: "red",
      gradient: "from-red-500 to-pink-500",
      features: [
        "Medicare / ACA / life insurance warm-up",
        "Lead list dialing and follow-up",
        "Pre-qualifying interest and coverage type",
        "Surveying and appointment scheduling",
      ],
      services: [
        "Medicare / ACA / life insurance warm-up",
        "Lead list dialing and follow-up",
        "Pre-qualifying interest and coverage type",
        "Surveying and appointment scheduling",
      ],
      stats: {
        clients: "20+",
        appointments: "250+",
        conversion: "28%",
      },
    },
    {
      id: "home-improvement",
      title: "Home Improvement",
      description:
        "Calendar filling and lead management for home improvement contractors.",
      subtitle: "Contractors and closers need help filling the calendar",
      badge: "Contractors",
      icon: Wrench,
      color: "orange",
      gradient: "from-orange-500 to-red-500",
      features: [
        "Cold calling for roofing, windows, HVAC, etc.",
        "In-home consultation scheduling",
        "Re-engaging aged or unresponsive leads",
        "Customer satisfaction follow-up",
      ],
      services: [
        "Cold calling for roofing, windows, HVAC, etc.",
        "In-home consultation scheduling",
        "Re-engaging aged or unresponsive leads",
        "Customer satisfaction follow-up",
      ],
      stats: {
        clients: "30+",
        appointments: "350+",
        conversion: "20%",
      },
    },
    {
      id: "high-ticket-services",
      title: "High-Ticket Services",
      description:
        "Premium appointment setting and lead generation for high-value service providers.",
      subtitle: "Premium Service Providers",
      badge: "High Value",
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
      services: [
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
      description:
        "Strategic B2B outbound solutions to expand your business network and client base.",
      subtitle: "Business Development",
      badge: "Strategic",
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
      services: [
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
  ];

  const benefits = [
    {
      icon: Users,
      title: "Industry Expertise",
      description:
        "Our team understands the unique challenges and opportunities in each industry we serve.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description:
        "Track record of success with measurable outcomes and satisfied clients across industries.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Access to diverse talent pools and market insights from around the world.",
    },
    {
      icon: Zap,
      title: "Fast Implementation",
      description:
        "Quick setup and deployment to get your outbound operations running efficiently.",
    },
  ];

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const isSectionVisible = (sectionId: string) => visibleSections.has(sectionId)

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden" data-section="hero" id="hero">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Enhanced Badge */}
            <div className={`inline-flex flex-col sm:flex-row items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-8 border border-white/20 transition-all duration-1500 ${isSectionVisible('hero') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'} hover:scale-105 transition-transform duration-500 shadow-lg hover:bg-white/20`}>
              <span className="mr-0 sm:mr-2 mb-1 sm:mb-0">🏢</span>
              <span className="text-center sm:text-left">Industry Specialists</span>
              <span className="mx-0 sm:mx-2 hidden sm:inline">•</span>
              <span className="text-center sm:text-left">Tailored Solutions</span>
            </div>
            
            {/* Enhanced Main Heading */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 transition-all duration-1500 ${isSectionVisible('hero') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </h1>
            
            {/* Enhanced Description */}
            <p className={`text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 transition-all duration-1500 ${isSectionVisible('hero') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              Specialized outbound solutions tailored to the unique needs of different industries. We understand that each industry has its own challenges, opportunities, and requirements.
            </p>
            
            {/* Enhanced Stats Row */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto px-4 transition-all duration-1500 ${isSectionVisible('hero') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200 mb-2">7+</div>
                <div className="text-sm sm:text-base text-blue-100 font-medium">Industries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="text-2xl sm:text-3xl font-bold text-purple-200 mb-2">95%</div>
                <div className="text-sm sm:text-base text-purple-100 font-medium">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-500 sm:col-span-2 lg:col-span-1">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-200 mb-2">Fast</div>
                <div className="text-sm sm:text-base text-indigo-100 font-medium">Deployment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Industries Grid */}
      <section className="py-20 bg-gray-50" data-section="industries" id="industries">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1500 ${isSectionVisible('industries') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              Our Industry Solutions
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1500 ${isSectionVisible('industries') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              Specialized teams trained for your industry's unique challenges and opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {industries.map((industry, index) => (
              <Card
                key={index}
                className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${isSectionVisible('industries') ? `animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}` : `opacity-0 translate-x-[${index % 2 === 0 ? '-100px' : '100px'}]`}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4 relative">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${industry.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <industry.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium bg-blue-100 text-blue-700">
                      {industry.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    {industry.title}
                  </CardTitle>
                  <p className="text-blue-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {industry.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
                    {industry.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 relative flex flex-col h-full">
                  <div className="flex-1">
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                        We Support:
                      </h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {industry.services.map((service, serviceIndex) => (
                          <li key={serviceIndex} className="flex items-start group/item">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300"></div>
                            <span className="text-gray-600 text-xs sm:text-sm leading-relaxed group-hover/item:text-gray-700 transition-colors duration-300">
                              {service}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                    <Link href="/contact" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        Get Started <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-transparent hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                      onClick={() => {
                        setActiveIndustry(industry.id);
                        document.getElementById('spotlight')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us */}
      <section className="py-20" data-section="benefits" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1500 ${isSectionVisible('benefits') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              Why Choose Our Industry Solutions
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1500 ${isSectionVisible('benefits') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              We bring specialized expertise and proven methodologies to every industry we serve
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${isSectionVisible('benefits') ? `animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}` : `opacity-0 translate-x-[${index % 2 === 0 ? '-100px' : '100px'}]`}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 sm:p-8 relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Custom Solutions Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" data-section="custom" id="custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Card className={`max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden transition-all duration-1500 ${isSectionVisible('custom') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
              <CardContent className="p-12 relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Don't See Your Industry?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  We customize campaigns for any business that requires phone work. If it involves outbound calling,
                  lead generation, or customer support, we can build a specialized team for it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Book a Free Consult <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Success Metrics */}
      <section className="py-20" data-section="metrics" id="metrics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1500 ${isSectionVisible('metrics') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              Proven Results Across Industries
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1500 ${isSectionVisible('metrics') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              Our industry-focused approach delivers consistent results for businesses of all sizes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <Card className={`group relative text-center border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 bg-white/90 backdrop-blur-sm transition-all duration-1500 ${isSectionVisible('metrics') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 sm:p-8 relative">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300">7+</div>
                <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">Industries Served</div>
              </CardContent>
            </Card>
            <Card className={`group relative text-center border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 bg-white/90 backdrop-blur-sm transition-all duration-1500 ${isSectionVisible('metrics') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 sm:p-8 relative">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2 group-hover:text-green-700 transition-colors duration-300">95%</div>
                <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">Client Retention Rate</div>
              </CardContent>
            </Card>
            <Card className={`group relative text-center border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 bg-white/90 backdrop-blur-sm transition-all duration-1500 ${isSectionVisible('metrics') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 sm:p-8 relative">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2 group-hover:text-purple-700 transition-colors duration-300">24/7</div>
                <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">Coverage Available</div>
              </CardContent>
            </Card>
            <Card className={`group relative text-center border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 bg-white/90 backdrop-blur-sm transition-all duration-1500 ${isSectionVisible('metrics') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 sm:p-8 relative">
                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2 group-hover:text-orange-700 transition-colors duration-300">Fast</div>
                <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">Team Deployment</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden" data-section="cta" id="cta">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1500 ${isSectionVisible('cta') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
            Ready to Scale Your Industry Operations?
          </h2>
          <p className={`text-xl mb-8 opacity-90 max-w-3xl mx-auto transition-all duration-1500 ${isSectionVisible('cta') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
            Let our specialized teams help you achieve industry-specific goals with our tailored outbound solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Industry Spotlight Tabs */}
      <section className="py-16 bg-gray-50" data-section="spotlight" id="spotlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1500 ${isSectionVisible('spotlight') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              Industry Spotlight
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1500 ${isSectionVisible('spotlight') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              Explore detailed insights and success stories for each industry we serve
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {industries.map((industry) => (
              <Button
                key={industry.id}
                variant={activeIndustry === industry.id ? "default" : "outline"}
                onClick={() => setActiveIndustry(industry.id)}
                className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeIndustry === industry.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg"
                }`}
              >
                <industry.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{industry.title}</span>
                <span className="sm:hidden">{industry.title.split(' ')[0]}</span>
              </Button>
            ))}
          </div>

          {/* Active Industry Content */}
          {industries.map((industry) => (
            <div
              key={industry.id}
              className={activeIndustry === industry.id ? "block" : "hidden"}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${industry.gradient} flex items-center justify-center shadow-lg mr-3 sm:mr-4 transform hover:scale-110 transition-transform duration-300`}
                    >
                      <industry.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        {industry.title}
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-base">{industry.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                        {industry.stats.clients}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Active Clients
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                        {industry.stats.appointments}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Appointments Set
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                        {industry.stats.conversion}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Avg. Conversion
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Key Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {industry.features.map((feature, index) => (
                        <div key={index} className="flex items-center group/item">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                          <span className="text-gray-600 text-sm group-hover/item:text-gray-700 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link href="/contact">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        Get Started <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Success Story
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Real results from our {industry.title} clients
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                          <span className="text-gray-700">
                            Monthly Appointments
                          </span>
                          <span className="font-semibold text-blue-600">
                            150+
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300">
                          <span className="text-gray-700">Conversion Rate</span>
                          <span className="font-semibold text-green-600">
                            {industry.stats.conversion}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
                          <span className="text-gray-700">ROI Improvement</span>
                          <span className="font-semibold text-purple-600">
                            300%
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        <p className="text-sm text-gray-600 italic">
                          "Dial By Daylight transformed our outbound operations.
                          Their specialized approach for our industry has
                          delivered exceptional results."
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          - Industry Client
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
