import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session on mount
    const fetchSession = async () => {
      try {
        const data = await authService.getSession();
        if (data.token) {
           const decoded = jwtDecode(data.token);
           setUser({ id: decoded.id, role: decoded.role || 'admin', ...decoded });
        } else {
           setUser(data.user || data);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    try {
      if (data.token) {
        const decoded = jwtDecode(data.token);
        // Assuming your backend token payload contains id and role
        setUser({ id: decoded.id, email: credentials.email, role: decoded.role || 'admin', ...decoded });
      } else {
        setUser({ email: credentials.email, role: 'admin' });
      }
    } catch (e) {
      setUser({ email: credentials.email, role: 'admin' });
    }
    return data;
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
