# API Documentation

## Base URL
```
http://localhost:3001
```

## Overview

The Host-Managed Data Pattern Demo API provides RESTful endpoints for managing users and posts. The API uses JSON for all request and response payloads and includes proper HTTP status codes.

## Authentication

This is a demo API with no authentication required. All endpoints are publicly accessible.

## Rate Limiting

No rate limiting is implemented in this demo version.

## Response Format

All successful responses return JSON data. Error responses include an error message in the following format:

```json
{
  "error": "Error message description"
}
```

## HTTP Status Codes

- `200 OK` - Request successful
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Endpoints

### Health Check

#### GET /health
Returns server health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

### Users

#### GET /api/users
Retrieve all users.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net"
    }
  }
]
```

**Example:**
```bash
curl http://localhost:3001/api/users
```

---

#### GET /api/users/:id
Retrieve a specific user by ID.

**Parameters:**
- `id` (number) - User ID

**Response:**
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net"
  }
}
```

**Error Response (404):**
```json
{
  "error": "User not found"
}
```

**Example:**
```bash
curl http://localhost:3001/api/users/1
```

---

### Posts

#### GET /api/posts
Retrieve all posts or filter by user.

**Query Parameters:**
- `userId` (number, optional) - Filter posts by user ID

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }
]
```

**Examples:**
```bash
# Get all posts
curl http://localhost:3001/api/posts

# Get posts by user ID
curl http://localhost:3001/api/posts?userId=1
```

---

#### GET /api/posts/:id
Retrieve a specific post by ID.

**Parameters:**
- `id` (number) - Post ID

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

**Error Response (404):**
```json
{
  "error": "Post not found"
}
```

**Example:**
```bash
curl http://localhost:3001/api/posts/1
```

---

## Data Models

### User
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}
```

### Post
```typescript
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
```

## Response Times

The API includes artificial delays to simulate real-world conditions:
- Users list: ~300ms
- Single user: ~200ms
- Posts list: ~400ms
- Single post: ~200ms

## Error Handling

The API includes proper error handling for:
- Invalid resource IDs (404 errors)
- Malformed requests
- Server errors (500 errors)

## CORS

CORS is enabled for all origins to support development from different ports.

## Example Usage with JavaScript

### Fetch All Users
```javascript
const response = await fetch('http://localhost:3001/api/users');
const users = await response.json();
console.log(users);
```

### Fetch User Posts
```javascript
const userId = 1;
const response = await fetch(`http://localhost:3001/api/posts?userId=${userId}`);
const posts = await response.json();
console.log(posts);
```

### Error Handling
```javascript
try {
  const response = await fetch('http://localhost:3001/api/users/999');
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error.error);
  } else {
    const user = await response.json();
    console.log(user);
  }
} catch (error) {
  console.error('Network Error:', error);
}
```

## Testing the API

You can test the API using various tools:

### Using curl
```bash
# Test health endpoint
curl http://localhost:3001/health

# Get all users
curl http://localhost:3001/api/users

# Get user by ID
curl http://localhost:3001/api/users/1

# Get all posts
curl http://localhost:3001/api/posts

# Get posts by user
curl "http://localhost:3001/api/posts?userId=1"
```

### Using Postman
Import the following collection or create requests manually:

1. GET `http://localhost:3001/health`
2. GET `http://localhost:3001/api/users`
3. GET `http://localhost:3001/api/users/1`
4. GET `http://localhost:3001/api/posts`
5. GET `http://localhost:3001/api/posts?userId=1`
6. GET `http://localhost:3001/api/posts/1`

## Development Notes

- The API uses mock data defined in `server/src/index.ts`
- Data is reset on server restart
- No persistence layer is implemented
- All endpoints are read-only (GET requests only)
- TypeScript interfaces ensure type safety between client and server