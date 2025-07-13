import { useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { CustomEventData, EventBusConfig } from '../../../shared/types';

interface UseEventBusReturn {
  emit: (eventData: CustomEventData) => void;
  isConnected: boolean;
}

const defaultConfig: EventBusConfig = {
  serverUrl: 'http://localhost:3000',
  reconnectInterval: 1000,
  maxReconnectAttempts: 5
};

export const useEventBus = (
  onEvent: (eventData: CustomEventData) => void,
  config: Partial<EventBusConfig> = {}
): UseEventBusReturn => {
  const socketRef = useRef<Socket | null>(null);
  const configRef = useRef({ ...defaultConfig, ...config });
  const isConnectedRef = useRef(false);

  const emit = useCallback((eventData: CustomEventData) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('customEvent', eventData);
      console.log('Emitted custom event:', eventData);
    } else {
      console.warn('Cannot emit event: not connected to server');
    }
  }, []);

  useEffect(() => {
    const socket = io(configRef.current.serverUrl, {
      transports: ['websocket'],
      reconnectionAttempts: configRef.current.maxReconnectAttempts,
      reconnectionDelay: configRef.current.reconnectInterval,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to event bus server');
      isConnectedRef.current = true;
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from event bus server');
      isConnectedRef.current = false;
    });

    socket.on('customEvent', (eventData: CustomEventData) => {
      console.log('Received custom event:', eventData);
      onEvent({
        ...eventData,
        timestamp: new Date(eventData.timestamp)
      });
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [onEvent]);

  return {
    emit,
    isConnected: isConnectedRef.current
  };
};