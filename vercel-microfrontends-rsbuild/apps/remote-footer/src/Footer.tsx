import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#374151',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div>
        <h3>Remote Footer Microfrontend</h3>
        <p>© 2025 Vercel Microfrontends + Rsbuild Demo</p>
        <div style={{ marginTop: '1rem' }}>
          <span style={{ marginRight: '1rem' }}>Privacy Policy</span>
          <span style={{ marginRight: '1rem' }}>Terms of Service</span>
          <span>Support</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;