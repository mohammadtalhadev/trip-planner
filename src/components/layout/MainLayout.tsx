import { Link } from 'react-router-dom';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-[24px] border-b border-white/90 shadow-level1 p-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TripPlanner
            </h1>
            <nav className="flex gap-4">
              <Link to="/" className="px-3 py-1 rounded-md text-sm font-medium hover:bg-white/70 transition-colors">
                Home
              </Link>
              <Link to="/destinations" className="px-3 py-1 rounded-md text-sm font-medium hover:bg-white/70 transition-colors">
                Destinations
              </Link>
              <Link to="/trips" className="px-3 py-1 rounded-md text-sm font-medium hover:bg-white/70 transition-colors">
                My Trips
              </Link>
              <Link to="/profile" className="px-3 py-1 rounded-md text-sm font-medium hover:bg-white/70 transition-colors">
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

      <footer className="bg-white/80 backdrop-blur-[24px] border-t border-white/90 shadow-level1 p-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} TripPlanner. All rights reserved.
        </div>
      </footer>
    </div>
  );
}