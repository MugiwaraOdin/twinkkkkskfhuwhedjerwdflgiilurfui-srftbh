"use client";

import { usePrivy } from "@privy-io/react-auth";
import DashboardOverview from "@/components/dashboard/overview";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, authenticated, ready } = usePrivy();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ready && authenticated) {
      // Simulate loading user data
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [ready, authenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">My Learning Hub</h1>
        <p className="text-gray-400 mt-2">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! Track your progress and achievements.
        </p>
      </div>
      
      <DashboardOverview />
    </div>
  );
}