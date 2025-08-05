"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react"


export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
      <div 
        className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                <span className="text-white font-bold text-xl">DD</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Dial By Daylight
              </span>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed text-lg">
              Remote-first BPO providing trained, English-fluent cold callers and appointment setters to growing
              businesses across North America.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <span>contact@dialbydaylight.com</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
                <span>Egypt • Remote-First</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center text-blue-100 hover:text-white transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="flex items-center text-blue-100 hover:text-white transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="flex items-center text-blue-100 hover:text-white transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/industries" 
                  className="flex items-center text-blue-100 hover:text-white transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                  <span>Industries</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/apply" 
                  className="flex items-center text-blue-100 hover:text-white transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                  <span>Apply for Agents</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="flex items-center text-blue-100 hover:text-white transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Connect With Us</h3>
            <div className="space-y-6">
              {/* Social Media */}
              <div>
                <p className="text-blue-100 mb-4">Follow us on social media</p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg" 
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg" 
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg" 
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg" 
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="text-center">
            <p className="text-blue-100">
              © 2025 Dial By Daylight. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
