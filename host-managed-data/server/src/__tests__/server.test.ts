import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import express from 'express'
import cors from 'cors'

// Import the same mock data and setup from the main server file
const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net"
    }
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency"
    }
  }
]

const mockPosts = [
  {
    id: 1,
    userId: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    id: 2,
    userId: 1,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    id: 3,
    userId: 2,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  }
]

// Create a test app instance
function createTestApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // Users endpoints
  app.get('/api/users', (req, res) => {
    res.json(mockUsers)
  })

  app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = mockUsers.find(u => u.id === userId)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  })

  // Posts endpoints
  app.get('/api/posts', (req, res) => {
    const userId = req.query.userId ? parseInt(req.query.userId as string) : null
    
    let posts = mockPosts
    if (userId) {
      posts = mockPosts.filter(post => post.userId === userId)
    }
    
    res.json(posts)
  })

  app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id)
    const post = mockPosts.find(p => p.id === postId)
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    
    res.json(post)
  })

  return app
}

describe('API Server', () => {
  let app: express.Application

  beforeAll(() => {
    app = createTestApp()
  })

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      expect(response.body).toHaveProperty('status', 'ok')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  describe('Users API', () => {
    it('should get all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body).toHaveLength(2)
      expect(response.body[0]).toHaveProperty('id', 1)
      expect(response.body[0]).toHaveProperty('name', 'Leanne Graham')
    })

    it('should get user by id', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(response.body).toHaveProperty('id', 1)
      expect(response.body).toHaveProperty('name', 'Leanne Graham')
      expect(response.body).toHaveProperty('email', 'Sincere@april.biz')
      expect(response.body.company).toHaveProperty('name', 'Romaguera-Crona')
    })

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/999')
        .expect(404)

      expect(response.body).toHaveProperty('error', 'User not found')
    })
  })

  describe('Posts API', () => {
    it('should get all posts', async () => {
      const response = await request(app)
        .get('/api/posts')
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body).toHaveLength(3)
      expect(response.body[0]).toHaveProperty('id', 1)
      expect(response.body[0]).toHaveProperty('userId', 1)
    })

    it('should get posts filtered by userId', async () => {
      const response = await request(app)
        .get('/api/posts?userId=1')
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body).toHaveLength(2)
      expect(response.body.every(post => post.userId === 1)).toBe(true)
    })

    it('should get post by id', async () => {
      const response = await request(app)
        .get('/api/posts/1')
        .expect(200)

      expect(response.body).toHaveProperty('id', 1)
      expect(response.body).toHaveProperty('userId', 1)
      expect(response.body).toHaveProperty('title')
      expect(response.body).toHaveProperty('body')
    })

    it('should return 404 for non-existent post', async () => {
      const response = await request(app)
        .get('/api/posts/999')
        .expect(404)

      expect(response.body).toHaveProperty('error', 'Post not found')
    })

    it('should return empty array for posts by non-existent user', async () => {
      const response = await request(app)
        .get('/api/posts?userId=999')
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body).toHaveLength(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid user ID parameter', async () => {
      const response = await request(app)
        .get('/api/users/invalid')
        .expect(404)

      expect(response.body).toHaveProperty('error', 'User not found')
    })

    it('should handle invalid post ID parameter', async () => {
      const response = await request(app)
        .get('/api/posts/invalid')
        .expect(404)

      expect(response.body).toHaveProperty('error', 'Post not found')
    })
  })

  describe('CORS', () => {
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200)

      expect(response.headers).toHaveProperty('access-control-allow-origin')
    })
  })
})