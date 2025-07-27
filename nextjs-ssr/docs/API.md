# API Documentation

This document provides detailed information about the API endpoints available in the application.

## Base URL

```
http://localhost:3000/api
```

## Response Format

All API responses follow a consistent format:

```typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

## Authentication

Currently, the API does not require authentication. This is suitable for demonstration purposes but should be implemented for production use.

## Products API

### Get All Products

**Endpoint:** `GET /api/products`

**Description:** Retrieve a list of all products with optional filtering.

**Query Parameters:**
- `category` (string, optional): Filter products by category
- `inStock` (boolean, optional): Filter products by stock availability

**Example Requests:**
```bash
# Get all products
curl http://localhost:3000/api/products

# Get products in Templates category
curl http://localhost:3000/api/products?category=Templates

# Get only in-stock products
curl http://localhost:3000/api/products?inStock=true

# Combined filters
curl http://localhost:3000/api/products?category=Libraries&inStock=true
```

**Example Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Next.js Starter Kit",
      "description": "Complete starter template with TypeScript and Tailwind CSS",
      "price": 49.99,
      "category": "Templates",
      "image": "/api/placeholder/300/200",
      "inStock": true
    }
  ],
  "success": true,
  "message": "Found 1 products"
}
```

### Create Product

**Endpoint:** `POST /api/products`

**Description:** Create a new product.

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Category Name",
  "image": "/path/to/image.jpg",
  "inStock": true
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Custom Component Pack",
    "description": "Advanced React components for enterprise applications",
    "price": 149.99,
    "category": "Components",
    "inStock": true
  }'
```

**Example Response:**
```json
{
  "data": {
    "id": "1648234567890",
    "name": "Custom Component Pack",
    "description": "Advanced React components for enterprise applications",
    "price": 149.99,
    "category": "Components",
    "image": "/api/placeholder/300/200",
    "inStock": true
  },
  "success": true,
  "message": "Product created successfully"
}
```

### Get Single Product

**Endpoint:** `GET /api/products/[id]`

**Description:** Retrieve a specific product by ID.

**Path Parameters:**
- `id` (string): The product ID

**Example Request:**
```bash
curl http://localhost:3000/api/products/1
```

**Example Response:**
```json
{
  "data": {
    "id": "1",
    "name": "Next.js Starter Kit",
    "description": "Complete starter template with TypeScript and Tailwind CSS",
    "price": 49.99,
    "category": "Templates",
    "image": "/api/placeholder/300/200",
    "inStock": true
  },
  "success": true,
  "message": "Product found"
}
```

### Update Product

**Endpoint:** `PUT /api/products/[id]`

**Description:** Update an existing product.

**Path Parameters:**
- `id` (string): The product ID

**Request Body:** Partial product object with fields to update

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 39.99,
    "inStock": false
  }'
```

**Example Response:**
```json
{
  "data": {
    "id": "1",
    "name": "Next.js Starter Kit",
    "description": "Complete starter template with TypeScript and Tailwind CSS",
    "price": 39.99,
    "category": "Templates",
    "image": "/api/placeholder/300/200",
    "inStock": false
  },
  "success": true,
  "message": "Product updated successfully"
}
```

### Delete Product

**Endpoint:** `DELETE /api/products/[id]`

**Description:** Delete a product.

**Path Parameters:**
- `id` (string): The product ID

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

**Example Response:**
```json
{
  "data": null,
  "success": true,
  "message": "Product deleted successfully"
}
```

## Posts API

### Get All Posts

**Endpoint:** `GET /api/posts`

**Description:** Retrieve a list of blog posts with optional filtering.

**Query Parameters:**
- `tag` (string, optional): Filter posts by tag
- `author` (string, optional): Filter posts by author name
- `limit` (number, optional): Limit the number of results

**Example Requests:**
```bash
# Get all posts
curl http://localhost:3000/api/posts

# Get posts with specific tag
curl http://localhost:3000/api/posts?tag=Next.js

# Get posts by author
curl http://localhost:3000/api/posts?author=John

# Limit results
curl http://localhost:3000/api/posts?limit=2
```

**Example Response:**
```json
{
  "data": [
    {
      "id": "1",
      "title": "Getting Started with Next.js 15",
      "content": "Learn the basics of Next.js 15...",
      "excerpt": "A comprehensive guide to building modern web applications...",
      "author": {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "/api/placeholder/40/40",
        "createdAt": "2025-01-01T00:00:00Z"
      },
      "publishedAt": "2025-01-15T10:00:00Z",
      "tags": ["Next.js", "React", "SSR"]
    }
  ],
  "success": true,
  "message": "Found 1 posts"
}
```

