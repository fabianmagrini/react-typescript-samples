const stats = [
  { label: 'Total Users', value: '12,483', change: '+12%', up: true },
  { label: 'Revenue', value: '$48,295', change: '+8.1%', up: true },
  { label: 'Active Sessions', value: '1,024', change: '-3%', up: false },
];

const recentActivity = [
  { id: 1, user: 'Alice Johnson', action: 'Signed up', time: '2 min ago' },
  { id: 2, user: 'Bob Smith', action: 'Upgraded plan', time: '14 min ago' },
  { id: 3, user: 'Carol White', action: 'Submitted report', time: '1 hr ago' },
  { id: 4, user: 'David Brown', action: 'Invited team member', time: '3 hr ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            <span className={`text-xs font-semibold mt-1 inline-block ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {stat.change} vs last month
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Recent Activity</h2>
        </div>
        <ul className="divide-y divide-slate-100">
          {recentActivity.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">{item.user}</p>
                <p className="text-xs text-slate-500">{item.action}</p>
              </div>
              <span className="text-xs text-slate-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-xs text-slate-400 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2">
        Rendered by <strong>mfe-dashboard</strong> remote (port 3001)
      </div>
    </div>
  );
}
