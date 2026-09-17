import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { MainLayout } from './components/layout/MainLayout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingState } from './components/common/StatusStates';
import { useAuthStore } from './store/useAuthStore';

// Route-level code splitting with React.lazy (spec: routing + bundle size)
const LandingPage = lazy(() => import('./pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const SignInPage = lazy(() => import('./pages/SignInPage').then((m) => ({ default: m.SignInPage })));
const SignUpPage = lazy(() => import('./pages/SignUpPage').then((m) => ({ default: m.SignUpPage })));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage').then((m) => ({ default: m.DiscoverPage })));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage').then((m) => ({ default: m.DestinationsPage })));
const DestinationDetailPage = lazy(() => import('./pages/DestinationDetailPage').then((m) => ({ default: m.DestinationDetailPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const TripsPage = lazy(() => import('./pages/TripsPage').then((m) => ({ default: m.TripsPage })));
const NewTripPage = lazy(() => import('./pages/NewTripPage').then((m) => ({ default: m.NewTripPage })));
const TripDetailPage = lazy(() => import('./pages/TripDetailPage').then((m) => ({ default: m.TripDetailPage })));
const ItineraryPage = lazy(() => import('./pages/ItineraryPage').then((m) => ({ default: m.ItineraryPage })));
const BudgetPage = lazy(() => import('./pages/BudgetPage').then((m) => ({ default: m.BudgetPage })));
const SavedPage = lazy(() => import('./pages/SavedPage').then((m) => ({ default: m.SavedPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));

function FullPageSpinner() {
  return (
    <div className='grid min-h-screen place-items-center bg-surface'>
      <LoadingState label='Loading TripPlanner…' />
    </div>
  );
}

function RequireAuth() {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to='/signin' replace />;
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<FullPageSpinner />}>
          <Routes>
            {/* Public marketing + app pages */}
            <Route path='/' element={<DiscoverPage />} />
            <Route path='/welcome' element={<LandingPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/destinations' element={<DestinationsPage />} />
            <Route path='/destinations/:destinationId' element={<DestinationDetailPage />} />

            {/* Authenticated app shell */}
            <Route path='/app' element={<RequireAuth />}>
              <Route index element={<DashboardPage />} />
              <Route path='trips' element={<TripsPage />} />
              <Route path='trips/new' element={<NewTripPage />} />
              <Route path='trips/:tripId' element={<TripDetailPage />} />
              <Route path='trips/:tripId/itinerary' element={<ItineraryPage />} />
              <Route path='trips/:tripId/budget' element={<BudgetPage />} />
              <Route path='saved' element={<SavedPage />} />
              <Route path='settings' element={<SettingsPage />} />
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}


