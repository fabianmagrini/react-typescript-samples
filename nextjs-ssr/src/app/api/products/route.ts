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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const inStock = searchParams.get('inStock');

    let filteredProducts = products;

    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (inStock !== null) {
      const stockFilter = inStock === 'true';
      filteredProducts = filteredProducts.filter(
        product => product.inStock === stockFilter
      );
    }

    const response: ApiResponse<Product[]> = {
      data: filteredProducts,
      success: true,
      message: `Found ${filteredProducts.length} products`
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      message: 'Failed to fetch products'
    };

    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      image: body.image || '/api/placeholder/300/200',
      inStock: body.inStock ?? true
    };

    products.push(newProduct);

    const response: ApiResponse<Product> = {
      data: newProduct,
      success: true,
      message: 'Product created successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      message: 'Failed to create product'
    };

    return NextResponse.json(response, { status: 500 });
  }
}