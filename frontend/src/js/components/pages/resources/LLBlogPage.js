import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, User, ChevronRight, Heart } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const BlogPostCard = ({ post, onView, onLike }) => {
  const handleClick = () => {
    onView(post.slug);
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <article
      className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:bg-slate-800/70 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-48">
        {post.featuredImage ? (
          <img
            src={`${API_URL}${post.featuredImage}`}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-slate-700" />
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
          {post.categories?.map((category) => (
            <span 
              key={category._id} 
              className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full"
            >
              {category.name}
            </span>
          ))}
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime} min read
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">
          {post.title}
        </h3>
        <p className="text-slate-300 mb-4 line-clamp-2">
          {post.excerpt || post.content.substring(0, 150)}...
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {post.author?.name}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onLike(post.slug);
            }}
            className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span>{post.likes?.length || 0}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

const FeaturedPost = ({ post, onView }) => {
  const handleReadMore = () => {
    onView(post.slug);
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden mb-16">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-64 md:h-full">
          {post.featuredImage ? (
            <img
              src={`${API_URL}${post.featuredImage}`}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-slate-700" />
          )}
        </div>
        <div className="p-8">
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            {post.categories?.map((category) => (
              <span key={category._id} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
                {category.name}
              </span>
            ))}
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {post.title}
          </h2>
          <p className="text-slate-300 mb-6">
            {post.excerpt || post.content.substring(0, 150)}...
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <User className="w-4 h-4" />
              <span>{post.author?.name}</span>
            </div>
            <button 
              onClick={handleReadMore}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Read More
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LLBlogPage() {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPosts(data.data);
      if (data.data.length > 0) {
        setFeaturedPost(data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

// Modify the handleSearch function
const handleSearch = async () => {
  try {
    const response = await fetch(`${API_URL}/posts/search?q=${searchTerm}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    // Add null check and ensure we're setting an array
    setPosts(data?.data || []);  // If data.data is undefined, use empty array
  } catch (error) {
    console.error('Error searching posts:', error);
    setPosts([]); // Set empty array on error
  }
};

  const handleLike = async (slug) => {
    try {
      await fetch(`${API_URL}/posts/${slug}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const recordView = async (slug) => {
    try {
      await fetch(`${API_URL}/posts/${slug}/view`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    try {
      const url = categoryId 
        ? `${API_URL}/posts/category/${categoryId}`
        : `${API_URL}/posts`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPosts(data.data);
    } catch (error) {
      console.error('Error filtering by category:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Legal Insights & Updates
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Stay informed with the latest legal developments, expert analysis, and practical insights.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 cursor-pointer" 
                onClick={handleSearch}
              />
            </div>
          </div>


         <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories?.map((category) => (  // Add optional chaining
            <button
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category._id
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
             }`}>
             {category.name}
            </button>
            ))}
         </div>

          {featuredPost && (
            <FeaturedPost post={featuredPost} onView={recordView} />
          )}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts?.map((post) => (  // Add optional chaining
                <BlogPostCard
                 key={post._id}
                 post={post}
                 onView={recordView}
                 onLike={handleLike}
           />
            ))}
        </div>
        </div>
      </section>
    </div>
  );
}