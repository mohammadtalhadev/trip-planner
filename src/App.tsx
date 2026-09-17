import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './routes/pages/Home';
import { useAuthStore } from './store/useAuthStore';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  const { user } = useAuthStore();
  const navItems = [
    { label: 'Discover', icon: <span>🧭</span>, active: true },
    { label: 'Trips', icon: <span>🧳</span> },
    { label: 'Saved Places', icon: <span>🔖</span> },
    { label: 'Settings', icon: <span>⚙️</span> },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route
          path='/app/*'
          element={
            user ? (
              <div className='flex h-screen'>
                <Sidebar items={navItems} onNewTrip={() => alert('New trip clicked')} />
                <div className='flex-1 overflow-hidden'>
                  <MainLayout>
                    <Routes>
                      <Route path='/' element={<Home />} />
                    </Routes>
                  </MainLayout>
                </div>
              </div>
            ) : (
              <Navigate to='/signin' replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

