import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('Host App', () => {
  it('renders the host application with React 19', () => {
    render(<App />);
    
    expect(screen.getByText('Host Application (React 19)')).toBeInTheDocument();
    expect(screen.getByText(/Using React Version:/)).toBeInTheDocument();
  });

  it('displays the correct React version', () => {
    render(<App />);
    
    // Should show React 19 version
    const versionText = screen.getByText(/Using React Version:/);
    expect(versionText).toHaveTextContent('19.');
  });

  it('renders both remote sections with correct labels', () => {
    render(<App />);
    
    expect(screen.getByText('Loading Legacy Remote (Web Component Bridge)')).toBeInTheDocument();
    expect(screen.getByText('Loading Latest Remote (Singleton Pattern)')).toBeInTheDocument();
  });

  it('shows loading state for Legacy Remote initially', () => {
    render(<App />);
    
    expect(screen.getByText('Loading Legacy Remote via Web Component Bridge...')).toBeInTheDocument();
  });

  it('renders error boundaries for both remotes', async () => {
    render(<App />);
    
    // Both remote sections should be wrapped in error boundaries
    const legacySection = screen.getByText('Loading Legacy Remote (Web Component Bridge)').closest('div');
    const latestSection = screen.getByText('Loading Latest Remote (Singleton Pattern)').closest('div');
    
    expect(legacySection).toBeInTheDocument();
    expect(latestSection).toBeInTheDocument();
  });

  it('applies correct styling to sections', () => {
    render(<App />);
    
    const hostContainer = screen.getByText('Host Application (React 19)').closest('div');
    expect(hostContainer).toHaveStyle({
      border: '2px solid blue',
      padding: '1em',
      borderRadius: '5px'
    });
  });
});