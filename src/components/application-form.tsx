"use client"

import { useState } from "react"
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
import { CalendarDays, Send, CheckCircle, AlertCircle, Mic, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Form validation schema
const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[1-9][\d\s\-$$$$]{7,15}$/, "Please enter a valid phone number"),
  voiceMemoLink: z
    .string()
    .min(1, "Voice memo link is required")
    .url("Please enter a valid URL")
    .refine((url) => url.includes("vocaroo.com"), "Please use a Vocaroo.com link"),
  availableStartDate: z.date().refine((date) => date !== undefined, {
    message: "Please select your available start date",
  }),
  employmentStatus: z.enum(["employed", "between-jobs", "self-employed"]).refine((val) => val !== undefined, {
    message: "Please select your employment status",
  }),
  applicationSource: z.enum(["upwork", "linkedin", "facebook", "google", "wuzzuf", "bayt", "referral"]).refine((val) => val !== undefined, {
    message: "Please select where you found this opportunity",
  }),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedDate, setSelectedDate] = useState<Date>()


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  })

  const employmentStatus = watch("employmentStatus")

  const employmentOptions = [
    { value: "employed", label: "Currently Employed" },
    { value: "between-jobs", label: "In Between Jobs" },
    { value: "self-employed", label: "Self-Employed" },
  ]

  const sourceOptions = [
    { value: "upwork", label: "Upwork" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "facebook", label: "Facebook" },
    { value: "google", label: "Google Search" },
    { value: "wuzzuf", label: "Wuzzuf" },
    { value: "bayt", label: "Bayt.com" },
    { value: "referral", label: "Referral" },
  ]

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, you would send the data to your backend
      console.log("Application submitted:", data)

      setSubmitStatus("success")
      toast.success("Application Submitted Successfully!", {
        description: "Thank you for your application. We'll review it and get back to you within 48 hours.",
        duration: 5000,
      })

      // Reset form after successful submission
      reset()
      setSelectedDate(undefined)
    } catch {
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
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Send className="w-6 h-6 text-blue-600" />
          Agent Application Form
        </CardTitle>
        <p className="text-gray-600 text-center">
          Complete all fields below to submit your application. Fields marked with * are required.
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

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
                  placeholder="Enter your first name"
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
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
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
                  placeholder="+20 123 456 7890"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Voice Memo Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Voice Introduction</h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Mic className="w-6 h-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Voice Memo Instructions</h4>
                  <p className="text-gray-600 mb-4">
                    Please record a voice memo introducing yourself and your experience in English:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>
                      Go to{" "}
                      <a
                        href="https://vocaroo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center"
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
              <Label htmlFor="voiceMemoLink" className="text-sm font-medium">
                Voice Memo Link <span className="text-red-500">*</span>
              </Label>
              <Input
                id="voiceMemoLink"
                {...register("voiceMemoLink")}
                className={errors.voiceMemoLink ? "border-red-500" : ""}
                placeholder="https://vocaroo.com/your-recording-link"
              />
              {errors.voiceMemoLink && <p className="text-red-500 text-sm">{errors.voiceMemoLink.message}</p>}
              <p className="text-xs text-gray-500">
                Make sure to use a Vocaroo.com link. Other platforms will not be accepted.
              </p>
            </div>
          </div>

          {/* Availability & Status */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Availability & Status</h3>

            {/* Start Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                When are you available to start? <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                      errors.availableStartDate && "border-red-500",
                    )}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select your available start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      if (date) {
                        setValue("availableStartDate", date)
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.availableStartDate && <p className="text-red-500 text-sm">{errors.availableStartDate.message}</p>}
            </div>

            {/* Employment Status */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                What is your current employment status? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={employmentStatus}
                onValueChange={(value) => setValue("employmentStatus", value as "employed" | "between-jobs" | "self-employed")}
                className="space-y-2"
              >
                {employmentOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.employmentStatus && <p className="text-red-500 text-sm">{errors.employmentStatus.message}</p>}
            </div>
          </div>

          {/* Application Source */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Application Source</h3>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Important Note</p>
                  <p className="text-sm text-yellow-700">
                    Please answer accurately as this is very important for your application&apos;s processing.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Where did you apply from? <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("applicationSource", value as "upwork" | "linkedin" | "facebook" | "google" | "wuzzuf" | "bayt" | "referral")}>
                <SelectTrigger className={errors.applicationSource ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select where you found this opportunity" />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.applicationSource && <p className="text-red-500 text-sm">{errors.applicationSource.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-12 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
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
