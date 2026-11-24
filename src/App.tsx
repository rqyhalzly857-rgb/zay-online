import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import GetStarted from './pages/GetStarted';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import { usePage } from './lib/router';
import { AuthProvider, useAuth } from './lib/auth';

const hideChromeOn = new Set(['login', 'register']);

function Shell() {
  const page = usePage();
  const { session, isAdmin } = useAuth();

  // Signed-in users hitting the Contact page go through the intake flow instead
  if (page === 'contact' && session) {
    return <GetStarted />;
  }

  const showChrome = !hideChromeOn.has(page);

  return (
    <div className="min-h-screen bg-ink-950 text-slate-200 flex flex-col">
      {showChrome && <Navbar current={page} />}
      <main className="flex-1">
        {page === 'home' && <Home />}
        {page === 'about' && <About />}
        {page === 'services' && <Services />}
        {page === 'reviews' && <Reviews />}
        {page === 'contact' && <Contact />}
        {page === 'get-started' && <GetStarted />}
        {page === 'login' && <Auth mode="login" />}
        {page === 'register' && <Auth mode="register" />}
        {page === 'dashboard' && <Dashboard />}
        {page === 'admin' && <Admin />}
      </main>
      {showChrome && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
