"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Only show on contact page
  if (pathname !== "/contact") {
    return null;
  }

  const whatsappUrl = "https://wa.me/201149957822?text=Hi%20I'm%20interested%20in%20your%20services";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse-attention"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline font-medium">Chat with us</span>
    </a>
  );
}

