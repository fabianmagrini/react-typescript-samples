import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
