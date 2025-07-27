import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Product } from '@/types';

export const metadata: Metadata = {
  title: 'Products - NextApp',
  description: 'Explore our range of products and services',
};

async function getProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
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
}

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our curated selection of development tools, templates, and resources
          designed to accelerate your Next.js projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="mt-2">{product.description}</CardDescription>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                  <p className={`text-sm font-medium ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                <Button 
                  variant={product.inStock ? 'primary' : 'outline'}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Notify Me'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Custom Solutions</CardTitle>
            <CardDescription>Need something specific for your project?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              We offer custom development services tailored to your specific requirements.
              Get in touch to discuss your project needs.
            </p>
            <Button size="lg">Contact Us</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}