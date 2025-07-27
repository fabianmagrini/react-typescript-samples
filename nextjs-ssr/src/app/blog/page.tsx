import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Post } from '@/types';

export const metadata: Metadata = {
  title: 'Blog - NextApp',
  description: 'Latest articles about Next.js, TypeScript, and web development',
};

async function getPosts(): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: '1',
      title: 'Getting Started with Next.js 15',
      content: 'Learn the basics of Next.js 15 and its new features...',
      excerpt: 'A comprehensive guide to building modern web applications with Next.js 15, covering server-side rendering, API routes, and performance optimization.',
      author: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '/api/placeholder/40/40',
        createdAt: '2025-01-01T00:00:00Z'
      },
      publishedAt: '2025-01-15T10:00:00Z',
      tags: ['Next.js', 'React', 'SSR']
    },
    {
      id: '2',
      title: 'TypeScript Best Practices',
      content: 'Discover advanced TypeScript patterns and practices...',
      excerpt: 'Explore advanced TypeScript techniques that will help you write more maintainable and type-safe code in your Next.js applications.',
      author: {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: '/api/placeholder/40/40',
        createdAt: '2025-01-01T00:00:00Z'
      },
      publishedAt: '2025-01-20T14:30:00Z',
      tags: ['TypeScript', 'Best Practices', 'Development']
    },
    {
      id: '3',
      title: 'Tailwind CSS Design System',
      content: 'Building scalable design systems with Tailwind CSS...',
      excerpt: 'Learn how to create a comprehensive design system using Tailwind CSS utilities and custom components for consistent UI development.',
      author: {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: '/api/placeholder/40/40',
        createdAt: '2025-01-01T00:00:00Z'
      },
      publishedAt: '2025-01-25T09:15:00Z',
      tags: ['Tailwind CSS', 'Design System', 'UI']
    }
  ];
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest insights, tutorials, and best practices
          in modern web development.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="mb-2">
                    <Link 
                      href={`/blog/${post.id}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{post.author.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Link href={`/blog/${post.id}`}>
                  <Button variant="outline" size="sm">Read More</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Subscribe to Our Newsletter</CardTitle>
            <CardDescription>Get the latest articles delivered to your inbox</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}