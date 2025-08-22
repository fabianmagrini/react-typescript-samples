// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  createdAt?: string;
  updatedAt?: string;
}

// Order types
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt?: string;
  updatedAt?: string;
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  revenue: number;
  growth: number;
  lastUpdated?: string;
}

export interface ActivityItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  user?: string;
  orderId?: string;
  amount?: number;
  productName?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

// State management types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
}

// Module Federation types
export interface RemoteModule {
  name: string;
  url: string;
  scope: string;
  module: string;
}

export interface ModuleFederationConfig {
  name: string;
  remotes: Record<string, string>;
  exposes?: Record<string, string>;
  shared: Record<string, any>;
}