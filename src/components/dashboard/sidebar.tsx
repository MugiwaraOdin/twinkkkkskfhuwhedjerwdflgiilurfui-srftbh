"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, BookOpen, Award, Settings, LogOut, X, User, 
  ChevronLeft, ChevronRight, BarChart3, Upload
} from "lucide-react";

interface DashboardSidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: DashboardSidebarProps) {
  const { logout, user } = usePrivy();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true); // Default to collapsed
  const [isMobile, setIsMobile] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if we're on mobile and set display name
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setCollapsed(false); // Always expanded on mobile
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    // Get display name from localStorage if available
    const savedName = localStorage.getItem('displayName');
    if (savedName) {
      setDisplayName(savedName);
    } else if (user?.email && typeof user.email === 'string') {
      // Default to email username if no saved name
      setDisplayName(user.email.split('@')[0]);
    }
    
    // Load saved profile image from localStorage
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [user]);

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Profile", path: "/dashboard/profile", icon: <User className="w-5 h-5" /> },
    { name: "Analytics", path: "/dashboard/profile/analytics", icon: <BarChart3 className="w-5 h-5" /> },
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

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={`${
        collapsed ? 'w-16' : 'w-56'
      } bg-black border-r border-gray-800/30 h-screen flex flex-col md:gradient-border-r transition-all duration-300 ease-in-out relative`}
    >
      {/* Hidden file input for profile image upload */}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleImageUpload}
        ref={fileInputRef}
      />

      {/* Toggle collapse button */}
      {!isMobile && (
        <button 
          onClick={toggleCollapse}
          className="absolute -right-3 top-20 bg-primary text-black rounded-full p-1 shadow-lg z-10 hover:bg-primary/90 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      )}

      <div className={`${collapsed ? 'justify-center p-3' : 'justify-between p-4'} flex items-center`}>
        <Link href="/" className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2'}`}>
          <Image src="/phoenix-logo.svg" alt="Pnyx Institute Logo" width={collapsed ? 28 : 32} height={collapsed ? 28 : 32} className="rounded-full" />
          {!collapsed && <span className="text-lg font-bold text-primary">Pnyx</span>}
        </Link>
        
        {/* Close button for mobile */}
        {onClose && !collapsed && (
          <button 
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-900 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="px-3 py-2 mb-4">
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="flex items-center space-x-3">
              <div 
                className="relative w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-black font-bold text-lg cursor-pointer overflow-hidden group"
                onClick={triggerFileInput}
              >
                {profileImage ? (
                  <Image src={profileImage} alt="Profile" fill style={{ objectFit: 'cover' }} />
                ) : (
                  displayName ? displayName[0].toUpperCase() : "U"
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <p className="text-white font-medium truncate max-w-[120px]">
                  {displayName || "User"}
                </p>
                <p className="text-xs text-gray-400 truncate max-w-[120px]">
                  {user?.wallet?.address ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : "No wallet connected"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="flex justify-center py-3">
          <div 
            className="relative w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-black font-bold text-lg cursor-pointer overflow-hidden group"
            onClick={triggerFileInput}
          >
            {profileImage ? (
              <Image src={profileImage} alt="Profile" fill style={{ objectFit: 'cover' }} />
            ) : (
              displayName ? displayName[0].toUpperCase() : "U"
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      )}

      <nav className={`${collapsed ? 'px-2' : 'px-3'} py-2 flex-grow overflow-y-auto`}>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={handleNavClick}
                className={`flex items-center ${
                  collapsed ? 'justify-center px-1.5' : 'px-3'
                } py-2.5 rounded-lg transition-colors ${
                  pathname === item.path || (item.path !== "/dashboard" && pathname?.startsWith(item.path))
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
                }`}
                title={collapsed ? item.name : undefined}
              >
                <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                {!collapsed && item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${collapsed ? 'px-2' : 'px-3'} py-4`}>
        <button
          onClick={handleLogout}
          className={`w-full ${
            collapsed ? 'justify-center px-1.5' : 'px-3'
          } py-2.5 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors rounded-lg flex items-center ${
            collapsed ? 'justify-center' : 'text-left'
          }`}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );
}