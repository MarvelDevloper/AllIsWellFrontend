import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Login from './components/pages/auth/Login';
import AdminLogin from './components/pages/auth/AdminLogin';
import Signup from './components/pages/auth/Signup';
import VerifyEmail from './components/pages/auth/VerifyEmail';
import Home from './components/pages/public/Home';
import EventsListing from './components/pages/public/EventsListing';
import Donation from './components/pages/public/Donation';
import Contact from './components/pages/public/Contact';

import AdminLayout from './components/layout/AdminLayout';
import AdminEvents from './components/pages/admin/AdminEvents';
import AdminReviews from './components/pages/admin/AdminReviews';

const Placeholder = ({ title }) => <div className="p-8 text-2xl text-center">{title}</div>;

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="p-8 text-center text-gray-500">Loading Session...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        
        <Routes>
          {/* Public Routes with Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Placeholder title="About Us - To Be Implemented" />} />
            <Route path="/events" element={<EventsListing />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Placeholder title="Admin Dashboard Overview" />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="feedback" element={<Placeholder title="Manage Feedback" />} />
            <Route path="enquiries" element={<Placeholder title="Manage Enquiries" />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
