"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

export default function LearnPage() {
  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Intro to Algorithmic Trading",
      description: "Learn the basics of algorithmic trading and market making",
      progress: 75,
      modules: [
        { id: 1, title: "Introduction to Markets", completed: true },
        { id: 2, title: "Market Making Fundamentals", completed: true },
        { id: 3, title: "Basic Trading Algorithms", completed: false },
        { id: 4, title: "Risk Management", completed: false },
      ],
      difficulty: "Basic",
    },
    {
      id: 2,
      title: "Market Making Strategies",
      description: "Advanced strategies for market makers",
      progress: 30,
      modules: [
        { id: 1, title: "Liquidity Provision Basics", completed: true },
        { id: 2, title: "Spread Management", completed: false },
        { id: 3, title: "Inventory Management", completed: false },
        { id: 4, title: "Advanced Order Types", completed: false },
      ],
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Directional Strategies",
      description: "Learn to build directional trading strategies",
      progress: 0,
      modules: [
        { id: 1, title: "Trend Following", completed: false },
        { id: 2, title: "Mean Reversion", completed: false },
        { id: 3, title: "Momentum Strategies", completed: false },
        { id: 4, title: "Volatility Trading", completed: false },
      ],
      difficulty: "Intermediate",
    },
    {
      id: 4,
      title: "Cross Exchange Market Making",
      description: "Advanced techniques for cross-exchange arbitrage",
      progress: 0,
      modules: [
        { id: 1, title: "Cross-Exchange Basics", completed: false },
        { id: 2, title: "Arbitrage Opportunities", completed: false },
        { id: 3, title: "Latency Management", completed: false },
        { id: 4, title: "Risk Controls", completed: false },
      ],
      difficulty: "Advanced",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">My Journey</h1>
        <p className="text-gray-400 mt-2">
          Track your learning progress and continue where you left off
        </p>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Continue Learning</h2>
        
        <div className="bg-gray-800 rounded-lg p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-white font-medium text-lg">Intro to Algorithmic Trading</h3>
              <p className="text-gray-400 mt-1">Next: Basic Trading Algorithms</p>
            </div>
            <Link
              href="#"
              className="mt-4 md:mt-0 py-2 px-6 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors inline-block"
            >
              Continue
            </Link>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-primary">75%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* All Courses Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">All Courses</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium text-lg">{course.title}</h3>
                    <p className="text-gray-400 mt-1 text-sm">{course.description}</p>
                  </div>
                  <span className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded">
                    {course.difficulty}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  {course.modules.slice(0, 2).map((module) => (
                    <div key={module.id} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 ${
                        module.completed ? "bg-primary" : "bg-gray-700"
                      }`}>
                        {module.completed && (
                          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${module.completed ? "text-gray-300" : "text-gray-500"}`}>
                        {module.title}
                      </span>
                    </div>
                  ))}
                  {course.modules.length > 2 && (
                    <p className="text-xs text-gray-500 pl-6">
                      +{course.modules.length - 2} more modules
                    </p>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-800 p-4">
                <Link
                  href="#"
                  className="block text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  {course.progress > 0 ? "Continue Course" : "Start Course"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}