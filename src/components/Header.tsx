import React from 'react';
import { User, BookOpen, Trophy, Timer } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType;
  studyTime: number;
}

export function Header({ user, studyTime }: HeaderProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Study Buddy</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Study Time */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Timer className="w-4 h-4" />
            <span>Today: {formatTime(studyTime)}</span>
          </div>
          
          {/* Points */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>{user.totalPoints} pts</span>
          </div>
          
          {/* Streak */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-orange-500">🔥</span>
            <span>{user.studyStreak} days</span>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Level: Intermediate</p>
            </div>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}