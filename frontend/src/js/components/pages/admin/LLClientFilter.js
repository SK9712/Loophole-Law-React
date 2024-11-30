import React from 'react';
import { Check } from 'lucide-react';

const LLClientFilter = ({ isOpen, filters, onFilterChange, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 w-72 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-white font-medium">Filter Clients</h3>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Status
          </label>
          <div className="space-y-2">
            {['All', 'Active', 'Pending', 'Inactive'].map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.status === status}
                  onChange={() => onFilterChange('status', status)}
                  className="w-4 h-4 text-blue-500 bg-slate-900 border-slate-600 
                    focus:ring-blue-500 focus:ring-2 rounded"
                />
                <span className="text-sm text-gray-300 group-hover:text-white">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg 
              text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="-lastContact">Last Contact</option>
          </select>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-700 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
            transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default LLClientFilter;