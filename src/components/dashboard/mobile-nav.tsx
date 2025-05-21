"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileNav() {
  const { logout } = usePrivy();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/dashboard" },
    { name: "Learn", path: "/dashboard/learn" },
    { name: "Rewards", path: "/dashboard/rewards" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="md:hidden">
      {/* Fixed bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black gradient-border-t z-40">
        <div className="flex justify-around items-center py-3 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center ${
                pathname === item.path
                  ? "text-primary"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
          <button
            onClick={logout}
            className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-300"
          >
            <span className="text-xs mt-1">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Menu button for expanded navigation */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-50 bg-primary text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Expanded menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-40 flex flex-col p-6">
          <div className="flex-1 flex flex-col justify-center">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block text-center py-3 text-lg ${
                    pathname === item.path
                      ? "text-primary font-medium"
                      : "text-gray-300"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="block w-full text-center py-3 text-lg text-gray-300"
              >
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}