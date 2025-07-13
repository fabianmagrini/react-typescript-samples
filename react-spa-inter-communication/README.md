# React SPA Inter-Communication Example

A practical demonstration of how to establish communication between two separate React Single Page Applications (SPAs) using custom events, with a Node.js server acting as a central hub for sharing consistent context.

## Architecture Overview

```
┌─────────────────┐    WebSocket    ┌─────────────────┐    WebSocket    ┌─────────────────┐
│   Admin SPA     │◄──────────────►│   Node.js       │◄──────────────►│   User Portal   │
│   (Port 3001)   │                │   Server        │                │   (Port 3002)   │
│                 │                │   (Port 3000)   │                │                 │
│ • User CRUD     │                │ • Context Store │                │ • User Profiles │
│ • Event Emit    │                │ • Event Relay   │                │ • Event Listen  │
└─────────────────┘                └─────────────────┘                └─────────────────┘
```

## Key Features

### 🔄 **Real-time Context Synchronization**
- Central Node.js server maintains shared application state
- Both SPAs automatically sync with server state changes
- WebSocket connections for real-time updates

### 📡 **Custom Event Communication**
- Cross-SPA communication via custom events
- Event types: `USER_SELECTED`, `USER_UPDATED`, `NAVIGATION`
- Events relayed through central server

### 🎯 **Practical Use Cases**
- Admin selects user → User Portal shows profile
- User operations in Admin → Real-time updates in Portal
- Navigation signals between applications

## Project Structure

```
react-spa-inter-communication/
├── shared/
│   └── types.ts                 # Shared TypeScript interfaces
├── server/
│   ├── src/index.ts            # Node.js WebSocket server
│   ├── package.json
│   └── tsconfig.json
├── spa1-admin/                 # Admin Dashboard (Port 3001)
│   ├── src/
│   │   ├── hooks/
│   │   │   ├── useAppContext.ts    # Context management
│   │   │   └── useEventBus.ts      # Event communication
│   │   ├── components/
│   │   │   ├── UserList.tsx
│   │   │   └── UserForm.tsx
│   │   └── App.tsx
│   └── package.json
├── spa2-portal/               # User Portal (Port 3002)
│   ├── src/
│   │   ├── hooks/
│   │   │   ├── useAppContext.ts    # Context management
│   │   │   └── useEventBus.ts      # Event communication
│   │   ├── components/
│   │   │   ├── UserProfile.tsx
│   │   │   └── UserGrid.tsx
│   │   └── App.tsx
│   └── package.json
└── package.json               # Root package for concurrent running
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Three terminal windows/tabs

### Installation & Setup

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install server dependencies:**
   ```bash
   cd server && npm install && cd ..
   ```

3. **Install SPA dependencies:**
   ```bash
   cd spa1-admin && npm install && cd ..
   cd spa2-portal && npm install && cd ..
   ```

### Running the Applications

**Option 1: Run all at once (recommended)**
```bash
npm run dev
```

**Option 2: Run individually**
```bash
# Terminal 1: Start the Node.js server
npm run server

# Terminal 2: Start Admin Dashboard
npm run spa1

# Terminal 3: Start User Portal
npm run spa2
```

### Access Points
- **Admin Dashboard**: http://localhost:3001
- **User Portal**: http://localhost:3002
- **Server API**: http://localhost:3000

## How It Works

### 1. **Central Context Management**

The Node.js server (`server/src/index.ts`) manages a shared context:

```typescript
interface AppContext {
  users: User[];
  currentUser?: User;
  lastUpdated: Date;
}
```

### 2. **WebSocket Communication**

Both SPAs connect to the server via WebSocket:

```typescript
// Context synchronization
socket.on('contextSync', (serverContext: AppContext) => {
  setContext(serverContext);
});

// Real-time updates
socket.on('contextUpdate', (message: WSMessage) => {
  // Update local context based on message type
});
```

### 3. **Custom Event System**

Cross-SPA communication through custom events:

```typescript
interface CustomEventData {
  type: 'USER_SELECTED' | 'USER_UPDATED' | 'NAVIGATION';
  payload: any;
  source: string;
  timestamp: Date;
}
```

### 4. **Event Bus Hook**

Reusable hook for event communication:

```typescript
const { emit, isConnected } = useEventBus(handleCustomEvent);

// Emit event
emit({
  type: 'USER_SELECTED',
  payload: user,
  source: 'admin-dashboard',
  timestamp: new Date()
});
```

## Demo Scenarios

### Scenario 1: User Selection
1. Open both Admin Dashboard and User Portal
2. In Admin Dashboard, click "View in Portal" for any user
3. **Result**: User Portal immediately shows the selected user's profile

### Scenario 2: Real-time Updates
1. In Admin Dashboard, create, edit, or delete a user
2. **Result**: User Portal's user grid updates in real-time

### Scenario 3: Cross-SPA Navigation
1. In Admin Dashboard, click "Signal Portal Navigation"
2. **Result**: User Portal receives and displays the navigation event

### Scenario 4: Bidirectional Communication
1. In User Portal, select a different user
2. In User Portal, click "Send Status Update"
3. **Result**: Admin Dashboard receives events from User Portal

## Technical Implementation Details

### TypeScript Integration
- Shared type definitions in `/shared/types.ts`
- Full type safety across all applications
- Interfaces for WebSocket messages and custom events

### Error Handling & Resilience
- Automatic WebSocket reconnection
- Connection status indicators
- Graceful handling of disconnections

### State Management
- Custom hooks for context and event management
- React state synchronized with server state
- Optimistic updates with server confirmation

### Event Relay Architecture
- Server acts as event relay between SPAs
- Events are broadcast to all connected clients except sender
- Event history tracking for debugging

## REST API Endpoints

The server also provides REST endpoints:

```
GET    /api/context     # Get current context
GET    /api/users       # Get all users
POST   /api/users       # Create user
PUT    /api/users/:id   # Update user
DELETE /api/users/:id   # Delete user
```

## Extending the Example

### Adding New Event Types
1. Update `CustomEventData` interface in `shared/types.ts`
2. Handle new event types in both SPAs
3. Add server-side logic if needed

### Adding New SPAs
1. Create new React application
2. Include `useAppContext` and `useEventBus` hooks
3. Connect to the same server endpoint

### Adding Authentication
1. Extend user context with authentication state
2. Add JWT token handling in WebSocket connections
3. Implement role-based event filtering

## Performance Considerations

- **Connection Pooling**: Server manages multiple WebSocket connections efficiently
- **Event Filtering**: Events can be filtered by source/type to reduce noise
- **Context Debouncing**: Rapid updates are debounced to prevent UI thrashing
- **Memory Management**: Event history is limited to prevent memory leaks

## Security Notes

- WebSocket connections should use WSS in production
- Implement authentication/authorization for sensitive operations
- Validate all incoming events and context updates
- Consider rate limiting for event emissions

## Troubleshooting

### Connection Issues
- Verify all three applications are running
- Check browser console for WebSocket connection errors
- Ensure ports 3000, 3001, 3002 are available

### Event Not Received
- Check connection status indicators in both SPAs
- Verify event structure matches `CustomEventData` interface
- Check server logs for event relay confirmation

---

This example demonstrates a robust, scalable architecture for inter-SPA communication that can be adapted for various real-world applications requiring coordinated behavior across multiple front-end applications.