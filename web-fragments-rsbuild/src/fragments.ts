import { initializeWebFragments } from 'web-fragments';

export const initFragments = () => {
  // Initialize the web fragments library
  // This registers the <web-fragment> custom element globally
  try {
    initializeWebFragments();
    console.log('Web Fragments initialized successfully');
    
    // Note: Fragment registration would typically be done on the server-side
    // using FragmentGateway from "web-fragments/gateway", but for this demo
    // we're just initializing the client-side custom elements
    
  } catch (error) {
    console.error('Failed to initialize Web Fragments:', error);
  }
};