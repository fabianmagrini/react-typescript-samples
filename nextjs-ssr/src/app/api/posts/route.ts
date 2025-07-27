import { NextRequest, NextResponse } from 'next/server';
import { Post, ApiResponse } from '@/types';

const posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 15',
    content: 'Learn the basics of Next.js 15 and its new features including improved performance, better developer experience, and enhanced server-side rendering capabilities.',
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
    content: 'Discover advanced TypeScript patterns and practices that will help you write more maintainable, type-safe, and scalable applications.',
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
    content: 'Building scalable design systems with Tailwind CSS utilities, custom components, and consistent design patterns for modern web applications.',
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const author = searchParams.get('author');
    const limit = searchParams.get('limit');

    let filteredPosts = posts;

    if (tag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    if (author) {
      filteredPosts = filteredPosts.filter(post =>
        post.author.name.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        filteredPosts = filteredPosts.slice(0, limitNum);
      }
    }

    const response: ApiResponse<Post[]> = {
      data: filteredPosts,
      success: true,
      message: `Found ${filteredPosts.length} posts`
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      message: 'Failed to fetch posts'
    };

    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newPost: Post = {
      id: Date.now().toString(),
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      author: body.author,
      publishedAt: new Date().toISOString(),
      tags: body.tags || []
    };

    posts.push(newPost);

    const response: ApiResponse<Post> = {
      data: newPost,
      success: true,
      message: 'Post created successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      message: 'Failed to create post'
    };

    return NextResponse.json(response, { status: 500 });
  }
}