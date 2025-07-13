// Shared types for all applications

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  lastLogin?: Date;
}

export interface AppContext {
  users: User[];
  currentUser?: User;
  lastUpdated: Date;
}

// WebSocket message types
export interface WSMessage {
  type: 'CONTEXT_UPDATE' | 'USER_CREATED' | 'USER_UPDATED' | 'USER_DELETED';
  payload: any;
  timestamp: Date;
}

// Custom event types for cross-SPA communication
export interface CustomEventData {
  type: 'USER_SELECTED' | 'USER_UPDATED' | 'CONTEXT_SYNC' | 'NAVIGATION';
  payload: any;
  source: string;
  timestamp: Date;
}

export interface EventBusConfig {
  serverUrl: string;
  reconnectInterval: number;
  maxReconnectAttempts: number;
}