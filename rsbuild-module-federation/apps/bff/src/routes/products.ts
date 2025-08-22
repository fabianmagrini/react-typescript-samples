import { Router, Request, Response } from 'express';
import { mockProducts } from '@/services/mockData';
import { Product, ApiResponse } from '@/types';
import { AppError } from '@/middleware/errorHandler';

const router = Router();

// GET /api/products
router.get('/', (req: Request, res: Response) => {
  const { category, inStock, search } = req.query;
  let filteredProducts = [...mockProducts];

  // Filter by category
  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === (category as string).toLowerCase()
    );
  }

  // Filter by stock status
  if (inStock !== undefined) {
    const stockFilter = inStock === 'true';
    filteredProducts = filteredProducts.filter(p => p.inStock === stockFilter);
  }

  // Search filter
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }

  const response: ApiResponse<Product[]> = {
    data: filteredProducts,
    success: true,
    message: `Found ${filteredProducts.length} products`,
  };

  res.json(response);
});

// GET /api/products/categories
router.get('/categories', (req: Request, res: Response) => {
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));
  
  const response: ApiResponse<string[]> = {
    data: categories,
    success: true,
    message: 'Product categories retrieved successfully',
  };

  res.json(response);
});

// GET /api/products/:id
router.get('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return next(new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND'));
  }

  const response: ApiResponse<Product> = {
    data: product,
    success: true,
    message: 'Product retrieved successfully',
  };

  res.json(response);
});

// PUT /api/products/:id
router.put('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const updates = req.body;

  const productIndex = mockProducts.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return next(new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND'));
  }

  // Validate required fields
  if (updates.name !== undefined && !updates.name.trim()) {
    return next(new AppError('Product name is required', 400, 'VALIDATION_ERROR'));
  }

  if (updates.price !== undefined && (updates.price <= 0 || isNaN(updates.price))) {
    return next(new AppError('Price must be a positive number', 400, 'INVALID_PRICE'));
  }

  // Update product
  const updatedProduct: Product = {
    ...mockProducts[productIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  mockProducts[productIndex] = updatedProduct;

  const response: ApiResponse<Product> = {
    data: updatedProduct,
    success: true,
    message: 'Product updated successfully',
  };

  res.json(response);
});

// POST /api/products
router.post('/', (req: Request, res: Response, next) => {
  const { name, description, price, category, image } = req.body;

  // Validate required fields
  if (!name || !description || !price || !category) {
    return next(new AppError('Name, description, price, and category are required', 400, 'VALIDATION_ERROR'));
  }

  if (price <= 0 || isNaN(price)) {
    return next(new AppError('Price must be a positive number', 400, 'INVALID_PRICE'));
  }

  const newProduct: Product = {
    id: (mockProducts.length + 1).toString(),
    name,
    description,
    price: parseFloat(price),
    category,
    image: image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
    inStock: true,
    rating: 0,
    reviews: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockProducts.push(newProduct);

  const response: ApiResponse<Product> = {
    data: newProduct,
    success: true,
    message: 'Product created successfully',
  };

  res.status(201).json(response);
});

// DELETE /api/products/:id
router.delete('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const productIndex = mockProducts.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return next(new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND'));
  }

  mockProducts.splice(productIndex, 1);

  const response: ApiResponse<null> = {
    data: null,
    success: true,
    message: 'Product deleted successfully',
  };

  res.json(response);
});

export default router;