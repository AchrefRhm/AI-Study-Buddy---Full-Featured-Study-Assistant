import React, { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus, Users, Star, Award } from 'lucide-react';
import { LeaderboardEntry, Achievement } from '../types';
import { mockLeaderboard, mockAchievements } from '../utils/mockData';

type LeaderboardTab = 'weekly' | 'monthly' | 'alltime' | 'achievements';

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('weekly');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</div>;
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getChangeText = (change: number) => {
    if (change > 0) return `+${change}`;
    if (change < 0) return change.toString();
    return '—';
  };

  const tabs = [
    { id: 'weekly' as LeaderboardTab, label: 'This Week', icon: Trophy },
    { id: 'monthly' as LeaderboardTab, label: 'This Month', icon: Star },
    { id: 'alltime' as LeaderboardTab, label: 'All Time', icon: Crown },
    { id: 'achievements' as LeaderboardTab, label: 'Achievements', icon: Award }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h2>
        <p className="text-gray-600">See how you rank among your study buddies</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex space-x-1 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'achievements' ? (
        /* Achievements View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white rounded-xl p-6 border transition-all duration-200 ${
                  achievement.unlockedAt
                    ? 'border-yellow-200 shadow-md hover:shadow-lg'
                    : 'border-gray-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`text-4xl ${achievement.unlockedAt ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      {achievement.unlockedAt && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                    
                    {achievement.progress !== undefined && achievement.target && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{achievement.progress}/{achievement.target}</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">
                        {achievement.points} points
                      </span>
                      {achievement.unlockedAt && (
                        <span className="text-xs text-green-600">
                          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Leaderboard View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Top 3 Podium */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
            <div className="flex items-end justify-center space-x-8">
              {mockLeaderboard.slice(0, 3).map((entry, index) => (
                <div key={entry.userId} className="text-center">
                  <div className={`relative mb-4 ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
                    {entry.avatar ? (
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className={`rounded-full object-cover ring-4 ${
                          entry.rank === 1 ? 'w-20 h-20 ring-yellow-400' :
                          entry.rank === 2 ? 'w-16 h-16 ring-gray-400' :
                          'w-16 h-16 ring-amber-400'
                        }`}
                      />
                    ) : (
                      <div className={`rounded-full bg-blue-500 flex items-center justify-center ring-4 ${
                        entry.rank === 1 ? 'w-20 h-20 ring-yellow-400' :
                        entry.rank === 2 ? 'w-16 h-16 ring-gray-400' :
                        'w-16 h-16 ring-amber-400'
                      }`}>
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2">
                      {getRankIcon(entry.rank)}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{entry.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{entry.points.toLocaleString()} pts</p>
                  <div className="flex items-center justify-center space-x-1 text-xs">
                    <span className="text-orange-500">🔥</span>
                    <span className="text-gray-500">{entry.streak} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Leaderboard */}
          <div className="p-6">
            <div className="space-y-1">
              {mockLeaderboard.map((entry, index) => (
                <div
                  key={entry.userId}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                    entry.userId === '1' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Rank */}
                  <div className="w-8 flex justify-center">
                    {getRankIcon(entry.rank)}
                  </div>

                  {/* Avatar and Name */}
                  <div className="flex items-center space-x-3 flex-1">
                    {entry.avatar ? (
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {entry.name}
                        {entry.userId === '1' && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>{entry.points.toLocaleString()} points</span>
                        <span className="flex items-center">
                          <span className="text-orange-500 mr-1">🔥</span>
                          {entry.streak} days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Change Indicator */}
                  <div className="flex items-center space-x-2 text-sm">
                    {getChangeIcon(entry.change)}
                    <span className={`font-medium ${
                      entry.change > 0 ? 'text-green-600' :
                      entry.change < 0 ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      {getChangeText(entry.change)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Updated every hour</span>
              <span>Invite friends to compete!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}