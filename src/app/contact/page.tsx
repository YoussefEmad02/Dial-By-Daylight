"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Phone, Clock, ArrowRight, Users } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import WhatsAppButton from "@/components/whatsapp-button";

export default function ContactPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="pt-24 pb-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden"
        data-section="hero"
        id="hero"
      >
        {/* Ambient Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 text-white/60 text-4xl animate-float" style={{ animationDuration: '8s', animationDelay: '0s' }}>
            🌍
          </div>
          <div className="absolute top-1/3 right-1/4 text-white/55 text-3xl animate-float" style={{ animationDuration: '10s', animationDelay: '2.5s' }}>
            📞
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-white/58 text-3xl animate-float" style={{ animationDuration: '12s', animationDelay: '1.8s' }}>
            💼
          </div>
          <div className="absolute top-1/2 right-1/3 text-white/52 text-4xl animate-float" style={{ animationDuration: '9s', animationDelay: '4.2s' }}>
            📈
          </div>
        </div>
         
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20 transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}>
              <Users className="w-4 h-4 mr-2" />
              Fully Managed Teams
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}>
              Scale Your Outbound Operations
            </h1>
            <p className={`text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-right"
                : "opacity-0 translate-x-[100px]"
            }`}>
              Deploy high-performance cold calling and appointment setting teams in days, not months. 
              Get vetted agents at half the cost of local hires — with zero overhead. English-fluent agents, proven methodologies, and measurable ROI — all managed for you.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-up"
                : "opacity-0 translate-y-[50px]"
            }`}>
              <div className="flex items-center text-white/90">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm">Fast Deployment</span>
              </div>
              <div className="flex items-center text-white/90">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm">Response within 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section 
        className="py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        data-section="form"
        id="form"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1500 ${
            isSectionVisible("form")
              ? "animate-slide-in-up"
              : "opacity-0 translate-y-[50px]"
          }`}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
              <ArrowRight className="w-4 h-4 mr-2" />
              Scale With Us
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tell us about your outbound goals and we&apos;ll provide a custom proposal with team size, timeline, and ROI projections
            </p>
          </div>
          <div className={`transition-all duration-1500 ${
            isSectionVisible("form")
              ? "animate-slide-in-up"
              : "opacity-0 translate-y-[50px]"
          }`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section 
        className="py-20 bg-gray-50 dark:bg-gray-900"
        data-section="contact-info"
        id="contact-info"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1500 ${
            isSectionVisible("contact-info")
              ? "animate-slide-in-up"
              : "opacity-0 translate-y-[50px]"
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start Your Outbound Team Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get in touch to discuss your outbound needs and receive a custom proposal within 24 hours
            </p>
          </div>
           
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Phone Card */}
            <div className={`group relative transition-all duration-1500 ${
              isSectionVisible("contact-info")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Phone Numbers
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">+201149957822</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                  <span className="text-sm font-medium">Available 24/7</span>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className={`group relative transition-all duration-1500 ${
              isSectionVisible("contact-info")
                ? "animate-slide-in-right"
                : "opacity-0 translate-x-[100px]"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Email Us
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">info@dialbydaylight.com</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
                  <span className="text-sm font-medium">Response within 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
