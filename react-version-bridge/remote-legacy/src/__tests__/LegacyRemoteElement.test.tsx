// Mock ReactDOM.createRoot before importing anything that uses it
const mockRender = jest.fn();
const mockUnmount = jest.fn();
const mockCreateRoot = jest.fn(() => ({
  render: mockRender,
  unmount: mockUnmount,
}));

jest.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// Now import after mocking
import ReactDOM from 'react-dom/client';
import { LegacyRemoteElement } from '../App';

describe('LegacyRemoteElement Web Component', () => {
  beforeEach(() => {
    // Clear mocks
    jest.clearAllMocks();
  });

  it('has proper class structure', () => {
    expect(LegacyRemoteElement).toBeDefined();
    expect(typeof LegacyRemoteElement).toBe('function');
  });

  it('can be instantiated', () => {
    // Test that the class exists and can be referenced
    expect(LegacyRemoteElement).toBeDefined();
    expect(LegacyRemoteElement.prototype.connectedCallback).toBeDefined();
    expect(LegacyRemoteElement.prototype.disconnectedCallback).toBeDefined();
  });

  it('has connectedCallback method', () => {
    expect(typeof LegacyRemoteElement.prototype.connectedCallback).toBe('function');
  });

  it('has disconnectedCallback method', () => {
    expect(typeof LegacyRemoteElement.prototype.disconnectedCallback).toBe('function');
  });

  it('calls createRoot when connected', () => {
    // Create a mock HTMLElement
    const element = { root: null };
    
    // Bind and call the method
    const connectedCallback = LegacyRemoteElement.prototype.connectedCallback.bind(element);
    connectedCallback();
    
    expect(mockCreateRoot).toHaveBeenCalledWith(element);
    expect(mockRender).toHaveBeenCalled();
  });

  it('calls unmount when disconnected after being connected', () => {
    // Create a mock HTMLElement with root property
    const mockRoot = { render: mockRender, unmount: mockUnmount };
    const element: { root: any } = {
      root: null
    };
    
    // Mock createRoot to return our mock and set it on element
    mockCreateRoot.mockImplementation(() => {
      element.root = mockRoot;
      return mockRoot;
    });
    
    // Bind the methods to our mock element
    const connectedCallback = LegacyRemoteElement.prototype.connectedCallback.bind(element);
    const disconnectedCallback = LegacyRemoteElement.prototype.disconnectedCallback.bind(element);
    
    // First connect
    connectedCallback();
    
    // Then disconnect
    disconnectedCallback();
    
    expect(mockUnmount).toHaveBeenCalled();
  });
});