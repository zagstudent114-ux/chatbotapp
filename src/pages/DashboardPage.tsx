import { useAuth } from '../contexts/AuthContext';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { Activity, LogOut, Database, BarChart3, BookOpen, Shield } from 'lucide-react';

export function DashboardPage() {
  const { signOut, isAdmin } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-2 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
      isActive
        ? 'bg-emerald-100 text-emerald-700'
        : 'text-gray-600 hover:bg-gray-100'
    }`;
    
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
      isActive
        ? 'text-emerald-600'
        : 'text-gray-600'
    }`;

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
          <NavLink
            to="/tutorial"
            className={({ isActive }) =>
              `px-2 md:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 md:gap-2 text-sm ${
                isActive
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BookOpen className="w-4 h-4" />
            <span>Tutorial</span>
          </NavLink>
          <NavLink
            to="/chat"
            className={navLinkClass}
          >
            Chat
          </NavLink>
          <NavLink
            to="/knowledge"
            className={({ isActive }) =>
              `px-2 md:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 md:gap-2 text-sm ${
                isActive
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Database className="w-4 h-4" />
            <span>Knowledge</span>
          </NavLink>
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2 px-2 md:px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Admin Panel</span>
            </Link>
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

      <div className="flex-1 pb-16 md:pb-0 overflow-hidden">
        <Outlet />
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="flex items-center justify-around">
          <NavLink
            to="/chat"
            className={mobileNavLinkClass}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs font-medium">Chat</span>
          </NavLink>
          <NavLink
            to="/metrics"
            className={mobileNavLinkClass}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">Metrics</span>
          </NavLink>
          <NavLink
            to="/knowledge"
            className={mobileNavLinkClass}
          >
            <Database className="w-5 h-5" />
            <span className="text-xs font-medium">Knowledge</span>
          </NavLink>
          <NavLink
            to="/tutorial"
            className={mobileNavLinkClass}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-medium">Tutorial</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}