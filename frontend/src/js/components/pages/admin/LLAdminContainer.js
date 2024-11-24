import React, { useState } from 'react';
import {
  Scale,
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Briefcase
} from 'lucide-react';
import LLAdminDashboardPage from './LLAdminDashboardPage';
import LLAdminPostsPage from './LLAdminPostsPage';

const LLAdminContainer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', id: 'dashboard' },
    { icon: FileText, text: 'Posts', id: 'posts' },
    { icon: Briefcase, text: 'Cases', id: 'cases' },
    { icon: Users, text: 'Clients', id: 'clients' },
    { icon: MessageSquare, text: 'Messages', id: 'messages' },
    { icon: Settings, text: 'Settings', id: 'settings' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location.href = '/admin';
  };

  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <LLAdminDashboardPage />;
      case 'posts':
        return <LLAdminPostsPage />;
      default:
        return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="text-white text-xl">Page under construction</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sidebar - Desktop */}
      <div className={`fixed top-0 left-0 h-full bg-slate-800/50 border-r border-slate-700 backdrop-blur-sm w-64 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} hidden md:block z-50`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-700">
          <Scale className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-bold">
            <span className="text-blue-400">Loophole</span>
            <span className="text-green-400">Law.</span>
          </h1>
        </div>

        {/* Menu Items */}
        <nav className="px-4 py-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg mb-1 transition-colors w-full ${
                currentPage === item.id ? 'bg-slate-700/50 text-white' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.text}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-slate-800 p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden">
          <div className="fixed inset-y-0 right-0 w-64 bg-slate-800 p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors w-full ${
                    currentPage === item.id ? 'bg-slate-700/50 text-white' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.text}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        {/* Render Current Page */}
        {renderPage()}
      </div>
    </div>
  );
};

export default LLAdminContainer;