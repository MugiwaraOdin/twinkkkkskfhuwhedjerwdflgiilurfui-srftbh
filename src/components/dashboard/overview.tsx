"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

export default function DashboardOverview() {
  const { user } = usePrivy();

  // Mock data for the dashboard
  const enrolledCourses = [
    {
      id: 1,
      title: "Intro to Algorithmic Trading",
      progress: 75,
      lastLesson: "Market Making Fundamentals",
    },
    {
      id: 2,
      title: "Market Making Strategies",
      progress: 30,
      lastLesson: "Liquidity Provision Basics",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Module Completed",
      description: "Completed your first learning module",
      date: "2025-05-15",
      type: "badge",
    },
    {
      id: 2,
      title: "7-Day Streak",
      description: "Logged in for 7 consecutive days",
      date: "2025-05-18",
      type: "streak",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Learning Progress Section */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">My Learning</h2>
        
        {enrolledCourses.length > 0 ? (
          <div className="space-y-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-medium">{course.title}</h3>
                  <span className="text-primary text-sm">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400">
                  Last lesson: {course.lastLesson}
                </p>
              </div>
            ))}
            
            <Link
              href="/dashboard/learn"
              className="block mt-4 text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Continue Learning
            </Link>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
            <Link
              href="#"
              className="inline-block py-2 px-4 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">My Achievements</h2>
        
        {achievements.length > 0 ? (
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary">🏆</span>
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
            
            <Link
              href="/dashboard/rewards"
              className="block mt-4 text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              View All Achievements
            </Link>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">Complete courses to earn achievements.</p>
          </div>
        )}
      </div>

      {/* Wallet Information */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg md:col-span-2">
        <h2 className="text-xl font-bold text-white mb-4">Wallet Information</h2>
        
        {user?.wallet ? (
          <div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 mb-1">Connected Wallet:</p>
              <p className="text-white font-mono break-all">
                {user.wallet.address}
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Your wallet is securely connected. Any NFT certificates or on-chain credentials will be issued to this address.
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">No wallet connected.</p>
            <button
              className="py-2 px-4 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
              onClick={() => {/* Wallet connection logic */}}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}