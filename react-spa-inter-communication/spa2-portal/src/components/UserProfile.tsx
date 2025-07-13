import React from 'react';
import { User } from '../../../shared/types';

interface UserProfileProps {
  user: User;
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onClose }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '25px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>User Profile</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '5px' }}>
              Name:
            </label>
            <div style={{ fontSize: '18px', color: '#333' }}>{user.name}</div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '5px' }}>
              Email:
            </label>
            <div style={{ fontSize: '16px', color: '#666' }}>{user.email}</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
            <div>
              <label style={{ fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '5px' }}>
                Role:
              </label>
              <div style={{ 
                fontSize: '14px', 
                padding: '4px 8px',
                backgroundColor: user.role === 'admin' ? '#dc3545' : '#28a745',
                color: 'white',
                borderRadius: '4px',
                display: 'inline-block'
              }}>
                {user.role.toUpperCase()}
              </div>
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '5px' }}>
                Status:
              </label>
              <div style={{ 
                fontSize: '14px', 
                padding: '4px 8px',
                backgroundColor: user.status === 'active' ? '#28a745' : '#6c757d',
                color: 'white',
                borderRadius: '4px',
                display: 'inline-block'
              }}>
                {user.status.toUpperCase()}
              </div>
            </div>
          </div>
          
          {user.lastLogin && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '5px' }}>
                Last Login:
              </label>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {new Date(user.lastLogin).toLocaleString()}
              </div>
            </div>
          )}
          
          <div style={{ 
            padding: '15px',
            backgroundColor: '#e7f3ff',
            borderRadius: '4px',
            border: '1px solid #b3d7ff'
          }}>
            <div style={{ fontSize: '14px', color: '#0056b3', fontWeight: 'bold' }}>
              👤 User ID: {user.id}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              This profile was selected from the Admin Dashboard
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '20px'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};