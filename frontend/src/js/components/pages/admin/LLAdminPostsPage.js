import React, { useState } from 'react';
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
  XCircle
} from 'lucide-react';

const PostsTable = ({ posts, onEdit, onDelete, onView }) => (
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
          <tr key={post.id} className="hover:bg-slate-800/50 transition-colors">
            <td className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{post.title}</p>
                  <p className="text-sm text-gray-400">{post.excerpt}</p>
                </div>
              </div>
            </td>
            <td className="py-4 px-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
            </td>
            <td className="py-4 px-4">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm 
                ${post.status === 'Published' 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                {post.status === 'Published' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {post.status}
              </span>
            </td>
            <td className="py-4 px-4">
              <span className="inline-flex items-center gap-1 text-gray-400">
                <Calendar className="w-4 h-4" />
                {post.date}
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
  </div>
);

const LLAdminPostsPage = () => {
  // Sample data - replace with actual data from your backend
  const [posts] = useState([
    {
      id: 1,
      title: 'Understanding Corporate Law',
      excerpt: 'A comprehensive guide to corporate law basics',
      category: 'Corporate',
      status: 'Published',
      date: '2024-03-20'
    },
    {
      id: 2,
      title: 'Intellectual Property Rights',
      excerpt: 'Protecting your innovations and creative assets',
      category: 'IP Law',
      status: 'Draft',
      date: '2024-03-19'
    },
    {
      id: 3,
      title: 'Contract Law Essentials',
      excerpt: 'Key elements of contract law explained',
      category: 'Contracts',
      status: 'Published',
      date: '2024-03-18'
    }
  ]);

  const handleView = (post) => {
    console.log('View post:', post);
  };

  const handleEdit = (post) => {
    console.log('Edit post:', post);
  };

  const handleDelete = (post) => {
    console.log('Delete post:', post);
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Posts</h1>
              <p className="text-gray-400">Manage your blog posts and articles</p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              New Post
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Search and Filter */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
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
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          <div className="border-t border-slate-700 px-4 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> results
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded hover:bg-slate-600/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded hover:bg-slate-600/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLAdminPostsPage;