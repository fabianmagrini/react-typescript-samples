import { useState } from 'react'
import { Button, Modal, Dropdown } from './components'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dropdownItems = [
    { label: 'Profile', value: 'profile', onClick: () => alert('Profile clicked') },
    { label: 'Settings', value: 'settings', onClick: () => alert('Settings clicked') },
    { label: 'Logout', value: 'logout', onClick: () => alert('Logout clicked') }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Headless React Components
          </h1>
          <p className="text-lg text-gray-600">
            A showcase of reusable, headless components built with TypeScript and styled with Tailwind CSS
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button Component</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button disabled>Disabled Button</Button>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Modal Component</h2>
            <div className="space-y-4">
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
              >
                <p className="text-gray-600 mb-4">
                  This is a headless modal component that provides accessibility features
                  like keyboard navigation and focus management.
                </p>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsModalOpen(false)}>
                    Confirm
                  </Button>
                </div>
              </Modal>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dropdown Component</h2>
            <div className="space-y-4">
              <Dropdown
                trigger={
                  <Button variant="outline">
                    User Menu
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                }
                items={dropdownItems}
              />
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">TypeScript</h3>
                <p className="text-gray-600 text-sm">
                  Fully typed components with proper interface definitions
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Headless</h3>
                <p className="text-gray-600 text-sm">
                  Logic separated from styling for maximum flexibility
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Accessible</h3>
                <p className="text-gray-600 text-sm">
                  Built with accessibility best practices in mind
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Tailwind CSS</h3>
                <p className="text-gray-600 text-sm">
                  Styled with utility-first CSS framework
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Responsive</h3>
                <p className="text-gray-600 text-sm">
                  Mobile-first responsive design approach
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Customizable</h3>
                <p className="text-gray-600 text-sm">
                  Easy to extend and customize for your needs
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App