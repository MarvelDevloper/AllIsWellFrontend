import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Home, Calendar, MessageSquare, ListCollapse, LogOut, Settings } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <Home className="w-5 h-5 mr-3" /> },
    { name: 'Manage Events', path: '/admin/events', icon: <Calendar className="w-5 h-5 mr-3" /> },
    { name: 'Manage Reviews', path: '/admin/reviews', icon: <MessageSquare className="w-5 h-5 mr-3" /> },
    { name: 'Manage Enquiries', path: '/admin/enquiries', icon: <ListCollapse className="w-5 h-5 mr-3" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 z-10 shadow-xl">
        <div className="h-20 flex items-center px-6 border-b border-gray-800 bg-gray-900">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            <span className="text-xl font-bold tracking-tight">AIW Admin</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="mb-6 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Menu</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? 'bg-primary text-white shadow-sm' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
               <p className="text-sm font-medium text-white truncate">{user?.name || 'Administrator'}</p>
               <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-gray-800 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm">
           <h2 className="text-xl font-semibold text-gray-800">
             {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
           </h2>
           <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2">
                 <span>View Site</span>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </Link>
           </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
