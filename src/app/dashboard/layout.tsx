"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/sidebar";
import MobileNav from "@/components/dashboard/mobile-nav";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated, ready } = usePrivy();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    } else if (ready && authenticated) {
      // Add a small delay to ensure smooth transitions
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [ready, authenticated, router]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('dashboard-sidebar');
      if (sidebar && !sidebar.contains(event.target as Node) && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  if (!ready || !authenticated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar with toggle functionality */}
      <div 
        id="dashboard-sidebar"
        className={`fixed md:static inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Enhanced Mobile header with better styling */}
        <div className="md:hidden p-4 flex items-center justify-between border-b border-gray-800 bg-black shadow-md sticky top-0 z-10">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-900 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/phoenix-logo.svg" alt="Pnyx Institute Logo" width={32} height={32} className="rounded-full" />
            <span className="text-lg font-bold text-primary">Pnyx Institute</span>
          </Link>
          
          <div className="w-10"></div> {/* Empty div for balanced spacing */}
        </div>
        
        {/* Improved padding and spacing for better responsiveness */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 pb-24 md:pb-8 overflow-x-hidden max-w-7xl mx-auto w-full">
          <div className="bg-black rounded-xl shadow-xl border border-gray-800 p-4 sm:p-6 md:p-8 overflow-hidden">
            {children}
          </div>
        </div>
        
        <MobileNav />
      </div>
    </div>
  );
}