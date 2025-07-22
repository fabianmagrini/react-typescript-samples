import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('React Version Isolation', () => {
  it('host application uses React 19', () => {
    render(<App />);
    
    // Check that host shows React 19 version
    const versionElement = screen.getByText(/Using React Version:/);
    expect(versionElement.textContent).toMatch(/19\./);
  });

  it('displays version information in the UI', () => {
    render(<App />);
    
    // Host should show React version
    expect(screen.getByText(/Using React Version:/)).toBeInTheDocument();
    
    // Should have descriptive text about patterns
    expect(screen.getByText(/React 18 remote isolated via Web Components bridge pattern/)).toBeInTheDocument();
    expect(screen.getByText(/React 19 remote sharing dependencies with host/)).toBeInTheDocument();
  });

  it('shows correct pattern descriptions', () => {
    render(<App />);
    
    // Legacy remote should mention Web Component Bridge
    const legacySection = screen.getByText('Loading Legacy Remote (Web Component Bridge)');
    expect(legacySection).toBeInTheDocument();
    
    // Latest remote should mention Singleton Pattern
    const latestSection = screen.getByText('Loading Latest Remote (Singleton Pattern)');
    expect(latestSection).toBeInTheDocument();
  });

  it('maintains version isolation through separate loading mechanisms', () => {
    render(<App />);
    
    // Legacy uses dynamic import with Web Component
    expect(screen.getByText('Loading Legacy Remote via Web Component Bridge...')).toBeInTheDocument();
    
    // Latest uses React.lazy with Suspense - in our mock, it loads immediately
    // But the Suspense wrapper should still be present
    const latestSection = screen.getByText('Loading Latest Remote (Singleton Pattern)');
    expect(latestSection).toBeInTheDocument();
  });

  it('does not have React version conflicts in rendered output', () => {
    // This test ensures no version conflict errors are visible in the UI
    const { container } = render(<App />);
    
    // Should not contain any error messages about React versions
    const errorTexts = container.querySelectorAll('[style*="color: red"]');
    expect(errorTexts).toHaveLength(0);
  });

  it('renders host with expected React version string format', () => {
    render(<App />);
    
    const versionText = screen.getByText(/Using React Version:/);
    
    // Should contain a version number that looks like a React version
    expect(versionText.textContent).toMatch(/Using React Version: \d+\.\d+\.\d+/);
  });
});