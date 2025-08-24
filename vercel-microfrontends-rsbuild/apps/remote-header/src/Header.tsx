import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <h2>Remote Header Microfrontend</h2>
      <nav>
        <span style={{ marginRight: '1rem' }}>Home</span>
        <span style={{ marginRight: '1rem' }}>About</span>
        <span style={{ marginRight: '1rem' }}>Services</span>
        <span>Contact</span>
      </nav>
    </header>
  );
};

export default Header;