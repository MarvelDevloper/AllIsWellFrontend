import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await api.get(`/api/verify-email?token=${token}`);
    return response.data;
  },

  // Added based on "Fetch user session automatically"
  // Assuming a /auth/me exists, otherwise relying on refresh token success
  getSession: async () => {
    // A quick way to test if the session is alive is refreshing the token 
    // or calling a protected route. Assume /auth/me returns user data.
    const response = await api.get('/auth/me').catch((e) => {
      // If /auth/me doesn't exist, we can fallback to checking if refresh works
      if(e.response && e.response.status === 404) {
         return api.post('/auth/refresh');
      }
      throw e;
    });
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};
