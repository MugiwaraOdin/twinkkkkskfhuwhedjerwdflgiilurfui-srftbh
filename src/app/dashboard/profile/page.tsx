"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { User, AtSign, Calendar, MapPin, Link as LinkIcon, Briefcase, BookOpen, Code, DollarSign, Save } from "lucide-react";

// Define learning path types
const LEARNING_PATHS = [
  {
    id: "defi-expert",
    title: "DeFi Expert",
    description: "Master decentralized finance protocols, liquidity provision, and yield farming strategies.",
    icon: <DollarSign className="w-5 h-5" />,
    skills: ["Finance", "Trading", "Economics", "Risk Management"],
    recommendedFor: ["Finance professionals", "Traders", "Economists"]
  },
  {
    id: "ai-developer",
    title: "AI Developer",
    description: "Build and deploy AI models for blockchain applications and smart contract optimization.",
    icon: <Code className="w-5 h-5" />,
    skills: ["Programming", "Mathematics", "Data Science", "Machine Learning"],
    recommendedFor: ["Software engineers", "Data scientists", "Researchers"]
  },
  {
    id: "blockchain-architect",
    title: "Blockchain Architect",
    description: "Design and implement scalable blockchain infrastructure and protocols.",
    icon: <BookOpen className="w-5 h-5" />,
    skills: ["System Design", "Cryptography", "Distributed Systems", "Security"],
    recommendedFor: ["Software architects", "Backend developers", "Security specialists"]
  }
];

// Define hobby and skill options
const HOBBIES = [
  "Trading", "Programming", "Data Analysis", "Reading", "Writing", 
  "Design", "Gaming", "Mathematics", "Research", "Teaching"
];

const SKILLS = [
  "JavaScript/TypeScript", "Python", "Solidity", "Finance", "Economics", 
  "Data Science", "Machine Learning", "UI/UX Design", "Project Management", 
  "Technical Writing", "System Architecture", "Security Analysis"
];

