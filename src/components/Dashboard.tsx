import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  Calendar,
  BookOpen,
  Brain,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { User, StudyStats } from '../types';

interface DashboardProps {
  user: User;
  onNavigate: (tab: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  // Mock stats - in real app, this would come from API
  const stats: StudyStats = {
    todayMinutes: 45,
    weeklyMinutes: 320,
    monthlyMinutes: 1280,
    totalMinutes: 15600,
    currentStreak: user.studyStreak,
    longestStreak: 23,
    quizzesCompleted: 47,
    averageScore: 87,
    cardsStudied: 234,
    topicsStudied: ['JavaScript', 'React', 'Mathematics', 'Physics', 'Spanish']
  };

  const quickActions = [
    {
      title: 'Continue Quiz',
      description: 'React Fundamentals - Question 3/10',
      icon: Brain,
      color: 'bg-blue-500',
      action: () => onNavigate('quiz')
    },
    {
      title: 'Review Flashcards',
      description: '12 cards due for review',
      icon: CreditCard,
      color: 'bg-green-500',
      action: () => onNavigate('flashcards')
    },
    {
      title: 'Ask AI Assistant',
      description: 'Get help with any topic',
      icon: BookOpen,
      color: 'bg-purple-500',
      action: () => onNavigate('chat')
    }
  ];

  const recentActivity = [
    { type: 'quiz', title: 'JavaScript Basics Quiz', score: 92, time: '2 hours ago' },
    { type: 'flashcards', title: 'Spanish Vocabulary', cards: 15, time: '5 hours ago' },
    { type: 'chat', title: 'React Hooks Discussion', duration: '12 min', time: '1 day ago' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}! 👋
        </h2>
        <p className="text-gray-600">
          You're on a {user.studyStreak}-day streak! Keep up the great work.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.todayMinutes}m</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Today's Study Time</h3>
          <p className="text-sm text-gray-500">Goal: {user.preferences.studyGoal}m</p>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (stats.todayMinutes / user.preferences.studyGoal) * 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.currentStreak}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Study Streak</h3>
          <p className="text-sm text-gray-500">Longest: {stats.longestStreak} days</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.averageScore}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Average Score</h3>
          <p className="text-sm text-gray-500">{stats.quizzesCompleted} quizzes completed</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{user.totalPoints}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Total Points</h3>
          <p className="text-sm text-gray-500">Rank #1 this week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 ${action.color} rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.type === 'quiz' && `Score: ${activity.score}%`}
                      {activity.type === 'flashcards' && `${activity.cards} cards studied`}
                      {activity.type === 'chat' && `Duration: ${activity.duration}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Goal Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Weekly Goal</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{stats.weeklyMinutes} / 420 min</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (stats.weeklyMinutes / 420) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {Math.max(0, 420 - stats.weeklyMinutes)} minutes remaining this week
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}