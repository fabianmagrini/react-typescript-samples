'use client'

import { useState } from 'react'

type User = { id: string; name: string; email: string }

export default function ProfileIsland({ initialUser }: { initialUser: User }) {
  const [form, setForm] = useState({ name: initialUser.name, email: initialUser.email })
  const [saved, setSaved] = useState(false)
  const [editing, setEditing] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSaved(false)
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Stub: simulate save
    setSaved(true)
    setEditing(false)
  }

  return (
    <div className="max-w-lg space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-gray-700">Personal Information</h2>
          {!editing && (
            <button
              onClick={() => { setEditing(true); setSaved(false) }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <input
              id="userId"
              value={initialUser.id}
              disabled
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-400"
            />
          </div>

          {editing && (
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => { setEditing(false); setForm({ name: initialUser.name, email: initialUser.email }) }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        {saved && (
          <p className="mt-4 text-sm text-green-600 font-medium">Changes saved (stub)</p>
        )}
      </div>
    </div>
  )
}
