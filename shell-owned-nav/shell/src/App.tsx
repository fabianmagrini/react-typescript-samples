import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navigation from './Navigation';
import PageSkeleton from './PageSkeleton';

const Dashboard = lazy(() => import('mfe_dashboard/Dashboard'));
const Profile = lazy(() => import('mfe_profile/Profile'));

export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation is rendered synchronously — no remote fetch required */}
      <Navigation />
      <main className="p-6 max-w-5xl mx-auto">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
