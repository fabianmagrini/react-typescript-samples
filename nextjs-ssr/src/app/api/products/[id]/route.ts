import { NextRequest, NextResponse } from 'next/server';
import { Product, ApiResponse } from '@/types';

const products: Product[] = [
  {
    id: '1',
    name: 'Next.js Starter Kit',
    description: 'Complete starter template with TypeScript and Tailwind CSS',
    price: 49.99,
    category: 'Templates',
    image: '/api/placeholder/300/200',
    inStock: true
  },
  {
    id: '2',
    name: 'React Component Library',
    description: 'Comprehensive set of reusable React components',
    price: 99.99,
    category: 'Libraries',
    image: '/api/placeholder/300/200',
    inStock: true
  },
  {
    id: '3',
    name: 'TypeScript Utilities',
    description: 'Advanced TypeScript utilities and type definitions',
    price: 29.99,
    category: 'Utilities',
    image: '/api/placeholder/300/200',
    inStock: false
  },
  {
    id: '4',
    name: 'API Documentation',
    description: 'Comprehensive API documentation and examples',
    price: 19.99,
    category: 'Documentation',
    image: '/api/placeholder/300/200',
    inStock: true
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = products.find(p => p.id === id);

    if (!product) {
      const response: ApiResponse<null> = {
        data: null,
        success: false,
        message: 'Product not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Product> = {
      data: product,
      success: true,
      message: 'Product found'
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      message: 'Failed to fetch product'
    };

    return NextResponse.json(response, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      const response: ApiResponse<null> = {
        data: null,
        success: false,
        message: 'Product not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const body = await request.json();
    const updatedProduct = { ...products[productIndex], ...body };
    products[productIndex] = updatedProduct;

    const response: ApiResponse<Product> = {
      data: updatedProduct,
      success: true,
      message: 'Product updated successfully'
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      message: 'Failed to update product'
    };

    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      const response: ApiResponse<null> = {
        data: null,
        success: false,
        message: 'Product not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    products.splice(productIndex, 1);

    const response: ApiResponse<null> = {
      data: null,
      success: true,
      message: 'Product deleted successfully'
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      message: 'Failed to delete product'
    };

    return NextResponse.json(response, { status: 500 });
  }
}