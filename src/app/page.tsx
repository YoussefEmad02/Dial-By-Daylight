"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Phone, Star, Zap, Shield, Users, Clock, Wallet } from "lucide-react";
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
        className="relative h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors"
        data-section="hero"
        id="hero"
      >
        {/* Gradient and Pattern Overlay (light mode only) */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 z-0 dark:hidden" />
        <div
          className="absolute inset-0 opacity-30 z-0 dark:hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
         <video
           src="/bg_video.mp4"
           autoPlay
           loop
           muted
           playsInline
           className="absolute inset-0 w-full h-full object-cover z-0 brightness-100 dark:brightness-[.75]"
         />
        <div className="absolute inset-0 bg-black/25 dark:bg-black/60 backdrop-blur-[3px]"></div>
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
               Scale Faster
             </span>
             <span className="mx-0 sm:mx-2 hidden sm:inline">•</span>
             <span className="text-center sm:text-left">Pay Less</span>
             <span className="mx-0 sm:mx-2 hidden sm:inline">•</span>
             <span className="text-center sm:text-left">Hire Better</span>
           </div>
                     <h1
             className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 transition-all duration-1500 ${
               isSectionVisible("hero")
                 ? "animate-slide-in-left"
                 : "opacity-0 translate-x-[-100px]"
             }`}
           >
             <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
               High-Performance Outbound Teams, Built Fast
             </span>
           </h1>
                     <p
             className={`text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 transition-all duration-1500 ${
               isSectionVisible("hero")
                 ? "animate-slide-in-right"
                 : "opacity-0 translate-x-[100px]"
             }`}
           >
             From cold calls to booked appointments — we deliver scalable, English-fluent teams that grow your business without the overhead.
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
        className="py-20 bg-gray-50 dark:bg-gray-900"
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
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
               Fully Managed Operations
             </h2>
                          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                From recruiting to payroll — we handle every aspect of your outbound team so you can focus on closing deals.
              </p>
           </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
             {/* Card 1 - Cold Calling & Appointment Setting */}
             <Card
               className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${
                 isSectionVisible("services")
                   ? "animate-slide-in-left"
                   : "opacity-0 translate-x-[-100px]"
               }`}
             >
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <CardContent className="p-8 text-center relative">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                 </div>
                 <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white sm:text-gray-900 dark:sm:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                   Cold Calling & Appointment Setting
                 </h3>
                 <p className="text-black dark:text-gray-300 sm:text-gray-600 dark:sm:text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                   Trained, English-fluent agents who generate leads, qualify prospects, and book appointments. Built for volume, optimized for results.
                 </p>
               </CardContent>
             </Card>

             {/* Card 2 - Recruiting & Vetting */}
             <Card
               className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${
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
                 <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white sm:text-gray-900 dark:sm:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                   Recruiting & Vetting
                 </h3>
                 <p className="text-black dark:text-gray-300 sm:text-gray-600 dark:sm:text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                   We handle sourcing, screening, and onboarding so you get agents ready to dial — no hiring headaches or delays.
                 </p>
               </CardContent>
             </Card>

             {/* Card 3 - Time Tracking & Performance */}
             <Card
               className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${
                 isSectionVisible("services")
                   ? "animate-slide-in-left"
                   : "opacity-0 translate-x-[-100px]"
               }`}
             >
               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <CardContent className="p-8 text-center relative">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                 </div>
                 <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white sm:text-gray-900 dark:sm:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                   Time Tracking & Performance
                 </h3>
                 <p className="text-black dark:text-gray-300 sm:text-gray-600 dark:sm:text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                   Live dashboards, productivity tracking, and daily attendance logs — complete visibility into agent activity.
                 </p>
               </CardContent>
             </Card>

             {/* Card 4 - Payroll & HR Management */}
             <Card
               className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${
                 isSectionVisible("services")
                   ? "animate-slide-in-right"
                   : "opacity-0 translate-x-[100px]"
               }`}
             >
               <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <CardContent className="p-8 text-center relative">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                 </div>
                 <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white sm:text-gray-900 dark:sm:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                   Payroll & HR Management
                 </h3>
                 <p className="text-black dark:text-gray-300 sm:text-gray-600 dark:sm:text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                   We take care of contracts, payroll, compliance, and HR admin so you don&apos;t have to lift a finger.
                 </p>
               </CardContent>
             </Card>

             {/* Card 5 - Coaching, QA & Call Reviews */}
             <Card
               className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${
                 isSectionVisible("services")
                   ? "animate-slide-in-left"
                   : "opacity-0 translate-x-[-100px]"
               }`}
             >
               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-indigo-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <CardContent className="p-8 text-center relative">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                 </div>
                 <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white sm:text-gray-900 dark:sm:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                   Coaching, QA & Call Reviews
                 </h3>
                 <p className="text-black dark:text-gray-300 sm:text-gray-600 dark:sm:text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                   Daily feedback, call monitoring, and 1:1 coaching ensure your agents continuously improve.
                 </p>
               </CardContent>
             </Card>

             {/* Card 6 - Dialer & CRM Integration */}
             <Card
               className={`group relative hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${
                 isSectionVisible("services")
                   ? "animate-slide-in-right"
                   : "opacity-0 translate-x-[100px]"
               }`}
             >
               <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <CardContent className="p-8 text-center relative">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                 </div>
                 <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white sm:text-gray-900 dark:sm:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                   Dialer & CRM Integration
                 </h3>
                 <p className="text-black dark:text-gray-300 sm:text-gray-600 dark:sm:text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                   We set up your dialer, load leads, configure call routing, and integrate your tech stack — ready to go on day one.
                 </p>
               </CardContent>
             </Card>
           </div>
        </div>
      </section>

      {/* Enhanced Carousel Section */}
      <section
        className="py-20 bg-gray-50 dark:bg-gray-900"
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
                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
               Client Spotlights
             </h2>
             <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
               See how we&apos;ve helped businesses scale their outbound operations and achieve measurable results.
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
      <section className="py-20 bg-gray-50 dark:bg-gray-900" data-section="why" id="why">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1500 ${
              isSectionVisible("why")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}
          >
                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
               Why Dial By Daylight?
             </h2>
             <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
               From signed contract to first call in days, not months.
             </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card
              className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${
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
                                 <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white sm:text-gray-900 dark:sm:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                   English Fluent
                 </h3>
                 <p className="text-black dark:text-gray-300 sm:text-gray-600 dark:sm:text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                   100% fluent agents with native-level communication.
                 </p>
              </CardContent>
            </Card>
            <Card
              className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${
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
                                 <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white sm:text-gray-900 dark:sm:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                   Fast Setup
                 </h3>
                 <p className="text-black dark:text-gray-300 sm:text-gray-600 dark:sm:text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                   From signed contract to first call in days, not months.
                 </p>
              </CardContent>
            </Card>
            <Card
              className={`group relative text-center hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-1500 ${
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
                                 <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white sm:text-gray-900 dark:sm:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                   Cost Effective
                 </h3>
                 <p className="text-black dark:text-gray-300 sm:text-gray-600 dark:sm:text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                   Competitive rates with high ROI and flexible scaling.
                 </p>
              </CardContent>
            </Card>
          </div>
                 </div>
       </section>

               {/* Strong Closing CTA Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
               Same Quality. Half the Cost.
             </h2>
             <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4">
               Cut overhead. Keep performance.
             </p>
             <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto">
               Why hire locally when you can launch a trained outbound team for half the price?
               <br />
                              We handle the recruiting, coaching, dialer setup, payroll, and HR — so you don&apos;t have to.
             </p>
                           <p className="text-sm text-gray-400 dark:text-gray-500 mb-4 text-center">
                Trusted by leading platforms like SmartSetter.
              </p>
              
              {/* Visual Comparison Block (aligned pairs, subtle divider, no badge) */}
              <div className="mb-8 max-w-5xl mx-auto relative">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
                {/* Headers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-700/30">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-1">In-House Team</h3>
                      <p className="text-red-700 dark:text-red-300 text-sm">Traditional approach</p>
                    </div>
                  </div>
                  <div className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700/30">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-1">Dial By Daylight</h3>
                      <p className="text-green-700 dark:text-green-300 text-sm">Modern solution</p>
                    </div>
                  </div>
                </div>
                {/* Rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recruiting */}
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-red-200 dark:border-red-700/30">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Recruiting</h4>
                    <p className="text-red-800 dark:text-red-200 text-sm">Months of sourcing, screening, and hiring</p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-green-200 dark:border-green-700/30">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Recruiting</h4>
                    <p className="text-green-800 dark:text-green-200 text-sm">Pre-vetted, trained agents ready to start</p>
                  </div>

                  {/* Training */}
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-red-200 dark:border-red-700/30">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Training</h4>
                    <p className="text-red-800 dark:text-red-200 text-sm">Weeks of onboarding and skill development</p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-green-200 dark:border-green-700/30">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Training</h4>
                    <p className="text-green-800 dark:text-green-200 text-sm">Industry-specific expertise from day one</p>
                  </div>

                  {/* Management */}
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-red-200 dark:border-red-700/30">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Management</h4>
                    <p className="text-red-800 dark:text-red-200 text-sm">Dedicated managers and supervisors required</p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-green-200 dark:border-green-700/30">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Management</h4>
                    <p className="text-green-800 dark:text-green-200 text-sm">Built-in quality control and oversight</p>
                  </div>

                  {/* Infrastructure */}
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-red-200 dark:border-red-700/30">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Infrastructure</h4>
                    <p className="text-red-800 dark:text-red-200 text-sm">Office space, equipment, and systems setup</p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-green-200 dark:border-green-700/30">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Infrastructure</h4>
                    <p className="text-green-800 dark:text-green-200 text-sm">Cloud-based tools and dialer integration</p>
                  </div>

                  {/* Payroll & HR */}
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-red-200 dark:border-red-700/30">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Payroll & HR</h4>
                    <p className="text-red-800 dark:text-red-200 text-sm">Complex payroll, benefits, and compliance</p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-green-200 dark:border-green-700/30">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Payroll & HR</h4>
                    <p className="text-green-800 dark:text-green-200 text-sm">Handled seamlessly in the background</p>
                  </div>

                  {/* Speed to Launch */}
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-red-200 dark:border-red-700/30">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Speed to Launch</h4>
                    <p className="text-red-800 dark:text-red-200 text-sm">3-6 months from concept to execution</p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-green-200 dark:border-green-700/30">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Speed to Launch</h4>
                    <p className="text-green-800 dark:text-green-200 text-sm">Days to weeks from contract to calls</p>
                  </div>

                  {/* Cost Efficiency */}
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-red-200 dark:border-red-700/30">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Cost Efficiency</h4>
                    <p className="text-red-800 dark:text-red-200 text-sm">High overhead with variable results</p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-green-200 dark:border-green-700/30">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Cost Efficiency</h4>
                    <p className="text-green-800 dark:text-green-200 text-sm">Predictable performance at scale</p>
                  </div>
                </div>
              </div>
              
              <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Build My Team <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

       <Footer />
    </div>
  );
}
