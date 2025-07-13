import React, { useState, useCallback, useEffect } from 'react';
import { useAppContext } from './hooks/useAppContext';
import { useEventBus } from './hooks/useEventBus';
import { UserProfile } from './components/UserProfile';
import { UserGrid } from './components/UserGrid';
import { User, CustomEventData } from '../../shared/types';

const App: React.FC = () => {
  const { context, isConnected, isLoading } = useAppContext();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [events, setEvents] = useState<CustomEventData[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const handleCustomEvent = useCallback((eventData: CustomEventData) => {
    setEvents(prev => [eventData, ...prev].slice(0, 10)); // Keep last 10 events
    
    // Handle specific event types
    switch (eventData.type) {
      case 'USER_SELECTED':
        if (eventData.source === 'admin-dashboard') {
          const user = eventData.payload as User;
          setSelectedUser(user);
          setNotification(`User ${user.name} selected from Admin Dashboard`);
          setTimeout(() => setNotification(null), 3000);
        }
        break;
      case 'NAVIGATION':
        if (eventData.payload.action === 'navigate_to_dashboard') {
          setNotification('📱 Navigation signal received from Admin Dashboard');
          setTimeout(() => setNotification(null), 3000);
        }
        break;
    }
  }, []);

  const { emit: emitEvent, isConnected: eventBusConnected } = useEventBus(handleCustomEvent);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    
    // Emit event to notify other SPAs
    const eventData: CustomEventData = {
      type: 'USER_SELECTED',
      payload: user,
      source: 'user-portal',
      timestamp: new Date()
    };
    emitEvent(eventData);
  };

  const sendStatusUpdate = () => {
    const eventData: CustomEventData = {
      type: 'USER_UPDATED',
      payload: { 
        message: 'User portal is active and synchronized',
        userCount: context.users.length,
        selectedUserId: selectedUser?.id 
      },
      source: 'user-portal',
      timestamp: new Date()
    };
    emitEvent(eventData);
  };

  // Auto-select first user if none selected and users are available
  useEffect(() => {
    if (!selectedUser && context.users.length > 0) {
      setSelectedUser(context.users[0]);
    }
  }, [context.users, selectedUser]);

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ 
        backgroundColor: '#28a745', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0 }}>User Portal</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>
            View user profiles and receive updates from Admin Dashboard
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', marginBottom: '5px' }}>
            Context Server: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
          <div style={{ fontSize: '14px' }}>
            Event Bus: {eventBusConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
        </div>
      </header>

      {notification && (
        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#155724'
        }}>
          {notification}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          {selectedUser && (
            <UserProfile 
              user={selectedUser} 
              onClose={() => setSelectedUser(null)} 
            />
          )}
          
          <UserGrid
            users={context.users}
            selectedUserId={selectedUser?.id}
            onUserSelect={handleUserSelect}
          />
          
          <div style={{ 
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <button
              onClick={sendStatusUpdate}
              style={{
                padding: '10px 20px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Send Status Update
            </button>
            <div style={{ 
              padding: '10px 15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              fontSize: '14px',
              color: '#666'
            }}>
              Context Updated: {context.lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div>
          <h3>Inter-SPA Events</h3>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #ddd',
            borderRadius: '8px',
            height: '500px',
            overflow: 'auto',
            padding: '15px'
          }}>
            {events.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                No events received yet. Events from other SPAs will appear here.
              </p>
            ) : (
              events.map((event, index) => (
                <div 
                  key={index}
                  style={{ 
                    marginBottom: '10px', 
                    padding: '10px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #eee'
                  }}
                >
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: event.source === 'admin-dashboard' ? '#007bff' : '#28a745'
                  }}>
                    {event.type}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    From: {event.source}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {event.timestamp.toLocaleTimeString()}
                  </div>
                  <div style={{ marginTop: '5px', fontSize: '14px' }}>
                    {typeof event.payload === 'string' 
                      ? event.payload 
                      : JSON.stringify(event.payload, null, 2)
                    }
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div style={{ 
            marginTop: '15px',
            padding: '15px',
            backgroundColor: '#e9ecef',
            borderRadius: '8px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Quick Stats</h4>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <div>👥 Total Users: {context.users.length}</div>
              <div>📝 Events Received: {events.length}</div>
              <div>👤 Selected User: {selectedUser?.name || 'None'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;