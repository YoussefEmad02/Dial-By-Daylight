"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { CalendarDays, Send, CheckCircle, AlertCircle, Mic, ExternalLink, User, Search } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { getSupabaseClient } from "@/api/client"

// Form validation schema
const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[1-9][\d\s\-()]{7,15}$/, "Please enter a valid phone number"),
  countryCode: z.string().min(1, "Country code is required"),
  voiceMemoLink: z
    .string()
    .min(1, "Voice memo link is required")
    .url("Please enter a valid URL")
    .refine((url) => {
      try {
        const host = new URL(url).hostname.replace(/^www\./, "");
        return host === "vocaroo.com" || host === "voca.ro";
      } catch {
        return false;
      }
    }, "Please use a valid Vocaroo link (vocaroo.com or voca.ro)"),
  availableStartDate: z.date().refine((date) => date !== undefined, {
    message: "Please select your available start date",
  }),
  employmentStatus: z.enum(["employed", "between-jobs", "unemployed"]).refine((val) => val !== undefined, {
    message: "Please select your employment status",
  }),
  applicationSource: z.enum(["upwork", "linkedin", "facebook", "google", "indeed", "wuzzuf", "bayt", "referral"]).refine((val) => val !== undefined, {
    message: "Please select where you found this opportunity",
  }),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string; flag: string; code: string } | null>({ value: "eg", label: "Egypt", flag: "EG", code: "+20" })


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  })



  const countryCodes = [
    { value: "eg", label: "Egypt", flag: "EG", code: "+20" },
    { value: "us", label: "United States", flag: "US", code: "+1" },
    { value: "ca", label: "Canada", flag: "CA", code: "+1" },
    { value: "uk", label: "United Kingdom", flag: "GB", code: "+44" },
    { value: "de", label: "Germany", flag: "DE", code: "+49" },
    { value: "fr", label: "France", flag: "FR", code: "+33" },
    { value: "sa", label: "Saudi Arabia", flag: "SA", code: "+966" },
    { value: "ae", label: "UAE", flag: "AE", code: "+971" },
    { value: "in", label: "India", flag: "IN", code: "+91" },
  ]

  useEffect(() => {
    // Set default country code on mount
    if (selectedCountry) {
      setValue("countryCode", selectedCountry.code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCountryCodeChange = (countryValue: string) => {
    const country = countryCodes.find(c => c.value === countryValue)
    if (country) {
      setSelectedCountry(country)
      setValue("countryCode", country.code)
    }
  }

  const employmentOptions = [
    { value: "employed", label: "Currently Employed" },
    { value: "between-jobs", label: "In Between Jobs" },
    { value: "unemployed", label: "Unemployed" },
  ]

  const sourceOptions = [
    { value: "upwork", label: "Upwork" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "facebook", label: "Facebook" },
    { value: "google", label: "Google Search" },
    { value: "indeed", label: "Indeed" },
    { value: "wuzzuf", label: "Wuzzuf" },
    { value: "bayt", label: "Bayt.com" },
    { value: "referral", label: "Referral" },
  ]

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        country_code: data.countryCode,
        voice_memo_link: data.voiceMemoLink,
        available_start_date: data.availableStartDate?.toISOString(),
        employment_status: data.employmentStatus,
        application_source: data.applicationSource,
        submitted_at: new Date().toISOString(),
      }

      const supabase = getSupabaseClient()
      const { error } = await supabase.from("applications").insert(payload)
      if (error) throw error

      setSubmitStatus("success")
      toast.success("Application Submitted Successfully!", {
        description: "Thank you for your application. We'll review it and get back to you within 48 hours.",
        duration: 5000,
      })

      // Reset form after successful submission
      reset()
      setSelectedDate(undefined)
    } catch (error: unknown) {
      const err = error as { message?: unknown }
      const message = typeof err?.message === "string" ? err.message : String(error)
      console.error("Application submission error:", message)
      setSubmitStatus("error")
      toast.error("Submission Failed", {
        description: "There was an error submitting your application. Please try again or contact support.",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2 text-gray-900 dark:text-white">
          <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Agent Application Form
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
          Complete all fields below to submit your application. Fields marked with * are required.
        </p>
        <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Important Note</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Please answer accurately as this is very important for your application&apos;s processing.
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Personal Information
            </h3>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-900 dark:text-white">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className={errors.firstName ? "border-red-500 focus:ring-red-500" : ""}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p id="firstName-error" className="text-red-500 text-sm" role="alert">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-900 dark:text-white">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className={errors.lastName ? "border-red-500 focus:ring-red-500" : ""}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p id="lastName-error" className="text-red-500 text-sm" role="alert">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-white">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm" role="alert">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <div className="flex">
                  <Select onValueChange={handleCountryCodeChange}>
                    <SelectTrigger className={`rounded-r-none w-36 ${errors.countryCode ? "border-red-500 focus:ring-red-500" : ""}`}>
                      <SelectValue placeholder={selectedCountry ? `${selectedCountry.code}` : "+Code"}>
                        {selectedCountry && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{selectedCountry.code}</span>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {/* Optional search could be added if needed */}
                      {countryCodes.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          <div className="flex items-center gap-2">
                            <span>{country.label}</span>
                            <span className="ml-auto text-gray-500 dark:text-gray-400 text-xs">{country.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className={`rounded-l-none ${errors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm" role="alert">{errors.phone.message}</p>
                )}
                {errors.countryCode && (
                  <p id="countryCode-error" className="text-red-500 text-sm" role="alert">{errors.countryCode.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Voice Memo */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
              <Mic className="w-5 h-5 text-green-600 dark:text-green-400" />
              Voice Memo
            </h3>

            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Mic className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Voice Memo Instructions</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Please record a voice memo introducing yourself and your experience in English:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <li>
                        Go to{" "}
                        <a
                          href="https://vocaroo.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                        >
                          vocaroo.com <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </li>
                      <li>Record your voice memo (2-3 minutes recommended)</li>
                      <li>Click on the copy icon below the voice memo</li>
                      <li>Paste the link in the field below</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voiceMemoLink" className="text-sm font-medium text-gray-900 dark:text-white">
                  Voice Memo Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="voiceMemoLink"
                  {...register("voiceMemoLink")}
                  className={errors.voiceMemoLink ? "border-red-500 focus:ring-red-500" : ""}
                  placeholder="https://vocaroo.com/your-recording-link"
                />
                {errors.voiceMemoLink && (
                  <p id="voiceMemoLink-error" className="text-red-500 text-sm" role="alert">{errors.voiceMemoLink.message}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Make sure to use a Vocaroo.com link. Other platforms will not be accepted.
                </p>
              </div>
            </div>
          </div>

          {/* Availability & Status */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Availability & Status
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  Available Start Date <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        setValue("availableStartDate", date!)
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.availableStartDate && (
                  <p className="text-red-500 text-sm" role="alert">{errors.availableStartDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  Employment Status <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => setValue("employmentStatus", value as "employed" | "between-jobs" | "unemployed")}
                  className="space-y-2"
                >
                  {employmentOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer text-gray-900 dark:text-white">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.employmentStatus && (
                  <p className="text-red-500 text-sm" role="alert">{errors.employmentStatus.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Application Source */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
              <Search className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              How did you find us?
            </h3>

            

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Where did you find this opportunity? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                onValueChange={(value) => setValue("applicationSource", value as "upwork" | "linkedin" | "facebook" | "google" | "wuzzuf" | "bayt" | "referral")}
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                {sourceOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer text-gray-900 dark:text-white">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.applicationSource && (
                <p className="text-red-500 text-sm" role="alert">{errors.applicationSource.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-16 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-xl font-bold relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 animate-pulse"></div>
                  <div className="relative flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span className="text-lg">Submitting...</span>
                  </div>
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 mr-3" />
                  Submit Application
                </>
              )}
            </Button>
          </div>

          {/* Form Status Indicator */}
          {isSubmitting && (
            <div className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-blue-700 dark:text-blue-300 text-sm">Processing your application...</span>
            </div>
          )}

          {/* Success/Error Messages */}
          {submitStatus === "success" && (
            <div
              className="flex items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg"
              role="alert"
            >
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
              <div className="text-center">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  Application Submitted Successfully!
                </p>
                <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                  We&apos;ll review your application and contact you within 48 hours.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div
              className="flex items-center justify-center p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg"
              role="alert"
            >
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
              <div className="text-center">
                <p className="text-red-800 dark:text-red-200 font-medium">Submission Failed</p>
                <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                  Please check your information and try again, or contact support.
                </p>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
