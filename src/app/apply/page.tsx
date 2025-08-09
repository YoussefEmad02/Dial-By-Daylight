"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ApplicationForm from "@/components/application-form"

export default function ApplyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
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
            <div className="inline-flex flex-col sm:flex-row items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-8 border border-white/20 shadow-lg">
              <span className="mr-0 sm:mr-2 mb-1 sm:mb-0">🚀</span>
              <span className="text-center sm:text-left">Remote Opportunities</span>
              <span className="mx-0 sm:mx-2 hidden sm:inline">•</span>
              <span className="text-center sm:text-left">Global Team</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Join Our Team
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              Become part of our remote-first BPO team and help businesses worldwide grow their outbound operations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplicationForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}


