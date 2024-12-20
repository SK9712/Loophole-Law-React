import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, User, Heart, X } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

function BlogDetailModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="relative bg-slate-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
              {post.category || 'Uncategorized'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime || 5} min read
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {post.title}
          </h2>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-slate-400">
              <User className="w-4 h-4" />
              <span>{post.author?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>

          {post.featuredImage?.filePath && (
            <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
              <img
                src={`http://localhost:5000${post.featuredImage.filePath}`}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {post.tags?.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 bg-slate-800 text-slate-300 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogPostCard({ post, onView }) {
  return (
    <article
      className="group bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300 hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onView(post.slug)}
    >
      <div className="relative h-48 overflow-hidden">
        {post.featuredImage?.filePath ? (
          <>
            <img
              src={`http://localhost:5000${post.featuredImage.filePath}`}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
          <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
            {post.category || 'Uncategorized'}
          </span>
          <span className="flex items-center gap-1 opacity-75">
            <Clock className="w-4 h-4" />
            {post.readTime || 5} min read
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-300 mb-4 line-clamp-2 opacity-85">
          {post.excerpt || post.content}
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2 opacity-75">
            <Calendar className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 opacity-75">
            <User className="w-4 h-4" />
            {post.author?.name || 'Anonymous'}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-slate-700/30 text-slate-300 rounded-full hover:bg-slate-700/50 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function LLBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts?status=published`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setPosts(data.data || []);
  } catch (error) {
    console.error('Error fetching posts:', error);
    setPosts([]);
  } finally {
    setLoading(false);
  }
};

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term) {
      const results = posts.filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.content.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const recordView = async (slug) => {
    try {
      await fetch(`${API_URL}/posts/${slug}/view`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const post = posts.find(p => p.slug === slug);
      setSelectedPost(post);
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const displayedPosts = searchTerm ? searchResults : posts;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6 leading-[1.5] h-24">
                Legal Insights & Updates
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                Stay informed with the latest legal developments, expert analysis, and practical insights.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
                <Search 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPosts.map(post => (
                <BlogPostCard
                  key={post._id}
                  post={post}
                  onView={recordView}
                />
              ))}
            </div>

            {searchTerm && displayedPosts.length === 0 && (
              <div className="text-center text-slate-400 mt-8">
                No posts found matching "{searchTerm}"
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedPost && (
        <BlogDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}