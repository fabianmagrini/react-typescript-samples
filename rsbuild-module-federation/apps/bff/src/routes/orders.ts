import { Router, Request, Response } from 'express';
import { mockOrders } from '@/services/mockData';
import { Order, ApiResponse } from '@/types';
import { AppError } from '@/middleware/errorHandler';

const router = Router();

// GET /api/orders
router.get('/', (req: Request, res: Response) => {
  const { userId, status, limit = '50' } = req.query;
  let filteredOrders = [...mockOrders];

  // Filter by user ID
  if (userId) {
    filteredOrders = filteredOrders.filter(o => o.userId === userId);
  }

  // Filter by status
  if (status && status !== 'All') {
    filteredOrders = filteredOrders.filter(o => o.status === status);
  }

  // Limit results
  const limitNum = parseInt(limit as string, 10);
  if (!isNaN(limitNum) && limitNum > 0) {
    filteredOrders = filteredOrders.slice(0, limitNum);
  }

  // Sort by date (newest first)
  filteredOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const response: ApiResponse<Order[]> = {
    data: filteredOrders,
    success: true,
    message: `Found ${filteredOrders.length} orders`,
  };

  res.json(response);
});

// GET /api/orders/:id
router.get('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const order = mockOrders.find(o => o.id === id);

  if (!order) {
    return next(new AppError('Order not found', 404, 'ORDER_NOT_FOUND'));
  }

  const response: ApiResponse<Order> = {
    data: order,
    success: true,
    message: 'Order retrieved successfully',
  };

  res.json(response);
});

// PUT /api/orders/:id/status
router.put('/:id/status', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const orderIndex = mockOrders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    return next(new AppError('Order not found', 404, 'ORDER_NOT_FOUND'));
  }

  // Validate status
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return next(new AppError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400, 'INVALID_STATUS'));
  }

  // Update order status
  const updatedOrder: Order = {
    ...mockOrders[orderIndex],
    status,
    updatedAt: new Date().toISOString(),
  };

  mockOrders[orderIndex] = updatedOrder;

  const response: ApiResponse<Order> = {
    data: updatedOrder,
    success: true,
    message: 'Order status updated successfully',
  };

  res.json(response);
});

// POST /api/orders
router.post('/', (req: Request, res: Response, next) => {
  const { userId, items, shippingAddress } = req.body;

  // Validate required fields
  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return next(new AppError('User ID and items are required', 400, 'VALIDATION_ERROR'));
  }

  if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
    return next(new AppError('Complete shipping address is required', 400, 'INVALID_ADDRESS'));
  }

  // Calculate total
  const total = items.reduce((sum: number, item: any) => {
    return sum + (item.price * item.quantity);
  }, 0);

  // Generate order number
  const orderNumber = `ORD-${new Date().getFullYear()}-${String(mockOrders.length + 1).padStart(4, '0')}`;

  const newOrder: Order = {
    id: (mockOrders.length + 1).toString(),
    userId,
    orderNumber,
    date: new Date().toISOString(),
    status: 'pending',
    total,
    items,
    shippingAddress,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);

  const response: ApiResponse<Order> = {
    data: newOrder,
    success: true,
    message: 'Order created successfully',
  };

  res.status(201).json(response);
});

// GET /api/orders/stats
router.get('/stats', (req: Request, res: Response) => {
  const { userId } = req.query;
  let ordersToAnalyze = mockOrders;

  if (userId) {
    ordersToAnalyze = mockOrders.filter(o => o.userId === userId);
  }

  const stats = {
    total: ordersToAnalyze.length,
    byStatus: {
      pending: ordersToAnalyze.filter(o => o.status === 'pending').length,
      processing: ordersToAnalyze.filter(o => o.status === 'processing').length,
      shipped: ordersToAnalyze.filter(o => o.status === 'shipped').length,
      delivered: ordersToAnalyze.filter(o => o.status === 'delivered').length,
      cancelled: ordersToAnalyze.filter(o => o.status === 'cancelled').length,
    },
    totalRevenue: ordersToAnalyze.reduce((sum, order) => sum + order.total, 0),
    averageOrderValue: ordersToAnalyze.length > 0 
      ? ordersToAnalyze.reduce((sum, order) => sum + order.total, 0) / ordersToAnalyze.length 
      : 0,
  };

  const response: ApiResponse<typeof stats> = {
    data: stats,
    success: true,
    message: 'Order statistics retrieved successfully',
  };

  res.json(response);
});

export default router;