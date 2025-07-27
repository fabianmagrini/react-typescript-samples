import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '../layouts/MainLayout'

export const Route = createFileRoute('/')({
  component: () => (
    <MainLayout>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Route-Centric Layouts
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            This demo showcases route-centric layout patterns using 
            TanStack Router, TypeScript, Tailwind CSS, and Storybook.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🚀 Modern Routing
              </h3>
              <p className="text-blue-700">
                Type-safe routing with TanStack Router providing excellent developer experience.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                🎨 Beautiful UI
              </h3>
              <p className="text-green-700">
                Styled with Tailwind CSS for rapid development and consistent design.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                📚 Component Stories
              </h3>
              <p className="text-purple-700">
                Components documented and tested with Storybook for better development workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  ),
})