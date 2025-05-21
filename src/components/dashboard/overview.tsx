"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Clock, Wallet } from "lucide-react";

export default function DashboardOverview() {
  const { user, linkWallet } = usePrivy();

  // Mock data for the dashboard
  const enrolledCourses = [
    {
      id: 1,
      title: "Intro to Algorithmic Trading",
      progress: 75,
      lastLesson: "Market Making Fundamentals",
      image: "https://images.unsplash.com/photo-1642543348745-03b1219733d9?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Market Making Strategies",
      progress: 30,
      lastLesson: "Liquidity Provision Basics",
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=2002&auto=format&fit=crop",
    },
  ];

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
  ];

  const stats = [
    { label: "Courses Enrolled", value: "2", icon: <BookOpen className="w-5 h-5 text-primary" /> },
    { label: "Achievements", value: "5", icon: <Award className="w-5 h-5 text-primary" /> },
    { label: "Learning Hours", value: "12.5", icon: <Clock className="w-5 h-5 text-primary" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-black rounded-xl p-6 shadow-lg border border-gray-800 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Learning Progress Section */}
        <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">My Learning</h2>
            <Link href="/dashboard/learn" className="text-primary hover:text-primary/80 text-sm flex items-center">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          {enrolledCourses.length > 0 ? (
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0" 
                      style={{ backgroundImage: `url(${course.image})` }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-medium">{course.title}</h3>
                        <span className="text-primary text-sm font-semibold">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 mt-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary/80 to-primary h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center mt-2">
                        <Clock className="w-3 h-3 text-gray-500 mr-1" />
                        <p className="text-xs text-gray-400">
                          Last: {course.lastLesson}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link
                href="/dashboard/learn"
                className="block mt-4 text-center py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-colors"
              >
                Continue Learning
              </Link>
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-gray-900 rounded-xl border border-gray-800">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
              <Link
                href="#"
                className="inline-block py-2 px-6 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        {/* Achievements Section */}
        <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">My Achievements</h2>
            <Link href="/dashboard/rewards" className="text-primary hover:text-primary/80 text-sm flex items-center">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          {achievements.length > 0 ? (
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start space-x-4 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <span className="text-xl">{achievement.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-3 h-3 text-gray-500 mr-1" />
                      <p className="text-xs text-gray-500">
                        {new Date(achievement.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link
                href="/dashboard/rewards"
                className="block mt-4 text-center py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-colors"
              >
                View All Achievements
              </Link>
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-gray-900 rounded-xl border border-gray-800">
              <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Complete courses to earn achievements.</p>
            </div>
          )}
        </div>
      </div>

      {/* Wallet Information */}
      <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
        <div className="flex items-center mb-6">
          <Wallet className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-xl font-bold text-white">Wallet Information</h2>
        </div>
        
        {user?.wallet ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-5 bg-gray-900 rounded-xl border border-gray-800">
              <p className="text-gray-400 mb-2 text-sm">Connected Wallet:</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Wallet className="w-4 h-4 text-primary" />
                </div>
                <p className="text-white font-mono text-sm break-all">
                  {user.wallet.address}
                </p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">Wallet Balance</h3>
                <p className="text-2xl font-bold text-white">0.00 ETH</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="text-sm text-gray-400">
                Your wallet is securely connected. Any NFT certificates or on-chain credentials will be issued to this address.
                You can manage your wallet connections in the settings page.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">No Wallet Connected</h3>
              <p className="text-gray-400 mb-6">
                Connect your wallet to receive NFT certificates and manage your on-chain credentials.
              </p>
              <button
                className="py-3 px-6 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors w-full"
                onClick={() => linkWallet()}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}