import { Router, Request, Response } from 'express';
import { mockUsers } from '@/services/mockData';
import { User, ApiResponse } from '@/types';
import { AppError } from '@/middleware/errorHandler';

const router = Router();

// GET /api/users
router.get('/', (req: Request, res: Response) => {
  const response: ApiResponse<User[]> = {
    data: mockUsers,
    success: true,
    message: 'Users retrieved successfully',
  };
  res.json(response);
});

// GET /api/users/:id
router.get('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const user = mockUsers.find(u => u.id === id);

  if (!user) {
    return next(new AppError('User not found', 404, 'USER_NOT_FOUND'));
  }

  const response: ApiResponse<User> = {
    data: user,
    success: true,
    message: 'User retrieved successfully',
  };
  res.json(response);
});

// PUT /api/users/:id
router.put('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const updates = req.body;

  const userIndex = mockUsers.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return next(new AppError('User not found', 404, 'USER_NOT_FOUND'));
  }

  // Validate required fields
  if (!updates.name || !updates.email) {
    return next(new AppError('Name and email are required', 400, 'VALIDATION_ERROR'));
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(updates.email)) {
    return next(new AppError('Invalid email format', 400, 'INVALID_EMAIL'));
  }

  // Update user
  const updatedUser: User = {
    ...mockUsers[userIndex],
    name: updates.name,
    email: updates.email,
    updatedAt: new Date().toISOString(),
  };

  mockUsers[userIndex] = updatedUser;

  const response: ApiResponse<User> = {
    data: updatedUser,
    success: true,
    message: 'User updated successfully',
  };
  res.json(response);
});

// POST /api/users
router.post('/', (req: Request, res: Response, next) => {
  const { name, email } = req.body;

  // Validate required fields
  if (!name || !email) {
    return next(new AppError('Name and email are required', 400, 'VALIDATION_ERROR'));
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError('Invalid email format', 400, 'INVALID_EMAIL'));
  }

  // Check if email already exists
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    return next(new AppError('Email already exists', 409, 'EMAIL_EXISTS'));
  }

  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name,
    email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);

  const response: ApiResponse<User> = {
    data: newUser,
    success: true,
    message: 'User created successfully',
  };
  res.status(201).json(response);
});

// DELETE /api/users/:id
router.delete('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const userIndex = mockUsers.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return next(new AppError('User not found', 404, 'USER_NOT_FOUND'));
  }

  mockUsers.splice(userIndex, 1);

  const response: ApiResponse<null> = {
    data: null,
    success: true,
    message: 'User deleted successfully',
  };
  res.json(response);
});

export default router;