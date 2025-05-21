"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Award, Settings, LogOut } from "lucide-react";

export default function MobileNav() {
  const { logout } = usePrivy();
  const pathname = usePathname();

  const navItems = [
    { 
      name: "Overview", 
      path: "/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: "Learn", 
      path: "/dashboard/learn", 
      icon: <BookOpen className="h-5 w-5" /> 
    },
    { 
      name: "Rewards", 
      path: "/dashboard/rewards", 
      icon: <Award className="h-5 w-5" /> 
    },
    { 
      name: "Settings", 
      path: "/dashboard/settings", 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="md:hidden">
      {/* Fixed bottom navigation bar with enhanced styling */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40 shadow-xl">
        <div className="flex justify-around items-center py-3 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 ${
                pathname === item.path
                  ? "text-primary font-medium bg-primary/10 border border-primary/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/40 border border-transparent"
              }`}
            >
              <span className="mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}