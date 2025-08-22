import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Mock data helpers
export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'https://example.com/avatar.jpg',
};

export const mockDashboardStats = {
  totalUsers: 100,
  totalOrders: 50,
  revenue: 10000,
  growth: 5.5,
  lastUpdated: '2024-03-15T10:00:00Z',
};

export const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'Test product description',
  price: 99.99,
  image: 'https://example.com/product.jpg',
  category: 'Electronics',
  inStock: true,
  rating: 4.5,
  reviews: 100,
};

export const mockOrder = {
  id: '1',
  userId: '1',
  orderNumber: 'ORD-2024-0001',
  date: '2024-03-15T10:00:00Z',
  status: 'delivered' as const,
  total: 199.99,
  items: [
    {
      id: '1',
      productId: '1',
      productName: 'Test Product',
      quantity: 2,
      price: 99.99,
      image: 'https://example.com/product.jpg',
    },
  ],
  shippingAddress: {
    street: '123 Test St',
    city: 'Test City',
    state: 'TS',
    zipCode: '12345',
    country: 'USA',
  },
};