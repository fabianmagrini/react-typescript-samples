import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to NextApp
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A production-grade Next.js application with TypeScript, Tailwind CSS, and server-side rendering
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Server-Side Rendering</CardTitle>
            <CardDescription>
              Pages are rendered on the server for optimal performance and SEO
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Experience fast loading times and better search engine optimization with our SSR implementation.
            </p>
            <Link href="/about">
              <Button variant="outline" size="sm">Learn More</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TypeScript</CardTitle>
            <CardDescription>
              Type-safe development with enhanced developer experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Catch errors at compile time and enjoy better IntelliSense support throughout the application.
            </p>
            <Link href="/products">
              <Button variant="outline" size="sm">View Products</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tailwind CSS</CardTitle>
            <CardDescription>
              Utility-first CSS framework for rapid UI development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Build beautiful, responsive interfaces quickly with our comprehensive design system.
            </p>
            <Link href="/blog">
              <Button variant="outline" size="sm">Read Blog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-8">
        <Link href="/contact">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
