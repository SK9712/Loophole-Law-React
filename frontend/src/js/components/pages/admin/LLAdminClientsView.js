import React, { useState, useEffect } from 'react';
import AddClientModal from './modal/AddClientModal';
import EditClientModal from './modal/EditClientModal';
import LLClientFilter from './LLClientFilter';

import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  Building2,
  FileText,
  Loader2
} from 'lucide-react';

const ClientsTable = ({ clients = [], onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="text-left py-4 px-4 text-gray-400 font-medium">Client</th>
          <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
          <th className="text-left py-4 px-4 text-gray-400 font-medium">Last Contact</th>
          <th className="text-right py-4 px-4 text-gray-400 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700">
        {clients.map((client) => (
          <tr key={client._id} className="hover:bg-slate-800/50 transition-colors">
            <td className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <span className="text-blue-400 font-medium">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{client.name}</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="w-4 h-4" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Phone className="w-4 h-4" />
                      {client.phone}
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="py-4 px-4">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm
                ${client.status === 'Active' 
                  ? 'bg-green-500/10 text-green-400' 
                  : client.status === 'Pending'
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-red-500/10 text-red-400'
                }`}>
                {client.status}
              </span>
            </td>
            <td className="py-4 px-4">
              <span className="inline-flex items-center gap-1 text-gray-400">
                <Calendar className="w-4 h-4" />
                {new Date(client.lastContact).toLocaleDateString()}
              </span>
            </td>
            <td className="py-4 px-4">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => onEdit(client)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(client)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {clients.length === 0 && (
      <div className="text-center py-8 text-gray-400">
        No clients found
      </div>
    )}
  </div>
);

const LLAdminClientsView = () => {
  const [clients, setClients] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: 'All',
    sortBy: '-createdAt'
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const fetchClients = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      let url = `http://localhost:5000/api/clients?page=${page}&limit=10`;
      
      // Add search parameter
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      // Add status filter
      if (filters.status !== 'All') {
        url += `&status=${filters.status}`;
      }
      
      // Add sorting
      if (filters.sortBy) {
        url += `&sort=${filters.sortBy}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/admin';
          return;
        }
        throw new Error('Failed to fetch clients');
      }

      const data = await response.json();
      setClients(data.data);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients(currentPage, searchTerm);
  }, [currentPage, filters]); // Added filters as dependency

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    
    // Debounce search requests
    const timeoutId = setTimeout(() => {
      fetchClients(1, term);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleDelete = async (client) => {
    if (!window.confirm('Are you sure you want to delete this client?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`http://localhost:5000/api/clients/${client._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/admin';
          return;
        }
        throw new Error('Failed to delete client');
      }

      // Refresh the client list
      fetchClients(currentPage, searchTerm);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Clients</h1>
            <p className="text-gray-400">Manage your client relationships</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Add Client
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
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
            onChange={handleSearch}
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg border transition-colors
                ${isFilterMenuOpen || filters.status !== 'All'
                  ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                  : 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50'}`}
            >
              <Filter className="w-5 h-5" />
              {filters.status !== 'All' ? `Status: ${filters.status}` : 'Filter'}
            </button>
            
            <LLClientFilter
              isOpen={isFilterMenuOpen}
              filters={filters}
              onFilterChange={(key, value) => {
                setFilters(prev => ({
                  ...prev,
                  [key]: value
                }));
                setCurrentPage(1); // Reset to first page when filter changes
              }}
              onClose={() => setIsFilterMenuOpen(false)}
            />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 rounded-lg border border-slate-700 transition-colors">
            <MoreVertical className="w-5 h-5" />
            More
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : (
          <ClientsTable
            clients={clients}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg transition-colors
                ${currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Add Client Modal */}
      <AddClientModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onClientAdded={(newClient) => {
          setClients(prevClients => [newClient, ...prevClients]);
          // Refresh the client list to ensure we have the latest data
          fetchClients(currentPage, searchTerm);
        }}
      />

      {/* Edit Client Modal */}
      <EditClientModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedClient(null);
        }}
        onClientUpdated={(updatedClient) => {
          setClients(prevClients =>
            prevClients.map(client =>
              client._id === updatedClient._id ? updatedClient : client
            )
          );
          // Refresh the client list to ensure we have the latest data
          fetchClients(currentPage, searchTerm);
        }}
        client={selectedClient}
      />
    </div>
  );
};

export default LLAdminClientsView;