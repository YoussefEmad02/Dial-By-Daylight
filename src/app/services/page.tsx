"use client";

import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Headphones,
  Calendar,
  User,
  CheckCircle,
  Star,
  Users,
  Target,
  DollarSign,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function ServicesPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const isSectionVisible = (sectionId: string) =>
    visibleSections.has(sectionId);

  const services = [
    {
      icon: Phone,
      title: "Cold Calling",
      description:
        "Professional outbound calling services to generate qualified leads and expand your customer base with targeted prospecting strategies.",
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
      badge: "Premium Service",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description:
        "24/7 comprehensive customer support services to enhance customer satisfaction and build lasting relationships with your clients.",
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
      badge: "24/7 Available",
    },
    {
      icon: Calendar,
      title: "Appointment Setting",
      description:
        "Efficient appointment scheduling and management services to optimize your sales process and maximize conversion opportunities.",
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
      badge: "High Conversion",
    },
    {
      icon: User,
      title: "Virtual Assisting",
      description:
        "Comprehensive virtual assistant services to handle administrative tasks and support your business operations efficiently.",
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
      badge: "Flexible Support",
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Professional Team",
      description:
        "Experienced professionals dedicated to delivering exceptional results with proven expertise in your industry.",
    },
    {
      icon: Target,
      title: "Custom Solutions",
      description:
        "Tailored services designed to meet your specific business needs and objectives for maximum impact.",
    },
    {
      icon: Star,
      title: "Proven Results",
      description:
        "Track record of success with measurable outcomes and consistently satisfied clients across industries.",
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description:
        "Competitive pricing with excellent return on investment and transparent pricing structures.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section
        className="pt-24 pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden"
        data-section="hero"
        id="hero"
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Enhanced Badge */}
            <div
              className={`inline-flex flex-col sm:flex-row items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-8 border border-white/20 transition-all duration-1500 ${
                isSectionVisible("hero")
                  ? "animate-slide-in-left"
                  : "opacity-0 translate-x-[-100px]"
              } hover:scale-105 transition-transform duration-500 shadow-lg hover:bg-white/20`}
            >
              <span className="mr-0 sm:mr-2 mb-1 sm:mb-0">🚀</span>
              <span className="text-center sm:text-left">
                Professional Services
              </span>
              <span className="mx-0 sm:mx-2 hidden sm:inline">•</span>
              <span className="text-center sm:text-left">Expert Solutions</span>
            </div>

            {/* Enhanced Main Heading */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 transition-all duration-1500 ${
                isSectionVisible("hero")
                  ? "animate-slide-in-left"
                  : "opacity-0 translate-x-[-100px]"
              }`}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Our Professional Services
              </span>
            </h1>

            {/* Enhanced Description */}
            <p
              className={`text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 transition-all duration-1500 ${
                isSectionVisible("hero")
                  ? "animate-slide-in-right"
                  : "opacity-0 translate-x-[100px]"
              }`}
            >
              Comprehensive business solutions designed to accelerate your
              growth and success with expert team support.
            </p>

            {/* Enhanced Stats Row */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4 transition-all duration-1500 ${
                isSectionVisible("hero")
                  ? "animate-slide-in-left"
                  : "opacity-0 translate-x-[-100px]"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200 mb-2">
                  500+
                </div>
                <div className="text-sm sm:text-base text-blue-100 font-medium">
                  Successful Projects
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="text-2xl sm:text-3xl font-bold text-purple-200 mb-2">
                  98%
                </div>
                <div className="text-sm sm:text-base text-purple-100 font-medium">
                  Client Satisfaction
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-200 mb-2">
                  24/7
                </div>
                <div className="text-sm sm:text-base text-indigo-100 font-medium">
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section
        className="py-20 bg-gray-50"
        data-section="services"
        id="services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1500 ${
              isSectionVisible("services")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Core Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Professional solutions designed to accelerate your business growth
              and success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${
                  isSectionVisible("services")
                    ? `animate-slide-in-${index % 2 === 0 ? "left" : "right"}`
                    : `opacity-0 translate-x-[${
                        index % 2 === 0 ? "-100px" : "100px"
                      }]`
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4 relative">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium bg-blue-100 text-blue-700"
                    >
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 relative flex flex-col h-full">
                  <div className="flex-1">
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                        Key Features
                      </h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start group/item"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300"></div>
                            <span className="text-gray-600 text-xs sm:text-sm leading-relaxed group-hover/item:text-gray-700 transition-colors duration-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                    <Link href="/contact" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        Get Quote <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section
        className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden"
        data-section="cta"
        id="cta"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            className={`transition-all duration-1500 ${
              isSectionVisible("cta")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto">
              Let our expert team help you achieve your business goals with our
              comprehensive professional services.
            </p>
          </div>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1500 ${
              isSectionVisible("cta")
                ? "animate-slide-in-right"
                : "opacity-0 translate-x-[100px]"
            }`}
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Request Consultation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Our Services */}
      <section className="py-20" data-section="benefits" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1500 ${
              isSectionVisible("benefits")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Choose Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of partnering with our professional
              service team
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${
                  isSectionVisible("benefits")
                    ? `animate-slide-in-${index % 2 === 0 ? "left" : "right"}`
                    : `opacity-0 translate-x-[${
                        index % 2 === 0 ? "-100px" : "100px"
                      }]`
                }`}
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
      <section
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        data-section="custom"
        id="custom"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card
            className={`max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden transition-all duration-1500 ${
              isSectionVisible("custom")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
            <CardContent className="p-12 relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300 shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                Need a Custom Solution?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed text-center">
                We customize services for any business that requires
                professional support. If it involves customer interaction,
                business operations, or growth strategies, we can build a
                specialized solution for it.
              </p>
              <div className="flex justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Discuss Your Custom Solution{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
