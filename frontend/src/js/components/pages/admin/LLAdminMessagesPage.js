import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  MoreVertical,
  RefreshCcw
} from 'lucide-react';

const MessageItem = ({ message, onStatusChange, onDelete }) => {
  const timestamp = new Date(message.createdAt).toLocaleString();
  const isUnread = message.status === 'unread';

  return (
    <div className={`p-4 border-b border-slate-700 hover:bg-slate-800/50 transition-colors
      ${isUnread ? 'bg-slate-800/30' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-medium truncate ${isUnread ? 'text-white' : 'text-gray-300'}`}>
              {message.firstName} {message.lastName}
            </h3>
            <span className="text-sm text-gray-400">({message.email})</span>
          </div>
          <p className="text-gray-400 text-sm mb-2">{message.subject}</p>
          <p className="text-gray-300 line-clamp-2 mb-2">{message.message}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {timestamp}
            </span>
            <div className="flex items-center gap-2">
              {message.status === 'unread' && (
                <span className="flex items-center gap-1 text-blue-400">
                  <Mail className="w-4 h-4" />
                  New
                </span>
              )}
              {message.status === 'read' && (
                <span className="flex items-center gap-1 text-gray-400">
                  <CheckCircle className="w-4 h-4" />
                  Read
                </span>
              )}
              {message.status === 'replied' && (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  Replied
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onStatusChange(message._id, message.status === 'unread' ? 'read' : 'replied')}
            className={`p-2 rounded-lg transition-colors ${
              message.status === 'unread'
                ? 'text-blue-400 hover:bg-blue-400/10'
                : message.status === 'read'
                ? 'text-green-400 hover:bg-green-400/10'
                : 'text-gray-400 hover:bg-slate-700'
            }`}
          >
            {message.status === 'unread' ? (
              <Mail className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => onDelete(message._id)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const LLAdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read, replied
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update message status');
      }

      // Update local state
      setMessages(messages.map(msg => 
        msg._id === messageId ? { ...msg, status: newStatus } : msg
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      // Remove message from local state
      setMessages(messages.filter(msg => msg._id !== messageId));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredMessages = messages
    .filter(msg => filter === 'all' || msg.status === filter)
    .filter(msg => 
      searchTerm === '' || 
      `${msg.firstName} ${msg.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <p className="text-gray-400">Manage incoming messages and inquiries</p>
          </div>
          <button
            onClick={fetchMessages}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                     text-white rounded-lg transition-colors"
          >
            <RefreshCcw className="w-5 h-5" />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 
                      rounded-lg text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Search and Filter */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg 
                     text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 
                           text-gray-300 rounded-lg border border-slate-700 transition-colors">
            <MoreVertical className="w-5 h-5" />
            More
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading messages...</div>
        ) : filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <MessageItem
              key={message._id}
              message={message}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">No messages found</div>
        )}
      </div>
    </div>
  );
};

export default LLAdminMessagesPage;