import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  User,
  Target,
  TrendingUp
} from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavigationItems = () => {
    const baseItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: `/dashboard/${user.role}` },
      { icon: FileText, label: 'Report', path: '/report' },
    ];

    if (user.role === 'manager' || user.role === 'admin') {
      baseItems.push(
        { icon: Users, label: 'Team', path: '/dashboard/manager' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' }
      );
    }

    if (user.role === 'admin') {
      baseItems.push(
        { icon: Settings, label: 'Admin Tools', path: '/admin/tools' }
      );
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 sidebar-nav p-6 flex flex-col"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold gradient-text">ElevateTrack</h1>
          <p className="text-sm text-muted-foreground mt-1">Growth Platform</p>
        </div>

        <div className="flex items-center space-x-3 mb-8 p-3 glass-card rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.button
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left nav-item ${
                  isActive ? 'active' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start space-x-3 mt-4 text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;