"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginButton() {
  const { login, authenticated, user, ready } = usePrivy();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Reset loading state when authentication state changes
  useEffect(() => {
    if (ready) {
      setIsLoading(false);
    }
  }, [ready, authenticated]);

  const handleDashboardClick = () => {
    setIsLoading(true);
    router.push("/dashboard");
  };

  const handleLoginClick = () => {
    setIsLoading(true);
    login();
  };

  if (!ready) {
    return (
      <Button 
        className="bg-primary/70 text-black px-3 sm:px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
        disabled
      >
        Loading...
      </Button>
    );
  }

  if (authenticated && user) {
    return (
      <Button 
        className="bg-primary text-black px-3 sm:px-4 py-1.5 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
        onClick={handleDashboardClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Dashboard"}
      </Button>
    );
  }

  return (
    <Button 
      className="bg-primary text-black px-3 sm:px-4 py-1.5 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
      onClick={handleLoginClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Sign In"}
    </Button>
  );
}