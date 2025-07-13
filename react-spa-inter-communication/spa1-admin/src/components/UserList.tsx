import React from 'react';
import { User } from '../../../shared/types';

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
  onUserEdit: (user: User) => void;
  onUserDelete: (userId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onUserSelect,
  onUserEdit,
  onUserDelete
}) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Users ({users.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {users.map(user => (
          <div
            key={user.id}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                {user.name}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>
                {user.email} • {user.role} • {user.status}
              </div>
              {user.lastLogin && (
                <div style={{ color: '#999', fontSize: '12px' }}>
                  Last login: {new Date(user.lastLogin).toLocaleString()}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => onUserSelect(user)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                View in Portal
              </button>
              <button
                onClick={() => onUserEdit(user)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => onUserDelete(user.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};