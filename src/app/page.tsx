"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Zap, Users, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Carousel from "@/components/carousel";
import Link from "next/link";

export default function HomePage() {
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

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden"
        data-section="hero"
        id="hero"
      >
        {/* Gradient and Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 z-0" />
        <div
          className="absolute inset-0 opacity-30 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <Image
          src="/bg.png"
          alt="TechCorp Solutions Hero Background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          {/* Animated Badge */}
          <div
            className={`inline-flex flex-col sm:flex-row items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-8 border border-white/20 transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            } hover:scale-105 transition-transform duration-500 shadow-lg hover:bg-white/20`}
          >
            <span className="mr-0 sm:mr-2 mb-1 sm:mb-0">🚀</span>
            <span className="text-center sm:text-left">
              Cost-Effective Outbound Teams
            </span>
            <span className="mx-0 sm:mx-2 hidden sm:inline">•</span>
            <span className="text-center sm:text-left">Built Fast</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Welcome to Dial By Daylight
            </span>
          </h1>
          <p
            className={`text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-right"
                : "opacity-0 translate-x-[100px]"
            }`}
          >
            Cost-Effective, High-Performance Outbound Teams Built Fast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Scale with us <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
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
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive business solutions designed to drive
              growth and innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card
              className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${
                isSectionVisible("services")
                  ? "animate-slide-in-left"
                  : "opacity-0 translate-x-[-100px]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 text-center relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black sm:text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  Digital Transformation
                </h3>
                <p className="text-black sm:text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Transform your business with cutting-edge digital solutions
                  and strategies.
                </p>
              </CardContent>
            </Card>
            <Card
              className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${
                isSectionVisible("services")
                  ? "animate-slide-in-right"
                  : "opacity-0 translate-x-[100px]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 text-center relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black sm:text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  Business Consulting
                </h3>
                <p className="text-black sm:text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Expert guidance to optimize your operations and drive growth.
                </p>
              </CardContent>
            </Card>
            <Card
              className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${
                isSectionVisible("services")
                  ? "animate-slide-in-left"
                  : "opacity-0 translate-x-[-100px]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 text-center relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black sm:text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  Technology Solutions
                </h3>
                <p className="text-black sm:text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Custom software and technology solutions tailored to your
                  needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Carousel Section */}
      <section
        className="py-20 bg-gray-50"
        data-section="carousel"
        id="carousel"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1500 ${
              isSectionVisible("carousel")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore how we&apos;ve helped businesses transform and achieve their
              goals.
            </p>
          </div>
          <div
            className={`transition-all duration-1500 ${
              isSectionVisible("carousel")
                ? "animate-slide-in-right"
                : "opacity-0 translate-x-[100px]"
            }`}
          >
            <Carousel />
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="py-20 bg-gray-50" data-section="why" id="why">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1500 ${
              isSectionVisible("why")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Choose Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what sets us apart in delivering exceptional business
              solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card
              className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${
                isSectionVisible("why")
                  ? "animate-slide-in-left"
                  : "opacity-0 translate-x-[-100px]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative">
                <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black sm:text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  Expertise
                </h3>
                <p className="text-black sm:text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Proven results and deep industry knowledge.
                </p>
              </CardContent>
            </Card>
            <Card
              className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${
                isSectionVisible("why")
                  ? "animate-slide-in-right"
                  : "opacity-0 translate-x-[100px]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative">
                <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black sm:text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  Innovation
                </h3>
                <p className="text-black sm:text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Cutting-edge solutions using the latest technologies.
                </p>
              </CardContent>
            </Card>
            <Card
              className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-1500 ${
                isSectionVisible("why")
                  ? "animate-slide-in-left"
                  : "opacity-0 translate-x-[-100px]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative">
                <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black sm:text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  24/7 Support
                </h3>
                <p className="text-black sm:text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Round-the-clock support to ensure your success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
