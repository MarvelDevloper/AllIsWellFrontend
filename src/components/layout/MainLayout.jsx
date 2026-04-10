import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Menu, X, User } from 'lucide-react';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Heart className="h-8 w-8 text-primary" fill="currentColor" />
                <span className="text-2xl font-bold text-gray-900 tracking-tight">All Is Well</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-primary font-medium transition-colors">About Us</Link>
              <Link to="/events" className="text-gray-600 hover:text-primary font-medium transition-colors">Events</Link>
              <Link to="/donate" className="text-gray-600 hover:text-primary font-medium transition-colors">Donate</Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary font-medium transition-colors">Contact</Link>
              
              {user ? (
                <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
                  <span className="text-sm text-gray-500 font-medium">Hi, {user.name || 'User'}</span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-sm text-primary font-semibold hover:underline">Admin Panel</Link>
                  )}
                  <button onClick={logout} className="text-sm font-medium text-red-600 hover:text-red-800">Logout</button>
                </div>
              ) : (
                <div className="flex gap-4 border-l pl-6 border-gray-200">
                  <Link to="/login" className="text-gray-600 hover:text-primary font-medium">Login</Link>
                  <Link to="/signup" className="btn-primary py-2 px-4 shadow-sm text-sm">Join Us</Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-500 hover:text-primary">
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">About Us</Link>
              <Link to="/events" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">Events</Link>
              <Link to="/donate" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">Donate</Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">Contact</Link>
              
              {!user && (
                <div className="mt-4 pt-4 border-t border-gray-100 px-3 flex flex-col gap-2">
                  <Link to="/login" className="w-full text-center block px-3 py-2 border border-gray-300 rounded-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50">Login</Link>
                  <Link to="/signup" className="w-full text-center block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-dark">Join Us</Link>
                </div>
              )}
              {user && (
                 <div className="mt-4 pt-4 border-t border-gray-100 px-3">
                    <p className="text-sm font-medium text-gray-500 mb-2">Signed in as {user.name || user.email}</p>
                    {user.role === 'admin' && (
                       <Link to="/admin" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10 mb-2">Admin Panel</Link>
                    )}
                    <button onClick={logout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                 </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
                <span className="text-xl font-bold tracking-tight">All Is Well</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Providing end-to-end care for elderly people including food, healthcare, emotional support, and social engagement.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-gray-300">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
                <li><Link to="/events" className="text-gray-400 hover:text-white text-sm transition-colors">Events</Link></li>
                <li><Link to="/donate" className="text-gray-400 hover:text-white text-sm transition-colors">Donate</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-gray-300">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Ulwe, Sector 19, Navi Mumbai, India</li>
                <li>contact@alliswell.org</li>
                <li>+91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} All Is Well Foundation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
