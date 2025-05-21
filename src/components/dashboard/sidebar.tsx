"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, BookOpen, Award, Settings, LogOut, X } from "lucide-react";

interface DashboardSidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: DashboardSidebarProps) {
  const { logout, user } = usePrivy();
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Learn", path: "/dashboard/learn", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Rewards", path: "/dashboard/rewards", icon: <Award className="w-5 h-5" /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    if (onClose) {
      onClose();
    }
    logout();
  };

  return (
    <div className="w-64 bg-black border-r border-gray-800 h-screen overflow-y-auto md:gradient-border-r">
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/phoenix-logo.svg" alt="Pnyx Institute Logo" width={36} height={36} className="rounded-full" />
          <span className="text-xl font-bold text-primary">Pnyx Institute</span>
        </Link>
        
        {/* Close button for mobile */}
        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-900 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      <div className="px-4 py-2 mb-6">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-black font-bold text-lg">
              {user?.email && typeof user.email === 'string' ? user.email[0].toUpperCase() : "U"}
            </div>
            <div>
              <p className="text-white font-medium truncate max-w-[140px]">
                {user?.email && typeof user.email === 'string' ? user.email.split('@')[0] : "User"}
              </p>
              <p className="text-xs text-gray-400 truncate max-w-[140px]">
                {user?.wallet?.address ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : "No wallet connected"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav className="px-4 py-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={handleNavClick}
                className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                  pathname === item.path
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-8 left-0 right-0 px-4">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors text-left rounded-xl flex items-center"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}