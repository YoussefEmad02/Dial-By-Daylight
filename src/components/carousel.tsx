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
      image: "/bg.png",
      title: "Digital Innovation",
      description: "Transforming businesses through cutting-edge digital solutions and strategic technology implementations.",
    },
    {
      id: 2,
      image: "/company.png",
      title: "Expert Consulting",
      description: "Our experienced consultants provide strategic guidance to optimize your operations and drive sustainable growth.",
    },
    {
      id: 3,
      image: "/bg.png",
      title: "Technology Excellence",
      description: "Custom software solutions and technology infrastructure designed to meet your unique business requirements.",
    },
    {
      id: 4,
      image: "/company.png",
      title: "Client Success",
      description: "Dedicated to delivering exceptional results and building long-term partnerships with our valued clients.",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1))
    }, 5000) // Change slide every 5 seconds

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
            <div className="absolute inset-0 backdrop-blur-sm bg-opacity-40 flex items-end">
              <div className="p-6 md:p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
                <p className="text-lg md:text-xl opacity-90">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
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
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
