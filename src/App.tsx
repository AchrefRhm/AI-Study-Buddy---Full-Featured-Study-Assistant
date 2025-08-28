import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Chat } from './components/Chat';
import { Quiz } from './components/Quiz';
import { Flashcards } from './components/Flashcards';
import { Leaderboard } from './components/Leaderboard';
import { TabType } from './types';
import { mockUser } from './utils/mockData';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [studyTime, setStudyTime] = useLocalStorage<number>('todayStudyTime', 0);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={mockUser} onNavigate={setActiveTab} />;
      case 'chat':
        return <Chat />;
      case 'quiz':
        return <Quiz />;
      case 'flashcards':
        return <Flashcards />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <Dashboard user={mockUser} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={mockUser} studyTime={studyTime} />
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;