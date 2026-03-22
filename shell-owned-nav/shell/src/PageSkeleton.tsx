export default function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-4 mt-4">
      <div className="h-8 bg-slate-200 rounded w-1/3" />
      <div className="grid grid-cols-3 gap-4">
        {['a', 'b', 'c'].map((id) => (
          <div key={id} className="h-28 bg-slate-200 rounded-xl" />
        ))}
      </div>
      <div className="h-64 bg-slate-200 rounded-xl" />
    </div>
  );
}
