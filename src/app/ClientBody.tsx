"use client";

import { useEffect } from "react";
import PrivyAuthProvider from "@/providers/privy-provider";

export default function ClientBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return <PrivyAuthProvider>{children}</PrivyAuthProvider>;
}
