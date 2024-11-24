import React, { useState } from 'react';
import { Scale, Lock, User, EyeOff, Eye, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LLAdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  // API configuration
  const API_URL = 'http://localhost:5000/api/auth/login';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    credentials: 'include'
  };

  try {
    // Make API request
    const response = await fetch(API_URL, requestOptions);
    const result = await response.json();

    // Handle error responses
    if (!response.ok) {
      throw new Error(result.message || 'Authentication failed');
    }

    // Validate response data
    if (!result.data || !result.data.token) {
      throw new Error('Invalid response from server');
    }

    // Store authentication data
    const { token, name, role } = result.data;

    // Set localStorage items
    const storageItems = {
      token,
      user: name,
      role
    };

    Object.entries(storageItems).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
      }
    });

    // Redirect to dashboard
    window.location.href = '/admin/dashboard';

  } catch (err) {
    setError(err.message || 'Login failed. Please try again.');
    console.error('Login error:', err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scale className="w-10 h-10 text-blue-400" />
            <h1 className="text-3xl font-bold">
              <span className="text-blue-400">Loophole</span>
              <span className="text-green-400">Law.</span>
            </h1>
          </div>
          <h2 className="text-xl text-white font-medium">Admin Dashboard</h2>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          {error && (
            <div className="mb-6 flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-600 rounded-lg 
                           bg-slate-900/50 text-white placeholder-gray-500
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-colors"
                  placeholder="admin@loopholelaw.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-600 rounded-lg 
                           bg-slate-900/50 text-white placeholder-gray-500
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-colors"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-slate-900/50 text-blue-500 
                           focus:ring-blue-500 focus:ring-offset-0"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                       bg-green-500 hover:bg-green-600 text-white font-medium
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Need help? Contact{' '}
              <a href="mailto:support@loopholelaw.com" className="text-blue-400 hover:text-blue-300">
                IT Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLAdminLoginPage;