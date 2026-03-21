import { useState } from 'react';

export default function Profile() {
  const [form, setForm] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Product Manager',
    bio: 'Building great products one sprint at a time.',
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal information.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
            {form.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-800">{form.name}</p>
            <p className="text-sm text-slate-500">{form.role}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(['name', 'email', 'role'] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                {field}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save changes
            </button>
            {saved && <span className="text-emerald-600 text-sm font-medium">Saved!</span>}
          </div>
        </form>
      </div>

      <div className="text-xs text-slate-400 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2">
        Rendered by <strong>mfe-profile</strong> remote (port 3002)
      </div>
    </div>
  );
}