export default function ProfilePage() {
  const { user, ready } = usePrivy();
  const [loading, setLoading] = useState(true);
  
  // Profile state
  const [profile, setProfile] = useState({
    displayName: "",
    age: "",
    location: "",
    bio: "",
    website: "",
    twitter: "",
    github: "",
    company: "",
    position: "",
    hobbies: [] as string[],
    skills: [] as string[],
    learningPath: ""
  });

  // Recommended path based on hobbies and skills
  const [recommendedPath, setRecommendedPath] = useState("");
  
  // UI states
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showPathSelector, setShowPathSelector] = useState(false);

  useEffect(() => {
    if (ready) {
      // Simulate loading user data
      const timer = setTimeout(() => {
        setLoading(false);
        // Set display name from email if available
        if (user?.email && typeof user.email === 'string') {
          const nameFromEmail = user.email.split('@')[0];
          setProfile(prev => ({
            ...prev,
            displayName: nameFromEmail
          }));
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [ready, user]);

  // Calculate recommended learning path based on hobbies and skills
  useEffect(() => {
    if (profile.hobbies.length > 0 || profile.skills.length > 0) {
      // Simple algorithm to recommend a path based on skills and hobbies
      const skillsSet = new Set(profile.skills);
      const hobbiesSet = new Set(profile.hobbies);
      
      // Count matches for each path
      const pathScores = LEARNING_PATHS.map(path => {
        let score = 0;
        
        // Check skills matches
        path.skills.forEach(skill => {
          if (skillsSet.has(skill) || hobbiesSet.has(skill)) {
            score += 2;
          }
        });
        
        // Check if hobbies align with recommended profiles
        path.recommendedFor.forEach(profile => {
          if (profile.toLowerCase().includes("developer") && hobbiesSet.has("Programming")) {
            score += 1;
          }
          if (profile.toLowerCase().includes("finance") && 
              (hobbiesSet.has("Trading") || hobbiesSet.has("Economics"))) {
            score += 1;
          }
        });
        
        return { id: path.id, score };
      });
      
      // Find path with highest score
      const bestPath = pathScores.reduce((prev, current) => 
        (current.score > prev.score) ? current : prev
      );
      
      if (bestPath.score > 0) {
        setRecommendedPath(bestPath.id);
      }
    }
  }, [profile.hobbies, profile.skills]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleHobby = (hobby: string) => {
    setProfile(prev => {
      if (prev.hobbies.includes(hobby)) {
        return {
          ...prev,
          hobbies: prev.hobbies.filter(h => h !== hobby)
        };
      } else {
        return {
          ...prev,
          hobbies: [...prev.hobbies, hobby]
        };
      }
    });
  };

  const toggleSkill = (skill: string) => {
    setProfile(prev => {
      if (prev.skills.includes(skill)) {
        return {
          ...prev,
          skills: prev.skills.filter(s => s !== skill)
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, skill]
        };
      }
    });
  };

  const selectLearningPath = (pathId: string) => {
    setProfile(prev => ({
      ...prev,
      learningPath: pathId
    }));
    setShowPathSelector(false);
  };

  const handleSaveProfile = () => {
    // In a real app, you would save the profile to your backend
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-gray-400 mt-2">
            Manage your personal information and learning preferences
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isEditing 
              ? "bg-gray-700 text-white hover:bg-gray-600" 
              : "bg-primary text-black hover:bg-primary/90"
          }`}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/90 flex items-center justify-center text-black font-bold text-3xl flex-shrink-0">
            {profile.displayName ? profile.displayName[0].toUpperCase() : "U"}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              {profile.displayName || "Your Name"}
            </h2>
            
            {profile.learningPath && (
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {LEARNING_PATHS.find(p => p.id === profile.learningPath)?.title || "Learning Path"}
              </div>
            )}
            
            <p className="text-gray-400 mt-3 max-w-2xl">
              {profile.bio || "Your bio will appear here. Edit your profile to add a bio."}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              {profile.location && (
                <div className="flex items-center text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </div>
              )}
              
              {profile.company && (
                <div className="flex items-center text-gray-400 text-sm">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {profile.position ? `${profile.position} at ${profile.company}` : profile.company}
                </div>
              )}
              
              {profile.website && (
                <a 
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary text-sm hover:underline"
                >
                  <LinkIcon className="w-4 h-4 mr-1" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "personal" 
              ? "text-primary border-b-2 border-primary" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          Personal Information
        </button>
        <button
          onClick={() => setActiveTab("learning")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "learning" 
              ? "text-primary border-b-2 border-primary" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          Learning Preferences
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === "personal" && (
          <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-xl font-bold text-white">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Display Name */}
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-400 mb-2">
                  Display Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={profile.displayName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-white px-4 py-3 bg-gray-900 rounded-lg border border-gray-800">
                    {profile.displayName || "Not set"}
                  </p>
                )}
              </div>
              
              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-400 mb-2">
                  Age
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={profile.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-white px-4 py-3 bg-gray-900 rounded-lg border border-gray-800">
                    {profile.age || "Not set"}
                  </p>
                )}
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-white px-4 py-3 bg-gray-900 rounded-lg border border-gray-800">
                    {profile.location || "Not set"}
                  </p>
                )}
              </div>
              
              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-2">
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={profile.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-white px-4 py-3 bg-gray-900 rounded-lg border border-gray-800">
                    {profile.website || "Not set"}
                  </p>
                )}
              </div>
              
              {/* Twitter */}
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-400 mb-2">
                  Twitter
                </label>
                {isEditing ? (
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      value={profile.twitter}
                      onChange={handleInputChange}
                      placeholder="username"
                      className="w-full pl-8 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                ) : (
                  <p className="text-white px-4 py-3 bg-gray-900 rounded-lg border border-gray-800">
                    {profile.twitter ? `@${profile.twitter}` : "Not set"}
                  </p>
                )}
              </div>
              
              {/* GitHub */}
              <div>
                <label htmlFor="github" className="block text-sm font-medium text-gray-400 mb-2">
                  GitHub
                </label>
                {isEditing ? (
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      value={profile.github}
                      onChange={handleInputChange}
                      placeholder="username"
                      className="w-full pl-8 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                ) : (
                  <p className="text-white px-4 py-3 bg-gray-900 rounded-lg border border-gray-800">
                    {profile.github ? `@${profile.github}` : "Not set"}
                  </p>
                )}
              </div>
              
              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">
                  Company
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={profile.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-white px-4 py-3 bg-gray-900 rounded-lg border border-gray-800">
                    {profile.company || "Not set"}
                  </p>
                )}
              </div>
              
              {/* Position */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-400 mb-2">
                  Position
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={profile.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-white px-4 py-3 bg-gray-900 rounded-lg border border-gray-800">
                    {profile.position || "Not set"}
                  </p>
                )}
              </div>
            </div>
            
            {/* Bio */}
            <div className="mt-6">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              ) : (
                <p className="text-white px-4 py-3 bg-gray-900 rounded-lg border border-gray-800 min-h-[100px]">
                  {profile.bio || "No bio provided"}
                </p>
              )}
            </div>
            
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center px-6 py-3 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "learning" && (
          <div className="space-y-8">
            {/* Learning Path */}
            <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-xl font-bold text-white">Learning Path</h2>
              </div>
              
              {profile.learningPath ? (
                <div>
                  {LEARNING_PATHS.map(path => path.id === profile.learningPath && (
                    <div key={path.id} className="p-5 bg-gray-900 rounded-xl border border-primary/20">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          {path.icon}
                        </div>
                        <h3 className="text-lg font-medium text-white">{path.title}</h3>
                      </div>
                      <p className="text-gray-400 mb-4">{path.description}</p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Recommended Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {path.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {isEditing && (
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => setShowPathSelector(true)}
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            Change Learning Path
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 px-6 bg-gray-900 rounded-xl border border-gray-800">
                  <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Learning Path Selected</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Select a learning path to get personalized course recommendations and track your progress.
                  </p>
                  
                  {recommendedPath && !showPathSelector && (
                    <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20 max-w-md mx-auto">
                      <p className="text-sm text-gray-300 mb-2">
                        Based on your interests and skills, we recommend:
                      </p>
                      <p className="text-lg font-medium text-primary">
                        {LEARNING_PATHS.find(p => p.id === recommendedPath)?.title}
                      </p>
                    </div>
                  )}
                  
                  {isEditing && (
                    <button
                      onClick={() => setShowPathSelector(true)}
                      className="px-6 py-3 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Select Learning Path
                    </button>
                  )}
                </div>
              )}
              
              {/* Path Selector */}
              {showPathSelector && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium text-white mb-4">Select a Learning Path</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {LEARNING_PATHS.map(path => (
                      <div 
                        key={path.id}
                        className={`p-4 bg-gray-900 rounded-xl border cursor-pointer transition-all duration-200 ${
                          recommendedPath === path.id 
                            ? "border-primary/50 shadow-lg shadow-primary/10" 
                            : "border-gray-800 hover:border-gray-700"
                        }`}
                        onClick={() => selectLearningPath(path.id)}
                      >
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-2">
                            {path.icon}
                          </div>
                          <h4 className="font-medium text-white">{path.title}</h4>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{path.description}</p>
                        
                        {recommendedPath === path.id && (
                          <div className="mt-2 text-xs text-primary font-medium">
                            ✓ Recommended for you
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Hobbies & Skills */}
            <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-xl font-bold text-white">Interests & Skills</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hobbies */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Hobbies & Interests</h3>
                  
                  {isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {HOBBIES.map(hobby => (
                        <button
                          key={hobby}
                          onClick={() => toggleHobby(hobby)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            profile.hobbies.includes(hobby)
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800"
                          }`}
                        >
                          {hobby}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {profile.hobbies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {profile.hobbies.map(hobby => (
                            <span key={hobby} className="px-3 py-1 bg-gray-900 text-gray-300 rounded-full text-sm">
                              {hobby}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 p-4 bg-gray-900 rounded-lg border border-gray-800">
                          No hobbies or interests added yet.
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Skills */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Skills & Expertise</h3>
                  
                  {isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {SKILLS.map(skill => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            profile.skills.includes(skill)
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {profile.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-gray-900 text-gray-300 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 p-4 bg-gray-900 rounded-lg border border-gray-800">
                          No skills or expertise added yet.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center px-6 py-3 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
            
            {/* Learning Progress */}
            {profile.learningPath && (
              <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-xl font-bold text-white">Learning Progress</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Progress Overview */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                      <p className="text-sm text-gray-400 mb-1">Overall Progress</p>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-white">25%</p>
                        <div className="w-full max-w-[100px] bg-gray-800 rounded-full h-2 ml-4">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                      <p className="text-sm text-gray-400 mb-1">Courses Completed</p>
                      <p className="text-2xl font-bold text-white">1 <span className="text-sm text-gray-500">/ 4</span></p>
                    </div>
                    
                    <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                      <p className="text-sm text-gray-400 mb-1">Estimated Completion</p>
                      <p className="text-2xl font-bold text-white">3 months</p>
                    </div>
                  </div>
                  
                  {/* Course Progress */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Path Courses</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-white">Introduction to DeFi</h4>
                          <span className="text-primary text-sm">100%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500">Completed on May 15, 2025</p>
                      </div>
                      
                      <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-white">Liquidity Provision Strategies</h4>
                          <span className="text-primary text-sm">35%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500">In progress</p>
                      </div>
                      
                      <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-white">Advanced Yield Farming</h4>
                          <span className="text-gray-400 text-sm">0%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500">Not started</p>
                      </div>
                      
                      <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-white">DeFi Risk Management</h4>
                          <span className="text-gray-400 text-sm">0%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500">Not started</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}