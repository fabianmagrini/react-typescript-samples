import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { AppContext, User, WSMessage } from '../../../shared/types';

interface UseAppContextReturn {
  context: AppContext;
  createUser: (userData: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  isConnected: boolean;
  isLoading: boolean;
}

export const useAppContext = (): UseAppContextReturn => {
  const [context, setContext] = useState<AppContext>({
    users: [],
    lastUpdated: new Date()
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to context server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from context server');
      setIsConnected(false);
    });

    newSocket.on('contextSync', (serverContext: AppContext) => {
      console.log('Context synchronized:', serverContext);
      setContext({
        ...serverContext,
        lastUpdated: new Date(serverContext.lastUpdated),
        users: serverContext.users.map(user => ({
          ...user,
          lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined
        }))
      });
      setIsLoading(false);
    });

    newSocket.on('contextUpdate', (message: WSMessage) => {
      console.log('Context update received:', message);
      
      switch (message.type) {
        case 'USER_CREATED':
          setContext(prev => ({
            ...prev,
            users: [...prev.users, {
              ...message.payload,
              lastLogin: message.payload.lastLogin ? new Date(message.payload.lastLogin) : undefined
            }],
            lastUpdated: new Date(message.timestamp)
          }));
          break;
        case 'USER_UPDATED':
          setContext(prev => ({
            ...prev,
            users: prev.users.map(user => 
              user.id === message.payload.id ? {
                ...message.payload,
                lastLogin: message.payload.lastLogin ? new Date(message.payload.lastLogin) : undefined
              } : user
            ),
            lastUpdated: new Date(message.timestamp)
          }));
          break;
        case 'USER_DELETED':
          setContext(prev => ({
            ...prev,
            users: prev.users.filter(user => user.id !== message.payload.id),
            lastUpdated: new Date(message.timestamp)
          }));
          break;
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createUser = useCallback((userData: Omit<User, 'id'>) => {
    if (socket) {
      socket.emit('createUser', userData);
    }
  }, [socket]);

  const updateUser = useCallback((user: User) => {
    if (socket) {
      socket.emit('updateUser', user);
    }
  }, [socket]);

  const deleteUser = useCallback((userId: string) => {
    if (socket) {
      socket.emit('deleteUser', userId);
    }
  }, [socket]);

  return {
    context,
    createUser,
    updateUser,
    deleteUser,
    isConnected,
    isLoading
  };
};