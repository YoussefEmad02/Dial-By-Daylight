"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"



export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const carouselItems = [
    {
      id: 1,
      image: "/smartsetter-logo.jpg",
      title: "SmartSetter",
             description: "Leading real estate brokerage recruiting platform. We provide dedicated callers who connect with licensed agents, pitch brokerage opportunities, and book recruiter calendars solid. Result: 200+ cold calls/day, full recruiter calendars, 40% lower cost-per-hire, and measurable ROI.",
    },
    {
      id: 2,
      image: "/logo.png",
      title: "TechFlow Solutions",
      description: "SaaS company scaling their sales operations. Our appointment setters book 50+ qualified demos per month, allowing their sales team to focus on closing deals instead of prospecting.",
    },
    {
      id: 3,
      image: "/logo.png",
      title: "GrowthFirst Marketing",
      description: "Digital marketing agency expanding their client base. Our cold callers generate 200+ qualified leads monthly, helping them scale from $2M to $5M in annual revenue.",
    },
    {
      id: 4,
      image: "/logo.png",
      title: "E-commerce Plus",
      description: "Online retailer needing 24/7 customer support. Our agents handle 1000+ customer inquiries daily, maintaining 98% satisfaction rates while reducing support costs by 40%.",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1))
    }, 30000) // Change slide every 30 seconds

    return () => clearInterval(interval)
  }, [carouselItems.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main carousel container */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image 
              src={item.image || "/placeholder.svg"} 
              alt={item.title} 
              fill 
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div className="p-6 md:p-8 text-white w-full">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mr-4 shadow-lg">
                    <Image 
                      src={item.image} 
                      alt={`${item.title} logo`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
