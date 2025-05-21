"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

export default function RewardsPage() {
  // Mock data for achievements and NFT certificates
  const achievements = [
    {
      id: 1,
      title: "First Module Completed",
      description: "Completed your first learning module",
      date: "2025-05-15",
      type: "badge",
      icon: "🏆",
    },
    {
      id: 2,
      title: "7-Day Streak",
      description: "Logged in for 7 consecutive days",
      date: "2025-05-18",
      type: "streak",
      icon: "🔥",
    },
    {
      id: 3,
      title: "First Course Completed",
      description: "Completed your first full course",
      date: "2025-05-20",
      type: "badge",
      icon: "🎓",
    },
  ];

  const nftCertificates = [
    {
      id: 1,
      title: "Intro to Algorithmic Trading",
      issueDate: "2025-05-20",
      txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      imageUrl: "/certificate-preview.png",
    },
  ];

  // User stats
  const userStats = {
    totalXP: 1250,
    streak: 7,
    coursesCompleted: 1,
    modulesCompleted: 8,
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">My Achievements & Credentials</h1>
        <p className="text-gray-400 mt-2">
          Track your progress and showcase your on-chain credentials
        </p>
      </div>

      {/* User Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-1">Total XP</h3>
          <p className="text-3xl font-bold text-primary">{userStats.totalXP}</p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-1">Current Streak</h3>
          <p className="text-3xl font-bold text-primary">{userStats.streak} days</p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-1">Courses Completed</h3>
          <p className="text-3xl font-bold text-primary">{userStats.coursesCompleted}</p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-1">Modules Completed</h3>
          <p className="text-3xl font-bold text-primary">{userStats.modulesCompleted}</p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gray-800 rounded-lg p-4 flex items-start space-x-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-lg">{achievement.icon}</span>
              </div>
              <div>
                <h3 className="text-white font-medium">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Earned on {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NFT Certificates Section */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">On-Chain Credentials</h2>
        
        {nftCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nftCertificates.map((cert) => (
              <div key={cert.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-medium">{cert.title} Certificate</h3>
                  <p className="text-sm text-gray-400">
                    Issued on {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="bg-gray-900 p-3 rounded-lg mb-4">
                    <p className="text-xs text-gray-400 mb-1">Transaction Hash:</p>
                    <p className="text-xs font-mono text-gray-300 break-all">
                      {cert.txHash}
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <Link
                      href={`https://etherscan.io/tx/${cert.txHash}`}
                      target="_blank"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      View on Etherscan
                    </Link>
                    
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-800 rounded-lg">
            <p className="text-gray-400 mb-2">You haven't earned any on-chain credentials yet.</p>
            <p className="text-sm text-gray-500">
              Complete courses to earn NFT certificates that verify your skills on-chain.
            </p>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-white font-medium mb-2">About On-Chain Credentials</h3>
          <p className="text-sm text-gray-400">
            Our NFT certificates are stored on the Ethereum blockchain, providing tamper-proof verification of your achievements. 
            These credentials can be shared with potential employers or displayed in your digital wallet.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Your data privacy is our priority. Only your achievements are stored on-chain, never your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}