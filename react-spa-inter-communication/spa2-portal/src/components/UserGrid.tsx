import React from 'react';
import { User } from '../../../shared/types';

interface UserGridProps {
  users: User[];
  selectedUserId?: string;
  onUserSelect: (user: User) => void;
}

export const UserGrid: React.FC<UserGridProps> = ({ users, selectedUserId, onUserSelect }) => {
  return (
    <div>
      <h3 style={{ marginBottom: '15px' }}>All Users ({users.length})</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '15px' 
      }}>
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user)}
            style={{
              padding: '20px',
              border: selectedUserId === user.id ? '2px solid #007bff' : '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: selectedUserId === user.id ? '#f8f9ff' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedUserId === user.id ? '0 4px 8px rgba(0,123,255,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              if (selectedUserId !== user.id) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedUserId !== user.id) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '10px' 
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: user.status === 'active' ? '#28a745' : '#6c757d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                marginRight: '12px'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {user.role} • {user.status}
                </div>
              </div>
            </div>
            
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
              📧 {user.email}
            </div>
            
            {user.lastLogin && (
              <div style={{ fontSize: '12px', color: '#999' }}>
                Last login: {new Date(user.lastLogin).toLocaleDateString()}
              </div>
            )}
            
            {selectedUserId === user.id && (
              <div style={{ 
                marginTop: '10px',
                padding: '8px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px',
                textAlign: 'center'
              }}>
                ✨ Selected from Admin
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};