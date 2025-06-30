"use client";

import { cn } from "@/lib/utils";
import { QrCode, ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/qr-code",
    label: "Escanear QR",
    icon: QrCode,
  },
  {
    href: "/route-sheets",
    label: "Mis Viajes",
    icon: ClipboardList,
  },
];

export const MobileNavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200/80 backdrop-blur-sm z-50">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 transition-colors",
                isActive ? "text-primary" : "text-gray-500"
              )}
            >
              <link.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}; 