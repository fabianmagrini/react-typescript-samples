import { Router, Request, Response } from 'express';
import { mockDashboardStats } from '@/services/mockData';
import { DashboardStats, ApiResponse } from '@/types';

const router = Router();

// GET /api/dashboard/stats
router.get('/stats', (req: Request, res: Response) => {
  // Simulate real-time updates by slightly modifying stats
  const stats: DashboardStats = {
    ...mockDashboardStats,
    totalUsers: mockDashboardStats.totalUsers + Math.floor(Math.random() * 5),
    totalOrders: mockDashboardStats.totalOrders + Math.floor(Math.random() * 10),
    revenue: mockDashboardStats.revenue + (Math.random() * 1000),
    growth: mockDashboardStats.growth + (Math.random() * 2 - 1), // +/- 1%
    lastUpdated: new Date().toISOString(),
  };

  const response: ApiResponse<DashboardStats> = {
    data: stats,
    success: true,
    message: 'Dashboard statistics retrieved successfully',
  };

  res.json(response);
});

// GET /api/dashboard/activity
router.get('/activity', (req: Request, res: Response) => {
  const activities = [
    {
      id: '1',
      type: 'user_registration',
      message: 'New user registered',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
      user: 'John Smith',
    },
    {
      id: '2',
      type: 'order_completed',
      message: 'Order completed',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      user: 'Jane Doe',
      orderId: 'ORD-2024-0123',
    },
    {
      id: '3',
      type: 'payment_processed',
      message: 'Payment processed',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
      amount: 199.99,
    },
    {
      id: '4',
      type: 'product_updated',
      message: 'Product inventory updated',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
      productName: 'Wireless Headphones',
    },
    {
      id: '5',
      type: 'system_backup',
      message: 'System backup completed',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    },
  ];

  const response: ApiResponse<typeof activities> = {
    data: activities,
    success: true,
    message: 'Activity feed retrieved successfully',
  };

  res.json(response);
});

export default router;