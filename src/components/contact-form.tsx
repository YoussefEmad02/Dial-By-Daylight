"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Calendar,
  CheckCircle,
  AlertCircle,
  Building,
  User,
  DollarSign,
  Search,
} from "lucide-react";
import Flag from "react-flagkit";
import { getSupabaseClient } from "@/api/client";

// Enhanced form validation schema with better error messages
const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  workEmail: z
    .string()
    .min(1, "Email is required")
    .max(100, "Email must be less than 100 characters")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[1-9][\d\s\-\(\)]{7,20}$/, "Please enter a valid phone number (7-20 digits)")
    .max(25, "Phone number is too long"),
  countryCode: z.string().min(1, "Country code is required"),
  companyWebsite: z
    .string()
    .max(200, "Website URL is too long")
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  jobTitle: z
    .string()
    .min(1, "Job title is required")
    .max(100, "Job title must be less than 100 characters"),
  country: z.string().min(1, "Country is required"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  monthlyBudget: z
    .string()
    .min(1, "Please select your estimated monthly budget"),
  projectDetails: z
    .string()
    .min(10, "Please provide more details about your needs (minimum 10 characters)")
    .max(2000, "Project details must be less than 2000 characters"),
  hearAboutUs: z.string().min(1, "Please tell us how you heard about us"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [selectedCountry, setSelectedCountry] = useState<{
    flag: string;
    label: string;
  } | null>(null);
  const [characterCounts, setCharacterCounts] = useState({
    firstName: 0,
    lastName: 0,
    workEmail: 0,
    phone: 0,
    companyWebsite: 0,
    jobTitle: 0,
    projectDetails: 0,
  });
  const [countrySearch, setCountrySearch] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const countries = [
    { value: "us", label: "United States", flag: "US", code: "+1" },
    { value: "ca", label: "Canada", flag: "CA", code: "+1" },
    { value: "uk", label: "United Kingdom", flag: "GB", code: "+44" },
    { value: "au", label: "Australia", flag: "AU", code: "+61" },
    { value: "de", label: "Germany", flag: "DE", code: "+49" },
    { value: "fr", label: "France", flag: "FR", code: "+33" },
    { value: "it", label: "Italy", flag: "IT", code: "+39" },
    { value: "es", label: "Spain", flag: "ES", code: "+34" },
    { value: "nl", label: "Netherlands", flag: "NL", code: "+31" },
    { value: "be", label: "Belgium", flag: "BE", code: "+32" },
    { value: "ch", label: "Switzerland", flag: "CH", code: "+41" },
    { value: "at", label: "Austria", flag: "AT", code: "+43" },
    { value: "se", label: "Sweden", flag: "SE", code: "+46" },
    { value: "no", label: "Norway", flag: "NO", code: "+47" },
    { value: "dk", label: "Denmark", flag: "DK", code: "+45" },
    { value: "fi", label: "Finland", flag: "FI", code: "+358" },
    { value: "pl", label: "Poland", flag: "PL", code: "+48" },
    { value: "cz", label: "Czech Republic", flag: "CZ", code: "+420" },
    { value: "hu", label: "Hungary", flag: "HU", code: "+36" },
    { value: "ro", label: "Romania", flag: "RO", code: "+40" },
    { value: "bg", label: "Bulgaria", flag: "BG", code: "+359" },
    { value: "hr", label: "Croatia", flag: "HR", code: "+385" },
    { value: "si", label: "Slovenia", flag: "SI", code: "+386" },
    { value: "sk", label: "Slovakia", flag: "SK", code: "+421" },
    { value: "lt", label: "Lithuania", flag: "LT", code: "+370" },
    { value: "lv", label: "Latvia", flag: "LV", code: "+371" },
    { value: "ee", label: "Estonia", flag: "EE", code: "+372" },
    { value: "ie", label: "Ireland", flag: "IE", code: "+353" },
    { value: "pt", label: "Portugal", flag: "PT", code: "+351" },
    { value: "gr", label: "Greece", flag: "GR", code: "+30" },
    { value: "cy", label: "Cyprus", flag: "CY", code: "+357" },
    { value: "mt", label: "Malta", flag: "MT", code: "+356" },
    { value: "lu", label: "Luxembourg", flag: "LU", code: "+352" },
    { value: "jp", label: "Japan", flag: "JP", code: "+81" },
    { value: "kr", label: "South Korea", flag: "KR", code: "+82" },
    { value: "cn", label: "China", flag: "CN", code: "+86" },
    { value: "in", label: "India", flag: "IN", code: "+91" },
    { value: "br", label: "Brazil", flag: "BR", code: "+55" },
    { value: "mx", label: "Mexico", flag: "MX", code: "+52" },
    { value: "ar", label: "Argentina", flag: "AR", code: "+54" },
    { value: "cl", label: "Chile", flag: "CL", code: "+56" },
    { value: "co", label: "Colombia", flag: "CO", code: "+57" },
    { value: "pe", label: "Peru", flag: "PE", code: "+51" },
    { value: "ve", label: "Venezuela", flag: "VE", code: "+58" },
    { value: "uy", label: "Uruguay", flag: "UY", code: "+598" },
    { value: "py", label: "Paraguay", flag: "PY", code: "+595" },
    { value: "bo", label: "Bolivia", flag: "BO", code: "+591" },
    { value: "ec", label: "Ecuador", flag: "EC", code: "+593" },
    { value: "gy", label: "Guyana", flag: "GY", code: "+592" },
    { value: "sr", label: "Suriname", flag: "SR", code: "+597" },
    { value: "fk", label: "Falkland Islands", flag: "FK", code: "+500" },
    { value: "ru", label: "Russia", flag: "RU", code: "+7" },
    { value: "ua", label: "Ukraine", flag: "UA", code: "+380" },
    { value: "by", label: "Belarus", flag: "BY", code: "+375" },
    { value: "md", label: "Moldova", flag: "MD", code: "+373" },
    { value: "ge", label: "Georgia", flag: "GE", code: "+995" },
    { value: "am", label: "Armenia", flag: "AM", code: "+374" },
    { value: "az", label: "Azerbaijan", flag: "AZ", code: "+994" },
    { value: "kz", label: "Kazakhstan", flag: "KZ", code: "+7" },
    { value: "uz", label: "Uzbekistan", flag: "UZ", code: "+998" },
    { value: "kg", label: "Kyrgyzstan", flag: "KG", code: "+996" },
    { value: "tj", label: "Tajikistan", flag: "TJ", code: "+992" },
    { value: "tm", label: "Turkmenistan", flag: "TM", code: "+993" },
    { value: "af", label: "Afghanistan", flag: "AF", code: "+93" },
    { value: "pk", label: "Pakistan", flag: "PK", code: "+92" },
    { value: "bd", label: "Bangladesh", flag: "BD", code: "+880" },
    { value: "lk", label: "Sri Lanka", flag: "LK", code: "+94" },
    { value: "np", label: "Nepal", flag: "NP", code: "+977" },
    { value: "bt", label: "Bhutan", flag: "BT", code: "+975" },
    { value: "mv", label: "Maldives", flag: "MV", code: "+960" },
    { value: "my", label: "Malaysia", flag: "MY", code: "+60" },
    { value: "sg", label: "Singapore", flag: "SG", code: "+65" },
    { value: "th", label: "Thailand", flag: "TH", code: "+66" },
    { value: "vn", label: "Vietnam", flag: "VN", code: "+84" },
    { value: "ph", label: "Philippines", flag: "PH", code: "+63" },
    { value: "id", label: "Indonesia", flag: "ID", code: "+62" },
    { value: "mm", label: "Myanmar", flag: "MM", code: "+95" },
    { value: "kh", label: "Cambodia", flag: "KH", code: "+855" },
    { value: "la", label: "Laos", flag: "LA", code: "+856" },
    { value: "bn", label: "Brunei", flag: "BN", code: "+673" },
    { value: "tl", label: "Timor-Leste", flag: "TL", code: "+670" },
    { value: "mn", label: "Mongolia", flag: "MN", code: "+976" },
    { value: "sa", label: "Saudi Arabia", flag: "SA", code: "+966" },
    { value: "ae", label: "United Arab Emirates", flag: "AE", code: "+971" },
    { value: "qa", label: "Qatar", flag: "QA", code: "+974" },
    { value: "kw", label: "Kuwait", flag: "KW", code: "+965" },
    { value: "bh", label: "Bahrain", flag: "BH", code: "+973" },
    { value: "om", label: "Oman", flag: "OM", code: "+968" },
    { value: "ye", label: "Yemen", flag: "YE", code: "+967" },
    { value: "jo", label: "Jordan", flag: "JO", code: "+962" },
    { value: "lb", label: "Lebanon", flag: "LB", code: "+961" },
    { value: "sy", label: "Syria", flag: "SY", code: "+963" },
    { value: "iq", label: "Iraq", flag: "IQ", code: "+964" },
    { value: "ir", label: "Iran", flag: "IR", code: "+98" },
    { value: "tr", label: "Turkey", flag: "TR", code: "+90" },
    { value: "il", label: "Israel", flag: "IL", code: "+972" },
    { value: "ps", label: "Palestine", flag: "PS", code: "+970" },
    { value: "eg", label: "Egypt", flag: "EG", code: "+20" },
    { value: "ly", label: "Libya", flag: "LY", code: "+218" },
    { value: "tn", label: "Tunisia", flag: "TN", code: "+216" },
    { value: "dz", label: "Algeria", flag: "DZ", code: "+213" },
    { value: "ma", label: "Morocco", flag: "MA", code: "+212" },
    { value: "sd", label: "Sudan", flag: "SD", code: "+249" },
    { value: "ss", label: "South Sudan", flag: "SS", code: "+211" },
    { value: "et", label: "Ethiopia", flag: "ET", code: "+251" },
    { value: "er", label: "Eritrea", flag: "ER", code: "+291" },
    { value: "dj", label: "Djibouti", flag: "DJ", code: "+253" },
    { value: "so", label: "Somalia", flag: "SO", code: "+252" },
    { value: "ke", label: "Kenya", flag: "KE", code: "+254" },
    { value: "ug", label: "Uganda", flag: "UG", code: "+256" },
    { value: "tz", label: "Tanzania", flag: "TZ", code: "+255" },
    { value: "rw", label: "Rwanda", flag: "RW", code: "+250" },
    { value: "bi", label: "Burundi", flag: "BI", code: "+257" },
    { value: "mw", label: "Malawi", flag: "MW", code: "+265" },
    { value: "zm", label: "Zambia", flag: "ZM", code: "+260" },
    { value: "zw", label: "Zimbabwe", flag: "ZW", code: "+263" },
    { value: "bw", label: "Botswana", flag: "BW", code: "+267" },
    { value: "na", label: "Namibia", flag: "NA", code: "+264" },
    { value: "sz", label: "Eswatini", flag: "SZ", code: "+268" },
    { value: "ls", label: "Lesotho", flag: "LS", code: "+266" },
    { value: "za", label: "South Africa", flag: "ZA", code: "+27" },
    { value: "mz", label: "Mozambique", flag: "MZ", code: "+258" },
    { value: "mg", label: "Madagascar", flag: "MG", code: "+261" },
    { value: "mu", label: "Mauritius", flag: "MU", code: "+230" },
    { value: "sc", label: "Seychelles", flag: "SC", code: "+248" },
    { value: "km", label: "Comoros", flag: "KM", code: "+269" },
    { value: "ng", label: "Nigeria", flag: "NG", code: "+234" },
    { value: "gh", label: "Ghana", flag: "GH", code: "+233" },
    { value: "ci", label: "Ivory Coast", flag: "CI", code: "+225" },
    { value: "sn", label: "Senegal", flag: "SN", code: "+221" },
    { value: "ml", label: "Mali", flag: "ML", code: "+223" },
    { value: "bf", label: "Burkina Faso", flag: "BF", code: "+226" },
    { value: "ne", label: "Niger", flag: "NE", code: "+227" },
    { value: "td", label: "Chad", flag: "TD", code: "+235" },
    { value: "cm", label: "Cameroon", flag: "CM", code: "+237" },
    {
      value: "cf",
      label: "Central African Republic",
      flag: "CF",
      code: "+236",
    },
    { value: "cg", label: "Republic of the Congo", flag: "CG", code: "+242" },
    {
      value: "cd",
      label: "Democratic Republic of the Congo",
      flag: "CD",
      code: "+243",
    },
    { value: "ga", label: "Gabon", flag: "GA", code: "+241" },
    { value: "gq", label: "Equatorial Guinea", flag: "GQ", code: "+240" },
    { value: "st", label: "São Tomé and Príncipe", flag: "ST", code: "+239" },
    { value: "ao", label: "Angola", flag: "AO", code: "+244" },
    { value: "other", label: "Other", flag: "UN", code: "+1" },
  ];

  const serviceOptions = [
    { id: "phone-support", label: "Phone Customer Support" },
    { id: "chat-email-support", label: "Chat & Email Customer Support" },
    { id: "appointment-setting", label: "Appointment Setting" },
    { id: "cold-calling", label: "Cold Calling" },
    { id: "virtual-assistant", label: "Virtual Assistant" },
    { id: "lead-generation", label: "Lead Generation" },
  ];

  const budgetOptions = [
    { value: "under-1k", label: "Under $1,000/month" },
    { value: "1k-3k", label: "$1,000 - $3,000/month" },
    { value: "3k-5k", label: "$3,000 - $5,000/month" },
    { value: "5k-10k", label: "$5,000 - $10,000/month" },
    { value: "10k-20k", label: "$10,000 - $20,000/month" },
    { value: "20k-plus", label: "$20,000+/month" },
    { value: "discuss", label: "Let's discuss" },
  ];

  const hearAboutOptions = [
    { value: "google-search", label: "Google search" },
    { value: "clutch", label: "Clutch" },
    { value: "upwork", label: "Upwork" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "referral", label: "Referral" },
    { value: "social-media", label: "Social Media" },
    { value: "other", label: "Other" },
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    let updatedServices = [...selectedServices];
    if (checked) {
      updatedServices.push(serviceId);
    } else {
      updatedServices = updatedServices.filter((id) => id !== serviceId);
    }
    setSelectedServices(updatedServices);
    setValue("services", updatedServices);
  };

  const handleCountryChange = (countryValue: string) => {
    const selectedCountry = countries.find(
      (country) => country.value === countryValue
    );
    if (selectedCountry) {
      setSelectedCountryCode(selectedCountry.code);
      setSelectedCountry({
        flag: selectedCountry.flag,
        label: selectedCountry.label,
      });
      setValue("countryCode", selectedCountry.code);
      setValue("country", countryValue);
      // Clear search when country is selected
      setCountrySearch("");
    }
  };



  const handleCharacterCount = (field: keyof typeof characterCounts, value: string) => {
    setCharacterCounts(prev => ({
      ...prev,
      [field]: value.length
    }));
  };

  const getCharacterCountColor = (current: number, max: number) => {
    if (current > max * 0.9) return "text-red-500";
    if (current > max * 0.7) return "text-yellow-500";
    return "text-gray-400";
  };

  // Filter countries based on search input
  const filteredCountries = countries.filter(country =>
    country.label.toLowerCase().includes(countrySearch.toLowerCase().trim()) ||
    country.value.toLowerCase().includes(countrySearch.toLowerCase().trim())
  );

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        work_email: data.workEmail,
        phone: data.phone,
        country_code: data.countryCode,
        job_title: data.jobTitle,
        country: data.country,
        services: data.services,
        monthly_budget: data.monthlyBudget,
        project_details: data.projectDetails,
        hear_about_us: data.hearAboutUs,
        company_website: data.companyWebsite && data.companyWebsite.length > 0 ? data.companyWebsite : null,
        submitted_at: new Date().toISOString(),
      };

      const supabase = getSupabaseClient();
      const { error } = await supabase.from("contacts").insert(payload);
      if (error) throw error;

      setSubmitStatus("success");
      toast.success("Consultation Request Submitted!", {
        description: "Thank you for your interest. We&apos;ll contact you within 24 hours to schedule your free consultation.",
        duration: 5000,
      });

      // Reset form after successful submission
      reset();
      setSelectedServices([]);
      setSelectedCountryCode("+1");
      setSelectedCountry(null);
      setCountrySearch("");
      setCharacterCounts({
        firstName: 0,
        lastName: 0,
        workEmail: 0,
        phone: 0,
        companyWebsite: 0,
        jobTitle: 0,
        projectDetails: 0,
      });
    } catch (error: unknown) {
      const err = error as { message?: unknown }
      const message = typeof err?.message === "string" ? err.message : String(error)
      console.error("Form submission error:", message);
      setSubmitStatus("error");
      toast.error("Submission Failed", {
        description: "There was an error submitting your request. Please try again or contact us directly.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          Schedule Your Free Consultation
        </CardTitle>
        <p className="text-gray-600 text-center text-lg">
          Tell us about your needs and we&apos;ll create a custom solution for your
          business
        </p>
        <p className="text-sm text-gray-500 text-center mt-3">
          All fields marked with <span className="text-red-500 font-medium">*</span> are required
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-8"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Contact form for scheduling a free consultation. Please fill in all required fields marked with an asterisk.
          </div>
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
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
                  className={
                    errors.firstName ? "border-red-500 focus:ring-red-500" : ""
                  }
                  placeholder="First Name"
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                  onInput={(e) => handleCharacterCount("firstName", e.currentTarget.value)}
                />
                <p className={`text-xs ${getCharacterCountColor(characterCounts.firstName, 50)}`}>
                  {characterCounts.firstName}/50
                </p>
                {errors.firstName && (
                  <p
                    id="firstName-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className={
                    errors.lastName ? "border-red-500 focus:ring-red-500" : ""
                  }
                  placeholder="Last Name"
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                  onInput={(e) => handleCharacterCount("lastName", e.currentTarget.value)}
                />
                <p className={`text-xs ${getCharacterCountColor(characterCounts.lastName, 50)}`}>
                  {characterCounts.lastName}/50
                </p>
                {errors.lastName && (
                  <p
                    id="lastName-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Work Email */}
            <div className="space-y-2">
              <Label htmlFor="workEmail" className="text-sm font-medium">
                Work Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="workEmail"
                type="email"
                {...register("workEmail")}
                className={
                  errors.workEmail ? "border-red-500 focus:ring-red-500" : ""
                }
                placeholder="example@example.com"
                aria-describedby={
                  errors.workEmail ? "workEmail-error" : undefined
                }
                onInput={(e) => handleCharacterCount("workEmail", e.currentTarget.value)}
              />
              <p className={`text-xs ${getCharacterCountColor(characterCounts.workEmail, 100)}`}>
                {characterCounts.workEmail}/100
              </p>
              {errors.workEmail && (
                <p
                  id="workEmail-error"
                  className="text-red-500 text-sm"
                  role="alert"
                >
                  {errors.workEmail.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={handleCountryChange}>
                  <SelectTrigger
                    id="country"
                    className={
                      errors.country ? "border-red-500 focus:ring-red-500" : ""
                    }
                    aria-describedby={
                      errors.country ? "country-error" : undefined
                    }
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
                {errors.country && (
                  <p
                    id="country-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-sm font-medium">
                    <span>{selectedCountryCode}</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className={`rounded-l-none ${
                      errors.phone ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="702 123 4567"
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    onInput={(e) => handleCharacterCount("phone", e.currentTarget.value)}
                  />
                </div>
                <p className={`text-xs ${getCharacterCountColor(characterCounts.phone, 25)}`}>
                  {characterCounts.phone}/25
                </p>
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-green-600" />
              </div>
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyWebsite" className="text-sm font-medium">
                  Company Website
                </Label>
                <Input
                  id="companyWebsite"
                  {...register("companyWebsite")}
                  className={
                    errors.companyWebsite
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  }
                  placeholder="https://www.yourcompany.com"
                  aria-describedby={
                    errors.companyWebsite ? "companyWebsite-error" : undefined
                  }
                  onInput={(e) => handleCharacterCount("companyWebsite", e.currentTarget.value)}
                />
                <p className={`text-xs ${getCharacterCountColor(characterCounts.companyWebsite, 200)}`}>
                  {characterCounts.companyWebsite}/200
                </p>
                {errors.companyWebsite && (
                  <p
                    id="companyWebsite-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {errors.companyWebsite.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="jobTitle"
                  {...register("jobTitle")}
                  className={
                    errors.jobTitle ? "border-red-500 focus:ring-red-500" : ""
                  }
                  placeholder="Your Job Title"
                  aria-describedby={
                    errors.jobTitle ? "jobTitle-error" : undefined
                  }
                  onInput={(e) => handleCharacterCount("jobTitle", e.currentTarget.value)}
                />
                <p className={`text-xs ${getCharacterCountColor(characterCounts.jobTitle, 100)}`}>
                  {characterCounts.jobTitle}/100
                </p>
                {errors.jobTitle && (
                  <p
                    id="jobTitle-error"
                    className="text-red-500 text-sm"
                    role="alert"
                  >
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Services & Budget */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              Services & Budget
            </h3>

            {/* Services Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                What Services Are You Looking For?{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceOptions.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={(checked) =>
                        handleServiceChange(service.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={service.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {service.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.services && (
                <p className="text-red-500 text-sm" role="alert">
                  {errors.services.message}
                </p>
              )}
            </div>

            {/* Monthly Budget */}
            <div className="space-y-2">
              <Label htmlFor="monthlyBudget" className="text-sm font-medium">
                Please select your estimated monthly budget for the project{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => setValue("monthlyBudget", value)}
              >
                <SelectTrigger
                  id="monthlyBudget"
                  className={
                    errors.monthlyBudget
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  }
                  aria-describedby={
                    errors.monthlyBudget ? "monthlyBudget-error" : undefined
                  }
                >
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((budget) => (
                    <SelectItem key={budget.value} value={budget.value}>
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.monthlyBudget && (
                <p
                  id="monthlyBudget-error"
                  className="text-red-500 text-sm"
                  role="alert"
                >
                  {errors.monthlyBudget.message}
                </p>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              Project Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="projectDetails" className="text-sm font-medium">
                Tell us more about what you need!{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="projectDetails"
                {...register("projectDetails")}
                className={`min-h-32 ${
                  errors.projectDetails
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
                placeholder="Please describe your project requirements, goals, and any specific needs..."
                aria-describedby={
                  errors.projectDetails ? "projectDetails-error" : undefined
                }
                onInput={(e) => handleCharacterCount("projectDetails", e.currentTarget.value)}
              />
              <p className={`text-xs ${getCharacterCountColor(characterCounts.projectDetails, 2000)}`}>
                {characterCounts.projectDetails}/2000
              </p>
              {errors.projectDetails && (
                <p
                  id="projectDetails-error"
                  className="text-red-500 text-sm"
                  role="alert"
                >
                  {errors.projectDetails.message}
                </p>
              )}
            </div>
          </div>

          {/* How did you hear about us */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-indigo-600" />
              </div>
              How did you find us?
            </h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                How did you hear about us?{" "}
                <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                onValueChange={(value) => setValue("hearAboutUs", value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {hearAboutOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.hearAboutUs && (
                <p className="text-red-500 text-sm" role="alert">
                  {errors.hearAboutUs.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !isDirty}
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
                  <Calendar className="w-6 h-6 mr-3" />
                  Schedule my Consultation
                </>
              )}
            </Button>
          </div>

          {/* Form Status Indicator */}
          {isSubmitting && (
            <div className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-blue-700 text-sm">Processing your request...</span>
            </div>
          )}

          {/* Success/Error Messages */}
          {submitStatus === "success" && (
            <div
              className="flex items-center justify-center p-6 bg-green-50 border border-green-200 rounded-lg"
              role="alert"
            >
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <div className="text-center">
                <p className="text-green-800 font-medium">
                  Consultation Request Submitted!
                </p>
                <p className="text-green-700 text-sm mt-1">
                  We&apos;ll contact you within 24 hours to schedule your free
                  consultation.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div
              className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
            >
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div className="text-center">
                <p className="text-red-800 font-medium">Submission Failed</p>
                <p className="text-red-700 text-sm mt-1">
                  Please check your information and try again, or contact us
                  directly.
                </p>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
