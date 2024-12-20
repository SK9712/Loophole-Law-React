import React from 'react';
import { X, Calendar, User, Tag, ExternalLink, Clock, Eye, ImageIcon } from 'lucide-react';

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

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${Math.round(kb)} KB`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
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
            {post.featuredImage?.filePath && (
              <div className="relative group">
                <div className="w-full aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={`http://localhost:5000${post.featuredImage.filePath}`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                
                {/* Image Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-gray-300">
                    <ImageIcon className="w-4 h-4" />
                    <span className="capitalize">
                      {post.featuredImage.fileName?.split('.').pop() || 'Image'}
                    </span>
                    {post.featuredImage.fileSize && (
                      <span className="text-gray-400">
                        ({formatFileSize(post.featuredImage.fileSize)})
                      </span>
                    )}
                  </div>
                  
                  {post.featuredImage.fileName && (
                    <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-gray-400 text-xs truncate max-w-[200px]">
                      {post.featuredImage.fileName}
                    </div>
                  )}
                </div>
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

                {/* Meta Information */}
                {(post.metaTitle || post.metaDescription || post.keywords?.length > 0) && (
                  <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Meta Information</h3>
                    {post.metaTitle && (
                      <div className="mb-3">
                        <span className="text-gray-400">Meta Title:</span>
                        <p className="text-gray-300">{post.metaTitle}</p>
                      </div>
                    )}
                    {post.metaDescription && (
                      <div className="mb-3">
                        <span className="text-gray-400">Meta Description:</span>
                        <p className="text-gray-300">{post.metaDescription}</p>
                      </div>
                    )}
                    {post.keywords?.length > 0 && (
                      <div>
                        <span className="text-gray-400">Keywords:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {post.keywords.map((keyword, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-slate-700/30 text-gray-300 text-xs rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-700/50 px-8 py-4 flex items-center justify-between bg-slate-800/30">
              <div className="text-sm text-gray-400">
                Last updated: {formatDate(post.updatedAt || post.createdAt)}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read
                  </span>
                )}
                {typeof post.viewCount === 'number' && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.viewCount} views
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLViewPostModal;