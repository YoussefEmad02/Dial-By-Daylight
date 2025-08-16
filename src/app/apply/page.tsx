"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ApplicationForm from "@/components/application-form"

export default function ApplyPage() {
  const [moneyElements, setMoneyElements] = useState<Array<{
    id: number;
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Generate random values only on client side to avoid hydration mismatch
    const elements = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${-Math.random() * 20}%`,
      animationDelay: `0s`, // No delay - start immediately
      animationDuration: `${8 + Math.random() * 4}s`,
    }));
    setMoneyElements(elements);
  }, []);

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

      <section 
        className="pt-24 pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden"
        data-section="hero"
        id="hero"
      >
        {/* Money Rain Effect */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {moneyElements.map((element) => (
            <span
              key={element.id}
              className="animate-money-fall absolute text-2xl opacity-60"
              style={{
                left: element.left,
                top: element.top,
                animationDelay: element.animationDelay,
                animationDuration: element.animationDuration,
              }}
            >
              💸
            </span>
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`inline-flex flex-col sm:flex-row items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-8 border border-white/20 shadow-lg transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}>
              <span className="mr-0 sm:mr-2 mb-1 sm:mb-0">🚀</span>
              <span className="text-center sm:text-left">Remote Opportunities</span>
              <span className="mx-0 sm:mx-2 hidden sm:inline">•</span>
              <span className="text-center sm:text-left">Global Team</span>
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-100px]"
            }`}>
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Join Our Team
              </span>
            </h1>

            <p className={`text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 transition-all duration-1500 ${
              isSectionVisible("hero")
                ? "animate-slide-in-right"
                : "opacity-0 translate-x-[100px]"
            }`}>
              Make it rain from anywhere 🌎💸  
              Join our remote-first team of cold callers, appointment setters, and VAs — paid in USD, trained by pros, and trusted by top U.S. companies.
            </p>
          </div>
        </div>
      </section>

      <section 
        className="py-16 bg-gray-50 dark:bg-gray-900"
        data-section="form"
        id="form"
      >
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1500 ${
          isSectionVisible("form")
            ? "animate-slide-in-up"
            : "opacity-0 translate-y-[50px]"
        }`}>
          <ApplicationForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}


