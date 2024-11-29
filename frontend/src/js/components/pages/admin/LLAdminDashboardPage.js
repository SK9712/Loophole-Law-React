import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Users, BarChart, MessageSquare, FileText,
  Calendar, Clock, ChevronRight, AlertTriangle 
} from 'lucide-react';
import { LLAppointmentStatusBadge } from './appointments/LLAppointmentStatusBadge';

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

const LLAdminDashboardPage = ({ onNavigate }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { title: 'Total Cases', value: '125', change: 12.5, icon: Briefcase },
    { title: 'Active Clients', value: '54', change: 8.2, icon: Users },
    { title: 'Case Success Rate', value: '92%', change: 3.1, icon: BarChart },
    { title: 'New Inquiries', value: '28', change: -2.4, icon: MessageSquare },
  ];

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchTodayAppointments();
  }, []);

  return (
    <div className="p-6 md:p-8 pt-6">
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
            {loading ? (
              <div className="text-center text-gray-400 py-4">Loading appointments...</div>
            ) : appointments.length > 0 ? (
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

        {/* Recent Activity Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
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
  );
};

export default LLAdminDashboardPage;