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
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { User, Phone, Mail, Calendar, CheckCircle, AlertCircle, Building, GraduationCap } from "lucide-react"

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[1-9][\d\s\-()]{7,15}$/, "Please enter a valid phone number"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  experience: z.string().min(1, "Please select your experience level"),
  education: z.string().min(1, "Please select your education level"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  availability: z.string().min(1, "Please select your availability"),
  motivation: z.string().min(50, "Please provide more details about your motivation (minimum 50 characters)"),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
})

type FormData = z.infer<typeof formSchema>

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const countries = [
    { value: "eg", label: "Egypt" },
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "other", label: "Other" },
  ]

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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Application submitted:", data)

      setSubmitStatus("success")
      toast({
        title: "Application Submitted Successfully!",
        description: "Thank you for your interest. We'll review your application and contact you within 48 hours.",
        duration: 5000,
      })

      // Reset form after successful submission
      reset()
      setSelectedLanguages([])
    } catch (error) {
      setSubmitStatus("error")
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again or contact us directly.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Become part of our remote-first BPO team and help businesses across North America grow their outbound operations.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                Agent Application Form
              </CardTitle>
              <p className="text-gray-600 text-center">
                Tell us about yourself and why you'd be a great fit for our team
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
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
                        className={errors.firstName ? "border-red-500" : ""}
                        placeholder="First Name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className={errors.lastName ? "border-red-500" : ""}
                        placeholder="Last Name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
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
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                        placeholder="+1 234 567 8900"
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue("country", value)}>
                        <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        {...register("city")}
                        className={errors.city ? "border-red-500" : ""}
                        placeholder="Your City"
                      />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Experience & Education */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    Experience & Education
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Experience Level <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue("experience", value)}>
                        <SelectTrigger className={errors.experience ? "border-red-500" : ""}>
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
                      <Select onValueChange={(value) => setValue("education", value)}>
                        <SelectTrigger className={errors.education ? "border-red-500" : ""}>
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
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    Languages & Availability
                  </h3>

                  {/* Languages */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Languages You Speak <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {languageOptions.map((language) => (
                        <div key={language.id} className="flex items-center space-x-2">
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
                    <RadioGroup onValueChange={(value) => setValue("availability", value)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {availabilityOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
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
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Motivation</h3>

                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-sm font-medium">
                      Why do you want to join our team? <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="motivation"
                      {...register("motivation")}
                      className={`min-h-32 ${errors.motivation ? "border-red-500" : ""}`}
                      placeholder="Tell us about your motivation, relevant experience, and why you'd be a great fit for our remote team..."
                    />
                    {errors.motivation && <p className="text-red-500 text-sm">{errors.motivation.message}</p>}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
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
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-lg font-medium"
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
                        We'll review your application and contact you within 48 hours.
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
