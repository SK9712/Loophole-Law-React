import React from 'react';
import { Briefcase, Users, BarChart, MessageSquare, FileText } from 'lucide-react';

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
  const stats = [
    { title: 'Total Cases', value: '125', change: 12.5, icon: Briefcase },
    { title: 'Active Clients', value: '54', change: 8.2, icon: Users },
    { title: 'Case Success Rate', value: '92%', change: 3.1, icon: BarChart },
    { title: 'New Inquiries', value: '28', change: -2.4, icon: MessageSquare },
  ];

  return (
    <div className="p-6 md:p-8 pt-6">  {/* Added padding all around */}
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
  );
};

export default LLAdminDashboardPage;