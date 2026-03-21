import DashboardWidget from './components/DashboardWidget'
import ProfileWidget from './components/ProfileWidget'

// Standalone dev harness — lets you run the remote on its own and preview
// the exposed widgets without a host app.
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-10">
      <h1 className="text-xl font-bold text-gray-800">Remote — widget preview</h1>
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          DashboardWidget
        </h2>
        <DashboardWidget />
      </section>
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          ProfileWidget
        </h2>
        <ProfileWidget />
      </section>
    </div>
  )
}
