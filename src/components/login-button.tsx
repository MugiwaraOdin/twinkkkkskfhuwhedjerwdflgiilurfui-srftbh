"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const { login, authenticated, user } = usePrivy();

  if (authenticated && user) {
    return (
      <Button 
        className="bg-primary text-black px-3 sm:px-4 py-1.5 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
        onClick={() => window.location.href = "/dashboard"}
      >
        Dashboard
      </Button>
    );
  }

  return (
    <Button 
      className="bg-primary text-black px-3 sm:px-4 py-1.5 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
      onClick={login}
    >
      Sign In
    </Button>
  );
}