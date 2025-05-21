"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function DashboardSidebar() {
  const { logout, user } = usePrivy();
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", path: "/dashboard" },
    { name: "Learn", path: "/dashboard/learn" },
    { name: "Rewards", path: "/dashboard/rewards" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="w-64 bg-black border-r border-gray-800 h-screen sticky top-0 hidden md:block overflow-y-auto gradient-border-r">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/phoenix-logo.svg" alt="Pnyx Institute Logo" width={36} height={36} className="rounded-full" />
          <span className="text-xl font-bold text-primary">Pnyx Institute</span>
        </Link>
      </div>

      <div className="px-4 py-2 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold">
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
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.path
                    ? "bg-gray-900 text-primary"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-8 left-0 right-0 px-4">
        <button
          onClick={logout}
          className="w-full px-4 py-2 text-gray-400 hover:text-white transition-colors text-left"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}