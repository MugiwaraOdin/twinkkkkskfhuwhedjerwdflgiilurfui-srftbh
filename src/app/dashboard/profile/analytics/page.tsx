"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Calendar, 
  Trophy, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter
} from "lucide-react";

// Mock data for charts
const mockProgressData = [
  { week: "Week 1", xp: 120 },
  { week: "Week 2", xp: 240 },
  { week: "Week 3", xp: 350 },
  { week: "Week 4", xp: 470 },
  { week: "Week 5", xp: 590 },
  { week: "Week 6", xp: 680 },
  { week: "Week 7", xp: 820 },
  { week: "Week 8", xp: 950 },
];

const mockCourseProgress = [
  { course: "Crypto Fundamentals", progress: 85 },
  { course: "Blockchain Development", progress: 62 },
  { course: "Smart Contract Security", progress: 45 },
  { course: "DeFi Principles", progress: 30 },
  { course: "Web3 UX Design", progress: 15 },
];

const mockTimeDistribution = [
  { category: "Crypto Fundamentals", percentage: 40 },
  { category: "Blockchain Development", percentage: 25 },
  { category: "Smart Contract Security", percentage: 20 },
  { category: "DeFi Principles", percentage: 10 },
  { category: "Web3 UX Design", percentage: 5 },
];

