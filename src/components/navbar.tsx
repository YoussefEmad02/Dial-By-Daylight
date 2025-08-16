"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, X, Calendar, ArrowRight, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/industries", label: "Industries" },
    { href: "/apply", label: "Apply" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-br from-blue-600/95 to-purple-600/95 dark:from-gray-900/95 dark:to-gray-800/95 backdrop-blur-md shadow-lg border-b border-white/20 dark:border-gray-700/20' 
        : 'bg-gradient-to-br from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20 gap-4">
          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/logo.png"
                alt="Dial By Daylight Logo"
                width={40}
                height={40}
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-blue-100 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent leading-tight">
                Dial By Daylight
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group whitespace-nowrap ${
                    isActive
                      ? 'text-white dark:text-gray-100'
                      : 'text-blue-100 dark:text-gray-300 hover:text-white dark:hover:text-gray-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white to-blue-100 dark:from-gray-100 dark:to-gray-300 rounded-full"></div>
                  )}
                  <div className="absolute inset-0 bg-white/10 dark:bg-gray-100/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
              )
            })}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 hover:bg-white/10 dark:hover:bg-gray-100/10 rounded-lg transition-colors duration-300"
              aria-label={mounted && theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mounted && theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-blue-100" />
              )}
            </Button>

            {/* Book Consultation Button */}
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group text-sm">
                <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium whitespace-nowrap">Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle (Mobile) */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 hover:bg-white/10 dark:hover:bg-gray-100/10 rounded-lg transition-colors duration-300"
              aria-label={mounted && theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mounted && theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-blue-100" />
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 hover:bg-white/10 dark:hover:bg-gray-100/10 rounded-lg transition-colors duration-300"
            >
              <div className="relative">
                {isOpen ? (
                  <X className="w-6 h-6 text-white dark:text-gray-100" />
                ) : (
                  <Menu className="w-6 h-6 text-white dark:text-gray-100" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-br from-blue-600/95 via-purple-600/95 to-indigo-700/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-700/95 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 rounded-b-2xl shadow-lg">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-white/20 dark:bg-gray-100/20 text-white dark:text-gray-100 font-medium'
                        : 'text-blue-100 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-100/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* Mobile Book Consultation Button */}
              <div className="px-4 pt-2">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white flex items-center justify-center space-x-2 py-3 rounded-xl shadow-lg">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Book Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
