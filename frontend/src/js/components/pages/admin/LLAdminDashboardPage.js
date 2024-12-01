import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  FileText,
  Users,
  MessageSquare,
  Clock,
  ChevronRight,
  AlertTriangle,
  Loader2,
  RefreshCcw
} from 'lucide-react';
import { LLAppointmentStatusBadge } from './appointments/LLAppointmentStatusBadge';

const DashboardCard = ({ title, value = 0, change = 0, icon: Icon }) => (
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

const AppointmentItem = ({ appointment }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors">
    <div className="bg-blue-500/10 p-2 rounded-lg">
      <Calendar className="w-5 h-5 text-blue-400" />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <p className="text-white font-medium">{appointment.clientName}</p>
        <LLAppointmentStatusBadge status={appointment.status} />
      </div>
      <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
        <Clock className="w-4 h-4" />
        {appointment.appointmentTime}
        <span className="text-gray-500">•</span>
        {appointment.service}
        {appointment.isEmergency && (
          <>
            <span className="text-gray-500">•</span>
            <span className="text-red-400 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </span>
          </>
        )}
      </div>
    </div>
  </div>
);

const MessageItem = ({ message }) => (
  <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
    <div className="bg-blue-500/10 p-2 rounded-lg">
      <MessageSquare className="w-5 h-5 text-blue-400" />
    </div>
    <div className="flex-1">
      <p className="text-white font-medium">{message.firstName} {message.lastName}</p>
      <p className="text-gray-400 text-sm">{message.subject}</p>
    </div>
    <span className="text-gray-400 text-sm">
      {new Date(message.createdAt).toLocaleDateString()}
    </span>
  </div>
);

const LLAdminDashboardPage = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    appointments: { total: 0, change: 0 },
    posts: { total: 0, change: 0 },
    clients: { total: 0, change: 0 },
    messages: { total: 0, change: 0 }
  });
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch all stats in parallel
      const [appointmentsRes, postsRes, clientsRes, messagesRes] = await Promise.all([
        fetch('http://localhost:5000/api/appointments/stats', { headers }),
        fetch('http://localhost:5000/api/posts/stats', { headers }),
        fetch('http://localhost:5000/api/clients/stats', { headers }),
        fetch('http://localhost:5000/api/messages/stats', { headers })
      ]);

      // Process responses
      const appointmentsData = await appointmentsRes.json();
      const postsData = await postsRes.json();
      const clientsData = await clientsRes.json();
      const messagesData = await messagesRes.json();

      setStats({
        appointments: appointmentsData.data || { total: 0, change: 0 },
        posts: postsData.data || { total: 0, change: 0 },
        clients: clientsData.data || { total: 0, change: 0 },
        messages: messagesData.data || { total: 0, change: 0 }
      });
      setError(null);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setError('Failed to fetch dashboard statistics');
    }
  };

  const fetchTodayAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments/today', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      setError('Failed to fetch today\'s appointments');
    }
  };

  const fetchRecentMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages?limit=5', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setError('Failed to fetch recent messages');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchData(),
        fetchTodayAppointments(),
        fetchRecentMessages()
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchData(),
      fetchTodayAppointments(),
      fetchRecentMessages()
    ]).finally(() => setLoading(false));
  }, []);

  const statsCards = [
    { 
      title: 'Total Appointments', 
      value: stats.appointments.total, 
      change: stats.appointments.change,
      icon: Calendar 
    },
    { 
      title: 'Published Posts', 
      value: stats.posts.total, 
      change: stats.posts.change,
      icon: FileText 
    },
    { 
      title: 'Active Clients', 
      value: stats.clients.total, 
      change: stats.clients.change,
      icon: Users 
    },
    { 
      title: 'New Messages', 
      value: stats.messages.total, 
      change: stats.messages.change,
      icon: MessageSquare 
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 pt-6">
      {/* Welcome Section with Refresh Button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Admin</h2>
          <p className="text-gray-400">Here's what's happening with your law practice today.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 
                   text-gray-300 rounded-lg border border-slate-700 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCcw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Today's Appointments</h3>
            <button 
              onClick={() => onNavigate('appointments')}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <AppointmentItem key={appointment._id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center text-gray-400 py-4">
                No appointments scheduled for today
              </div>
            )}
          </div>
        </div>

        {/* Recent Messages Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Messages</h3>
            <button 
              onClick={() => onNavigate('messages')}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageItem key={message._id} message={message} />
              ))
            ) : (
              <div className="text-center text-gray-400 py-4">
                No recent messages
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLAdminDashboardPage;