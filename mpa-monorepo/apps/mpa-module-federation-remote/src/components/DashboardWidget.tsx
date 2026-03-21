import { useState } from 'react'

const RANGES = ['7d', '30d', '90d'] as const
type Range = (typeof RANGES)[number]

const DATA: Record<Range, { label: string; value: string; change: string; up: boolean }[]> = {
  '7d': [
    { label: 'Active Users', value: '1,284', change: '+4.2%', up: true },
    { label: 'Revenue', value: '$8,430', change: '+1.8%', up: true },
    { label: 'Tickets Opened', value: '38', change: '-12%', up: false },
    { label: 'Avg. Response Time', value: '2.4h', change: '-8%', up: false },
  ],
  '30d': [
    { label: 'Active Users', value: '5,102', change: '+11%', up: true },
    { label: 'Revenue', value: '$34,820', change: '+6.3%', up: true },
    { label: 'Tickets Opened', value: '141', change: '+3%', up: true },
    { label: 'Avg. Response Time', value: '2.1h', change: '-14%', up: false },
  ],
  '90d': [
    { label: 'Active Users', value: '14,900', change: '+22%', up: true },
    { label: 'Revenue', value: '$102,310', change: '+18%', up: true },
    { label: 'Tickets Opened', value: '398', change: '-5%', up: false },
    { label: 'Avg. Response Time', value: '1.9h', change: '-21%', up: false },
  ],
}

const ACTIVITY = [
  { user: 'Alice Chen', action: 'Updated billing info', time: '2m ago' },
  { user: 'Bob Martinez', action: 'Opened support ticket #482', time: '14m ago' },
  { user: 'Carol Lee', action: 'Upgraded to Pro plan', time: '1h ago' },
  { user: 'David Kim', action: 'Exported report', time: '2h ago' },
  { user: 'Eve Patel', action: 'Invited 3 team members', time: '3h ago' },
]

export default function DashboardWidget() {
  const [range, setRange] = useState<Range>('7d')

  return (
    <div className="space-y-6">
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              range === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {DATA[range].map(({ label, value, change, up }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
            <p className={`text-sm mt-1 font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
              {change}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Recent Activity</h2>
        </div>
        <ul className="divide-y divide-gray-100">
          {ACTIVITY.map(({ user, action, time }) => (
            <li key={user + time} className="flex items-center justify-between px-5 py-3">
              <div>
                <span className="text-sm font-medium text-gray-900">{user}</span>
                <span className="text-sm text-gray-500"> — {action}</span>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
