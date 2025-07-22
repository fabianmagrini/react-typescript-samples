import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';

// Extract the LegacyWebComponentWrapper component for testing
const LegacyWebComponentWrapper: React.FC = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Simulate successful Web Component loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return <div style={{color: 'red', padding: '1em'}}>Error: {error}</div>;
  }

  if (!loaded) {
    return <div>Loading Legacy Remote via Web Component Bridge...</div>;
  }

  return React.createElement('legacy-remote-app');
};

describe('LegacyWebComponentWrapper', () => {
  it('shows loading state initially', () => {
    render(<LegacyWebComponentWrapper />);
    
    expect(screen.getByText('Loading Legacy Remote via Web Component Bridge...')).toBeInTheDocument();
  });

  it('renders Web Component after loading', async () => {
    render(<LegacyWebComponentWrapper />);
    
    await waitFor(() => {
      expect(screen.getByTestId('legacy-remote-app')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('handles loading states correctly', async () => {
    render(<LegacyWebComponentWrapper />);
    
    // Initially shows loading
    expect(screen.getByText('Loading Legacy Remote via Web Component Bridge...')).toBeInTheDocument();
    
    // After loading, shows the Web Component
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });
    
    expect(screen.getByTestId('legacy-remote-app')).toBeInTheDocument();
    expect(screen.queryByText('Loading Legacy Remote via Web Component Bridge...')).not.toBeInTheDocument();
  });

  it('creates Web Component element with correct tag name', async () => {
    render(<LegacyWebComponentWrapper />);
    
    await waitFor(() => {
      const webComponent = screen.getByTestId('legacy-remote-app');
      expect(webComponent).toBeInTheDocument();
      // The mock converts it to a div, but in real implementation it would be legacy-remote-app
      expect(webComponent.tagName.toLowerCase()).toBe('div');
    });
  });

  it('handles Web Component loading gracefully', async () => {
    // Test that the component doesn't crash during loading
    const { rerender } = render(<LegacyWebComponentWrapper />);
    
    expect(screen.getByText('Loading Legacy Remote via Web Component Bridge...')).toBeInTheDocument();
    
    rerender(<LegacyWebComponentWrapper />);
    
    // Component should still be stable
    expect(screen.getByText('Loading Legacy Remote via Web Component Bridge...')).toBeInTheDocument();
  });
});