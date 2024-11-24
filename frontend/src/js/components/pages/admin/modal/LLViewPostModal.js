import React from 'react';
import { X, Calendar, User, Tag, ExternalLink, Clock } from 'lucide-react';

const LLViewPostModal = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to format content with paragraphs
  const formatContent = (content) => {
    if (!content) return '';
    return content.split('\n').map((paragraph, index) => (
      paragraph.trim() && (
        <p key={index} className="mb-4 text-gray-300 leading-relaxed">
          {paragraph}
        </p>
      )
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      {/* Close button - top right */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto mt-16">
          {/* Post Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                post.status === 'published' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
              }`}>
                {post.status}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author?.name || 'Admin'}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(post.createdAt)}
              </div>
            </div>
          </div>

          {/* Post Content Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden mb-8">
            {/* Featured Image */}
            {post.image && (
              <div className="w-full h-[400px] relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800/50 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12">
              <article className="prose prose-lg max-w-none">
                {/* Excerpt/Summary if exists */}
                {post.excerpt && (
                  <div className="mb-8 text-xl text-gray-300 font-medium leading-relaxed border-l-4 border-blue-500 pl-4">
                    {post.excerpt}
                  </div>
                )}
                
                {/* Main Content */}
                <div className="space-y-6 text-gray-300">
                  {formatContent(post.content)}
                </div>

                {/* Tags if exist */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-slate-700/30 text-gray-300 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-700/50 px-8 py-4 flex items-center justify-between bg-slate-800/30">
              <div className="text-sm text-gray-400">
                Last updated: {formatDate(post.updatedAt || post.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLViewPostModal;