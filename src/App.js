import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import RouteApp from './router/RouteApp';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <AppContent username={username} setUsername={setUsername} />
    </BrowserRouter>
  );
}

function AppContent({ username, setUsername }) {
  const location = useLocation();
  const hideNavbarAndFooterRoutes = ['/login'];
  const showLayout = !hideNavbarAndFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showLayout && <Navbar user={username} />}

      <main className="flex-grow">
        <RouteApp setUsername={setUsername} />
      </main>

      {showLayout && <Footer />}
    </div>
  );
}

export default App;
