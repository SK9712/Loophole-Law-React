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
  Briefcase,
  BarChart
} from 'lucide-react';

const DashboardCard = ({ title, value, change, icon: Icon }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-semibold text-white mt-2">{value}</h3>
      </div>
      <div className="bg-blue-500/10 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
    </div>
    <div className="mt-4">
      <span className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
      <span className="text-gray-400 text-sm ml-2">vs last month</span>
    </div>
  </div>
);

const LLAdminDashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', href: '#dashboard' },
    { icon: FileText, text: 'Posts', href: '#posts' },
    { icon: Briefcase, text: 'Cases', href: '#cases' },
    { icon: Users, text: 'Clients', href: '#clients' },
    { icon: MessageSquare, text: 'Messages', href: '#messages' },
    { icon: Settings, text: 'Settings', href: '#settings' }
  ];

  const stats = [
    { title: 'Total Cases', value: '125', change: 12.5, icon: Briefcase },
    { title: 'Active Clients', value: '54', change: 8.2, icon: Users },
    { title: 'Case Success Rate', value: '92%', change: 3.1, icon: BarChart },
    { title: 'New Inquiries', value: '28', change: -2.4, icon: MessageSquare },
  ];

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sidebar - Desktop */}
      <div className={`fixed top-0 left-0 h-full bg-slate-800/50 border-r border-slate-700 backdrop-blur-sm w-64 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} hidden md:block`}>
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
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg mb-1 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.text}
            </a>
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
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.text}
                </a>
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
        {/* Top Bar */}
        <div className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors ml-4">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Admin</h2>
            <p className="text-gray-400">Here's what's happening with your law practice today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <DashboardCard key={index} {...stat} />
            ))}
          </div>

          {/* Recent Activity Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {/* Activity Items */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">New case file uploaded</p>
                    <p className="text-gray-400 text-sm">John Doe - Corporate Law</p>
                  </div>
                  <span className="text-gray-400 text-sm">2 hours ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLAdminDashboardPage;