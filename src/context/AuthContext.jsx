import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session on app mount
    const fetchSession = async () => {
      try {
        const data = await authService.getSession();
        if (data?.token) {
          const decoded = jwtDecode(data.token);
          // Use role ONLY from decoded JWT — never hardcode a default role
          setUser({ id: decoded.id, role: decoded.role, ...decoded });
        } else if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    // Listen for force-logout event dispatched by Axios interceptor
    // when refresh token is also expired/invalid
    const handleForceLogout = () => {
      setUser(null);
      // Redirect to login page
      window.location.href = '/login';
    };

    window.addEventListener('auth:logout', handleForceLogout);
    return () => window.removeEventListener('auth:logout', handleForceLogout);
  }, []);

  /**
   * login()
   * - Sends credentials to backend
   * - Decodes role from JWT (or reads from response body)
   * - Sets user state
   * - Returns { userRole } so callers (AdminLogin / Login) can redirect accordingly
   */
  const login = async (credentials) => {
    const data = await authService.login(credentials);

    let userRole = null;
    let userObj = null;

    try {
      if (data?.token) {
        const decoded = jwtDecode(data.token);
        userRole = decoded.role ?? null;  // role comes from backend JWT only
        userObj = { id: decoded.id, email: credentials.email, role: userRole, ...decoded };
      } else if (data?.user) {
        userRole = data.user.role ?? null;
        userObj = data.user;
      } else {
        // Fallback: role unknown — treat as regular user
        userRole = data?.role ?? 'user';
        userObj = { email: credentials.email, role: userRole, ...data };
      }
    } catch (e) {
      // JWT decode failed — role unknown
      userRole = 'user';
      userObj = { email: credentials.email, role: userRole };
    }

    setUser(userObj);

    // Return userRole so the calling page can decide where to navigate
    return { userRole, data };
  };

  const signup = async (userData) => {
    return await authService.signup(userData);
  };

  const logout = async () => {
    await authService.logout().catch(() => {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
