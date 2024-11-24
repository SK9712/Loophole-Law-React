import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreVertical,
  FileText,
  Tag,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const PostsTable = ({ posts = [], onEdit, onDelete, onView }) => {
  if (!Array.isArray(posts)) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-4 px-4 text-gray-400 font-medium">Title</th>
            <th className="text-left py-4 px-4 text-gray-400 font-medium">Category</th>
            <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
            <th className="text-left py-4 px-4 text-gray-400 font-medium">Date</th>
            <th className="text-right py-4 px-4 text-gray-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {posts.map((post) => (
            <tr key={post._id || post.id} className="hover:bg-slate-800/50 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{post.title}</p>
                    <p className="text-sm text-gray-400">{post.content?.substring(0, 100) || 'No content'}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400">
                  <Tag className="w-4 h-4" />
                  {post.category || 'Uncategorized'}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm 
                  ${post.status === 'published' 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                  {post.status === 'published' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {post.status || 'Draft'}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt || post.date).toLocaleDateString()}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onView(post)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onEdit(post)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(post)}
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
      {posts.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No posts found
        </div>
      )}
    </div>
  );
};

const LLAdminPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/admin';
      return null;
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const handleAuthError = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin';
  };

  const fetchPosts = async () => {
    try {
      const headers = getAuthHeader();
      if (!headers) return;

      const response = await fetch('http://localhost:5000/api/posts', {
        headers
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(Array.isArray(data) ? data : data.posts || []);
    } catch (err) {
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      const headers = getAuthHeader();
      if (!headers) return;

      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: "New Blog Post",
          content: "Content here",
          status: "published"
        })
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      await fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const headers = getAuthHeader();
      if (!headers) return;

      const response = await fetch(`http://localhost:5000/api/posts/${post.slug || post._id}`, {
        method: 'DELETE',
        headers
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      await fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (post) => {
    try {
      const headers = getAuthHeader();
      if (!headers) return;

      const response = await fetch(`http://localhost:5000/api/posts/${post.slug || post._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          status: post.status
        })
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      await fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      fetchPosts();
      return;
    }

    try {
      const headers = getAuthHeader();
      if (!headers) return;

      const response = await fetch(`http://localhost:5000/api/posts/search?q=${term}`, {
        headers
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to search posts');
      }

      const data = await response.json();
      setPosts(Array.isArray(data) ? data : data.posts || []);
    } catch (err) {
      setError(err.message);
      setPosts([]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Posts</h1>
            <p className="text-gray-400">Manage your blog posts and articles</p>
          </div>
          <button 
            onClick={handleCreatePost}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Post
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
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 rounded-lg border border-slate-700 transition-colors">
            <Filter className="w-5 h-5" />
            Filter
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 rounded-lg border border-slate-700 transition-colors">
            <MoreVertical className="w-5 h-5" />
            More
          </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
        <PostsTable
          posts={posts}
          onView={(post) => console.log('View:', post)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default LLAdminPostsPage;