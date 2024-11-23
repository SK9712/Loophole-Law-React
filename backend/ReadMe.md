Iteration-1
===========
# Register a new user:
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}'

# Login:
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "123456"
}'

Iteration-2
===========
# Create post
curl -X POST http://localhost:5000/api/posts \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "First Blog Post",
  "content": "Content here",
  "status": "published"
}'

# Get posts
curl http://localhost:5000/api/posts

# Get single post
curl http://localhost:5000/api/posts/first-blog-post

# Update post
curl -X PUT http://localhost:5000/api/posts/first-blog-post \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "content": "Updated content"
}'

Iteration-3
===========
# Create category
curl -X POST http://localhost:5000/api/categories \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name": "Technology",
  "description": "Tech related posts"
}'

# Create post with category and tags
curl -X POST http://localhost:5000/api/posts \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "Post with Categories",
  "content": "Content here",
  "categories": ["category_id"],
  "tags": ["tech", "programming"]
}'

# Get posts by category
curl http://localhost:5000/api/posts/category/technology

# Get posts by tag
curl http://localhost:5000/api/posts/tag/tech

Iteration-4
===========
# Create a comment
curl -X POST http://localhost:5000/api/posts/your-post-slug/comments \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "content": "This is a comment"
}'

# Create a reply to a comment
curl -X POST http://localhost:5000/api/posts/your-post-slug/comments \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "content": "This is a reply",
  "parentId": "comment_id"
}'

# Get comments for a post
curl http://localhost:5000/api/posts/your-post-slug/comments

# Update a comment
curl -X PUT http://localhost:5000/api/comments/comment_id \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "content": "Updated comment"
}'

# Moderate a comment (admin only)
curl -X PUT http://localhost:5000/api/comments/comment_id/moderate \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "status": "approved"
}'

Iteration-5
===========
# Upload image
curl -X POST http://localhost:5000/api/media \
-H "Authorization: Bearer YOUR_TOKEN" \
-F "file=@/path/to/image.jpg" \
-F "title=My Image"

# Get media library
curl http://localhost:5000/api/media \
-H "Authorization: Bearer YOUR_TOKEN"

# Get single media
curl http://localhost:5000/api/media/media_id \
-H "Authorization: Bearer YOUR_TOKEN"

# Delete media
curl -X DELETE http://localhost:5000/api/media/media_id \
-H "Authorization: Bearer YOUR_TOKEN"

Iteration-6
===========
# Search posts
curl "http://localhost:5000/api/posts/search?q=law&category=legal&tags=corporate,legal&sortBy=viewCount"

# Get popular posts
curl http://localhost:5000/api/posts/popular

# Get related posts
curl http://localhost:5000/api/posts/your-post-slug/related

# Record view
curl -X POST http://localhost:5000/api/posts/your-post-slug/view

# Toggle like
curl -X POST http://localhost:5000/api/posts/your-post-slug/like \
-H "Authorization: Bearer YOUR_TOKEN"