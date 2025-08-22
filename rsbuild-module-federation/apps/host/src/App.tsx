import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuthStore } from './store/auth';
import Layout from './features/shared/components/Layout';
import Dashboard from './features/dashboard/pages/Dashboard';
import Profile from './features/user-profile/pages/Profile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Lazy load remote components
const RemoteProductList = React.lazy(() => import('remote/ProductList'));
const RemoteOrderHistory = React.lazy(() => import('remote/OrderHistory'));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const LoginPage: React.FC = () => {
  const { login } = useAuthStore();
  
  const handleLogin = () => {
    // Mock login - in real app this would be actual authentication
    login(
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      },
      'mock-jwt-token'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full card">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to access your micro-frontend application
        </p>
        <button
          onClick={handleLogin}
          className="w-full btn-primary"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          {!isAuthenticated ? (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route 
                  path="products" 
                  element={
                    <Suspense fallback={<div className="animate-pulse card h-64">Loading products...</div>}>
                      <RemoteProductList />
                    </Suspense>
                  } 
                />
                <Route 
                  path="orders" 
                  element={
                    <Suspense fallback={<div className="animate-pulse card h-64">Loading orders...</div>}>
                      <RemoteOrderHistory />
                    </Suspense>
                  } 
                />
              </Route>
            </Routes>
          )}
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;