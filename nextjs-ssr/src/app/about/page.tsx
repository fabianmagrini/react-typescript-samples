import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About - NextApp',
  description: 'Learn more about our production-grade Next.js application',
};

export default function About() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About NextApp</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          NextApp is a comprehensive demonstration of production-grade Next.js development practices,
          showcasing server-side rendering, TypeScript integration, and modern UI design patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Technical Stack</CardTitle>
            <CardDescription>Modern technologies for optimal performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">Next.js 15</h3>
              <p className="text-gray-600">React framework with server-side rendering and automatic code splitting</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">TypeScript</h3>
              <p className="text-gray-600">Type-safe development with enhanced developer experience</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Tailwind CSS</h3>
              <p className="text-gray-600">Utility-first CSS framework for rapid UI development</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Production-ready features and best practices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">Server-Side Rendering</h3>
              <p className="text-gray-600">Pre-rendered pages for better SEO and initial load performance</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">API Routes</h3>
              <p className="text-gray-600">Built-in API endpoints for seamless data management</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Reusable Components</h3>
              <p className="text-gray-600">Modular UI components for consistent design and maintainability</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mission</CardTitle>
          <CardDescription>Building the future of web applications</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to demonstrate how modern web development practices can be implemented
            to create fast, scalable, and maintainable applications. We believe in the power of
            server-side rendering, strong typing, and component-based architecture to deliver
            exceptional user experiences while maintaining developer productivity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}