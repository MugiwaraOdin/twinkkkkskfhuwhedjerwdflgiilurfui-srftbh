"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/sidebar";
import MobileNav from "@/components/dashboard/mobile-nav";
import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated, ready } = usePrivy();
  const router = useRouter();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Mobile header */}
        <div className="md:hidden p-4 border-b border-gray-800">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/phoenix-logo.svg" alt="Pnyx Institute Logo" width={32} height={32} className="rounded-full" />
            <span className="text-lg font-bold text-primary">Pnyx Institute</span>
          </Link>
        </div>
        
        <div className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {children}
        </div>
        
        <MobileNav />
      </div>
    </div>
  );
}