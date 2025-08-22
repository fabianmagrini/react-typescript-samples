import React, { useState, useEffect } from 'react';
import type { Order, OrderStatus } from '@mf/shared-types';
import { formatCurrency, formatDate, getOrderStatusColor } from '@mf/utils';

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-0001',
    date: '2024-03-15',
    status: 'delivered',
    total: 299.98,
    items: [
      {
        id: '1',
        productName: 'Wireless Headphones',
        quantity: 1,
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      },
      {
        id: '2',
        productName: 'Wireless Mouse',
        quantity: 1,
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&h=100&fit=crop',
      },
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
    },
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-0002',
    date: '2024-03-12',
    status: 'shipped',
    total: 299.99,
    items: [
      {
        id: '3',
        productName: 'Smart Watch',
        quantity: 1,
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      },
    ],
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
    },
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-0003',
    date: '2024-03-10',
    status: 'processing',
    total: 49.99,
    items: [
      {
        id: '4',
        productName: 'Laptop Stand',
        quantity: 1,
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
      },
    ],
    shippingAddress: {
      street: '789 Pine St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
  },
];


const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const statuses = ['All', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  const filteredOrders = selectedStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">Track your orders and view purchase history</p>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order History</h1>
        <p className="text-gray-600">Track your orders and view purchase history</p>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="card">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div className="mb-4 lg:mb-0">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {order.orderNumber}
                </h3>
                <p className="text-sm text-gray-600">
                  Ordered on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center justify-between lg:justify-end lg:flex-col lg:items-end gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getOrderStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="font-semibold text-lg">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Items ({order.items.length})</h4>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{item.productName}</h5>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(item.quantity * item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
              <div className="text-sm text-gray-600">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t mt-4">
              <button className="btn-primary text-sm">
                View Details
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                Track Package
              </button>
              {order.status === 'delivered' && (
                <button className="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                  Reorder
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {selectedStatus === 'All' 
              ? "You haven't placed any orders yet." 
              : `No orders with status "${selectedStatus}".`}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;