import { Link } from 'react-router-dom';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-full bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-[#101322] dark:to-[#1b1533]'>
      <header className='sticky top-0 z-40 border-b border-white/90 bg-white/80 p-4 shadow-level1 backdrop-blur-[24px] dark:border-white/10 dark:bg-[#14172a]/80'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-6'>
          <Link to='/app' className='text-xl font-extrabold text-on-surface dark:text-white'>TripPlanner</Link>
          <nav className='flex gap-3 text-sm'>
            <Link to='/app/trips' className='rounded-full px-3 py-1.5 font-medium text-on-surface/70 transition hover:bg-white/70 dark:text-white/70'>Trips</Link>
            <Link to='/app/saved' className='rounded-full px-3 py-1.5 font-medium text-on-surface/70 transition hover:bg-white/70 dark:text-white/70'>Saved</Link>
            <Link to='/app/settings' className='rounded-full px-3 py-1.5 font-medium text-on-surface/70 transition hover:bg-white/70 dark:text-white/70'>Settings</Link>
            <Link to='/' className='rounded-full bg-secondary-container/40 px-3 py-1.5 font-bold text-secondary'>Discover</Link>
          </nav>
        </div>
      </header>
      <main className='mx-auto max-w-6xl px-6 py-8 dark:text-white'>{children}</main>
    </div>
  );
}
