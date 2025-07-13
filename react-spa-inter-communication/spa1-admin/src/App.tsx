import React, { useState, useCallback } from 'react';
import { useAppContext } from './hooks/useAppContext';
import { useEventBus } from './hooks/useEventBus';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { User, CustomEventData } from '../../shared/types';

const App: React.FC = () => {
  const { context, createUser, updateUser, deleteUser, isConnected, isLoading } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [events, setEvents] = useState<CustomEventData[]>([]);

  const handleCustomEvent = useCallback((eventData: CustomEventData) => {
    setEvents(prev => [eventData, ...prev].slice(0, 10)); // Keep last 10 events
  }, []);

  const { emit: emitEvent, isConnected: eventBusConnected } = useEventBus(handleCustomEvent);

  const handleUserSelect = (user: User) => {
    const eventData: CustomEventData = {
      type: 'USER_SELECTED',
      payload: user,
      source: 'admin-dashboard',
      timestamp: new Date()
    };
    emitEvent(eventData);
  };

  const handleUserEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormSubmit = (userData: Omit<User, 'id'> | User) => {
    if ('id' in userData) {
      updateUser(userData as User);
    } else {
      createUser(userData);
    }
    setShowForm(false);
    setEditingUser(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  const handleUserDelete = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const sendNavigationEvent = () => {
    const eventData: CustomEventData = {
      type: 'NAVIGATION',
      payload: { action: 'navigate_to_dashboard' },
      source: 'admin-dashboard',
      timestamp: new Date()
    };
    emitEvent(eventData);
  };

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
        backgroundColor: '#007bff', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>
            Manage users and communicate with User Portal
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

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2>User Management</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add User
              </button>
              <button
                onClick={sendNavigationEvent}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Signal Portal Navigation
              </button>
            </div>
          </div>

          <UserList
            users={context.users}
            onUserSelect={handleUserSelect}
            onUserEdit={handleUserEdit}
            onUserDelete={handleUserDelete}
          />

          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            <strong>Context Last Updated:</strong> {context.lastUpdated.toLocaleString()}
          </div>
        </div>

        <div>
          <h3>Inter-SPA Events</h3>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #ddd',
            borderRadius: '8px',
            height: '400px',
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
                  <div style={{ fontWeight: 'bold', color: '#007bff' }}>
                    {event.type}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    From: {event.source}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {event.timestamp.toLocaleTimeString()}
                  </div>
                  <div style={{ marginTop: '5px', fontSize: '14px' }}>
                    {JSON.stringify(event.payload, null, 2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default App;