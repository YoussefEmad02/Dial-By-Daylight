"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Target, Eye, Zap, Globe, Award, Users, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  
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
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
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
              <span className="mr-0 sm:mr-2 mb-1 sm:mb-0">🇪🇬</span>
              <span className="text-center sm:text-left">Founded in Egypt</span>
              <span className="mx-0 sm:mx-2 hidden sm:inline">•</span>
              <span className="text-center sm:text-left">Serving Worldwide</span>
            </div>
            
            {/* Enhanced Main Heading */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 transition-all duration-1500 ${isSectionVisible('hero') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                About Dial By Daylight
              </span>
            </h1>
            
            {/* Enhanced Description */}
            <p className={`text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 transition-all duration-1500 ${isSectionVisible('hero') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              Dial By Daylight is a remote-first BPO founded in Egypt, providing trained, English-fluent cold callers and appointment setters to growing businesses worldwide.
            </p>
            
            {/* Enhanced Stats Row */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto px-4 transition-all duration-1500 ${isSectionVisible('hero') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200 mb-2">100%</div>
                <div className="text-sm sm:text-base text-blue-100 font-medium">English Fluent</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-purple-200 mb-2">24/7</div>
                <div className="text-sm sm:text-base text-purple-100 font-medium">Global Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 sm:col-span-2 lg:col-span-1">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-200 mb-2">Fast</div>
                <div className="text-sm sm:text-base text-indigo-100 font-medium">Setup & Deploy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Image */}
      <section className="py-16" data-section="company-image" id="company-image">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4 transition-all duration-1500 ${isSectionVisible('company-image') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              Our Global Team
            </h2>
            <p className={`text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 transition-all duration-1500 ${isSectionVisible('company-image') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              A diverse, talented team working remotely to deliver exceptional results
            </p>
          </div>
          <div className={`relative h-64 sm:h-90 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transition-all duration-1500 ${isSectionVisible('company-image') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
            <Image
              src="/company.png"
              alt="Dial By Daylight Remote Team"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-indigo-600/30"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20">
                <h3 className="text-lg sm:text-2xl font-bold mb-2">Remote-First BPO</h3>
                <p className="text-sm sm:text-lg opacity-90 mb-3 sm:mb-4">Connecting global talent with businesses worldwide</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-xs sm:text-sm">24/7 Operations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-xs sm:text-sm">Global Coverage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900" data-section="mission-vision" id="mission-vision">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Card className={`group relative hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${isSectionVisible('mission-vision') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 sm:p-8 relative">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 transform group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">Our Mission</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-500">
                  To empower businesses with cost-effective, high-performance outbound teams — built fast, managed well, and driven by results. We believe the future of outsourcing is lean, global, and quality-first. Our mission is to bring that future to life — one cold call at a time.
                </p>
              </CardContent>
            </Card>

            <Card className={`group relative hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${isSectionVisible('mission-vision') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 sm:p-8 relative">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Our Vision</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  To become the go-to outbound team for modern businesses — blending global talent with startup speed, operational discipline, and ruthless execution. We envision a world where remote voice agents are more trusted, trained, and effective than in-house teams — and we&apos;re building the systems to make that happen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Edge */}
      <section className="py-20" data-section="our-edge" id="our-edge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1500 ${isSectionVisible('our-edge') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>Our Edge</h2>
            <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1500 ${isSectionVisible('our-edge') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              We move fast. We keep it lean. And we care more about real output — qualified appointments, booked calls, consistent performance — than fancy dashboards or bloated call center fluff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${isSectionVisible('our-edge') ? `animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}` : `opacity-0 translate-x-[${index % 2 === 0 ? '-100px' : '100px'}]`}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${value.color}-500 to-${value.color}-600 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-500">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-500">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900" data-section="our-process" id="our-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${isSectionVisible('our-process') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>Our Process</h2>
            <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 ${isSectionVisible('our-process') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>Every agent goes through a tight funnel to ensure quality delivery under pressure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1000 ${isSectionVisible('our-process') ? `animate-slide-in-left-delay-${index}` : 'opacity-0 translate-x-[-100px]'}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-8 relative">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">STEP {step.step}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">{step.title}</h3>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className={`hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 transition-all duration-1000 ${isSectionVisible('our-process') ? `animate-slide-in-left-delay-${index + 1}` : 'opacity-0 translate-x-[-100px]'}`}>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Focus & Operations */}
      <section className="py-20" data-section="client-operations" id="client-operations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className={`group relative hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1000 ${isSectionVisible('client-operations') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Client Focus</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  We currently serve clients in real estate, high-ticket services, and B2B lead generation — with our main delivery partner being SmartSetter, a fast-growing platform in the recruiting space.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center group/item">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 group-hover/item:scale-110 transition-transform duration-300" />
                    <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">Real Estate</span>
                  </div>
                  <div className="flex items-center group/item">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 group-hover/item:scale-110 transition-transform duration-300" />
                    <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">High-Ticket Services</span>
                  </div>
                  <div className="flex items-center group/item">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 group-hover/item:scale-110 transition-transform duration-300" />
                    <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">B2B Lead Generation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`group relative hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1000 ${isSectionVisible('client-operations') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">Operational Excellence</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Our core team runs operations, recruitment, training, payroll, and dialer setup — all in-house. That gives us tight control over quality and speed, without adding layers of bureaucracy.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center group/item">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3 group-hover/item:scale-110 transition-transform duration-300" />
                    <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">Operations Management</span>
                  </div>
                  <div className="flex items-center group/item">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3 group-hover/item:scale-110 transition-transform duration-300" />
                    <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">Recruitment & Training</span>
                  </div>
                  <div className="flex items-center group/item">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3 group-hover/item:scale-110 transition-transform duration-300" />
                    <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">Payroll & Dialer Setup</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden" data-section="our-promise" id="our-promise">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 ${isSectionVisible('our-promise') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>Our Promise</h2>
          <p className={`text-2xl mb-12 opacity-90 max-w-3xl mx-auto font-medium transition-all duration-1000 ${isSectionVisible('our-promise') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>If you&apos;re looking for offshore talent that feels in-house — that&apos;s us.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-1000 ${isSectionVisible('our-promise') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Fast Setup</h3>
              <p className="text-white/80">Get your team up and running in days, not months</p>
            </div>
            
            <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-1000 ${isSectionVisible('our-promise') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Results-Driven</h3>
              <p className="text-white/80">Focused on measurable outcomes and performance</p>
            </div>
            
            <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-1000 ${isSectionVisible('our-promise') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Global Talent</h3>
              <p className="text-white/80">Access to world-class talent from around the globe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800" data-section="company-stats" id="company-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${isSectionVisible('company-stats') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              Our Impact
            </h2>
            <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 ${isSectionVisible('company-stats') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              Numbers that speak to our commitment to excellence and global reach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 border border-gray-100 dark:border-gray-700 transition-all duration-1000 ${isSectionVisible('company-stats') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">100%</div>
                <div className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 font-medium">English Fluent Agents</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Native-level communication</div>
              </div>
            </div>
            
            <div className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 border border-gray-100 dark:border-gray-700 transition-all duration-1000 ${isSectionVisible('company-stats') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center">
                <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-3 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">24/7</div>
                <div className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 font-medium">Operations Coverage</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Round-the-clock support</div>
              </div>
            </div>
            
            <div className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 border border-gray-100 dark:border-gray-700 transition-all duration-1000 ${isSectionVisible('company-stats') ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center">
                <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">3+</div>
                <div className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 font-medium">Industries Served</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Diverse expertise</div>
              </div>
            </div>
            
            <div className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 border border-gray-100 dark:border-gray-700 transition-all duration-1000 ${isSectionVisible('company-stats') ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center">
                <div className="text-5xl font-bold text-orange-600 dark:text-orange-400 mb-3 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-300">Fast</div>
                <div className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 font-medium">Setup & Deployment</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Days, not months</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
