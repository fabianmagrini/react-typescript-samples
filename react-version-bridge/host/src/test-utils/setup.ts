import '@testing-library/jest-dom';
import React from 'react';

// Mock Web Components API
class MockCustomElement extends HTMLElement {
  connectedCallback() {}
  disconnectedCallback() {}
}

// Setup global custom elements mock
Object.defineProperty(window, 'customElements', {
  value: {
    define: jest.fn(),
    get: jest.fn(() => MockCustomElement),
    whenDefined: jest.fn(() => Promise.resolve()),
  },
  writable: true,
});

// Mock React.createElement for Web Components
const originalCreateElement = React.createElement;
jest.spyOn(React, 'createElement').mockImplementation((type, props, ...children) => {
  if (typeof type === 'string' && type === 'legacy-remote-app') {
    return originalCreateElement('div', { 
      'data-testid': 'legacy-remote-app', 
      ...props 
    }, ...children);
  }
  return originalCreateElement(type, props, ...children);
});

// Mock dynamic imports
jest.mock('remote_legacy/WebComponent', () => Promise.resolve({}), { virtual: true });
jest.mock('remote_latest/App', () => ({
  __esModule: true,
  default: () => React.createElement('div', { 'data-testid': 'remote-latest-app' }, 'Remote Latest App'),
}), { virtual: true });