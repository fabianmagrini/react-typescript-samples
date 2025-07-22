import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Remote Latest App', () => {
  it('renders the latest remote app with React 19', () => {
    render(<App />);
    
    expect(screen.getByText('I am the Latest Remote App (React 19)')).toBeInTheDocument();
    expect(screen.getByText(/My React version is:/)).toBeInTheDocument();
    expect(screen.getByText('(Sharing React 19 with Host via Singleton Pattern)')).toBeInTheDocument();
  });

  it('displays the correct React version', () => {
    render(<App />);
    
    // Should show React 19 version
    const versionText = screen.getByText(/My React version is:/);
    expect(versionText).toHaveTextContent('19.');
  });

  it('has correct styling applied', () => {
    render(<App />);
    
    const container = screen.getByText('I am the Latest Remote App (React 19)').closest('div');
    expect(container).toHaveStyle({
      border: '1px solid purple',
      padding: '1em'
    });
  });

  it('shows singleton pattern indicator', () => {
    render(<App />);
    
    expect(screen.getByText('(Sharing React 19 with Host via Singleton Pattern)')).toBeInTheDocument();
  });

  it('renders with expected React version format', () => {
    render(<App />);
    
    const versionElement = screen.getByText(/My React version is:/);
    // Should contain React 19.x.x format
    expect(versionElement.textContent).toMatch(/My React version is: 19\./);
  });

  it('maintains component structure for singleton sharing', () => {
    const { container } = render(<App />);
    
    // Should have a single root div that will share React context
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveStyle({ border: '1px solid purple' });
  });

  it('uses the same React instance as would be provided by host', () => {
    render(<App />);
    
    // In singleton pattern, this would use host's React version
    const versionText = screen.getByText(/My React version is:/);
    expect(versionText).toBeInTheDocument();
    
    // The version should be determined by React.version
    expect(React.version).toMatch(/19\./);
  });
});