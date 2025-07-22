import '@testing-library/jest-dom';

// Mock HTMLElement for JSDOM environment
class MockHTMLElement {
  connectedCallback() {}
  disconnectedCallback() {}
  appendChild() {}
  removeChild() {}
  parentNode = null;
  tagName = 'DIV';
}

// Setup global custom elements mock
Object.defineProperty(window, 'customElements', {
  value: {
    define: jest.fn(),
    get: jest.fn(() => MockHTMLElement),
    whenDefined: jest.fn(() => Promise.resolve()),
  },
  writable: true,
});

// Setup global HTMLElement mock
Object.defineProperty(window, 'HTMLElement', {
  value: MockHTMLElement,
  writable: true,
});

// Mock ReactDOM createRoot for React 18
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
    unmount: jest.fn(),
  })),
}));