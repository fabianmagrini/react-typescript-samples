import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { User, AppContext, WSMessage } from '../../shared/types';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3002"],
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory context store
let appContext: AppContext = {
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: new Date()
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      lastLogin: new Date()
    }
  ],
  lastUpdated: new Date()
};

// Broadcast context update to all connected clients
const broadcastContextUpdate = (type: WSMessage['type'], payload: any) => {
  const message: WSMessage = {
    type,
    payload,
    timestamp: new Date()
  };
  
  appContext.lastUpdated = new Date();
  io.emit('contextUpdate', message);
  console.log(`Broadcasted ${type}:`, payload);
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  // Send current context to newly connected client
  socket.emit('contextSync', appContext);
  
  // Handle user operations
  socket.on('createUser', (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: uuidv4()
    };
    
    appContext.users.push(newUser);
    broadcastContextUpdate('USER_CREATED', newUser);
  });
  
  socket.on('updateUser', (updatedUser: User) => {
    const index = appContext.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      appContext.users[index] = updatedUser;
      broadcastContextUpdate('USER_UPDATED', updatedUser);
    }
  });
  
  socket.on('deleteUser', (userId: string) => {
    const index = appContext.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      const deletedUser = appContext.users.splice(index, 1)[0];
      broadcastContextUpdate('USER_DELETED', deletedUser);
    }
  });
  
  // Handle custom events forwarding between SPAs
  socket.on('customEvent', (eventData: any) => {
    console.log('Forwarding custom event:', eventData);
    socket.broadcast.emit('customEvent', eventData);
  });
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// REST API endpoints
app.get('/api/context', (req, res) => {
  res.json(appContext);
});

app.get('/api/users', (req, res) => {
  res.json(appContext.users);
});

app.post('/api/users', (req, res) => {
  const newUser: User = {
    ...req.body,
    id: uuidv4()
  };
  
  appContext.users.push(newUser);
  broadcastContextUpdate('USER_CREATED', newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const index = appContext.users.findIndex(u => u.id === userId);
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  appContext.users[index] = { ...appContext.users[index], ...req.body };
  broadcastContextUpdate('USER_UPDATED', appContext.users[index]);
  res.json(appContext.users[index]);
});

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const index = appContext.users.findIndex(u => u.id === userId);
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const deletedUser = appContext.users.splice(index, 1)[0];
  broadcastContextUpdate('USER_DELETED', deletedUser);
  res.json(deletedUser);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready for SPA connections`);
});