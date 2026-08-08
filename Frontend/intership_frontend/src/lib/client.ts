import axios from 'axios';
import { env } from './env';
import { getToken, setToken } from './tokenStore';

// Separate client for refreshing token to avoid interceptor loops
export const refreshClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  withCredentials: true, // Send HTTP-only refresh cookie
});

export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to attach access token from memory
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

// Response interceptor for handling 401s
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login') {
      originalRequest._retry = true;

      // Single-flight refresh request
      if (!refreshPromise) {
        refreshPromise = refreshClient.post('/auth/refresh')
          .then((res) => {
            const token = res.data.accessToken;
            setToken(token);
            return token;
          })
          .catch((err) => {
            setToken(null);
            throw err;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        const token = await refreshPromise;
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