const mockAssessmentScores = [
  { assessment: "Quiz 1", score: 85, average: 75 },
  { assessment: "Quiz 2", score: 92, average: 78 },
  { assessment: "Quiz 3", score: 78, average: 72 },
  { assessment: "Quiz 4", score: 88, average: 76 },
  { assessment: "Final Exam", score: 90, average: 80 },
];

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState("last30days");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">My Analytics</h1>
        <p className="text-gray-400 mt-2">
          Track your learning progress and performance
        </p>
      </div>

      {/* Time filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Learning Overview</h2>
        <div className="flex items-center space-x-2 bg-gray-900 rounded-lg p-1">
          <Filter className="w-4 h-4 text-gray-400 ml-2" />
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-transparent text-gray-300 text-sm border-none focus:ring-0 py-1 pr-8 pl-1"
          >
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="last3months">Last 3 months</option>
            <option value="alltime">All time</option>
          </select>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-400 text-sm font-medium">Total XP</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-white">950</div>
            <div className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-500 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              12%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">+130 XP this week</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-400 text-sm font-medium">Courses Enrolled</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-white">5</div>
            <div className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-500 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              1
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">New course added this month</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-400 text-sm font-medium">Modules Completed</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-white">23</div>
            <div className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-500 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              4
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">4 modules completed this week</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-400 text-sm font-medium">Learning Time</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-white">42h</div>
            <div className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-500 flex items-center">
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
              8%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">5.2 hours this week</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center mb-6">
            <LineChart className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-bold text-white">Progress Over Time</h3>
          </div>
          
          <div className="h-64 relative">
            {/* Simple visual representation of a line chart */}
            <div className="absolute inset-0 flex items-end">
              {mockProgressData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full max-w-[30px] bg-primary rounded-t-sm mx-auto"
                    style={{ height: `${(item.xp / 1000) * 100}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                    {item.week}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
              <div>1000 XP</div>
              <div>750 XP</div>
              <div>500 XP</div>
              <div>250 XP</div>
              <div>0 XP</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 mt-4">
            <p>You've earned <span className="text-primary font-medium">130 XP</span> in the last week, which is a <span className="text-green-500">12% increase</span> from your previous week.</p>
          </div>
        </div>
        
        {/* Course Progress */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center mb-6">
            <BarChart className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-bold text-white">Course Progress</h3>
          </div>
          
          <div className="space-y-4">
            {mockCourseProgress.map((course, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{course.course}</span>
                  <span className="text-primary font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-400 mt-6">
            <p>You're making great progress in <span className="text-primary font-medium">Crypto Fundamentals</span>. Keep it up!</p>
          </div>
        </div>
        
        {/* Time Distribution */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center mb-6">
            <PieChart className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-bold text-white">Learning Time Distribution</h3>
          </div>
          
          <div className="flex items-center justify-center h-64">
            {/* Simple visual representation of a pie chart */}
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {mockTimeDistribution.map((item, index) => {
                  // Calculate the slice
                  const startAngle = mockTimeDistribution
                    .slice(0, index)
                    .reduce((sum, curr) => sum + curr.percentage, 0) * 3.6; // 3.6 = 360/100
                  const endAngle = startAngle + item.percentage * 3.6;
                  
                  // Convert to radians
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  
                  // Calculate points
                  const x1 = 50 + 40 * Math.cos(startRad);
                  const y1 = 50 + 40 * Math.sin(startRad);
                  const x2 = 50 + 40 * Math.cos(endRad);
                  const y2 = 50 + 40 * Math.sin(endRad);
                  
                  // Create path
                  const largeArcFlag = item.percentage > 50 ? 1 : 0;
                  const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                  
                  // Colors based on index
                  const colors = ["#ffd230", "#e6bd2b", "#ccaa27", "#b39622", "#99821e"];
                  
                  return (
                    <path 
                      key={index} 
                      d={pathData} 
                      fill={colors[index % colors.length]} 
                      stroke="#1a1a1a" 
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {mockTimeDistribution.map((item, index) => {
              const colors = ["bg-primary", "bg-primary/80", "bg-primary/60", "bg-primary/40", "bg-primary/20"];
              return (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-sm ${colors[index % colors.length]} mr-2`}></div>
                  <span className="text-xs text-gray-400">{item.category} ({item.percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Assessment Performance */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center mb-6">
            <Trophy className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-bold text-white">Assessment Performance</h3>
          </div>
          
          <div className="h-64 relative">
            {/* Simple visual representation of a bar chart */}
            <div className="absolute inset-x-0 bottom-0 top-8 flex items-end">
              {mockAssessmentScores.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center mx-1">
                  <div className="relative w-full max-w-[30px] flex flex-col items-center">
                    {/* Your score */}
                    <div 
                      className="w-full bg-primary rounded-t-sm"
                      style={{ height: `${item.score * 0.6}%` }}
                    ></div>
                    {/* Class average */}
                    <div 
                      className="w-full bg-gray-600 absolute bottom-0 rounded-t-sm"
                      style={{ height: `${item.average * 0.6}%`, width: '60%', left: '20%' }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left whitespace-nowrap">
                    {item.assessment}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
              <div>100%</div>
              <div>75%</div>
              <div>50%</div>
              <div>25%</div>
              <div>0%</div>
            </div>
            
            {/* Legend */}
            <div className="absolute top-0 right-0 flex items-center">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-primary rounded-sm mr-1"></div>
                <span className="text-xs text-gray-400">Your Score</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-600 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-400">Class Average</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 mt-4">
            <p>Your average score is <span className="text-primary font-medium">86.6%</span>, which is <span className="text-green-500">10.6%</span> above the class average.</p>
          </div>
        </div>
      </div>
      
      {/* Activity Log */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="flex items-center mb-6">
          <Calendar className="w-5 h-5 text-primary mr-2" />
          <h3 className="text-lg font-bold text-white">Activity Log</h3>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, index) => {
            // Generate random activity level (0-4)
            const activityLevel = Math.floor(Math.random() * 5);
            let bgColor;
            
            switch(activityLevel) {
              case 0: bgColor = "bg-gray-800"; break; // No activity
              case 1: bgColor = "bg-primary/20"; break; // Low activity
              case 2: bgColor = "bg-primary/40"; break; // Medium activity
              case 3: bgColor = "bg-primary/60"; break; // High activity
              case 4: bgColor = "bg-primary"; break; // Very high activity
              default: bgColor = "bg-gray-800";
            }
            
            return (
              <div 
                key={index} 
                className={`w-full aspect-square rounded-sm ${bgColor} cursor-pointer hover:ring-2 hover:ring-white/20 transition-all`}
                title={`${activityLevel > 0 ? activityLevel * 30 : 0} minutes of learning`}
              ></div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-400">
            Less
            <div className="flex items-center space-x-1 inline-flex ml-2">
              <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
              <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
              <div className="w-3 h-3 bg-primary/40 rounded-sm"></div>
              <div className="w-3 h-3 bg-primary/60 rounded-sm"></div>
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            </div>
            More
          </div>
          <div className="text-sm text-gray-400">
            Last 5 weeks
          </div>
        </div>
      </div>
      
      {/* Insights */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Personalized Insights</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h4 className="text-green-400 font-medium mb-1">Strength</h4>
            <p className="text-gray-300">You excel at quiz assessments, consistently scoring above the class average. Your strongest subject is Crypto Fundamentals.</p>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="text-blue-400 font-medium mb-1">Learning Pattern</h4>
            <p className="text-gray-300">You tend to learn most effectively in the evenings. Your most productive days are Tuesdays and Thursdays.</p>
          </div>
          
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <h4 className="text-amber-400 font-medium mb-1">Suggestion</h4>
            <p className="text-gray-300">Consider spending more time on Smart Contract Security modules to improve your overall progress in that course.</p>
          </div>
        </div>
      </div>
    </div>
  );
}