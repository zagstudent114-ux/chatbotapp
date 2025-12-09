import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChatPanel } from '../components/ChatPanel';
import { MetricsPanel } from '../components/MetricsPanel';
import { KnowledgeBasePanel } from '../components/KnowledgeBasePanel';
import { TutorialPanel } from '../components/TutorialPanel';
import { Activity, LogOut, Database, BarChart3, BookOpen, Shield } from 'lucide-react';

interface DashboardPageProps {
  onNavigateToAdmin: () => void;
}

export function DashboardPage({ onNavigateToAdmin }: DashboardPageProps) {
  const { signOut, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge' | 'metrics' | 'tutorial'>('chat');

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Activity className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-base md:text-xl font-bold text-gray-900">Nutrition by Coach Mury Kuswari</h1>
            <p className="text-xs md:text-sm text-gray-600 hidden md:block">Your Personal Nutrition Coach</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setActiveTab('tutorial')}
            className={`px-2 md:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 md:gap-2 text-sm ${
              activeTab === 'tutorial'
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tutorial</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-2 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              activeTab === 'chat'
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-2 md:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 md:gap-2 text-sm ${
              activeTab === 'knowledge'
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Knowledge</span>
          </button>
          {isAdmin && (
            <button
              onClick={onNavigateToAdmin}
              className="flex items-center gap-2 px-2 md:px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Admin Panel</span>
            </button>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-2 md:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>

        <button
          onClick={handleSignOut}
          className="md:hidden flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      <div className="flex-1 pb-16 md:pb-0">
        {activeTab === 'tutorial' ? (
          <TutorialPanel />
        ) : activeTab === 'chat' ? (
          <div className="h-full flex flex-col lg:flex-row">
            <div className="flex-1 flex flex-col">
              <ChatPanel />
            </div>
            <div className="hidden lg:block lg:w-[450px] border-l border-gray-200 bg-white">
              <MetricsPanel />
            </div>
          </div>
        ) : activeTab === 'metrics' ? (
          <div className="h-full bg-white">
            <MetricsPanel />
          </div>
        ) : (
          <KnowledgeBasePanel />
        )}
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'chat'
                ? 'text-emerald-600'
                : 'text-gray-600'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs font-medium">Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'metrics'
                ? 'text-emerald-600'
                : 'text-gray-600'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">Metrics</span>
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'knowledge'
                ? 'text-emerald-600'
                : 'text-gray-600'
            }`}
          >
            <Database className="w-5 h-5" />
            <span className="text-xs font-medium">Knowledge</span>
          </button>
          <button
            onClick={() => setActiveTab('tutorial')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'tutorial'
                ? 'text-emerald-600'
                : 'text-gray-600'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-medium">Tutorial</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
