import React from 'react';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Brain, 
  CreditCard, 
  Trophy,
  Settings 
} from 'lucide-react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const navigationItems = [
  {
    id: 'dashboard' as TabType,
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Study overview and progress'
  },
  {
    id: 'chat' as TabType,
    label: 'AI Assistant',
    icon: MessageCircle,
    description: 'Chat with your AI study buddy'
  },
  {
    id: 'quiz' as TabType,
    label: 'Quizzes',
    icon: Brain,
    description: 'Test your knowledge'
  },
  {
    id: 'flashcards' as TabType,
    label: 'Flashcards',
    icon: CreditCard,
    description: 'Spaced repetition learning'
  },
  {
    id: 'leaderboard' as TabType,
    label: 'Leaderboard',
    icon: Trophy,
    description: 'Compete with friends'
  }
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="flex-1">
                <div className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                  {item.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Settings at bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
          <Settings className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <div className="font-medium text-gray-900">Settings</div>
            <div className="text-xs text-gray-500 mt-1">
              Preferences and more
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
}