### Create Post

**Endpoint:** `POST /api/posts`

**Description:** Create a new blog post.

**Request Body:**
```json
{
  "title": "Post Title",
  "content": "Full post content...",
  "excerpt": "Brief excerpt of the post...",
  "author": {
    "id": "1",
    "name": "Author Name",
    "email": "author@example.com",
    "avatar": "/path/to/avatar.jpg",
    "createdAt": "2025-01-01T00:00:00Z"
  },
  "tags": ["tag1", "tag2"]
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced React Patterns",
    "content": "Exploring advanced React patterns and best practices...",
    "excerpt": "Learn about advanced React patterns that can improve your code...",
    "author": {
      "id": "4",
      "name": "Sarah Wilson",
      "email": "sarah@example.com",
      "avatar": "/api/placeholder/40/40",
      "createdAt": "2025-01-01T00:00:00Z"
    },
    "tags": ["React", "Advanced", "Patterns"]
  }'
```

**Example Response:**
```json
{
  "data": {
    "id": "1648234567890",
    "title": "Advanced React Patterns",
    "content": "Exploring advanced React patterns and best practices...",
    "excerpt": "Learn about advanced React patterns that can improve your code...",
    "author": {
      "id": "4",
      "name": "Sarah Wilson",
      "email": "sarah@example.com",
      "avatar": "/api/placeholder/40/40",
      "createdAt": "2025-01-01T00:00:00Z"
    },
    "publishedAt": "2025-01-27T12:34:56.789Z",
    "tags": ["React", "Advanced", "Patterns"]
  },
  "success": true,
  "message": "Post created successfully"
}
```

## Contact API

### Submit Contact Form

**Endpoint:** `POST /api/contact`

**Description:** Handle contact form submissions.

**Request Body:**
```json
{
  "name": "Your Name",
  "email": "your.email@example.com",
  "subject": "Subject Line",
  "message": "Your message content..."
}
```

**Validation Rules:**
- All fields are required
- Email must be in valid format
- Name must be at least 2 characters
- Subject must be at least 5 characters
- Message must be at least 10 characters

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "subject": "Inquiry about NextApp",
    "message": "I am interested in learning more about your NextApp solution and how it can help with my project."
  }'
```

**Example Response (Success):**
```json
{
  "data": {
    "id": "1648234567890"
  },
  "success": true,
  "message": "Message sent successfully. We will get back to you soon!"
}
```

**Example Response (Validation Error):**
```json
{
  "data": null,
  "success": false,
  "message": "Invalid email format"
}
```

## Error Handling

### HTTP Status Codes

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

### Error Response Format

```json
{
  "data": null,
  "success": false,
  "message": "Error description"
}
```

### Common Error Messages

- `"All fields are required"` - Missing required fields in request
- `"Invalid email format"` - Email validation failed
- `"Product not found"` - Requested product doesn't exist
- `"Failed to fetch products"` - Server error during data retrieval
- `"Failed to create product"` - Server error during creation

## Rate Limiting

Currently, there are no rate limits implemented. For production use, consider implementing rate limiting to prevent abuse.

## CORS

The API accepts requests from any origin in development. For production, configure CORS to only allow requests from your domain.

## Data Persistence

**Note:** The current implementation uses in-memory storage. Data will be reset when the server restarts. For production use, integrate with a database like PostgreSQL, MongoDB, or Firebase.

## Testing the API

You can test the API using various tools:

### Using curl (Command Line)
```bash
# Test GET endpoint
curl http://localhost:3000/api/products

# Test POST endpoint
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99}'
```

### Using Postman
1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:3000/api`
3. Test each endpoint with sample data

### Using Thunder Client (VS Code)
1. Install Thunder Client extension
2. Create requests for each endpoint
3. Test with different parameters and payloads

## Future Enhancements

Planned improvements for the API:

1. **Authentication & Authorization**
   - JWT token-based authentication
   - Role-based access control
   - API key management

2. **Database Integration**
   - PostgreSQL or MongoDB integration
   - Data persistence and migrations
   - Connection pooling

3. **Advanced Features**
   - Pagination for large datasets
   - Search functionality
   - File upload support
   - Caching with Redis

4. **Security Enhancements**
   - Rate limiting
   - Input sanitization
   - CORS configuration
   - Request validation middleware

5. **Monitoring & Logging**
   - API request logging
   - Performance monitoring
   - Error tracking
   - Health check endpoints