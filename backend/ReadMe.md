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