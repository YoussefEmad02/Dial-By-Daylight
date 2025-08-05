"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { User, CheckCircle, AlertCircle, Building, GraduationCap, Search, Send } from "lucide-react"
import Flag from "react-flagkit"

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address").max(100, "Email must be less than 100 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[1-9][\d\s\-()]{7,15}$/, "Please enter a valid phone number")
    .max(20, "Phone number must be less than 20 characters"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required").max(100, "City must be less than 100 characters"),
  experience: z.string().min(1, "Please select your experience level"),
  education: z.string().min(1, "Please select your education level"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  availability: z.string().min(1, "Please select your availability"),
  motivation: z.string().min(50, "Please provide more details about your motivation (minimum 50 characters)").max(1000, "Motivation must be less than 1000 characters"),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
})

type FormData = z.infer<typeof formSchema>

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string; flag: string } | null>(null)
  const [countrySearch, setCountrySearch] = useState("")
  const [characterCounts, setCharacterCounts] = useState({
    firstName: 0,
    lastName: 0,
    email: 0,
    phone: 0,
    city: 0,
    motivation: 0,
  })
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    experience: '',
    education: '',
    availability: '',
    motivation: '',
  })


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const countries = [
    { value: "eg", label: "Egypt", flag: "EG" },
    { value: "us", label: "United States", flag: "US" },
    { value: "ca", label: "Canada", flag: "CA" },
    { value: "uk", label: "United Kingdom", flag: "GB" },
    { value: "au", label: "Australia", flag: "AU" },
    { value: "de", label: "Germany", flag: "DE" },
    { value: "fr", label: "France", flag: "FR" },
    { value: "es", label: "Spain", flag: "ES" },
    { value: "it", label: "Italy", flag: "IT" },
    { value: "nl", label: "Netherlands", flag: "NL" },
    { value: "se", label: "Sweden", flag: "SE" },
    { value: "no", label: "Norway", flag: "NO" },
    { value: "dk", label: "Denmark", flag: "DK" },
    { value: "fi", label: "Finland", flag: "FI" },
    { value: "ch", label: "Switzerland", flag: "CH" },
    { value: "at", label: "Austria", flag: "AT" },
    { value: "be", label: "Belgium", flag: "BE" },
    { value: "ie", label: "Ireland", flag: "IE" },
    { value: "nz", label: "New Zealand", flag: "NZ" },
    { value: "sg", label: "Singapore", flag: "SG" },
    { value: "jp", label: "Japan", flag: "JP" },
    { value: "kr", label: "South Korea", flag: "KR" },
    { value: "in", label: "India", flag: "IN" },
    { value: "br", label: "Brazil", flag: "BR" },
    { value: "mx", label: "Mexico", flag: "MX" },
    { value: "ar", label: "Argentina", flag: "AR" },
    { value: "cl", label: "Chile", flag: "CL" },
    { value: "co", label: "Colombia", flag: "CO" },
    { value: "pe", label: "Peru", flag: "PE" },
    { value: "za", label: "South Africa", flag: "ZA" },
    { value: "ng", label: "Nigeria", flag: "NG" },
    { value: "ke", label: "Kenya", flag: "KE" },
    { value: "gh", label: "Ghana", flag: "GH" },
    { value: "ma", label: "Morocco", flag: "MA" },
    { value: "tn", label: "Tunisia", flag: "TN" },
    { value: "dz", label: "Algeria", flag: "DZ" },
    { value: "lb", label: "Lebanon", flag: "LB" },
    { value: "jo", label: "Jordan", flag: "JO" },
    { value: "sa", label: "Saudi Arabia", flag: "SA" },
    { value: "ae", label: "United Arab Emirates", flag: "AE" },
    { value: "qa", label: "Qatar", flag: "QA" },
    { value: "kw", label: "Kuwait", flag: "KW" },
    { value: "bh", label: "Bahrain", flag: "BH" },
    { value: "om", label: "Oman", flag: "OM" },
    { value: "other", label: "Other", flag: "UN" },
  ]

  const filteredCountries = countries.filter(country =>
    country.label.toLowerCase().includes(countrySearch.toLowerCase())
  )

  const experienceOptions = [
    { value: "no-experience", label: "No experience" },
    { value: "1-2-years", label: "1-2 years" },
    { value: "3-5-years", label: "3-5 years" },
    { value: "5-plus-years", label: "5+ years" },
  ]

  const educationOptions = [
    { value: "high-school", label: "High School" },
    { value: "bachelors", label: "Bachelor's Degree" },
    { value: "masters", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
    { value: "other", label: "Other" },
  ]

  const languageOptions = [
    { id: "english", label: "English (Fluent)" },
    { id: "arabic", label: "Arabic (Native)" },
    { id: "french", label: "French" },
    { id: "spanish", label: "Spanish" },
    { id: "german", label: "German" },
    { id: "other", label: "Other" },
  ]

  const availabilityOptions = [
    { value: "full-time", label: "Full-time (40+ hours/week)" },
    { value: "part-time", label: "Part-time (20-30 hours/week)" },
    { value: "flexible", label: "Flexible hours" },
    { value: "weekends", label: "Weekends only" },
  ]

  const handleLanguageChange = (languageId: string, checked: boolean) => {
    let updatedLanguages = [...selectedLanguages]
    if (checked) {
      updatedLanguages.push(languageId)
    } else {
      updatedLanguages = updatedLanguages.filter((id) => id !== languageId)
    }
    setSelectedLanguages(updatedLanguages)
    setValue("languages", updatedLanguages)
  }

  const handleCountryChange = (value: string) => {
    const country = countries.find(c => c.value === value)
    if (country) {
      setSelectedCountry(country)
      setValue("country", value)
      setFormValues(prev => ({ ...prev, country: value }))
    }
  }

  const handleCharacterCount = (field: keyof typeof characterCounts, value: string) => {
    setCharacterCounts(prev => ({
      ...prev,
      [field]: value.length
    }))
  }

  const getCharacterCountColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "text-red-500"
    if (percentage >= 75) return "text-yellow-500"
    return "text-gray-400"
  }

  const isFormComplete = () => {
    return (
      formValues.firstName.trim() !== '' &&
      formValues.lastName.trim() !== '' &&
      formValues.email.trim() !== '' &&
      formValues.phone.trim() !== '' &&
      formValues.country !== '' &&
      formValues.city.trim() !== '' &&
      formValues.experience !== '' &&
      formValues.education !== '' &&
      selectedLanguages.length > 0 &&
      formValues.availability !== '' &&
      formValues.motivation.trim().length >= 50 &&
      formValues.motivation.trim().length <= 1000
    )
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Application submitted:", data)

      setSubmitStatus("success")
      toast.success("Application Submitted Successfully!", {
        description: "Thank you for your interest. We&apos;ll review your application and contact you within 48 hours.",
        duration: 5000,
      })

      // Reset form after successful submission
      reset()
      setSelectedLanguages([])
      setSelectedCountry(null)
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        experience: '',
        education: '',
        availability: '',
        motivation: '',
      })
      setCharacterCounts({
        firstName: 0,
        lastName: 0,
        email: 0,
        phone: 0,
        city: 0,
        motivation: 0,
      })
    } catch {
      setSubmitStatus("error")
      toast.error("Submission Failed", {
        description: "There was an error submitting your application. Please try again or contact us directly.",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Enhanced Badge */}
            <div className="inline-flex flex-col sm:flex-row items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-8 border border-white/20 hover:scale-105 transition-transform duration-500 shadow-lg hover:bg-white/20">
              <span className="mr-0 sm:mr-2 mb-1 sm:mb-0">🚀</span>
              <span className="text-center sm:text-left">Remote Opportunities</span>
              <span className="mx-0 sm:mx-2 hidden sm:inline">•</span>
              <span className="text-center sm:text-left">Global Team</span>
            </div>
            
            {/* Enhanced Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Join Our Team
              </span>
            </h1>
            
            {/* Enhanced Description */}
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              Become part of our remote-first BPO team and help businesses worldwide grow their outbound operations.
            </p>
            
            {/* Enhanced Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto px-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200 mb-2">Flexible</div>
                <div className="text-sm sm:text-base text-blue-100 font-medium">Remote Work</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="text-2xl sm:text-3xl font-bold text-purple-200 mb-2">Competitive</div>
                <div className="text-sm sm:text-base text-purple-100 font-medium">Compensation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-500 sm:col-span-2 lg:col-span-1">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-200 mb-2">Growth</div>
                <div className="text-sm sm:text-base text-indigo-100 font-medium">Opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-gray-900 p-8">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                Agent Application Form
              </CardTitle>
              <p className="text-gray-600 text-center text-lg mt-4">
                Tell us about yourself and why you&apos;d be a great fit for our global team
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    Personal Information
                  </h3>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className={`${errors.firstName ? "border-red-500 focus:ring-red-500" : ""} transition-all duration-300`}
                        placeholder="First Name"
                        onChange={(e) => {
                          handleCharacterCount('firstName', e.target.value)
                          setFormValues(prev => ({ ...prev, firstName: e.target.value }))
                        }}
                      />
                      <div className="flex justify-between items-center">
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                        <span className={`text-xs ${getCharacterCountColor(characterCounts.firstName, 50)}`}>
                          {characterCounts.firstName}/50
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className={`${errors.lastName ? "border-red-500 focus:ring-red-500" : ""} transition-all duration-300`}
                        placeholder="Last Name"
                        onChange={(e) => {
                          handleCharacterCount('lastName', e.target.value)
                          setFormValues(prev => ({ ...prev, lastName: e.target.value }))
                        }}
                      />
                      <div className="flex justify-between items-center">
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                        <span className={`text-xs ${getCharacterCountColor(characterCounts.lastName, 50)}`}>
                          {characterCounts.lastName}/50
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={`${errors.email ? "border-red-500 focus:ring-red-500" : ""} transition-all duration-300`}
                        placeholder="your.email@example.com"
                        onChange={(e) => {
                          handleCharacterCount('email', e.target.value)
                          setFormValues(prev => ({ ...prev, email: e.target.value }))
                        }}
                      />
                      <div className="flex justify-between items-center">
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        <span className={`text-xs ${getCharacterCountColor(characterCounts.email, 100)}`}>
                          {characterCounts.email}/100
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className={`${errors.phone ? "border-red-500 focus:ring-red-500" : ""} transition-all duration-300`}
                        placeholder="+1 234 567 8900"
                        onChange={(e) => {
                          handleCharacterCount('phone', e.target.value)
                          setFormValues(prev => ({ ...prev, phone: e.target.value }))
                        }}
                      />
                      <div className="flex justify-between items-center">
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        <span className={`text-xs ${getCharacterCountColor(characterCounts.phone, 20)}`}>
                          {characterCounts.phone}/20
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={handleCountryChange}>
                        <SelectTrigger
                          className={errors.country ? "border-red-500 focus:ring-red-500" : ""}
                          aria-describedby={errors.country ? "country-error" : undefined}
                        >
                          <SelectValue placeholder="Please Select">
                            {selectedCountry && (
                              <div className="flex items-center gap-2">
                                <Flag country={selectedCountry.flag} size={20} />
                                <span>{selectedCountry.label}</span>
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {/* Search Input */}
                          <div className="flex items-center px-3 py-2 border-b">
                            <Search className="h-4 w-4 text-gray-400 mr-2" />
                            <input
                              type="text"
                              placeholder="Search countries..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
                              onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                  e.preventDefault();
                                  setCountrySearch("");
                                }
                              }}
                            />
                          </div>
                          
                          {/* Country List */}
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                <div className="flex items-center gap-2">
                                  <Flag country={country.flag} size={20} />
                                  <span>{country.label}</span>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              No countries found matching &quot;{countrySearch}&quot;
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      {errors.country && <p className="text-red-500 text-sm" id="country-error">{errors.country.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        {...register("city")}
                        className={`${errors.city ? "border-red-500 focus:ring-red-500" : ""} transition-all duration-300`}
                        placeholder="Your City"
                        onChange={(e) => {
                          handleCharacterCount('city', e.target.value)
                          setFormValues(prev => ({ ...prev, city: e.target.value }))
                        }}
                      />
                      <div className="flex justify-between items-center">
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                        <span className={`text-xs ${getCharacterCountColor(characterCounts.city, 100)}`}>
                          {characterCounts.city}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience & Education */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    Experience & Education
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Experience Level <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={(value) => {
                        setValue("experience", value)
                        setFormValues(prev => ({ ...prev, experience: value }))
                      }}>
                        <SelectTrigger className={errors.experience ? "border-red-500 focus:ring-red-500" : ""}>
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Education Level <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={(value) => {
                        setValue("education", value)
                        setFormValues(prev => ({ ...prev, education: value }))
                      }}>
                        <SelectTrigger className={errors.education ? "border-red-500 focus:ring-red-500" : ""}>
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.education && <p className="text-red-500 text-sm">{errors.education.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Languages & Availability */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building className="w-4 h-4 text-white" />
                    </div>
                    Languages & Availability
                  </h3>

                  {/* Languages */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Languages You Speak <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {languageOptions.map((language) => (
                        <div key={language.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <Checkbox
                            id={language.id}
                            checked={selectedLanguages.includes(language.id)}
                            onCheckedChange={(checked) => handleLanguageChange(language.id, checked as boolean)}
                          />
                          <Label htmlFor={language.id} className="text-sm font-normal cursor-pointer">
                            {language.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.languages && <p className="text-red-500 text-sm">{errors.languages.message}</p>}
                  </div>

                  {/* Availability */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Availability <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup onValueChange={(value) => {
                      setValue("availability", value)
                      setFormValues(prev => ({ ...prev, availability: value }))
                    }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {availabilityOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                    {errors.availability && <p className="text-red-500 text-sm">{errors.availability.message}</p>}
                  </div>
                </div>

                {/* Motivation */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                    Motivation
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-sm font-medium">
                      Why do you want to join our team? <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="motivation"
                      {...register("motivation")}
                      className={`min-h-32 ${errors.motivation ? "border-red-500 focus:ring-red-500" : ""} transition-all duration-300`}
                      placeholder="Tell us about your motivation, relevant experience, and why you&apos;d be a great fit for our remote team..."
                      onChange={(e) => {
                        handleCharacterCount('motivation', e.target.value)
                        setFormValues(prev => ({ ...prev, motivation: e.target.value }))
                      }}
                    />
                    <div className="flex justify-between items-center">
                      {errors.motivation && <p className="text-red-500 text-sm">{errors.motivation.message}</p>}
                      <span className={`text-xs ${getCharacterCountColor(characterCounts.motivation, 1000)}`}>
                        {characterCounts.motivation}/1000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <Checkbox
                      id="agreeToTerms"
                      {...register("agreeToTerms")}
                      className={errors.agreeToTerms ? "border-red-500" : ""}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm font-normal cursor-pointer">
                      I agree to the terms and conditions and privacy policy
                    </Label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isFormComplete()}
                    className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-lg font-medium text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <User className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center justify-center p-6 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <div className="text-center">
                      <p className="text-green-800 font-medium">Application Submitted Successfully!</p>
                      <p className="text-green-700 text-sm mt-1">
                        We&apos;ll review your application and contact you within 48 hours.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                    <div className="text-center">
                      <p className="text-red-800 font-medium">Submission Failed</p>
                      <p className="text-red-700 text-sm mt-1">
                        Please check your information and try again, or contact us directly.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
