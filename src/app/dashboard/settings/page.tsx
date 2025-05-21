"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";

export default function SettingsPage() {
  const { user, linkEmail, linkWallet, unlinkEmail, unlinkWallet } = usePrivy();
  
  // State for form inputs
  const [displayName, setDisplayName] = useState("");
  const [notificationSettings, setNotificationSettings] = useState({
    courseUpdates: true,
    achievements: true,
    marketingEmails: false,
  });

  // Handle form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save these settings to your backend
    alert("Profile settings saved!");
  };

  // Handle notification settings changes
  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Account Security Section */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Account Security</h2>
        
        <div className="space-y-6">
          {/* Connected Email */}
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white font-medium mb-2">Connected Email</h3>
            
            {user?.email ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <p className="text-gray-300">{user.email}</p>
                <button
                  onClick={() => unlinkEmail(user.email!)}
                  className="mt-2 sm:mt-0 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <p className="text-gray-400">No email connected</p>
                <button
                  onClick={() => linkEmail()}
                  className="mt-2 sm:mt-0 text-sm bg-primary text-black px-3 py-1 rounded hover:bg-primary/90 transition-colors"
                >
                  Connect Email
                </button>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              Your email is used for important account notifications and recovery.
            </p>
          </div>
          
          {/* Connected Wallet */}
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white font-medium mb-2">Connected Wallet</h3>
            
            {user?.wallet ? (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <p className="text-gray-300 font-mono text-sm truncate max-w-xs">
                    {user.wallet.address}
                  </p>
                  <button
                    onClick={() => unlinkWallet(user.wallet!)}
                    className="mt-2 sm:mt-0 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This wallet will be used for receiving NFT certificates and on-chain credentials.
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <p className="text-gray-400">No wallet connected</p>
                <button
                  onClick={() => linkWallet()}
                  className="mt-2 sm:mt-0 text-sm bg-primary text-black px-3 py-1 rounded hover:bg-primary/90 transition-colors"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Profile Settings</h2>
        
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-400 mb-1">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Notification Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div>
              <h3 className="text-white font-medium">Course Updates</h3>
              <p className="text-sm text-gray-400">
                Receive notifications about new lessons and course updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.courseUpdates}
                onChange={() => handleNotificationChange("courseUpdates")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div>
              <h3 className="text-white font-medium">Achievement Notifications</h3>
              <p className="text-sm text-gray-400">
                Get notified when you earn new achievements or certificates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.achievements}
                onChange={() => handleNotificationChange("achievements")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div>
              <h3 className="text-white font-medium">Marketing Emails</h3>
              <p className="text-sm text-gray-400">
                Receive updates about new courses and special offers
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.marketingEmails}
                onChange={() => handleNotificationChange("marketingEmails")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Privacy Section */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Data Privacy</h2>
        
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-white font-medium mb-2">Your Data Privacy</h3>
          <p className="text-sm text-gray-400">
            At Pnyx Institute, we prioritize your data privacy and security. Your personal information is never stored on-chain, 
            and we only use your data to provide and improve our services.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            You can request a copy of your data or delete your account at any time.
          </p>
          
          <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              Download My Data
            </button>
            <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}