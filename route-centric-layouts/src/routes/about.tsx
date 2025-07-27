import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '../layouts/MainLayout'

export const Route = createFileRoute('/about')({
  component: () => (
    <MainLayout>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About This Project</h1>
          
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              This application demonstrates a React setup using modern tools 
              and best practices for scalable web development.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Technology Stack</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>React 18</strong> - Modern React with concurrent features</li>
              <li><strong>TypeScript</strong> - Type safety and better developer experience</li>
              <li><strong>TanStack Router</strong> - Type-safe routing with route-centric layouts</li>
              <li><strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
              <li><strong>Vite</strong> - Fast build tool and development server</li>
              <li><strong>Vitest</strong> - Fast unit testing framework</li>
              <li><strong>Storybook</strong> - Component development and documentation</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Route-centric layout system</li>
              <li>Type-safe routing and navigation</li>
              <li>Responsive design with Tailwind CSS</li>
              <li>Component testing with Testing Library</li>
              <li>Story-driven component development</li>
              <li>Production-ready build configuration</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  ),
})