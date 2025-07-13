import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { AppContext, WSMessage } from '../../../shared/types';

interface UseAppContextReturn {
  context: AppContext;
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

  useEffect(() => {
    const socket: Socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to context server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from context server');
      setIsConnected(false);
    });

    socket.on('contextSync', (serverContext: AppContext) => {
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

    socket.on('contextUpdate', (message: WSMessage) => {
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
      socket.disconnect();
    };
  }, []);

  return {
    context,
    isConnected,
    isLoading
  };
};