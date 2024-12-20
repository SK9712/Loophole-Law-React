import React, { useState } from 'react';
import { Filter, X, Check, ChevronDown } from 'lucide-react';

const LLFilterDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: [], // Changed back to array
    category: [],
    date: 'all'
  });

  const categories = [
    'Legal',
    'Corporate',
    'Criminal',
    'Family',
    'IP'
  ];

  const statuses = [
    'published',
    'draft'
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

const handleStatusChange = (status) => {
  setFilters(prev => ({
    ...prev,
    status: prev.status.includes(status)
      ? prev.status.filter(s => s !== status) // Remove if already selected
      : [...prev.status, status]              // Add if not selected
  }));
};

  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const newCategory = prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category];
      
      return {
        ...prev,
        category: newCategory
      };
    });
  };

  const handleDateChange = (date) => {
    setFilters(prev => ({
      ...prev,
      date
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: [], // Changed back to empty array
      category: [],
      date: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return filters.status.length + 
           filters.category.length + 
           (filters.date !== 'all' ? 1 : 0);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 rounded-lg border border-slate-700 transition-colors"
      >
        <Filter className="w-5 h-5" />
        Filter
        {getActiveFiltersCount() > 0 && (
          <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getActiveFiltersCount()}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-slate-800 rounded-lg border border-slate-700 shadow-xl z-50">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Status Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Status</h4>
              <div className="space-y-2">
                {statuses.map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer group"
                  >
                    <button
                      type="button"
                      onClick={() => handleStatusChange(status)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors 
                        ${filters.status.includes(status)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-slate-600 group-hover:border-blue-500'}`}
                    >
                      {filters.status.includes(status) && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <span className="capitalize select-none">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer group"
                  >
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors 
                        ${filters.category.includes(category)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-slate-600 group-hover:border-blue-500'}`}
                    >
                      {filters.category.includes(category) && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <span className="select-none">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Date Range</h4>
              <div className="relative">
                <select
                  value={filters.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {dateRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-700 flex items-center justify-between">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LLFilterDropdown;